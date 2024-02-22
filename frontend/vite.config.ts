import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.VITE_CLIENT_PORT ? parseInt(process.env.VITE_CLIENT_PORT, 10) : 0,
  },
})
