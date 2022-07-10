import { ipcRenderer } from 'electron'

import { ActionTypes } from '../../store/actions'
import { useStore } from '../../store'
import { Sale } from '../../types'

const store = useStore()

ipcRenderer.on('set-history', (e, data: Sale[]) => {
	store.dispatch(ActionTypes.setHistory, data)
})

ipcRenderer.on('set-sale', (e, data: Sale) => {
	store.dispatch(ActionTypes.setSales, data)
})

ipcRenderer.on('update-history-from-store-store', (e, data: Sale) => {
	store.dispatch(ActionTypes.updateHistory, data)
})

ipcRenderer.on('delete-history-from-store-store', (e, data: { id: string }) => {
	store.dispatch(ActionTypes.deleteHistory, data.id)
})
