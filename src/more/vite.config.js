/* Configuración principal para la pagina principal */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/', 
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
});
