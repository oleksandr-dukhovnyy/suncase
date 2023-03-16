import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
// import viteJoinMediaQueries from 'vite-join-media-queries';

import packageJSON from './package.json';

const getConfig = (IS_DEV) => {
  return {
    plugins: [vue() /*viteJoinMediaQueries({})*/],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '~': path.resolve(__dirname, 'src/assets'),
      },
    },

    // for GH-Pages deploy
    base: IS_DEV ? '/' : `/${packageJSON.name}/`,

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
