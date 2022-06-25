import Api from '../../service/api'

const api = new Api()

export const StockModule = {
	state: {
		stock: [],
	},
	getters: {
		stock(state) {
			return state.stock
		},
	},
	mutations: {
		setStock(state, stock) {
			state.stock = stock
		},
	},
	actions: {
		setStock(context) {
			const stock = api.getStock()
			context.commit('setStock', stock)
		},
	},
}
