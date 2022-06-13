import DB from '../lib/database'

export default class Customer {
	constructor() {
		const db = new DB()
		this.db = db.connection
		this.collection = 'customers'
	}

	getAllCustomers() {
		return this.db.get(this.collection).value()
	}

	getCustomer(data) {
		return this.db.get(this.collection).find(data).value()
	}

	createCustomer(data) {
		this.db.get(this.collection).push(data).write()
		return data
	}

	updateCustomer(findData, newData) {
		this.db.get(this.collection).find(findData).assign(newData).write()
		return newData
	}
}
