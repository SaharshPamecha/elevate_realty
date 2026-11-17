import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';

// Helper function to create path aliases
const createAlias = (path) => ({
  find: `@/${path}`,
  replacement: fileURLToPath(new URL(`./src/${path}`, import.meta.url))
});

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  
  return {
    root: '.',
    publicDir: 'public',
    
    // Development server configuration
    server: {
      port: 3000,
      open: true,
      host: true,
      fs: {
        // Allow serving files from one level up from the package root
        allow: ['..']
      }
    },
    
    // Build configuration
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      sourcemap: !isProduction,
      minify: isProduction ? 'esbuild' : false,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
        output: {
          manualChunks: {
            // Split vendor code into separate chunks
            vendor: ['react', 'react-dom', 'react-router-dom'],
          }
        }
      },
      target: 'esnext',
      modulePreload: { polyfill: false },
      cssCodeSplit: true,
      reportCompressedSize: false
    },
    
    // Resolve configuration
    resolve: {
      alias: [
        {
          find: '@',
          replacement: fileURLToPath(new URL('./src', import.meta.url))
        },
        createAlias('components'),
        createAlias('assets'),
        createAlias('styles'),
        createAlias('utils')
      ]
    },
    
    // CSS configuration
    css: {
      devSourcemap: !isProduction,
      postcss: './postcss.config.js'
    },
    
    // Global variable definitions
    define: {
      'import.meta.env.PROD': JSON.stringify(isProduction),
      'import.meta.env.DEV': JSON.stringify(!isProduction),
      'import.meta.env.MODE': JSON.stringify(mode)
    },
    
    // Log level
    logLevel: isProduction ? 'warn' : 'info',
    
    // Clear screen
    clearScreen: true
  };
});
