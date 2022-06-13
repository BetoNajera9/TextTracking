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

// Sales enpoints
router.post('/sale', sale.createSale)
router.get('/sales', sale.getAllSales)
router.get('/sale', sale.getSale)
router.put('/sale/:id', sale.updateSale)

// Stock enpoints
router.post('/stock', stock.createStock)
router.get('/stocks', stock.getAllStocks)
router.get('/stock', stock.getStock)
router.put('/stock/:id', stock.updateStock)

// Account statements enpoints
router.post('/accountStatement', accontStatements.createAccountStatement)
router.get('/accountStatements', accontStatements.getAllAccountStatements)
router.get('/accountStatement', accontStatements.getAccountStatement)
router.put('/accountStatement/:id', accontStatements.updateAccountStatement)

export default router
