import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Carga las variables según el modo ('development' o 'production')
const mode = process.env.NODE_ENV || 'production';
const env = loadEnv(mode, process.cwd(), '');

// https://astro.build/config
// Configuración 100% estática (SSG: Static Site Generation) para todo el proyecto y páginas
export default defineConfig({
  output: 'static',
  site: env.PUBLIC_SITE_URL || (mode === 'development' ? 'http://localhost:4321' : 'https://yamassi.com'),
  build: {
    format: 'directory',
  },
  server: {
    host: '0.0.0.0',
    port: 4321,
  },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'nanostores',
        '@nanostores/react',
        'lucide-react',
        'framer-motion',
        'clsx',
        'tailwind-merge',
      ],
    },
    server: {
      watch: {
        usePolling: true,
      },
      proxy: {
        '/api/catalogo/externo': {
          target: 'https://apiresbar.yamassi.com',
          changeOrigin: true,
          secure: true,
        },
      },
    },
  },
});