import { createApp } from 'vue'
import App from './App.vue'
import { plugin, defaultConfig } from '@formkit/vue'
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'
import '@formkit/themes/genesis'
import router from './router'

createApp(App).use(router)
	.use(mdiVue, {
		icons: mdijs,
	})
	.use(plugin, defaultConfig)
	.mount('#app')
