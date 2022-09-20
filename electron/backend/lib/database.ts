import FileSync from 'lowdb/adapters/FileSync'
import { app } from 'electron'
import { join } from 'path'
import * as fs from 'fs'
import low from 'lowdb'

class DB {
	private adapter: any
	private db: any
	private appDataDirPath: string

	constructor() {
		this.appDataDirPath = join(
			app.getPath('appData'),
			'marce-s-project',
			'databases'
		)

		if (!fs.existsSync(this.appDataDirPath)) {
			fs.mkdirSync(this.appDataDirPath, { recursive: true })
		}

		this.adapter = new FileSync(join(this.appDataDirPath, 'db.json'))
		this.db = low(this.adapter)
		this.db
			.defaults({
				salesFolio: 1,
				customers: [],
				sales: [],
				stock: [],
				accountsStatements: [],
			})
			.write()
	}

	get connection() {
		return this.db
	}
}

export default new DB()
