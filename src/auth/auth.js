import { supabase } from "../supabase"

export default {
    user: { authenticated: false },
    async checkAuth() {
        const { data, error} = await supabase.auth.getSession()
        
        if (!error && data.session) {
            this.user.authenticated = true
            console.log('User is authenticated')
        } else {
            console.log('User is not authenticated')
            this.user.authenticated = false
        }

        return this.user.authenticated
    }
}