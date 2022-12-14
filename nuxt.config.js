import * as path from 'path'
import * as FontAwesome from './assets/icon/fontawesome'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'safty-frontend-test',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  env: {
    request: {
      prefixUrl: '',
      timeout: 50000, // 5 sec
    },
    framework: {
      name: 'smart-safty',
      useMockup: true, // Mockup 기능 사용 여부
      onlyUseMockup: true, // 배포 이후에도 Mockup 기능 사용 여부
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [ ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vue-select',
    '@/plugins/const',
    '@/plugins/mock',
    '@/plugins/vue-js-modal.js',
    { src: '@/plugins/tui-editor.js', ssr: false },
    { src: '@/plugins/dialog.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    '@nuxtjs/fontawesome',
    'nuxt-windicss',
  ],

  // scss 전역으로 적용
  styleResources: {
    scss: ['@/assets/scss/mixin.scss', '@/assets/scss/variable.scss'],
  },

  // Fontawesome 적용
  fontawesome: {
      component: 'Fa',
      icons: {
        solid: FontAwesome.solid,
      },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/toast'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: '/',
    proxy: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isClient }) {
      config.resolve.alias.jstree = path.join(__dirname, '/static/js/jstree')
      if (isClient) {
        config.devtool = 'source-map'
      }
      config.externals = {
        moment: 'moment',
      }
    },
  },

  toast: {
    position: 'top-center',
    duration: 3000,
  },

  // proxy url information
  proxy: {
    '/safty/api': {
     target: 'http://localhost:9090',
     changeOrigin: true,
    },
    // '/safty/api': {
    //   target: 'http://Backend_Server_Addr:PORT',
    //   changeOrigin: true,
    // }
  }

}
