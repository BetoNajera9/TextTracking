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
		const { data } = await response.json()
		return data
	}

	async setStock(data) {
		const response = await fetch('/api/stock', {
			...this.requestOptions,
			body: JSON.stringify(data),
			method: 'POST',
		})
		const res = await response.json()
		return res.data
	}

	async updateStock(id, data) {
		const response = await fetch(`/api/stock/${id}`, {
			...this.requestOptions,
			body: JSON.stringify(data),
			method: 'PUT',
		})
		const res = await response.json()
		return res.data
	}

	async deleteStock(id) {
		const response = await fetch(`/api/stock/${id}`, {
			...this.requestOptions,
			method: 'DELETE',
		})
		const res = await response.json()
		return res.data
	}

	async getSales() {
		const response = await fetch('/api/sales', this.getConfig)
		const res = await response.json()
		return res.data
	}

	async setSale(data) {
		const response = await fetch('/api/sale', {
			...this.requestOptions,
			body: JSON.stringify(data),
			method: 'POST',
		})
		const res = await response.json()
		return res.data
	}

	async updateSale(id, data) {
		const response = await fetch(`/api/sale/${id}`, {
			...this.requestOptions,
			body: JSON.stringify(data),
			method: 'PUT',
		})
		const res = await response.json()
		return res.data
	}

	async getAccountStatements() {
		const response = await fetch('/api/accountStatements', this.getConfig)
		const { data } = await response.json()
		return data
	}

	async setAccountStatements(data) {
		const response = await fetch('/api/accountStatement', {
			...this.requestOptions,
			body: JSON.stringify(data),
			method: 'POST',
		})
		const res = await response.json()
		return res.data
	}

	async updateAccountStatements(id, data) {
		const response = await fetch(`/api/accountStatement/${id}`, {
			...this.requestOptions,
			body: JSON.stringify(data),
			method: 'PUT',
		})
		const res = await response.json()
		return res.data
	}

	async addMovementToAccount(id, data) {
		const response = await fetch(`/api/accountStatement/addMovement/${id}`, {
			...this.requestOptions,
			body: JSON.stringify(data),
			method: 'POST',
		})
		const res = await response.json()
		return res.data
	}
}
