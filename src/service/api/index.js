export default class {
	constructor() {
		this.getConfig = {
			method: 'GET',
			redirect: 'follow',
		}

		const myHeaders = new Headers()
		myHeaders.append('Content-Type', 'application/json')

		this.requestOptions = {
			headers: myHeaders,
			redirect: 'follow',
		}
	}

	async getCustomers() {
		const response = await fetch('/api/customers', this.getConfig)
		const { data } = await response.json()
		return data
	}

	async setCustomer(data) {
		const response = await fetch('/api/customer', {
			...this.requestOptions,
			body: JSON.stringify(data),
			method: 'POST',
		})
		const res = await response.json()
		return res.data
	}

	async updateCustomer(id, data) {
		const response = await fetch(`/api/customer/${id}`, {
			...this.requestOptions,
			body: JSON.stringify(data),
			method: 'PUT',
		})
		const res = await response.json()
		return res.data
	}

	async deleteCustomer(id) {
		const response = await fetch(`/api/customer/${id}`, {
			...this.requestOptions,
			method: 'DELETE',
		})
		const res = await response.json()
		return res.data
	}

	async getStock() {
		const response = await fetch('/api/stocks', this.getConfig)
		const data = await response.json()
		return data
	}

	async getAccountStatements() {
		const response = await fetch('/api/accountStatements', this.getConfig)
		const data = await response.json()
		return data
	}

	async addCustomers(customer) {
		const raw = JSON.stringify(customer)
		this.getConfig.body = raw

		await fetch('localhost:3000/api/customer', this.getConfig)
	}

	async addSale(customer) {
		const raw = JSON.stringify(customer)
		this.getConfig.body = raw

		await fetch('localhost:3000/api/customer', this.getConfig)
	}
}
