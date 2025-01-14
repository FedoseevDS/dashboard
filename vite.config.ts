import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      pages: resolve(__dirname, './src/pages'),
    },
  },
  server: {
    port: 5005,
  },
});
