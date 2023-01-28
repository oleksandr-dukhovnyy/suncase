import { fileURLToPath, URL } from 'node:url';
import path from 'path';

import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import vue2 from '@vitejs/plugin-vue2';

import packageJSON from './package.json';

const production = process.env.NODE_ENV;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname, 'src/assets'),
    },
  },

  // for GH-Pages deploy
  base: production ? `/${packageJSON.name}/` : './',

  // global scss mixins & vars
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/assets/scss/app.scss";`,
      },
    },
  },
});
