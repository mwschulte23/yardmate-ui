<template>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card elevation="2" class="px-8 pt-8 pb-2">
            <v-card-title class="text-h4 text-center mb-8">
                {{ signUp ? 'Sign Up': 'Welcome Back!' }}
            </v-card-title>
            
            <div v-if="signUp">
                <SignUp />
            </div>
            <div v-else><LogIn /></div>

            
            <v-spacer />
            <v-card-actions class="justify-space-between">
                <v-btn text color="primary" @click="toggleSignUp">
                    {{ signUp ? 'Log In': 'Sign Up' }}
                </v-btn>
                <v-btn text color="primary" @click="resetPassword">Forgot Password?</v-btn> 
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>
  
<script>
import SignUp from './SignUp.vue';
import LogIn from './LogIn.vue';

export default {
    components: {
        SignUp,
        LogIn
    },
  data() {
    return {
      signUp: false,
    };
  },
  methods: {
    toggleSignUp() {
      this.signUp = !this.signUp;
    },
    async handleLogIn() {
        console.log('LOGIN!')
    }
  }
}
</script>