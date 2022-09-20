import { ipcMain, dialog, BrowserWindow, App } from 'electron'
import { join } from 'path'

export const Pdf = (app: App, win: BrowserWindow) => {
  ipcMain.on('save-sale-pdf', async (e, data) => {
    const path = await dialog.showSaveDialog(win as BrowserWindow, {
      defaultPath: join(app.getPath('downloads'), `${data.id}_sale.pdf`),
    })

    e.reply('generate-sale-pdf', path, data)
  })

  ipcMain.on('save-account-pdf', async (e, data) => {
    const path = await dialog.showSaveDialog(win as BrowserWindow, {
      defaultPath: join(app.getPath('downloads'), `${data.id}_account.pdf`),
    })

    e.reply('generate-account-pdf', path, data)
  })

  ipcMain.on('save-stock-pdf', async (e, data) => {
    const now = new Date()

    const path = await dialog.showSaveDialog(win as BrowserWindow, {
      defaultPath: join(
        app.getPath('downloads'),
        `${now.getDate()}${now.getMonth() + 1
        }${now.getFullYear()}${now.getHours()}_stock.pdf`
      ),
    })

    e.reply('generate-stock-pdf', path, data)
  })

  ipcMain.on('save-debit-balance-pdf', async (e, data) => {
    const now = new Date()
    const path = await dialog.showSaveDialog(win as BrowserWindow, {
      defaultPath: join(
        app.getPath('downloads'),
        `${now.getDate()}${now.getMonth() + 1
        }${now.getFullYear()}${now.getHours()}_debit_balance.pdf`
      ),
    })

    e.reply('generate-debit-balance-pdf', path, data)
  })

}