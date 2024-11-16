import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'my-teams', // change to 'my-associations' for the other remote
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App'
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.2.0'
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.2.0'
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: '^6.0.0'
        }
      }
    })
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    modulePreload: false,
    outDir: 'dist',
    assetsDir: '',
    rollupOptions: {
      output: {
        format: 'esm',
        entryFileNames: '[name].js'
      }
    }
  },
  server: {
    port: 5001, // change to 5002 for associations
    strictPort: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  preview: {
    port: 5001, // change to 5002 for associations
    strictPort: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
})