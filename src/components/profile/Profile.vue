<template>
    <v-row cols="12" class="pt-12 pb-6 px-6">
        <v-col cols="12" md="6">
            <p class="text-subtitle-1 mb-4">Info</p>
            <p class="mb-4">Name: {{ $store.state.userName }}</p>
            <p>Email: {{ $store.state.userEmail }}</p>
        </v-col>
        <!-- <v-col cols="12" md="6">
            <p class="text-subtitle-1 mb-4">Update</p>
            <v-form @submit.prevent>
                <v-text-field
                    class="mx-2"
                    v-model="full_name"
                    variant="underlined"
                    label="Name"
                    density="compact"
                />
                <v-text-field
                    class="mx-2"
                    v-model="email"
                    type="email"
                    variant="underlined"
                    density="compact"
                    label="Email"
                    
                />
                <v-btn type="submit" color="brand" variant="tonal">
                    Save
                </v-btn>
            </v-form>
        </v-col> -->
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