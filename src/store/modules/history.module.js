import Api from '../../service/api'

const api = new Api()

export const HistoryModule = {
	state: {
		history: [],
	},
	getters: {
		history(state) {
			return state.history
		},
	},
	mutations: {
		setHistory(state, history) {
			state.history = history
		},
	},
	actions: {
		setHistory(context) {
			const history = api.getHistory()
			context.commit('setHistory', history)
		},
	},
}
