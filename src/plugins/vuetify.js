// Styles
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import colors from 'vuetify/lib/util/colors'
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
          light: '#ECECEC',
          dark: '#131212',
          accent1: '#4F5D75',
          accent2: '#D3BB1E',
          lightbrand: '#D2F7D7',
          darkbrand: '#214725',
          
          
        },
      },
    },
  },
})
