import { ipcMain } from 'electron'
import { v4 } from 'uuid'

import db from '../../lib/database'

export const Stock = () => {
  ipcMain.on('get-and-set-stock', (e) => {
    const res = db.connection.get('stock').value()

    e.reply('set-all-stock', res)
  })

  ipcMain.on('getStock', (e, data) => {
    const res = db.connection.get('stock').find(data).value()

    e.reply('main-process-message', res)
  })

  ipcMain.on('create-stock', (e, data) => {
    data.stock = data.in
    data.out = 0
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
}