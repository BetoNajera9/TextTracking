import { createApp } from 'vue'
import App from './App.vue'
import { plugin, defaultConfig } from '@formkit/vue'
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'
import '@formkit/themes/genesis'

createApp(App)
	.use(mdiVue, {
		icons: mdijs,
	})
	.use(plugin, defaultConfig)
	.mount('#app')
