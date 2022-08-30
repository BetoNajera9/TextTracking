import { createRouter, createWebHistory } from 'vue-router'
import AccountStatesContent from '../views/AccountStatesContent.vue'
import CustomerContent from '../views/CustomerContent.vue'
import HistoryContent from '../views/HistoryContent.vue'
import SalesContent from '../views/SalesContent.vue'
import StockContent from '../views/StockContent.vue'
import DebitBalance from '../views/DebitBalance.vue'
import Home from '../views/Home.vue'


const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
	},
	{
		path: '/customer',
		name: 'customer',
		component: CustomerContent,
	},
	{
		path: '/sales',
		name: 'sales',
		component: SalesContent,
	},
	{
		path: '/stock',
		name: 'stock',
		component: StockContent,
	},
	{
		path: '/history',
		name: 'history',
		component: HistoryContent,
	},
	{
		path: '/account-states',
		name: 'account-states',
		component: AccountStatesContent,
	},
	{
		path: '/debit-balance',
		name: 'debit-balance',
		component: DebitBalance,
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
