<template>
    <v-app-bar app flat id="header-nav" class="bg-white border-sm px-4">
        <!-- <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon> -->      
        <v-app-bar-title class="text-h5 text-black font-weight-bold">
            Yard <span id="logo-background" class="text-light">Mate</span>
        </v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn>
            <v-badge :content="2" size="small" color="brand" class="mr-2">
                <v-icon size="x-large" color="grey-lighten-1">mdi-bell</v-icon>
            </v-badge>
        </v-btn>
        <v-btn>
            <v-badge :content="1" size="small" color="accent1" class="mr-2">
                <v-icon size="x-large" color="grey-lighten-1">mdi-bullhorn</v-icon>
            </v-badge>
        </v-btn>
        <SignOut />
    </v-app-bar>

    <v-navigation-drawer 
        app 
        class="bg-white py-4 px-6 w-auto"
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
                    v-for="(item, i) in items"
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
        
        <template v-slot:append>
            <v-divider class="mb-8"></v-divider>
            <div class="profile-div d-flex flex-row justify-start align-center mb-6" @click="profileGoesHere">
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
    
</template>

<script>
import { RouterLink } from 'vue-router'
import { supabase } from '../supabase'
import SignOut from './auth/SignOut.vue'

export default {
    name: 'SideNav',
    components: {
        RouterLink,
        SignOut
    },
    props: {
        // session: Object
    },
    data: () => ({
        drawer: true,
        userName: 'Unknown',
        company: 'Unknown',
        items: [
            {title: 'Dashboard', to: '/', icon: 'mdi-home'},
            {title: 'Measure', to: '/measure', icon: 'mdi-ruler'},
            {title: 'Order', to: '/order', icon: 'mdi-clipboard'},
            {title: 'Acquire', to: '/acquire', icon: 'mdi-account'},
        ]
    }),
    created() {
        this.setActiveLink()
    },
    async mounted() {
        // convert to state like done for user id
        if (this.$store.state.userId) {
            const { data, error, status } = await supabase
                .from('profiles')
                .select('full_name, company')
                .eq('user_id', this.$store.state.userId)
                .single()
            
            this.userName = data.full_name
            this.company = data.company
        }
    },
    methods: {
        setActiveLink() {
            this.activeLink = this.$route.name
            console.log(this.activeLink )
        },
        profileGoesHere() {
            console.log('eventually add profile view / router')
        }
    }
}
</script>

<style>
.profile-div {
    cursor: pointer;
}
</style>