<template>
    <v-container class="bg-light w-50">
        <v-row cols="12" class="">
            <v-col cols="12">
                <h3>{{ location.customer_name }} <span class="ml-2 text-subtitle-1 font-weight-light">{{ location.status }}</span></h3>
                <p class="text-subtitle-2 font-weight-thin">
                    {{ location.address }}
                </p>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-sheet class="bg-transparent d-flex justify-end align-center">
                    <v-btn @click="closeDelete" variant="text" color="dark" class="text-center">
                        Cancel
                    </v-btn>
                    <v-btn @click="closeDelete" variant="outlined" color="error" class="text-center">
                        Delete Location
                    </v-btn>
                </v-sheet>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <p class="text-center text-dark text-overline font-weight-light pa-2 border-sm">This action is permanent. Be careful deleting locations</p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { supabase } from '../../supabase'

export default {
    name: 'DeleteLocation',
    props: {
        location: Object
    },
    data() {
        return {
        }
    },
    methods: {
        async deleteLocation() {
            const records = {
                customer_name: this.customerName,
                status: this.customerStatus,
                square_feet: this.adjustedSqFeet
            }
            const { data, error } = await supabase
                .from('locations')
                .update(records)
                .eq('id', this.location.id)
            
            if (error) {
                alert('Issue with updating location. Contact abc for def')
                console.error('Error inserting data:', error);
                return null;
            } else {
                console.log('goodie goodie')
                this.closeEdit()
            }
        },
        closeDelete() {
            this.$emit('deleteClicked', false)
        },
    }
}
</script>
