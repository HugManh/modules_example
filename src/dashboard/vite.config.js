import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // if you remove this all files will be inside `dist` instead of `dist/assets`
    assetsDir: '.',
  },
  base: './',
});
