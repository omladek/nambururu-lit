import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import stylelint from 'vite-plugin-stylelint'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
  base: '/nambururu-lit/',
  build: {
    target: 'esnext',
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
    }),
    stylelint(),
    eslint(),
  ],
})
