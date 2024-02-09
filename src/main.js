import { createApp } from 'vue'
import App from './App.vue'
import { loadFonts } from './plugins/webfontloader'
import router from './router'
import store from  './store'

// plugins
import vuetify from './plugins/vuetify'
import posthogPlugin from "./plugins/posthog";

loadFonts()

createApp(App)
  .use(vuetify)
  .use(posthogPlugin)
  .use(router)
  .use(store)
  .mount('#app')
