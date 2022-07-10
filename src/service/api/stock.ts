import { ipcRenderer } from 'electron'

import { ActionTypes } from '../../store/actions'
import { useStore } from '../../store'

const store = useStore()

ipcRenderer.on('set-all-stock', (e, data) => {
	store.dispatch(ActionTypes.setAllStock, data)
})

ipcRenderer.on('set-stock', (e, data) => {
	store.dispatch(ActionTypes.setStock, data)
})

ipcRenderer.on('update-stock-from-store', (e, data) => {
	store.dispatch(ActionTypes.updateStock, data)
})

ipcRenderer.on('delete-stock-from-store', (e, data) => {
	store.dispatch(ActionTypes.deleteStock, data.id)
})
