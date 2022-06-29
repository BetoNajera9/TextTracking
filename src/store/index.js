import { createStore } from 'vuex'
import {
	CustomerModule,
	StockModule,
	HistoryModule,
	AccountStatementsModule,
} from './modules'

export const store = createStore({
	state: {},
	getters: {},
	mutations: {},
	actions: {},
	modules: {
		customer: CustomerModule,
		stock: StockModule,
		history: HistoryModule,
		accountS: AccountStatementsModule,
	},
})

export function useStore() {
	return store
}
