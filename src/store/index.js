import { createStore } from 'vuex'

import Api from '../service/api'
const api = new Api()

export const store = createStore({
	state: () => ({
		customers: [],
		stock: [],
		sales: [],
		history: [],
	}),
	getters: {
		// Customers Getters
		customers(state) {
			return state.customers
		},
		customersInput(state) {
			return state.customers.map((element) => {
				return { label: element.name, value: element.id }
			})
		},
		customer(state) {
			return (id) => state.customers.find((element) => element.id === id)
		},

		// Sales Getters
		sales(state) {
			return state.sales
		},
		salesInput(state) {
			return state.sales.map((element) => {
				return { label: element.name, value: element.id }
			})
		},
		sale(state) {
			return (id) => state.sales.find((element) => element.id === id)
		},

		// History Getters
		historys(state) {
			return state.history
		},
		history(state) {
			return (id) => state.history.find((element) => element.id === id)
		},

		// Stock Getters
		stocks(state) {
			return state.stock
		},
		stocksInput(state) {
			return state.stock.map((element) => {
				return { label: element.name, value: element.id }
			})
		},
		stock(state) {
			return (id) => state.stock.find((element) => element.id === id)
		},
	},
	mutations: {
		// Customers Mutation
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

		// Sales Muttions
		setSales(state, sales) {
			state.sales = sales
		},
		setSale(state, dataSale) {
			state.sales.push(dataSale)
		},
		updateSale(state, dataSale) {
			state.sales = state.sales.map((element) => {
				if (element.id === dataSale.id) return dataSale
				else return element
			})
		},
		deleteSale(state, id) {
			state.sales = state.sales.filter((element) => element.id !== id)
		},

		// History Mutations
		setHistory(state, history) {
			state.history = history
		},
		addToHistory(state, sale) {
			state.history.push(sale)
		},

		// Stock Mutations
		setAllStock(state, stock) {
			state.stock = stock
		},
		setStock(state, dataStock) {
			state.stock.push(dataStock)
		},
		updateStock(state, dataStock) {
			state.stock = state.stock.map((element) => {
				if (element.id === dataStock.id) return dataStock
				else return element
			})
		},
	},
	actions: {
		// Customers Actions
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

		// Sales Actions
		async setSales(context, data) {
			const res = await api.setSale(data)
			context.commit('addToHistory', res)
		},
		async emptySales(context) {
			context.commit('setSales', [])
		},
		async setSale(context, data) {
			context.commit('setSale', data)
		},
		async updateSale(context, data) {
			context.commit('updateSale', data)
		},
		async deleteSale(context, id) {
			context.commit('deleteSale', id)
		},

		// History Actions
		async setHistory(context) {
			const history = await api.getSales()
			context.commit('setHistory', history)
		},

		// Stock Actions
		async setAllStock(context) {
			const stock = await api.getStock()
			context.commit('setAllStock', stock)
		},
		async setStock(context, data) {
			const res = await api.setStock(data)
			context.commit('setStock', res)
		},
		async updateStock(context, data) {
			const res = await api.updateStock(data.id, data)
			context.commit('updateStock', res)
		},
	},
})

export function useStore() {
	return store
}
