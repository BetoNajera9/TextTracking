import { MutationTree } from 'vuex'

import { Stock, Customer, Sale, AccountStatement, Movement } from '../types'
import { State } from './state'

export enum MutationTypes {
	toogleActive = 'TOOGLE_ACTIVE',

	setCustomers = 'SET_CUSTOMERS',
	setCustomer = 'SET_CUSTOMER',
	updateCustomer = 'UPDATE_CUSTOMER',
	deleteCustomer = 'DELETE_CUSTOMER',

	setSales = 'SET_SALES',
	setSale = 'SET_SALE',
	updateSale = 'UPDATE_SALE',
	deleteSale = 'DELETE_SALE',

	setHistory = 'SET_HISTORY',
	addToHistory = 'ADD_TO_HISTORY',
	updateHistory = 'UPDATE_HISTORY',
	deleteHistory = 'DELETE_HISTORY',

	setAllStock = 'SET_ALL_STOCK',
	setStock = 'SET_STOCK',
	updateStock = 'UPDATE_STOCK',
	deleteStock = 'DELETE_STOCK',

	setAccountsStatements = 'SET_ACCOUNTS_STATEMENTS',
	setAccountStatement = 'SET_ACCOUNT_STATEMENT',
	updateAccountStatement = 'UPDATE_ACCOUNT_STATEMENT',
	addMovementToAccount = 'ADD_MOVEMENT_TO_ACCOUNT_STATEMENT',
}

export type Mutations = {
	[MutationTypes.toogleActive](state: State): void

	[MutationTypes.setCustomers](state: State, customers: Customer[]): void
	[MutationTypes.setCustomer](state: State, dataCustomer: Customer): void
	[MutationTypes.updateCustomer](state: State, dataCustomer: Customer): void
	[MutationTypes.deleteCustomer](state: State, id: string): void

	[MutationTypes.setSales](state: State, sales: Stock[]): void
	[MutationTypes.setSale](state: State, dataSale: Stock): void
	[MutationTypes.updateSale](state: State, dataSale: Stock): void
	[MutationTypes.deleteSale](state: State, is: string): void

	[MutationTypes.setHistory](state: State, history: Sale[]): void
	[MutationTypes.addToHistory](state: State, sale: Sale): void
	[MutationTypes.updateHistory](state: State, dataHistory: Sale): void
	[MutationTypes.deleteHistory](state: State, id: string): void

	[MutationTypes.setAllStock](state: State, stock: Stock[]): void
	[MutationTypes.setStock](state: State, dataStock: Stock): void
	[MutationTypes.updateStock](state: State, dataStock: Stock): void
	[MutationTypes.deleteStock](state: State, id: string): void

	[MutationTypes.setAccountsStatements](
		state: State,
		AccountStatement: AccountStatement[]
	): void
	[MutationTypes.setAccountStatement](
		state: State,
		AccountStatement: AccountStatement
	): void
	[MutationTypes.updateAccountStatement](
		state: State,
		AccountStatement: AccountStatement
	): void
	[MutationTypes.addMovementToAccount](
		state: State,
		movement: { id: string; data: Movement }
	): void
}

export const mutations: MutationTree<State> & Mutations = {
	[MutationTypes.toogleActive](state) {
		state.isActive = !state.isActive
	},

	// CUSTOMERS
	[MutationTypes.setCustomers](state: State, customers) {
		state.customers = customers
	},
	[MutationTypes.setCustomer](state: State, dataCustomer: Customer) {
		state.customers.push(dataCustomer)
	},
	[MutationTypes.updateCustomer](state: State, dataCustomer) {
		state.customers = state.customers.map((element) => {
			if (element.id === dataCustomer.id) return dataCustomer
			else return element
		})
	},
	[MutationTypes.deleteCustomer](state: State, id) {
		state.customers = state.customers.filter((element) => element.id !== id)
	},

	// SALES
	[MutationTypes.setSales](state: State, sales) {
		state.sales = sales
	},
	[MutationTypes.setSale](state: State, dataSale) {
		state.sales.push(dataSale)
	},
	[MutationTypes.updateSale](state: State, dataSale) {
		state.sales = state.sales.map((element) => {
			if (element.id === dataSale.id) return dataSale
			else return element
		})
	},
	[MutationTypes.deleteSale](state: State, id) {
		state.sales = state.sales.filter((element) => element.id !== id)
	},

	// HISTORY
	[MutationTypes.setHistory](state: State, history) {
		state.history = history
	},
	[MutationTypes.addToHistory](state: State, sale) {
		state.history.push(sale)
	},
	[MutationTypes.updateHistory](state: State, dataHistory) {
		state.history = state.history.map((element) => {
			if (element.id === dataHistory.id) return dataHistory
			else return element
		})
	},
	[MutationTypes.deleteHistory](state: State, id) {
		state.history = state.history.filter((element) => element.id !== id)
	},

	// STOCK
	[MutationTypes.setAllStock](state: State, stock) {
		state.stock = stock
	},
	[MutationTypes.setStock](state: State, dataStock) {
		state.stock.push(dataStock)
	},
	[MutationTypes.updateStock](state: State, dataStock) {
		state.stock = state.stock.map((element) => {
			if (element.id === dataStock.id) return dataStock
			else return element
		})
	},
	[MutationTypes.deleteStock](state: State, id) {
		state.stock = state.stock.filter((element) => element.id !== id)
	},

	// ACCOUNT STATEMENT
	[MutationTypes.setAccountsStatements](state: State, AccountsStatements) {
		state.accountsStatements = AccountsStatements
	},
	[MutationTypes.setAccountStatement](state: State, AccountStatement) {
		state.accountsStatements.push(AccountStatement)
	},
	[MutationTypes.updateAccountStatement](state: State, AccountStatement) {
		state.accountsStatements = state.accountsStatements.map((element) => {
			if (element.id === AccountStatement.id) return AccountStatement
			else return element
		})
	},
	[MutationTypes.addMovementToAccount](state: State, movement) {
		state.accountsStatements = state.accountsStatements.map((element) => {
			if (element.id === movement.id) {
				element.movements.push(movement.data)
				element.total += movement.data.total
				return element
			} else return element
		})
	},
}
