import { createStore } from 'vuex'
import {
	ClientModule,
	StockModule,
	HistoryModule,
	AccountStatementsModule,
} from './modules'

export default createStore({
	state: {},
	getters: {},
	mutations: {},
	actions: {},
	modules: {
		client: ClientModule,
		stock: StockModule,
		history: HistoryModule,
		accountS: AccountStatementsModule,
	},
})
