import Api from '../../service/api'

const api = new Api()

export const AccountStatementsModule = {
	state: {
		accountStatements: [],
	},
	getters: {
		accountStatements(state) {
			return state.accountStatements
		},
	},
	mutations: {
		setAccountStatements(state, accountStatements) {
			state.accountStatements = accountStatements
		},
	},
	actions: {
		setAccountStatements(context) {
			const accountStatements = api.getAccountStatements()
			context.commit('setAccountStatements', accountStatements)
		},
	},
}
