import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/Aventra/',
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://aventra-backend.onrender.com',
        changeOrigin: true,
        secure: false, // Set to false if using self-signed certs (optional)
        rewrite: (path) => path.replace(/^\/api/, ''), // Removes /api prefix before forwarding
      },
    },
  },
})

