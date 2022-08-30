import { ipcMain } from 'electron'
import { v4 } from 'uuid'

import db from '../../lib/database'

export const accountStatement = () => {
  ipcMain.on('get-and-set-account-statements', (e) => {
    const res = db.connection.get('accountsStatements').value()
    e.reply('set-account-statements', res)
  })

  ipcMain.on('getAccountsStatementss', (e, data) => {
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
}