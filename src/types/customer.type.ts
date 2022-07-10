export interface Customer {
	id: string
	name: string
	phone: string
	RFC?: string
	wayToPay: 'EFECTIVO' | 'TARJETA CREDITO/DEBITO'
	CFDI?: string
}
