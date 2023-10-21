import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import viteJoinMediaQueries from 'vite-join-media-queries';

import packageJSON from './package.json';

export default defineConfig(({ mode }) => {
  const IS_DEV = mode === 'development';

  return {
    plugins: [
      vue(),
      viteJoinMediaQueries({
        paths2css: ['./dist/assets'],
      }),
    ],
    resolve: {
      alias: {
        // eslint-disable-next-line no-undef
        '@': path.resolve(__dirname, 'src'),
        // eslint-disable-next-line no-undef
        '~': path.resolve(__dirname, 'src/assets'),
      },
    },

    // for GH-Pages deploy
    base: IS_DEV ? '/' : `/${packageJSON.name}/`,

    // global scss mixins & vars
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "src/assets/scss/app.scss";',
        },
      },
    },
  };
});
