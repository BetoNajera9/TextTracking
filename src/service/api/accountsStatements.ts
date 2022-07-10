import { ipcRenderer } from 'electron'

import { ActionTypes } from '../../store/actions'
import { useStore } from '../../store'

const store = useStore()

ipcRenderer.on('set-account-statements', (e, data) => {
	store.dispatch(ActionTypes.setAccountsStatements, data)
})

ipcRenderer.on('update-account-statement-from-store', (e, data) => {
	store.dispatch(ActionTypes.updateAccountStatement, data)
})

ipcRenderer.on('add-movements-to-account-from-store', (e, data) => {
	store.dispatch(ActionTypes.addMovementToAccount, data)
})
