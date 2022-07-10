import { ipcRenderer } from 'electron'

import { ActionTypes } from '../../store/actions'
import { useStore } from '../../store'
import { Customer } from '../../types'

const store = useStore()

ipcRenderer.on('set-customers', (e, data: [Customer]) => {
	store.dispatch(ActionTypes.setCustomers, data)
})

ipcRenderer.on('set-customer', (e, data: Customer) => {
	store.dispatch(ActionTypes.setCustomer, data)
})

ipcRenderer.on('update-customer-from-store', (e, data: Customer) => {
	store.dispatch(ActionTypes.updateCustomer, data)
})

ipcRenderer.on('delete-customer-from-store', (e, data: { id: string }) => {
	store.dispatch(ActionTypes.deleteCustomer, data.id)
})
