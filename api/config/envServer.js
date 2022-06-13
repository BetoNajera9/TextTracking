import 'dotenv/config'

export const api = {
	name: process.env.APP_NAME || '',
	server: process.env.SERVER_URL || '',
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || '3000',
	cors: process.env.CORS || '',
}
