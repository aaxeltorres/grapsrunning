import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/", // siempre desde raíz para Vercel
  plugins: [react()],
});
