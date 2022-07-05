import { v4 } from 'uuid'
import AccountStatements from '../controllers/accountStatements'

const accountStatements = new AccountStatements()

const createAccountStatement = async (req, res) => {
	try {
		const newAccountStatement = {
			id: v4(),
			...req.body,
		}

		const data = accountStatements.createAccountStatement(newAccountStatement)

		res.json({ succes: true, data })
	} catch (error) {
		console.log(error)
		res.status(500).send(error)
	}
}

const getAllAccountStatements = async (req, res) => {
	try {
		const data = accountStatements.getAllAccountStatements()

		res.json({ succes: true, data })
	} catch (error) {
		console.log(error)
		res.status(500).send(error)
	}
}

const getAccountStatement = async (req, res) => {
	try {
		const accountStatementData = req.body
		const data = accountStatements.getAccountStatement(accountStatementData)

		res.json({ succes: true, data })
	} catch (error) {
		console.log(error)
		res.status(500).send(error)
	}
}

const updateAccountStatement = async (req, res) => {
	try {
		const findData = { id: req.params.id }
		const accountStatementData = req.body

		const data = accountStatements.updateAccountStatement(
			findData,
			accountStatementData
		)

		res.json({ succes: true, data })
	} catch (error) {
		console.log(error)
		res.status(500).send(error)
	}
}

const deleteAccountStatement = async (req, res) => {
	try {
		const deleteData = { id: req.params.id }

		const data = accountStatements.deleteAccountStatement(deleteData)

		res.json({ succes: true, data })
	} catch (error) {
		console.log(error)
		res.status(500).send(error)
	}
}

export default {
	createAccountStatement,
	getAllAccountStatements,
	getAccountStatement,
	updateAccountStatement,
	deleteAccountStatement,
}
