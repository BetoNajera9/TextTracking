import Api from '../../service/api'

const api = new Api()

export const CustomerModule = {
	namespaced: true,
	state: () => ({
		customers: [],
	}),
	getters: {
		customers(state) {
			return state.customers
		},
		customer(state) {
			return (id) => state.customers.find((element) => element.id === id)
		},
	},
	mutations: {
		setCustomers(state, customers) {
			state.customers = customers
		},
		setCustomer(state, dataCustomer) {
			state.customers.push(dataCustomer)
		},
		updateCustomer(state, dataCustomer) {
			state.customers = state.customers.map((element) => {
				if (element.id === dataCustomer.id) return dataCustomer
				else return element
			})
		},
		deleteCustomer(state, id) {
			state.customers = state.customers.filter((element) => element.id !== id)
		},
	},
	actions: {
		async setCustomers(context) {
			const customers = await api.getCustomers()
			context.commit('setCustomers', customers)
		},
		async setCustomer(context, data) {
			const res = await api.setCustomer(data)
			context.commit('setCustomer', res)
		},
		async updateCustomer(context, data) {
			const res = await api.updateCustomer(data.id, data)
			context.commit('updateCustomer', res)
		},
		async deleteCustomer(context, id) {
			const { id: res } = await api.deleteCustomer(id)
			context.commit('deleteCustomer', res)
		},
	},
}
