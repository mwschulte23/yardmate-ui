<template>
    <v-navigation-drawer 
        app 
        class="bg-light px-2 pt-16 pb-12"
        location="left"
        permanent
        v-model="drawer"
    >
        <div class="d-flex flex-column justify-end align-center">
            <v-sheet class="bg-transparent mb-4">
                <h1 class="text-black font-weight-bold">Yard <span class="px-2 bg-brand text-light">Mate</span> </h1>
            </v-sheet>
            <v-list nav color="accent" class="text-center text-subtitle-2">
                <RouterLink class="text-decoration-none text-black" to="/">
                    <v-list-item class="pr-8 my-2" prepend-icon="mdi-home" title="Dashboard" value="dashboard"></v-list-item>
                </RouterLink>
                <RouterLink class="text-decoration-none text-black" to="/measure">
                    <v-list-item class="pr-8 my-2" prepend-icon="mdi-ruler" title="Measure" value="measure"></v-list-item>
                </RouterLink>
                <RouterLink class="text-decoration-none text-black" to="/">
                    <v-list-item class="pr-8 my-2" prepend-icon="mdi-account" title="Acquire" value="acquire"></v-list-item>
                </RouterLink>
                <RouterLink class="text-decoration-none text-black" to="/">
                    <v-list-item class="pr-8 my-2" prepend-icon="mdi-clipboard" title="Order" value="order"></v-list-item>
                </RouterLink>
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
                    <h5 class="text-subtitle-1 font-weight-semibold">{{ userName }}</h5>
                    <p class="text-subtitle-2 font-weight-regular">{{ company }}</p>
                </div>
            </div>
            <div class="text-center pt-8">
                <SignOut />
            </div>
        </template>
    </v-navigation-drawer>
    
    </template>
    
    <script>
    import { RouterLink } from 'vue-router'
    import { supabase } from '../supabase'
    import SignOut from './auth/SignOut.vue'

    export default {
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
            company: 'Unknown'
        }),
        async mounted() {
            if (this.session) {
                const { data, error, status } = await supabase
                    .from('profiles')
                    .select('full_name, company')
                    .eq('id', this.session.user.id)
                    .single()
                
                this.userName = data.full_name
                this.company = data.company
            }
        }
    }
    
    </script>