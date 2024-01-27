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
          brand: '#51CC5F',
          light: '#ECECEC',
          dark: '#131212',
          accent1: '#05668D',
          accent2: '#D3BB1E',
          lightbrand: '#caefcf',
          darkbrand: '#304532',
          
          
        },
      },
    },
  },
})
