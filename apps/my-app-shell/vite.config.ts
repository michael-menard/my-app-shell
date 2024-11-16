import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'my-app-shell',
      remotes: {
        'my-teams': 'http://localhost:5001/remoteEntry.js',
        'my-associations': 'http://localhost:5002/remoteEntry.js'
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
    rollupOptions: {
      output: {
        format: 'esm',
        entryFileNames: '[name].js'
      }
    }
  },
  server: {
    port: 5000,
    strictPort: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
})