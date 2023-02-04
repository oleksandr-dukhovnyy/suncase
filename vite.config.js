// import { fileURLToPath, URL } from 'node:url';
import path from 'path';

import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import vue2 from '@vitejs/plugin-vue2';

import packageJSON from './package.json';

// import 'animate.css';

// https://vitejs.dev/config/
const getConfig = (IS_DEV) => {
  return {
    plugins: [
      vue2(),
      legacy({
        targets: IS_DEV ? [] : ['ie >= 11'],
        additionalLegacyPolyfills: IS_DEV
          ? []
          : ['regenerator-runtime/runtime'],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '~': path.resolve(__dirname, 'src/assets'),
      },
    },

    // for GH-Pages deploy
    base: IS_DEV ? './' : `/${packageJSON.name}/`,

    // global scss mixins & vars
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "src/assets/scss/app.scss";`,
        },
      },
    },
  };
};

export default defineConfig(({ mode }) => getConfig(mode === 'development'));
