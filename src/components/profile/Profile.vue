<template>
    <v-row cols="12" class="pt-12 pb-6 px-6">
        <v-col cols="12" md="6">
            <p class="text-subtitle-1 mb-4">Info</p>
            <p class="mb-4">Name: {{ $store.state.userName }}</p>
            <p>Email: {{ $store.state.userEmail }}</p>
        </v-col>
    </v-row>
</template>


<script>
import { supabase } from '../../supabase'

export default {
    name: 'Profile',
    data() {
        return {

        }
    },
    mounted() {

    },
    methods: {

    }
}
</script>