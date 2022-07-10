import { ActionTree, ActionContext } from 'vuex'
import { ipcRenderer } from 'electron'

import { Stock, Customer, Sale, AccountStatement, Movement } from '../types'
import { Mutations, MutationTypes } from './mutations'
import { generateSalePdf } from '../service/pdf'
import { State } from './state'

export enum ActionTypes {
	toogleActive = 'TOOGLE_ACTIVE',

	setCustomers = 'SET_CUSTOMERS',
	setCustomer = 'SET_CUSTOMER',
	updateCustomer = 'UPDATE_CUSTOMER',
	deleteCustomer = 'DELETE_CUSTOMER',

	setSales = 'SET_SALES',
	emptySales = 'EMPTY_SALES',
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

type AugmentedActionContext = {
	commit<K extends keyof Mutations>(
		key: K,
		payload?: Parameters<Mutations[K]>[1]
	): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
	[ActionTypes.toogleActive]({ commit }: AugmentedActionContext): void

	// CUSTOMERS
	[ActionTypes.setCustomers](
		{ commit }: AugmentedActionContext,
		customers: Customer[]
	): void
	[ActionTypes.setCustomer](
		{ commit }: AugmentedActionContext,
		data: Customer
	): void
	[ActionTypes.updateCustomer](
		{ commit }: AugmentedActionContext,
		data: Customer
	): void
	[ActionTypes.deleteCustomer](
		{ commit }: AugmentedActionContext,
		id: string
	): void

	// SALES
	[ActionTypes.setSales]({ commit }: any, data: Sale): void
	[ActionTypes.emptySales]({ commit }: AugmentedActionContext): void
	[ActionTypes.setSale]({ commit }: AugmentedActionContext, data: Stock): void
	[ActionTypes.updateSale](
		{ commit }: AugmentedActionContext,
		data: Stock
	): void
	[ActionTypes.deleteSale]({ commit }: AugmentedActionContext, id: string): void

	// HISTORY
	[ActionTypes.setHistory](
		{ commit }: AugmentedActionContext,
		history: Sale[]
	): void
	[ActionTypes.updateHistory](
		{ commit }: AugmentedActionContext,
		data: Sale
	): void
	[ActionTypes.deleteHistory](
		{ commit }: AugmentedActionContext,
		id: string
	): void

	// STOCK
	[ActionTypes.setAllStock](
		{ commit }: AugmentedActionContext,
		stock: Stock[]
	): void
	[ActionTypes.setStock]({ commit }: AugmentedActionContext, data: Stock): void
	[ActionTypes.updateStock](
		{ commit }: AugmentedActionContext,
		data: Stock
	): void
	[ActionTypes.deleteStock](
		{ commit }: AugmentedActionContext,
		id: string
	): void

	// ACCOUNTS STATEMENTS
	[ActionTypes.setAccountsStatements](
		{ commit }: AugmentedActionContext,
		accounts: AccountStatement[]
	): void
	[ActionTypes.setAccountStatement](
		{ commit }: AugmentedActionContext,
		data: AccountStatement
	): void
	[ActionTypes.updateAccountStatement](
		{ commit }: AugmentedActionContext,
		data: AccountStatement
	): void
	[ActionTypes.addMovementToAccount](
		{ commit }: AugmentedActionContext,
		movement: { id: string; data: Movement }
	): void
}

export const actions: ActionTree<State, State> & Actions = {
	[ActionTypes.toogleActive]({ commit }) {
		commit(MutationTypes.toogleActive)
	},

	// CUSTOMERS
	[ActionTypes.setCustomers]({ commit }, customers) {
		commit(MutationTypes.setCustomers, customers)
	},
	[ActionTypes.setCustomer]({ commit }, data) {
		commit(MutationTypes.setCustomer, data)

		const accountStatement = {
			id: data.id,
			name: data.name,
			movements: [],
			total: 0,
		}

		ipcRenderer.send('create-account-statement', accountStatement)
	},
	[ActionTypes.updateCustomer]({ commit }, data) {
		commit(MutationTypes.updateCustomer, data)
	},
	[ActionTypes.deleteCustomer]({ commit }, id) {
		commit(MutationTypes.deleteCustomer, id)
	},

	// SALES
	[ActionTypes.setSales](context, data) {
		context.commit(MutationTypes.addToHistory, data)

		data.material.map((element: Stock) => {
			const stock = context.getters.stock(element.id)
			stock.number = stock.number - element.number
			ipcRenderer.send('update-stock', { id: stock.id }, { ...stock })
		})

		generateSalePdf(data)

		if (data.isCustomer === true) {
			delete data.isCustomer
			const id = data.customerId
			delete data.customerId

			data.material.map((element: Stock) => {
				ipcRenderer.send(
					'add-movements-to-account',
					{ id },
					{
						movement: 'CHARGE',
						...element,
						total: element.amount,
						date: new Date(),
					}
				)
			})
		}
	},
	[ActionTypes.emptySales]({ commit }) {
		commit(MutationTypes.setSales, [])
	},
	[ActionTypes.setSale]({ commit }, data) {
		commit(MutationTypes.setSale, data)
	},
	[ActionTypes.updateSale]({ commit }, data) {
		commit(MutationTypes.updateSale, data)
	},
	[ActionTypes.deleteSale]({ commit }, id) {
		commit(MutationTypes.deleteSale, id)
	},

	// HISTORY
	[ActionTypes.setHistory]({ commit }, history) {
		commit(MutationTypes.setHistory, history)
	},
	[ActionTypes.updateHistory]({ commit }, data) {
		commit(MutationTypes.updateHistory, data)
	},
	[ActionTypes.deleteHistory]({ commit }, id) {
		commit(MutationTypes.deleteHistory, id)
	},

	// STOCK
	[ActionTypes.setAllStock]({ commit }, stock) {
		commit(MutationTypes.setAllStock, stock)
	},
	[ActionTypes.setStock]({ commit }, data) {
		commit(MutationTypes.setStock, data)
	},
	[ActionTypes.updateStock]({ commit }, data) {
		commit(MutationTypes.updateStock, data)
	},
	[ActionTypes.deleteStock]({ commit }, id) {
		commit(MutationTypes.deleteStock, id)
	},

	// ACCOUNT STATEMENTS
	[ActionTypes.setAccountsStatements]({ commit }, accounts) {
		commit(MutationTypes.setAccountsStatements, accounts)
	},
	[ActionTypes.setAccountStatement]({ commit }, data) {
		commit(MutationTypes.setAccountStatement, data)
	},
	[ActionTypes.updateAccountStatement]({ commit }, data) {
		commit(MutationTypes.updateAccountStatement, data)
	},
	[ActionTypes.addMovementToAccount]({ commit }, movement) {
		commit(MutationTypes.addMovementToAccount, {
			id: movement.id,
			data: movement.data,
		})
	},
}
