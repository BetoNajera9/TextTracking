import { v4 } from 'uuid'
import Sales from '../controllers/sales'

const sales = new Sales()

const createSale = async (req, res) => {
	try {
		const newSale = {
			id: v4(),
			...req.body,
		}

		const data = sales.createSale(newSale)

		res.json({ succes: true, data })
	} catch (error) {
		console.log(error)
		res.status(500).send(error)
	}
}

const getAllSales = async (req, res) => {
	try {
		const data = sales.getAllSales()

		res.json({ succes: true, data })
	} catch (error) {
		console.log(error)
		res.status(500).send(error)
	}
}

const getSale = async (req, res) => {
	try {
		const saleData = req.body
		const data = sales.getSale(saleData)

		res.json({ succes: true, data })
	} catch (error) {
		console.log(error)
		res.status(500).send(error)
	}
}

const updateSale = async (req, res) => {
	try {
		const findData = { id: req.params.id }
		const saleData = req.body

		const data = sales.updateSale(findData, saleData)

		res.json({ succes: true, data })
	} catch (error) {
		console.log(error)
		res.status(500).send(error)
	}
}

const deleteSale = async (req, res) => {
	try {
		const deleteData = { id: req.params.id }

		const data = sales.deleteSale(deleteData)

		res.json({ succes: true, data })
	} catch (error) {
		console.log(error)
		res.status(500).send(error)
	}
}

export default {
	createSale,
	getAllSales,
	getSale,
	updateSale,
	deleteSale,
}
