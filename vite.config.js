import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/Aventra/',
  plugins: [vue()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
      '/api': {
        target: 'https://aventra-backend.onrender.com',
        changeOrigin: true,
      },
    },
  })