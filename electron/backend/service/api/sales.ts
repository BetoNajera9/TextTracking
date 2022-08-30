import { ipcMain } from 'electron'
import { v4 } from 'uuid'

import db from '../../lib/database'

export const Sale = () => {
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
}