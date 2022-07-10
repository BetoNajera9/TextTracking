import { ipcRenderer } from 'electron'

import { Sale, AccountStatement, Stock } from '../../types'
import { generateAccountPdf, generateSalePdf, generateStockPdf } from '../pdf'

ipcRenderer.on('generate-sale-pdf', (e, path, data: Sale) => {
	if (path.canceled === false) generateSalePdf(path.filePath, data)
})

ipcRenderer.on('generate-account-pdf', (e, path, data: AccountStatement) => {
	if (path.canceled === false) generateAccountPdf(path.filePath, data)
})

ipcRenderer.on('generate-stock-pdf', (e, path, data: Stock[]) => {
	if (path.canceled === false) generateStockPdf(path.filePath, data)
})
