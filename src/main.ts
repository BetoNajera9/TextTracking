import { createApp } from 'vue'
import App from './App.vue'
import { plugin, defaultConfig } from '@formkit/vue'
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'
import '@formkit/themes/genesis'
import router from './router'
import { store } from './store'
import './service/api/customer'
import './service/api/sales'
import './service/api/stock'
import './service/api/accountsStatements'

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
