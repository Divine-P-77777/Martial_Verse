import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@constants': path.resolve(__dirname, 'src/constants'),
    },
  },
  server: {
    proxy: {
      // Proxy only /blog/:id requests to backend for OG rendering
      '^/blog/.*': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path, 
      },
    },
  },
})
