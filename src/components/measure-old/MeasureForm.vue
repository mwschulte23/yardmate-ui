<template>
    <v-form class="elevation-2" @submit.prevent="submitMeasureForm">
        <v-container>
            <v-row class="my-4">
                <v-col>
                    <v-text-field
                        v-model="customerName"
                        label="Customer"
                        variant="outlined"
                        class="bg-white"
                        :color="isFocused == 'customer' ? 'darkbrand' : 'dark' "
                        @focus="isFocused = 'customer'"
                        @blur="isFocused != 'customer'"
                        autofocus
                        required
                        hide-details
                    />
                </v-col>
                <v-col>
                    <v-select 
                        v-model="customerStatus"
                        :items="statuses"    
                        label="Customer Status"     
                        variant="outlined"
                        class="bg-white"
                        :color="isFocused == 'status' ? 'darkbrand' : 'dark' "
                        @focus="isFocused = 'status'"
                        @blur="isFocused != 'status'"
                        required
                        hide-details
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    
                    <v-text-field
                        v-model="address"
                        prepend-inner-icon="mdi-magnify"
                        variant="outlined"
                        label="Enter Address"
                        class="bg-white"
                        :color="isFocused == 'address' ? 'darkbrand' : 'dark' "
                        @focus="isFocused = 'address'"
                        @blur="isFocused != 'address'"
                        @input="fetchAutocompleteSuggestions"
                        single-line
                        hide-details
                        required
                    />

                    <v-list v-if="suggestions.length > 0" class="elevation-4">
                        <v-list-item
                            class="d-flex justify-start"
                            v-for="(suggestion, index) in suggestions"
                            :key="index"
                        >
                            <v-icon>mdi-map-marker</v-icon>
                            <v-list-item-title @click="selectSuggestion(suggestion)">{{ suggestion.properties.formatted }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="d-flex bg-transparent justify-end">
                    <v-btn 
                        type="submit" 
                        class="bg-green-darken-2 px-8 my-4" 
                        size="large"
                    >
                        Start Measuring
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>
  
<script>
import { supabase } from '../../supabase'
import { addressAutoComplete } from '../../services/apiService'

export default {
    name: "MeasureForm",
    components: {
        
    },
    data() {
        return {
            customerName: '',
            customerStatus: '',
            address: '',
            statuses: ['Customer', 'Prospect', 'Churned'],
            isFocused: '',
            suggestions: [],
            coordinates: null

        }
    },
    mounted() {
    },
    methods: {
        async submitMeasureForm() {
            // emit lat, lon
            this.sendUpCoordinates()
            // write to db
            console.log(this.$store.state.userId)
            const { error } = await supabase
                .from('locations')
                .insert([
                    {
                        user_id: this.$store.state.userId,
                        customer_name: this.customerName,
                        status: this.customerStatus,
                        address: this.address,
                        lat: this.coordinates.lat,
                        lon: this.coordinates.lon,
                    }
                ]);
            if (error) {
                console.error('Error inserting data:', error);
                return null;
            }

            return 'Data inserted successfully';
        },
        sendUpCoordinates() {
            if (this.coordinates) {
                this.$emit('coordinates', this.coordinates)
            } else {
                alert('Error, Error')
                // console.log("bad")
            }
        },
        async fetchAutocompleteSuggestions() {
            if (this.address.length < 4) {
                this.suggestions = [];
                return;
            } else {
                this.suggestions = await addressAutoComplete(this.address)
            }  
        },
        selectSuggestion(suggestion) {
            this.address = suggestion.properties.formatted;
            this.suggestions = [];
            this.coordinates = {
                lat: suggestion.properties.lat,
                lon: suggestion.properties.lon
            }
        },
    }
}

</script>
