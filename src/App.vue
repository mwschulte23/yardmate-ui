<template>
  <v-app>
    <SideNav class="pt-16" v-if="session" :session="session" />
    <v-main class="bg-grey-lighten-4 pt-16">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { supabase } from './supabase';
import SideNav from './components/SideNav.vue'

export default {
  name: 'App',

  components: {
    SideNav
  },

  data() {
    return {
      session: null
    }
  },
  mounted() {
    supabase.auth.getSession().then(({ data }) => {
      this.session = data.session
      this.$store.commit('SET_USER_ID', data.session.user.id)
    })
    supabase.auth.onAuthStateChange((_, _session) => {
      this.session = _session
    })
  },
}
</script>
