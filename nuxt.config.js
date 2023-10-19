import colors from 'vuetify/es5/util/colors'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - self-care',
    title: 'self-care',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // Iconfonts for Vuetify. You need to leave only which one you use
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/4.4.95/css/materialdesignicons.min.css' }
    ],

    script: [
      {
        src: 'https://developers.kakao.com/sdk/js/kakao.js',
      },
      { src: 'https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js' },
      { src: 'http://code.jquery.com/jquery-1.11.3.min.js' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/TiptapVuetify', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // 'axios'
  ],

  // server: {
  //   port: 3000,
  //   proxy: {
  //     "/oauth2.0": {
  //       target: 'https://nid.naver.com/',
  //       changeOrigin: true,
  //       logLevel: 'debug',
  //       pathRewrite: {
  //         "^/oauth2.0": "",
  //       },
  //     },
  //     "/v1": {
  //       target: 'https://openapi.naver.com/',
  //       changeOrigin: true,
  //       logLevel: 'debug'
  //     },
  //   },
  // },
  server: {
    // port: 3000,
    // host: '192.168.0.14'
  },
  proxy: {
    '/oauth2.0': 'https://nid.naver.com/',
    '/v1': 'https://openapi.naver.com/'
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    "@nuxtjs/vuetify"
  ],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: '/',
    baseURL: process.env.BASE_URL
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vuetify/lib', "tiptap-vuetify"]
  },
  //generate by directory
  generate: {
    dir: './public'
  },
}
