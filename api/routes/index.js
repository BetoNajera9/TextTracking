import express from 'express'
import customer from '../services/customers'
import sale from '../services/sales'
import stock from '../services/stock'
import accontStatements from '../services/accontStatements'

const router = new express.Router()

// Custommer enpoints
router.post('/customer', customer.createCustomer)
router.get('/customers', customer.getAllCustomers)
router.get('/customer', customer.getCustomer)
router.put('/customer/:id', customer.updateCustomer)
router.delete('/customer/:id', customer.deleteCustomer)

// Sales enpoints
router.post('/sale', sale.createSale)
router.get('/sales', sale.getAllSales)
router.get('/sale', sale.getSale)
router.put('/sale/:id', sale.updateSale)
router.delete('/sale/:id', sale.deleteSale)

// Stock enpoints
router.post('/stock', stock.createStock)
router.get('/stocks', stock.getAllStocks)
router.get('/stock', stock.getStock)
router.put('/stock/:id', stock.updateStock)
router.delete('/stock/:id', stock.deleteStock)

// Account statements enpoints
router.post('/accountStatement', accontStatements.createAccountStatement)
router.get('/accountStatements', accontStatements.getAllAccountStatements)
router.get('/accountStatement', accontStatements.getAccountStatement)
router.put('/accountStatement/:id', accontStatements.updateAccountStatement)
router.delete('/accountStatement/:id', accontStatements.deleteAccountStatement)
router.post(
	'/accountStatement/addMovement/:id',
	accontStatements.addSalesToAccount
)

export default router
