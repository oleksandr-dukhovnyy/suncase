// https://nuxt.com/docs/api/configuration/nuxt-config

const PROD = process.env.NODE_ENV === 'production';

export default defineNuxtConfig({
  app: {
    baseURL: PROD ? '/suncase/' : '/',
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
    port: 5437,
    host: 'local.suncase.com',
  },
  build: {
    // @ts-ignore
    extractCSS: true,
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
});
