import { supabase } from "../supabase"

const user = { authenticated: false }

export default {
    async checkAuth() {
        const { data, error} = await supabase.auth.getSession()
        
        if (!error && data.session) {
            user.authenticated = true
            console.log('User is authenticated')
        } else {
            console.log('User is not authenticated')
            user.authenticated = false
        }

        return user.authenticated
    }
}
