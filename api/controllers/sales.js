import DB from '../lib/database'

export default class Sales {
	constructor() {
		const db = new DB()
		this.db = db.connection
		this.collection = 'sales'
	}

	getAllSales() {
		return this.db.get(this.collection).value()
	}

	getSale(data) {
		return this.db.get(this.collection).find(data).value()
	}

	createSale(data) {
		this.db.get(this.collection).push(data).write()
		return data
	}

	updateSale(findData, newData) {
		this.db.get(this.collection).find(findData).assign(newData).write()
		return newData
	}
}
