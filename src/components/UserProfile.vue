<template>
    <v-container class="bg-white mx-auto px-12 py-8 w-50 mx-auto">
        <h3 class="pt-4 pb-8">Account</h3>
        <v-text-field
            class="pb-2"
            v-model="full_name"
            variant="underlined"
            label="Name"
            density="compact"
        />
        <v-text-field
            class="pb-2"
            v-model="email"
            type="email"
            variant="underlined"
            density="compact"
            label="Email"
            
        />
        <v-text-field
            class="pb-2"
            v-model="company"
            variant="underlined"
            density="compact"
            label="Company"
            :placeholder="company"
            
        />
        <v-sheet class="d-flex justify-end">
            <v-btn @click="updateProfile" color="brand" variant="outlined">
                Save
            </v-btn>
        </v-sheet>
    </v-container>
</template>

<script>
import { supabase } from '../supabase';

export default {
    name: "UserProfile",
    data() {
        return {
            id: null,
            full_name: '',
            email: '',
            company: '',
        }
    },
    mounted() {
        this.getProfile().then((data) => {
            this.id = data.id
            this.full_name = data.full_name
            this.email = data.email
            this.company = data.company
        })
        console.log(this.userData)
    },
    methods: {
        async getProfile() {
            if (this.$store.state.userId) {
                const { data, error, status } = await supabase
                    .from('profiles')
                    .select()
                    .eq('id', this.$store.state.userId)
                    .single()
                
                return data
                
            } else {
                alert('uh oh')
            }
        }
    }

}
</script>