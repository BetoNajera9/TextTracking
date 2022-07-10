import { createApp } from 'vue'
import { plugin, defaultConfig } from '@formkit/vue'

import * as mdijs from '@mdi/js'
import '@formkit/themes/genesis'
import mdiVue from 'mdi-vue/v3'
import { store } from './store'
import router from './router'
import App from './App.vue'

import './service/api/accountsStatements'
import './service/api/customer'
import './service/app/dialog'
import './service/api/sales'
import './service/api/stock'

createApp(App)
	.use(store)
	.use(router)
	.use(mdiVue, {
		icons: mdijs,
	})
	.use(plugin, defaultConfig)
	.mount('#app')
	.$nextTick(() => {
		postMessage({ payload: 'removeLoading' }, '*')
	})
