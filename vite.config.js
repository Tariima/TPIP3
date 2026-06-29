import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true, // expone el dev server en la red local (para entrar desde el celu por la ip)
    proxy: {
      // todo lo que vaya a /api lo reenvio al backend; asi el front no necesita saber su ip
      '/api': 'http://localhost:3001',
    },
  },
})
