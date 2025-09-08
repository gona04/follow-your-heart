import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable module preloading for faster subsequent requests
    modulePreload: true,
    // Target modern browsers for smaller bundles but avoid bleeding edge features
    target: ['es2020', 'chrome85', 'safari14', 'firefox90'],
    // Disable source maps in production for smaller files
    sourcemap: false,
    // Enable chunk splitting for better caching
    rollupOptions: {
      output: {
        // Add timestamp for cache busting
        chunkFileNames: 'assets/[name]-[hash]-' + Date.now() + '.js',
        entryFileNames: 'assets/[name]-[hash]-' + Date.now() + '.js',
        assetFileNames: 'assets/[name]-[hash]-' + Date.now() + '.[ext]',
        // Simple, safe chunking that preserves React dependencies
        manualChunks: {
          // Keep React + React-DOM together (critical for hooks like useSyncExternalStore)
          'react-vendor': ['react', 'react-dom'],
          // Separate router
          'router-vendor': ['react-router-dom'],
          // Separate Redux
          'redux-vendor': ['react-redux', '@reduxjs/toolkit']
        }
      }
    },
    // Reduce chunk size limit warnings
    chunkSizeWarningLimit: 500,
    // Enable minification with terser for better compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
        // Safe optimizations that won't break functionality
        unused: true,
        reduce_vars: true
      },
      mangle: {
        safari10: true
      }
    }
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'react-redux', '@reduxjs/toolkit']
  }
})
