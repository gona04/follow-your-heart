import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable module preloading for faster subsequent requests
    modulePreload: true,
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Disable source maps in production for smaller files
    sourcemap: false,
    // Enable chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'redux-vendor': ['react-redux', '@reduxjs/toolkit']
        }
      }
    },
    // Reduce chunk size limit warnings
    chunkSizeWarningLimit: 600,
    // Enable minification with terser for better compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true
      }
    }
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'react-redux', '@reduxjs/toolkit']
  }
})
