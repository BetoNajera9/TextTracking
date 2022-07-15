import {
	app,
	autoUpdater,
	BrowserWindow,
	shell,
	ipcMain,
	dialog,
} from 'electron'
import { release } from 'os'
import { join } from 'path'

import { v4 } from 'uuid'
import db from '../lib/database'

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
	app.quit()
	process.exit(0)
}

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

export const ROOT_PATH = {
	// /dist
	dist: join(__dirname, '../..'),
	// /dist or /public
	public: join(__dirname, app.isPackaged ? '../..' : '../../../public'),
}

let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin
const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`
const indexHtml = join(ROOT_PATH.dist, 'index.html')

async function createWindow() {
	win = new BrowserWindow({
		width: 1000,
		height: 800,
		title: 'Main window',
		icon: join(ROOT_PATH.public, 'favicon.ico'),
		webPreferences: {
			preload,
			nodeIntegration: true,
			contextIsolation: false,
		},
	})

	if (app.isPackaged) {
		win.loadFile(indexHtml)
	} else {
		win.loadURL(url)
		// win.webContents.openDevTools()
	}

	// Test actively push message to the Electron-Renderer
	win.webContents.on('did-finish-load', () => {
		win?.webContents.send('main-process-message', new Date().toLocaleString())
	})

	// Make all links open with the browser, not with the application
	win.webContents.setWindowOpenHandler(({ url }) => {
		if (url.startsWith('https:')) shell.openExternal(url)
		return { action: 'deny' }
	})
}

app.on('window-all-closed', () => {
	win = null
	if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
	if (win) {
		// Focus on the main window if the user tried to open another
		if (win.isMinimized()) win.restore()
		win.focus()
	}
})

app.on('activate', () => {
	const allWindows = BrowserWindow.getAllWindows()
	if (allWindows.length) {
		allWindows[0].focus()
	} else {
		createWindow()
	}
})

app.on('ready', async () => {
	createWindow()
	if (import.meta.env.DEV && !process.env.IS_TEST)
		// Open Dev Tools
		win?.webContents.openDevTools()
})

// new window example arg: new windows url
ipcMain.handle('open-win', (event, arg) => {
	const childWindow = new BrowserWindow({
		webPreferences: {
			preload,
		},
	})

	if (app.isPackaged) {
		childWindow.loadFile(indexHtml, { hash: arg })
	} else {
		childWindow.loadURL(`${url}/#${arg}`)
		// childWindow.webContents.openDevTools({ mode: "undocked", activate: true })
	}
})

// Deploy

if (import.meta.env.PROD) {
	const server = 'marce-project-deploy-1icantlmz-betonajera.vercel.app'
	const url = `${server}/update/${process.platform}/${app.getVersion()}`

	autoUpdater.setFeedURL({ url })
}

// Accounts API
ipcMain.on('get-and-set-account-statements', (e) => {
	const res = db.connection.get('accountsStatements').value()
	e.reply('set-account-statements', res)
})

ipcMain.on('getAccountsStatements', (e, data) => {
	const res = db.connection.get('accountsStatements').find(data).value()
	e.reply('main-process-message', res)
})

ipcMain.on('create-account-statement', (e, data) => {
	db.connection.get('accountsStatements').push(data).write()

	e.reply('set-account-statement', data)
})

ipcMain.on('update-account', (e, findData, newData) => {
	const { movements, total } = db.connection
		.get('accountsStatements')
		.find(findData)
		.value()

	const oldMovement = movements.filter(
		(element: any) => element.id === newData.id
	)

	const newTotal = total - oldMovement[0].total + Number(newData.total)

	const newMovements = movements.map((element: any) => {
		if (element.id === newData.id) return newData
		return element
	})

	db.connection
		.get('accountsStatements')
		.find(findData)
		.assign({ movements: newMovements, total: newTotal })
		.write()

	e.reply(
		'update-account-statement-from-store',
		db.connection.get('accountsStatements').find(findData).value()
	)
})

ipcMain.on('add-movements-to-account', (e, findData, data) => {
	const { movements, total } = db.connection
		.get('accountsStatements')
		.find(findData)
		.value()

	if (!data.id) data.id = v4()

	const newTotal = total + data.total
	movements.push(data)

	db.connection
		.get('accountsStatements')
		.find(findData)
		.assign({ movements, total: newTotal })
		.write()

	e.reply('add-movements-to-account-from-store', { ...findData, data })
})

//CUSTOMERS API

ipcMain.on('get-and-set-customers', (e) => {
	const res = db.connection.get('customers').value()

	e.reply('set-customers', res)
})

ipcMain.on('getCustomer', (e, data) => {
	const res = db.connection.get('customers').find(data).value()

	e.reply('main-process-message', res)
})

ipcMain.on('create-customer', (e, data) => {
	const id = v4()

	db.connection
		.get('customers')
		.push({ id, ...data })
		.write()

	e.reply('set-customer', { id, ...data })
})

ipcMain.on('update-customer', (e, findData, newData) => {
	db.connection.get('customers').find(findData).assign(newData).write()

	e.reply('update-customer-from-store', newData)
})

ipcMain.on('delete-customer', (e, data) => {
	db.connection.get('customers').remove(data).write()

	e.reply('delete-customer-from-store', data)
})

//SALES API
ipcMain.on('get-sale-set-history', (e) => {
	const res = db.connection.get('sales').value()

	e.reply('set-history', res)
})

ipcMain.on('create-sale', (e, data) => {
	const id = v4()

	db.connection
		.get('sales')
		.push({ id, ...data })
		.write()

	e.reply('set-sale', { id, ...data })
})

ipcMain.on('update-history', (e, findData, newData) => {
	db.connection.get('sales').find(findData).assign(newData).write()

	e.reply('update-history-from-store', newData)
})

ipcMain.on('delete-history', (e, id) => {
	db.connection.get('sales').remove({ id }).write()

	e.reply('delete-history-from-store', { id })
})

// STOCK API
ipcMain.on('get-and-set-stock', (e) => {
	const res = db.connection.get('stock').value()

	e.reply('set-all-stock', res)
})

ipcMain.on('getStock', (e, data) => {
	const res = db.connection.get('stock').find(data).value()

	e.reply('main-process-message', res)
})

ipcMain.on('create-stock', (e, data) => {
	const id = v4()
	db.connection
		.get('stock')
		.push({ id, ...data })
		.write()

	e.reply('set-stock', { id, ...data })
})

ipcMain.on('update-stock', (e, findData, newData) => {
	db.connection.get('stock').find(findData).assign(newData).write()

	e.reply('update-stock-from-store', newData)
})

ipcMain.on('delete-stock', (e, data) => {
	db.connection.get('stock').remove(data).write()

	e.reply('delete-stock-from-store', data)
})

ipcMain.on('save-sale-pdf', async (e, data) => {
	const path = await dialog.showSaveDialog(win as BrowserWindow, {
		defaultPath: join(app.getPath('downloads'), `${data.id}_sale.pdf`),
	})

	e.reply('generate-sale-pdf', path, data)
})

ipcMain.on('save-account-pdf', async (e, data) => {
	const path = await dialog.showSaveDialog(win as BrowserWindow, {
		defaultPath: join(app.getPath('downloads'), `${data.id}_sale.pdf`),
	})

	e.reply('generate-account-pdf', path, data)
})

ipcMain.on('save-stock-pdf', async (e, data) => {
	const now = new Date()

	const path = await dialog.showSaveDialog(win as BrowserWindow, {
		defaultPath: join(
			app.getPath('downloads'),
			`${now.getDate()}${
				now.getMonth() + 1
			}${now.getFullYear()}${now.getHours()}_stock.pdf`
		),
	})

	e.reply('generate-stock-pdf', path, data)
})
