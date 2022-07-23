export interface Stock {
	id: string
	ISBN?: string
	description: string
	in: number
	out: number
	stock: number
	number?: number
	unitPrice: number
	amount?: number
}
