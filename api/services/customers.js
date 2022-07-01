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

const deleteCustomer = async (req, res) => {
	try {
		const deleteData = { id: req.params.id }

		const data = customers.deleteCustomer(deleteData)

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
	deleteCustomer,
}
