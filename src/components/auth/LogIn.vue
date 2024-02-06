<template>
    <v-form @submit.prevent="handleLogIn">
        <v-text-field label="Email" required v-model="email"></v-text-field>
        <v-text-field label="Password" type="password" required v-model="password"></v-text-field>
        <v-card-actions class="justify-center mb-4">
                <v-btn type="submit" class="bg-brand px-8" size="large">Submit</v-btn>
        </v-card-actions>
    </v-form>
</template>



<script>
import { supabase } from '../../supabase'

export default {
    name: 'LogIn',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async handleLogIn() {
            try {
                this.loading = true
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: this.email,
                    password: this.password,
                })
                if (error) throw error

                if (data) this.$router.push('/')
            } catch (error) {
                if (error instanceof Error) {
                    alert(error.message)
                }
            } finally {
                this.loading = false
            }
        },
    }
}
</script>