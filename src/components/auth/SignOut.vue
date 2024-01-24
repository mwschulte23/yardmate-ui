<template>
    <v-btn @click="signOut" variant="outlined" color="grey-darken-2" class="text-caption">Sign Out</v-btn>
</template>

<script>
import { supabase } from '../../supabase'

export default {
    name: 'SignOut',
    data() {
        return {
            loading: false
        }
    },
    methods: {
        async signOut() {
            try {
                this.loading = true
                const { error } = await supabase.auth.signOut()
                if (error) throw error
                this.$router.push('/login')
            } catch {
                alert(error.message)
            } finally {
                this.loading = false
            }
        }
    }
}
</script>