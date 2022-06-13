import express from 'express'
import cors from 'cors'

import { api } from './config/envServer'
import routes from './routes/index'

const app = express()

// Middlewares
if (api.env !== 'production') {
	const morgan = require('morgan')
	app.use(morgan('dev'))
}
app.use(cors('*'))
app.use(express.json())

// Routes
app.get('/', (req, res, next) => {
	res.redirect('/api')
})
app.use('/api', routes)

app.listen(api.port, (err) => {
	if (err) console.error(err)
	console.log(`=> Server on http://localhost:${api.port}`)
})

export default app
