import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: resolve(__dirname, './src/components'),
      pages: resolve(__dirname, './src/pages'),
      store: resolve(__dirname, './src/store'),
    },
    extensions: ['.ts', '.tsx', '.css'],
  },
  server: {
    port: 5005,
  },
});
