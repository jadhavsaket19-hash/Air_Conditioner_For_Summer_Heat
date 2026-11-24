import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// IMPORTANT: Set 'base' to your GitHub repository name for GitHub Pages deployment
// e.g., if your repo is https://github.com/yourusername/smart-cooling-jacket
// then base should be '/smart-cooling-jacket/'
export default defineConfig({
  plugins: [react()],
  base: '/smart-cooling-jacket/',
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'charts': ['recharts'],
          'icons': ['lucide-react'],
        },
      },
    },
  },
})
