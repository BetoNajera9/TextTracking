import { ipcMain } from 'electron'

import db from '../../lib/database'

export const Sale = () => {
  ipcMain.on('get-sale-set-history', (e) => {
    const res = db.connection.get('sales').value()

    e.reply('set-history', res)
  })

  ipcMain.on('create-sale', (e, data) => {
    const id = db.connection.get('salesFolio').value()
    db.connection.set('salesFolio', id + 1).write()

    const idFormated = format(id, 7)

    db.connection
      .get('sales')
      .push({ id: idFormated, ...data })
      .write()

    e.reply('set-sale', { id: idFormated, ...data })
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

const format = (num, size: number) => {
  num = num.toString()
  while (num.length < size) num = '0' + num
  return num
}