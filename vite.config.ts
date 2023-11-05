import basicSsl from '@vitejs/plugin-basic-ssl';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// @ts-ignore
import path from 'path';
import viteJoinMediaQueries from 'vite-join-media-queries';

// @ts-ignore
import packageJSON from './package.json';

export default defineConfig(({ mode }) => {
  const IS_DEV = mode === 'development';

  return {
    plugins: [
      vue(),
      viteJoinMediaQueries({
        paths2css: ['./dist/assets'],
      }),
      basicSsl(),
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
    // base: '/',

    preview: {
      port: 8080,
      host: 'local.suncase.com',
      https: true,
    },

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
