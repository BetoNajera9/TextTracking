import { v4 } from 'uuid'
import Customers from '../controllers/customers'

const customers = new Customers()

const createCustomer = async (req, res) => {
	try {
		const newCustomer = {
			id: v4(),
			...req.body,
		}

		const data = customers.createCustomer(newCustomer)

		res.json({ succes: true, data })
	} catch (error) {
		console.log(error)
		res.status(500).send(error)
	}
}

const getAllCustomers = async (req, res) => {
	try {
		const data = customers.getAllCustomers()

		res.json({ succes: true, data })
	} catch (error) {
		console.log(error)
		res.status(500).send(error)
	}
}

const getCustomer = async (req, res) => {
	try {
		const customerData = req.body
		const data = customers.getCustomer(customerData)

		res.json({ succes: true, data })
	} catch (error) {
		console.log(error)
		res.status(500).send(error)
	}
}

const updateCustomer = async (req, res) => {
	try {
		const findData = { id: req.params.id }
		const customerData = req.body

		const data = customers.updateCustomer(findData, customerData)

		res.json({ succes: true, data })
	} catch (error) {
		console.log(error)
		res.status(500).send(error)
	}
}

export default {
	createCustomer,
	getAllCustomers,
	getCustomer,
	updateCustomer,
}

// import { getConnection } from '../lib/database'

// export const getTasks = (req, res) => {
// 	const tasks = getConnection().data.tasks
// 	res.json(tasks)
// }

// export const getTask = (req, res) => {
// 	const taskFound = getConnection().data.tasks.find(
// 		(t) => t.id === req.params.id
// 	)
// 	if (!taskFound) res.sendStatus(404)
// 	res.json(taskFound)
// }

// export const updateTask = async (req, res) => {
// 	const { name, description } = req.body

// 	try {
// 		const db = getConnection()
// 		const taskFound = db.data.tasks.find((t) => t.id === req.params.id)
// 		if (!taskFound) return res.sendStatus(404)

// 		taskFound.name = name
// 		taskFound.description = description

// 		db.data.tasks.map((t) => (t.id === req.params.id ? taskFound : t))

// 		await db.write()

// 		res.json(taskFound)
// 	} catch (error) {
// 		return res.status(500).send(error.message)
// 	}
// }

// export const deleteTask = async (req, res) => {
// 	const db = getConnection()
// 	const taskFound = db.data.tasks.find((t) => t.id === req.params.id)
// 	if (!taskFound) res.sendStatus(404)

// 	const newTasks = db.data.tasks.filter((t) => t.id !== req.params.id)
// 	db.data.tasks = newTasks
// 	await db.write()

// 	return res.json(taskFound)
// }

// export const count = async (req, res) => {
// 	const totalTasks = getConnection().data.tasks.length
// 	res.json(totalTasks)
// }
