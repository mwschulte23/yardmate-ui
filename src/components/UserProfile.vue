<template>
    <v-card>
        <v-card-title>
            <v-icon>mdi-info</v-icon> Profile Here
        </v-card-title>
    </v-card>
</template>

<script>
import { onMounted } from 'vue';
import { supabase } from '../supabase';

export default {
    name: "UserProfile",
    data() {
        return {

        }
    },
    mounted() {

    },
    methods: {
        async getProfile() {
            if (this.$store.state.userId) {
                const { data, error, status } = await supabase
                    .from('profiles')
                    .select('full_name, company')
                    .eq('user_id', this.$store.state.userId)
                    .single()
                
                this.userName = data.full_name
                this.company = data.company
            }
        }
    }

}
</script>