export interface Movement {
	id: string
	movement: 'CHARGE' | 'PAYMENT'
	subtotal: number
	discount: number
	total: number
	date: Date
}
