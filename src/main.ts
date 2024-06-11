import { createProPlugin, inputs } from '@formkit/pro'
import { plugin, defaultConfig } from '@formkit/vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import * as Mdijs from '@mdi/js'
import MdiVue from 'mdi-vue/v3'

import Router from './router'
import App from './App.vue'

import '@formkit/themes/genesis'
import './style.css'

const Pinia = createPinia()

const pro = createProPlugin(import.meta.env.VITE_FORMKIT_KEY, inputs)

createApp(App)
  .use(
    plugin,
    defaultConfig({
      plugins: [pro],
    })
  )
  .use(Pinia)
  .use(Router)
  .use(MdiVue, {
    icons: Mdijs,
  })
  .mount('#app')
  .$nextTick(() => { })
