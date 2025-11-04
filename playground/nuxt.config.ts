export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],

  css: ['~/assets/css/main.css'],
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts',
  },

  ssr: false,

  build: {
    transpile: ['@progestionsoft/axiom']
  },
  vite: {
    optimizeDeps: {
      include: ['@progestionsoft/axiom']
    }
  }
});
