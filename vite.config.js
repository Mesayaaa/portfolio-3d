import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // Base public path for GitHub Pages
  base: '/portfolio-3d/',
  
  // Build optimizations
  build: {
    target: 'es2015',
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          vendor: ['three', 'gsap'],
          utils: ['lil-gui'],
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  
  // Development server
  server: {
    host: true,
    port: 3000,
    open: true,
    cors: true,
  },
  
  // Preview server
  preview: {
    port: 4173,
    host: true,
  },
  
  // Asset handling
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.hdr'],
  
  // Plugins and optimizations
  optimizeDeps: {
    include: ['three', 'gsap', 'lil-gui'],
  },
  
  // Define global constants
  define: {
    __DEV__: process.env.NODE_ENV === 'development',
  },
  
  // CSS preprocessing
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/variables.scss";',
      },
    },
  },
  
  // Resolve aliases
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      '@components': resolve(__dirname, './Experience'),
      '@utils': resolve(__dirname, './Experience/Utils'),
      '@world': resolve(__dirname, './Experience/World'),
      '@assets': resolve(__dirname, './public'),
    },
  },
})
