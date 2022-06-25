import Api from '../../service/api'

const api = new Api()

export const ClientModule = {
	state: {
		clients: [],
	},
	getters: {
		clients(state) {
			return state.clients
		},
		client(state, name) {
			return state.clients.find((element) => element.name === name)
		},
	},
	mutations: {
		setClients(state, clients) {
			state.client = clients
		},
		setClient(state, dataClient) {
			state.client.push(dataClient)
		},
	},
	actions: {
		setClients(context) {
			const clients = api.getCustomers()
			context.commit('setClients', clients)
		},
	},
}
