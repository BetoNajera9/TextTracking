import { Movement } from './movements.type'

export interface AccountStatement {
	id: string
	name: string
	phone: string
	RFC?: string
	total: string
	movements: Movement[]
}
