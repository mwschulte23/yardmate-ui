<template>
    <v-form @submit.prevent="supaSignUp">
        <v-text-field type="email" label="Email" required v-model="email"></v-text-field>
        <v-text-field type="text" label="Name" required v-model="name"></v-text-field>
        <v-text-field type="text" label="Company" required v-model="company"></v-text-field>
        <v-text-field type="password" label="Password" required v-model="password"></v-text-field>
        <v-card-actions class="justify-center mb-4">
            <v-btn type="submit" class="bg-brand px-8" size="large">Submit</v-btn>
        </v-card-actions>
    </v-form>

    <!-- MEASURE NOTIFS -->
    <v-snackbar
        v-model="signUpError.isError"
        :timeout="2500"
        elevation="24"
        color="white"
        multi-line
        >
        <p class="text-error font-weight-bold">{{ signUpError.errorMsg }}</p>

        <template v-slot:actions>
            <v-btn
                color="dark"
                variant="text"
                @click="console.log('hooray')"
            >
                Close
            </v-btn>
        </template>
    </v-snackbar>
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
      password: '',
      signUpError: {isError: false, errorMsg: ''}
    };
  },
  methods: {
    async supaSignUp() {
        try {
            this.loading = true

            const { data, error } = await supabase.auth.signUp({
                email: this.email,
                password: this.password,
                options: {
                    data: {
                        full_name: this.name,
                        company: this.company,
                        email: this.email
                    }
                }
            })
            if (error && error.message.includes('already')) {
                this.signUpError.errorMsg = 'Email already exists. Please go to log in page to continue.'
                this.signUpError.isError = true
            } else if (error) {
                this.signUpError.errorMsg = error.message + '. Please contact support team at blah@blah.blah'
                this.signUpError.isError = true
            } else {
                this.$router.push('/')
            }
        } catch (error) {
            if (error instanceof Error) {
                this.signUpError.errorMsg = 'Unknown error signing up. Please contact support team at blah@blah.blah'
                this.signUpError.isError = true
                throw error
            }
        } finally {
            console.log('finally')
            this.loading = false
        }
    },
  }
}
</script>