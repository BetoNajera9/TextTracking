export interface Movement {
	id: string
	movement: 'CHARGE' | 'PAYMENT'
	description: string
	number: number
	unitPrice: number
	discount: number
	amount: number
	total: number
	date: Date
}
