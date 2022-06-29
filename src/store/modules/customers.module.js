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
		customer(state, name) {
			return state.customers.find((element) => element.name === name)
		},
	},
	mutations: {
		setCustomers(state, customers) {
			state.customers = customers
		},
		setCustomer(state, dataCustomer) {
			state.customers.push(dataCustomer)
		},
	},
	actions: {
		async setCustomers(context) {
			const customers = await api.getCustomers()
			context.commit('setCustomers', customers)
		},
		async setCustomer(context, data) {
			await api.setCustomer(data)
			context.commit('setCustomer', data)
		},
	},
}
