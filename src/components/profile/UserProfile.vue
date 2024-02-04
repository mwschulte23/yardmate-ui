<template>
    <div class="bg-light h-100 w-100">
        <div class="d-flex flex-row h-100">
            <v-tabs v-model="profileTabs" direction="vertical" bg-color="light" slider-color="brand" class="pt-12 px-8 border-sm">
                <v-tab value="profile" class="mt-4">Profile</v-tab>
                <v-tab value="account" class="mt-4">Account</v-tab> <!-- utilization + tier / billing -->
                <v-tab value="users" class="mt-4">Users</v-tab>
            </v-tabs>
            <div class="ma-12 w-100 h-100">
                <v-window v-model="profileTabs">
                    <v-slide-y-transition mode="out-in" hide-on-leave>
                        <v-window-item value="profile" class="ma-8">
                                <p class="text-h4 text-grey-darken-2 pb-8">Profile</p>
                                <Profile />
                        </v-window-item>
                    </v-slide-y-transition>
                </v-window>
                
                <v-window v-model="profileTabs">
                    <v-slide-y-transition mode="out-in" hide-on-leave>
                        <v-window-item value="account">
                            <v-container class="h-100">
                                <p class="text-h4 text-grey-darken-2 pb-8">Account</p>
                                <Account />
                            </v-container>
                        </v-window-item>
                    </v-slide-y-transition>
                </v-window>
                <v-window v-model="profileTabs">
                    <v-slide-y-transition mode="out-in" hide-on-leave>
                        <v-window-item value="users">
                            <v-container class="h-100">
                                <p class="text-h4 text-grey-darken-2 pb-8">Users</p>
                                <Profile />
                            </v-container>
                        </v-window-item>
                    </v-slide-y-transition>
                </v-window>
            </div>
        </div>
    </div>
</template>

<script>
import { supabase } from '../../supabase';
import Profile from './Profile.vue';
import Account from './Account.vue';

export default {
    name: "UserProfile",
    components: {
        Profile,
        Account,
    },
    data() {
        return {
            id: null,
            full_name: '',
            email: '',
            company: '',
            profileTabs: 'profile'
        }
    },
    mounted() {
        this.getProfile().then((data) => {
            this.id = data.id
            this.full_name = data.full_name
            this.email = data.email
            this.company = data.company.name
        })
        console.log(this.userData)
    },
    methods: {
        async getProfile() {
            if (this.$store.state.userId) {
                const { data, error, status } = await supabase
                    .from('user')
                    .select('*, company (name)')
                    .eq('id', this.$store.state.userId)
                    .single()
                
                if (error) {
                    console.log(error.message)
                    console.log(status)
                } else {
                    return data
                }

            } else {
                alert('uh oh')
            }
        }
    }

}
</script>