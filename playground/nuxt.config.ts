export default defineNuxtConfig({
  compatibilityDate: '2024-11-05',
  devtools: { enabled: false },

  modules: [
    ['nuxt-gtag', {
      id: process.env.GTAG_ID || 'G-5VWT43SW6J',
      enabled: process.env.NODE_ENV === 'production'
    }],
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],

  site: {
    url: 'https://pgs-axiom.netlify.app',
    name: 'AXIOM',
  },

  sitemap: {
    xslColumns: [
      { label: 'URL', width: '50%' },
      { label: 'Last Modified', select: 'sitemap:lastmod', width: '25%' },
      { label: 'Priority', select: 'sitemap:priority', width: '12.5%' },
      { label: 'Change Frequency', select: 'sitemap:changefreq', width: '12.5%' },
      { label: 'Hreflangs', select: 'count(xhtml:link)', width: '25%' },
    ],
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    mistralApiKey: process.env.NOAH_MISTRAL_KEY,
    geminiApiKey: process.env.NOAH_GEMINI_KEY,
    
    public: {
      pgsBaseAPI: process.env.PGS_API_URL,
      pgsSharedFiles: process.env.PGS_SHARED_FILES,
      betaMode: process.env.BETA_MODE === 'true',
      siteIdentifier: process.env.SITE_IDENTIFIER || 'axiom',
    }
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts',
  },

  // ssr: false,

 nitro: {
  preset: 'netlify-edge',
  prerender: {
    crawlLinks: true,
    routes: ['/sitemap.xml', '/robots.txt'],
    ignore: ['/admin']
  }
},

  // build: {
  //   transpile: ['@progestionsoft/axiom']
  // },
  // vite: {
  //   optimizeDeps: {
  //     include: ['@progestionsoft/axiom']
  //   }
  // },

  googleFonts: {
    display: 'swap',
    families: {
      'Playwrite MX Guides': [400],
      'Poppins': [600, 700],
      'Fira+Sans': [100, 200, 300, 400, 500, 600, 700, 800, 900],
    }
  },
  app: {
    head: {
      title: 'AXIOM - Bibliothèque d\'utilitaires moderne pour les développeurs JavaScript/TypeScript',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'author', content: 'Pro Gestion Soft' },
        { name: 'keywords', content: 'Pro Gestion Soft, typescrite, Javascripte, librairie, npm, extension, bibliothèque' },
        { name: 'google-site-verification', content: 'OdKxHpVkBSxk0mj4vD4OTmZPdVi5pWzyCu4QPIMHy9A' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://pgs-axiom.netlify.app' }
      ]
    }
  }
});
