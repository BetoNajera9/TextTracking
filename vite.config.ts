import electron from 'vite-plugin-electron/simple'
import tsconfigPaths from 'vite-tsconfig-paths'
import vue from '@vitejs/plugin-vue'

import { defineConfig } from 'vite'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tsconfigPaths(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: 'electron/main.ts',
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      // Ployfill the Electron and Node.js API for Renderer process.
      // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer:
        process.env.NODE_ENV === 'test'
          ? // https://github.com/electron-vite/vite-plugin-electron-renderer/issues/78#issuecomment-2053600808
          undefined
          : {},
    }),
  ],
  resolve: {
    alias: {
      '@pending-payment': path.resolve(
        __dirname,
        'src/modules/pending-payment'
      ),
      '@account-statement': path.resolve(
        __dirname,
        './src/modules/account-statement'
      ),
      '@customer': path.resolve(__dirname, './src/modules/customer'),
      '@history': path.resolve(__dirname, './src/modules/history'),
      '@returns': path.resolve(__dirname, './src/modules/returns'),
      '@storage': path.resolve(__dirname, './src/modules/storage'),
      '@common': path.resolve(__dirname, './src/modules/common'),
      '@sales': path.resolve(__dirname, './src/modules/sales'),
      '@home': path.resolve(__dirname, './src/modules/home'),
      '@': path.resolve(__dirname, './src'),
      '~api': path.resolve(__dirname, './electron/api'),
      '~lib': path.resolve(__dirname, './electron/lib'),
      '~': path.resolve(__dirname, './electron'),
    },
  },
  optimizeDeps: {
    exclude: ['electron'],
  },
  build: {
    rollupOptions: {
      external: ['lowdb/adapters/FileSync'],
    },
  },
})
