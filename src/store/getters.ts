import { GetterTree } from 'vuex'

import { Stock, Customer, Sale, AccountStatement, Movement } from '../types'
import { State } from './state'

export type Getters = {
	isActive(state: State): Boolean

	// CUSTOMERS
	customers(state: State): Customer[]
	customersInput(state: State): { label: string; value: string }[]
	customer(state: State): (id: string) => Customer

	//SALES
	sales(state: State): Stock[]
	sale(state: State): (id: string) => Stock | undefined

	// HISTORY
	historys(state: State): Sale[]
	history(state: State): (id: string) => Sale | undefined

	// STOCK
	stocks(state: State): Stock[]
	stock(state: State): (id: string) => Stock | undefined

	// ACCOUNT STATEMENT
	account(state: State): (id: string) => AccountStatement | undefined
	accountMovement(
		state: State
	): (userId: string, movementId: string) => AccountStatement | undefined
}

export const getters: GetterTree<State, State> & Getters = {
	isActive(state: State) {
		return state.isActive
	},

	// CUSTOMERS
	customers(state: State) {
		return state.customers
	},
	customersInput(state) {
		return state.customers.map((element: Customer) => {
			return { label: element.name, value: element.id }
		})
	},
	customer(state: State) {
		return (id: String) =>
			state.customers.find((element: Customer) => element.id === id)!
	},

	// SALES
	sales(state: State) {
		return state.sales
	},
	sale(state: State) {
		return (id: string) =>
			state.sales.find((element: Stock) => element.id === id)
	},

	// HISTORY
	historys(state: State) {
		return state.history
	},
	history(state: State) {
		return (id: string) =>
			state.history.find((element: Sale) => element.id === id)
	},

	// STOCK
	stocks(state: State) {
		return state.stock
	},
	stock(state: State) {
		return (id: string) =>
			state.stock.find((element: Stock) => element.id === id)
	},

	// ACCOUNT STATEMENT
	account(state: State) {
		return (id: string) =>
			state.accountsStatements.find(
				(element: AccountStatement) => element.id === id
			)
	},
	accountMovement(state: State) {
		return (userId: string, movementId: string) => {
			const account = state.accountsStatements.find(
				(account: AccountStatement) => {
					if (account.id === userId) {
						return account.movements.find(
							(element: Movement) => element.id === movementId
						)
					}
				}
			)

			return account
		}
	},
}
