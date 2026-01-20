// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content','@nuxt/ui','@nuxt/image'],
  css: ['~/assets/css/main.css'],
  image: {
    format: ['webp'],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  app: {
    head: {
      link: [
        //{ rel: 'preload', href: '~/assets/RockSalt-Regular.ttf', as: 'font', type: 'font/ttf', crossorigin: '' },
        //{ rel: 'preload', href: '~/assets/PatrickHand-Regular.ttf', as: 'font', type: 'font/ttf', crossorigin: '' }
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})
