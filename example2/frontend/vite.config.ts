import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  server: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '^/api/.*': {
        target: 'http://example2-backend:8080',
        ws: true
      }
    },
  }
})
