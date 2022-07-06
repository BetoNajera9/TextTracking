import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import fs from 'fs'

export default class DB {
	constructor() {
		if (!fs.existsSync('./db')) {
			fs.mkdirSync('./db')
		}

		this.adapter = new FileSync('db/db.json')
		this.db = low(this.adapter)
		this.db
			.defaults({
				customers: [],
				sales: [],
				stock: [],
				accountStatements: [],
			})
			.write()
	}

	get connection() {
		return this.db
	}
}
