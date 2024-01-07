// https://nuxt.com/docs/api/configuration/nuxt-config

// const PROD = process.env.NODE_ENV === 'production';

const DEV_HOST = process.env.DEV_HOST || '127.0.0.1';
const DEV_PORT = +(process.env.DEV_PORT || '5437');

function useInProduction(obj: object) {
  return process.env.NODE_ENV === 'production' ? obj : {};
}

export default defineNuxtConfig({
  app: {
    baseURL: '/suncase/',
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
  devtools: { enabled: false },
  css: ['normalize.css', 'animate.css', '~/assets/scss/global.scss'],
  telemetry: false,
  modules: ['@pinia/nuxt'],
  devServer: {
    port: DEV_PORT,
    // host: DEV_HOST,
  },
  build: {
    // @ts-ignore
    extractCSS: true,
  },
  routeRules: {
    '/': {
      prerender: true,
      ...useInProduction({
        swr: 3600,
      }),
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/imports.scss";',
        },
      },
    },
  },
  hooks: {
    close: (nuxt) => {
      if (!nuxt.options._prepare) process.exit();
    },
  },
});
