// Styles
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'


export default createVuetify({
  components,
  directives,
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      options: {
        customProperties: true,
      },
      light: {
        dark: false,
        colors: {
          brand: '#30B03E',
          light: '#F7F7F7',
          dark: '#131212',
          accent1: '#4F5D75',
          accent2: '#D3BB1E',
          lightbrand: '#DEE7DF',
          darkbrand: '#214725',          
        },
      },
      typography: {
        fontFamily: 'Roboto, sans-serif', // Add your font followed by fallbacks
      },
    },
  },
})
