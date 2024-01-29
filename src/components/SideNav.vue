<template>
    <v-navigation-drawer 
        app 
        class="bg-transparent border-0 pb-12"
        location="left"
        permanent
        v-model="drawer"
    >
        <div class="d-flex flex-column justify-end align-center">
            <v-sheet class="bg-transparent mb-8">
                <h1 class="text-h5 text-black font-weight-bold">Yard <span class="px-2 bg-brand text-light">Mate</span> </h1>
            </v-sheet>

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
                    :class="$route.path == item.to ? 'bg-darkbrand rounded-lg' : '' "
                    :prepend-icon="item.icon"
                >
                    <RouterLink :class="$route.path == item.to ? 'text-decoration-none text-white' : 'text-decoration-none text-black' " :to="item.to">
                        {{ item.title }}
                    </RouterLink>
                </v-list-item>
            </v-list>
        </div>
        
        <template v-slot:append>
            <v-divider class="mb-12"></v-divider>
            <div class="d-flex flex-row justify-center align-center">
                <v-avatar
                    class=""
                    color="black"
                    size="48"
                >
                </v-avatar>
                <div class="text-left px-4">
                    <!-- <h5 class="text-subtitle-1 font-weight-semibold">{{ userName }}</h5>
                    <p class="text-subtitle-2 font-weight-regular">{{ company }}</p> -->
                </div>
            </div>
            <div class="d-flex justify-space-around text-center pt-8">
                <SignOut />
                <v-badge :content="10" color="brand" class="mr-8">
                    <v-icon color="grey-lighten-2">mdi-bell</v-icon>
                </v-badge>
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
        session: Object
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
        console.log(this.activeLink)
    },
    async mounted() {
        // convert to state like done for user id
        // if (this.session) {
        //     const { data, error, status } = await supabase
        //         .from('profiles')
        //         .select('full_name, company')
        //         .eq('id', this.session.user.id)
        //         .single()
            
        //     this.userName = data.full_name
        //     this.company = data.company
        // }
    },
    methods: {
        setActiveLink() {
            this.activeLink = this.$route.name
            console.log(this.activeLink )
        }
    }
}

</script>