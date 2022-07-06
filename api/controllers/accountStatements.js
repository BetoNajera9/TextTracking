import { v4 } from 'uuid'
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

	addSalesToAccount(findData, data) {
		const { movements, total } = this.db
			.get(this.collection)
			.find(findData)
			.value()

		if (!data.id) data.id = v4()
		const newtotal = total + data.total
		movements.push(data)

		this.db
			.get(this.collection)
			.find(findData)
			.assign({ movements, total: newtotal })
			.write()

		return data
	}
}
