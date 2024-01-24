import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
// import { VueGoogleMap } from 'vue3-google-map'
import router from './router'
import store from  './store'

loadFonts()

createApp(App)
  .use(vuetify)
  .use(router)
  .use(store)
  // .use(VueGoogleMap, { load: { key: 'AIzaSyBPxNGoRRUrWt7ueItE8cWHrNhkTfnXBHM' }})
  .mount('#app')
