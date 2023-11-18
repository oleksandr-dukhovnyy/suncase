// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['normalize.css', '~/assets/scss/global.scss'],
  telemetry: false,
  ssr: false,
  modules: ['@pinia/nuxt'],
  devServer: {
    port: 5437,
    host: 'local.suncase.com',
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/scss/imports.scss";',
        },
      },
    },
  },
});
