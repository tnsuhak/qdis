import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'node:path';

export default defineConfig({
  root: resolve(__dirname, 'netlify'),
  publicDir: resolve(__dirname, 'public'),
  plugins: [react()],
  resolve: {alias: {'@': resolve(__dirname)}},
  build: {
    outDir: resolve(__dirname, 'dist-netlify'),
    emptyOutDir: true,
  },
});
