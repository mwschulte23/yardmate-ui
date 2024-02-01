<template>
    <v-app>
        <SideNav />
        <v-main id="main" class="bg-light">
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

<style>
#main {
  margin-top: 2%;
}

#logo-background {
  position: relative;
  display: inline-block;
  padding: 0% 2% 0% 0%;
}

#logo-background::after {
  content: '';
  position: absolute;
  top: 0;
  left: -1px; /* Adjust according to skew */
  right: 0px; /* Adjust according to skew */
  bottom: 0;
  z-index: -1;
  background-color: #30B03E; /* Background color */
  transform: skew(-15deg); /* Adjust skew angle */
  transform-origin: top left;
}
</style>
