import DB from '../lib/database'

export default class AccountStatements {
	constructor() {
		const db = new DB()
		this.db = db.connection
		this.collection = 'accountStatements'
	}

	getAllAccountStatements() {
		return this.db.get(this.collection).value()
	}

	getAccountStatement(data) {
		return this.db.get(this.collection).find(data).value()
	}

	createAccountStatement(data) {
		this.db.get(this.collection).push(data).write()
		return data
	}

	updateAccountStatement(findData, newData) {
		this.db.get(this.collection).find(findData).assign(newData).write()
		return newData
	}

	deleteAccountStatement(data) {
		this.db.get(this.collection).remove(data).write()
		return data
	}
}
