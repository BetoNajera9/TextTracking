import { createRouter, createWebHistory } from 'vue-router'

import AccountStates from '@account-statement/account-statement.view.vue'
import PendingPayments from '@pending-payment/pending-payment.view.vue'
import Customer from '@customer/customer.view.vue'
import Storage from '@storage/storage.view.vue'
import History from '@history/history.view.vue'
import Returns from '@returns/returns.view.vue'
import Sales from '@sales/sales.view.vue'
import Home from '@home/home.view.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/customer',
    name: 'customer',
    component: Customer,
  },
  {
    path: '/sales',
    name: 'sales',
    component: Sales,
  },
  {
    path: '/storage',
    name: 'storage',
    component: Storage,
  },
  {
    path: '/history',
    name: 'history',
    component: History,
  },
  {
    path: '/account-states',
    name: 'account-states',
    component: AccountStates,
  },
  {
    path: '/pending-payments',
    name: 'pending-payments',
    component: PendingPayments,
  },
  {
    path: '/returns',
    name: 'returns',
    component: Returns,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.url),
  routes,
})

export default router
