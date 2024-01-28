<template>
    <v-card class="pt-8 px-12 mx-16 mb-0 h-full">
        <v-form>
            <v-row cols="12">
                <v-col>
                    <p>{{ $store.state.coordinates }} </p>
                    <v-sheet class="d-flex justify-space-between mb-4 bg-transparent">
                        <v-sheet>
                            <h3 class="text-h6 font-weight-light">
                                Location
                            </h3>
                            <p class="text-subtitle-1 pb-4 font-weight-light">{{ shortenedAddress }}</p>
                        </v-sheet>
                        <v-sheet>
                            <h3 class="text-h6 font-weight-light text-right">
                                Measured Area
                            </h3>
                            <p class="text-subtitle-1 pb-4 font-weight-light text-right">{{ formattedArea }} Sq Feet</p>
                        </v-sheet>
                    </v-sheet>
                    <v-text-field
                        v-model="customerName"
                        label="Customer"
                        variant="outlined"
                        density="comfortable"
                        class="bg-white mb-4"
                        :color="isFocused == 'customer' ? 'darkbrand' : 'dark' "
                        @focus="isFocused = 'customer'"
                        @blur="isFocused != 'customer'"
                        required
                        clearable
                        autofocus
                    />
                    <v-select 
                        v-model="customerStatus"
                        :items="statuses"    
                        label="Customer Status"
                        variant="outlined"
                        density="comfortable"
                        class="bg-white"
                        :color="isFocused == 'status' ? 'darkbrand' : 'dark' "
                        @focus="isFocused = 'status'"
                        @blur="isFocused != 'status'"
                        required
                        hide-details
                    />
                    <v-sheet class="d-flex justify-end align-center my-8">
                        <v-btn variant="outlined" color="accent1" class="mr-4 px-4" @click="closeForm">Close</v-btn>
                        <v-btn color="brand" class="px-4" @click="submitMeasureForm">Submit</v-btn>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-form>
        <!-- <v-snackbar
            v-model="snackbar"
            multi-line
            >
            Location Submitted <br>
            Square Feet: {{ area }}

            <template v-slot:actions>
                <v-btn
                color="red"
                variant="text"
                @click="confirmSnack = false"
                >
                Close
                </v-btn>
            </template>
        </v-snackbar> -->
    </v-card>
</template>

<script>
import { supabase } from '../../supabase'

export default {
    name: 'SubmitLocation',
    props: {
        area: Number
    },
    data() {
        return {
            customerName: '',
            customerStatus: '',
            statuses: ['Customer', 'Prospect', 'Churned'],
            isFocused: '',
            confirmSnack: false
        }
    },
    computed: {
        shortenedAddress() {
            return this.$store.state.address.replace(', United States of America', '')
        },
        formattedArea() {
            return Math.round(this.area * 100) / 100
        }
    },
    methods: {
        async submitMeasureForm() {
            // emit lat, lon
            // write to db
            
            const { error } = await supabase
                .from('locations')
                .insert([
                    {
                        user_id: this.$store.state.userId,
                        customer_name: this.customerName,
                        status: this.customerStatus,
                        address: this.$store.state.address,
                        lat: this.$store.state.coordinates.lat,
                        lon: this.$store.state.coordinates.lon,
                        square_feet: this.area
                    }
                ]);
                this.closeForm()
                this.confirmSnack = true // emit this to parent for snackbar submission

                alert('Less invasive version of this in future...but location saved :)')

                // toast for confirmation
            if (error) {
                console.error('Error inserting data:', error);
                return null;
            }

            return 'Data inserted successfully';
        },
        closeForm() {
            this.$emit('openForm', false)
        },
    }
};

</script>