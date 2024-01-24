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
          darkbrand: '#304532',
          accent: '#F18F01',
          dark: '#131212',
          light: '#ECECEC'
        },
      },
    },
  },
})
