import { Stock, Customer, Sale, AccountStatement } from '../types'

export type State = {
	isActive: boolean
	customers: Customer[]
	stock: Stock[]
	sales: Stock[]
	history: Sale[]
	accountsStatements: AccountStatement[]
}

export const state: State = {
	isActive: false,
	customers: [],
	stock: [],
	sales: [],
	history: [],
	accountsStatements: [],
}
