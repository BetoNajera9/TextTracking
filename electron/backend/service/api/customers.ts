import { ipcMain } from 'electron'
import { v4 } from 'uuid'

import db from '../../lib/database'

export const Customer = () => {

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
}