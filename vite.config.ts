import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: resolve(__dirname, './src/components'),
      hooks: resolve(__dirname, './src/hooks'),
      pages: resolve(__dirname, './src/pages'),
      store: resolve(__dirname, './src/store'),
      styles: resolve(__dirname, './src/styles'),
      types: resolve(__dirname, './src/types'),
    },
    extensions: ['.ts', '.tsx', '.css'],
  },
  server: {
    port: 5005,
  },
});
