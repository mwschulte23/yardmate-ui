<template>
    <v-app-bar app flat id="header-nav" class="bg-grey-lighten-5 border-sm px-4">
        <!-- <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon> -->      
        <v-app-bar-title class="text-h5 text-black font-weight-bold" @click="$router.push('/')">
            Yard <span id="logo-background" class="text-light">Mate</span>
        </v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn class="text-center">
            <v-badge :content="1" size="small" color="darkbrand">
                <v-icon size="x-large" color="grey-lighten-1">mdi-bell</v-icon>
            </v-badge>
        </v-btn>
        <v-btn>
            <v-badge :content="0" size="small" color="accent2">
                <v-icon size="x-large" color="grey-lighten-1">mdi-bullhorn</v-icon>
            </v-badge>
        </v-btn>
        <SignOut />
    </v-app-bar>

    <v-navigation-drawer 
        app 
        class="bg-grey-lighten-5 py-4 px-6 w-auto"
        location="left"
        permanent
        v-model="drawer"
    >
        <div class="d-flex flex-column justify-end align-start">
            <v-list
                nav 
                class="text-center"
                
            >
                <v-list-item
                    class="pr-4 my-4 text-start text-subtitle-2 font-weight-semibold"
                    v-for="(item, i) in filteredItems"
                    :key="i"
                    :to="item.to"
                    :value="item.to"
                    :class="$route.path == item.to ? 'bg-accent1 rounded-lg' : '' "
                    :prepend-icon="item.icon"
                >
                    <RouterLink :class="$route.path == item.to ? 'text-decoration-none text-white' : 'text-decoration-none text-black' " :to="item.to">
                        {{ item.title }}
                    </RouterLink>
                </v-list-item>
            </v-list>
        </div>
        
        <!-- sidenav footer -->
        <template v-slot:append>
            <v-divider class="mb-8"></v-divider>
            <div class="profile-div d-flex flex-row justify-start align-center mb-6" @click="openProfile = true">
                <v-avatar
                    class=""
                    color="accent1"
                    size="40"
                >
                </v-avatar>
                <div class="text-left px-4">
                    <h5 class="text-subtitle-1 font-weight-semibold">{{ userName }}</h5>
                    <p class="text-subtitle-2 font-weight-regular">{{ company }}</p>
                </div>
            </div>
        </template>
    </v-navigation-drawer>

    <v-dialog
        v-model="openProfile"
        fullscreen
    >
        <UserProfile />
        <v-btn @click="openProfile = false" color="dark" variant="text" class="absolute-top-right mt-4 mr-2">
            <v-icon class="text-h4">mdi-close</v-icon>
        </v-btn>
    </v-dialog>    
</template>

<script>
import { RouterLink } from 'vue-router'
import { supabase } from '../supabase'
import SignOut from './auth/SignOut.vue'
import UserProfile from './profile/UserProfile.vue'

export default {
    name: 'SideNav',
    components: {
        RouterLink,
        SignOut,
        UserProfile
    },
    props: {
        session: Object
    },
    data: () => ({
        drawer: true,
        userName: 'Unknown',
        company: 'Unknown',
        items: [
            {title: 'Dashboard', to: '/', icon: 'mdi-home', enabled: true},
            {title: 'Measure', to: '/measure', icon: 'mdi-ruler', enabled: true},
            {title: 'Order', to: '/order', icon: 'mdi-clipboard', enabled: true},
            {title: 'Acquire', to: '/acquire', icon: 'mdi-account', enabled: false},
        ],
        openProfile: false
    }),
    computed: {
        filteredItems() {
            return this.items.filter(item => item.enabled)
        }
    },
    created() {
        this.setActiveLink()
    },
    mounted() {
        this.getUserInfo().then((data) => {
            this.userName = data.full_name
            this.company = data.company.name
            this.$store.dispatch('setCompanyId', data.company.id)
        })
    },
    methods: {
        async getUserInfo() {
            const { data, error } = await supabase
                .from('user')
                .select(`full_name, company ( id, name )`)
                .eq('id', this.session.user.id)
                .single()
            if (error) {
                throw error;
            }
            return data
        },
        setActiveLink() {
            this.activeLink = this.$route.name
        },
    }
}
</script>

<style>
.profile-div {
    cursor: pointer;
}

.absolute-top-right {
  position: absolute;
  top: 0; /* Adjust as needed */
  right: 0; /* Adjust as needed */
  z-index: 5; /* Ensure it's above other content */
}
</style>