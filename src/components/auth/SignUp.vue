<template>
    <v-form @submit.prevent="handleSignUp">
        <v-text-field label="Email" required v-model="email"></v-text-field>
        <v-text-field label="Name" required v-model="name"></v-text-field>
        <v-text-field label="Company" required v-model="company"></v-text-field>
        <v-text-field label="Password" type="password" required v-model="password"></v-text-field>
        <v-card-actions class="justify-center mb-4">
                <v-btn type="submit" class="bg-primary text-blue-lighten-5 px-8" size="large">Submit</v-btn>
        </v-card-actions>
    </v-form>
</template>

<script>
import { supabase } from '../../supabase'

export default {
  data() {
    return {
      loading: false,
      email: '',
      name: '',
      company: '',
      password: ''
    };
  },
  methods: {
    async handleSignUp() {
        try {
            console.log('starting signup')
            this.loading = true
            const { data, error } = await supabase.auth.signUp({
                email: this.email,
                password: this.password,
                options: {
                    emailRedirectTo: 'google.com',
                    data: {
                        full_name: this.name,
                        company: this.company,
                        email: this.email
                    }
                }
            })
            if (error) throw error

            if (!error) this.$router.push('/')
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