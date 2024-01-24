<template>
    <v-form class="elevation-2" @submit.prevent="sendUpCoordinates">
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
import { addressAutoComplete, submitImage, dataURLtoBlob } from '../../services/apiService'

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
    methods: {
        submitMeasureForm() {
            console.log('form submitted...eventually')
        },
        sendUpCoordinates() {
            if (this.coordinates) {
                this.$emit('coordinates', this.coordinates)
            } else {
                console.log("bad")
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
