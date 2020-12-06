export default {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Portfolio Aurore Grondin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Je suis Aurore, designer graphique spécialisée en création d&#130;interfaces et identité visuelle. Découvrez mon portfolio.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  env: {
    apiUrl: process.env.API_URI || 'http://localhost:4000/api'
  },

  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost'
  },

  // router: {
  //   middleware: ['isMobile']
  // },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/directives.js',
    { src: '~/plugins/notifications.js', ssr: false },
    '~/plugins/modal.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],

  styleResources: {
    scss: [
      '@/assets/scss/mixins/*.scss'
    ]
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/svg-sprite'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
