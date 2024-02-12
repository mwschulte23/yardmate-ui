<template>
    <v-autocomplete
        placeholder="Enter Address"
        append-inner-icon="mdi-magnify"
        density="comfortable"
        variant="outlined"
        menu-icon=""
        
        :color="isFocused == 'address' ? 'accent1' : 'dark' "
        @focus="isFocused = 'address'"
        @blur="isFocused != 'address'"
        :items="suggestedAddresses"
        v-model="address"
        @update:search="fetchAutocompleteSuggestions"
        
        @keydown.enter.prevent="acceptSuggestion"
        @keydown.tab.prevent="acceptSuggestion"
        @click:append-inner="acceptSuggestion" 
        hide-no-data
        auto-select-first
        autofocus
      ></v-autocomplete>


</template>

<script>
import { addressAutoComplete } from '../../services/apiService'

export default {
    name: 'LocationSearch',
    data() {
        return {
            address: '',
            isFocused: '',
            coordinates: null,
            suggestions: [],
            suggestion: '',
        }
    },
    computed: {
        suggestedAddresses() {
            return this.suggestions.map(suggestion => suggestion.properties.formatted)
        }
    },    
    methods: {
        async fetchAutocompleteSuggestions(address) {
            if (address.length < 1) {
                this.suggestions = [];
                return;
            } else {
                const newSuggestions = await addressAutoComplete(address)
                
                if (newSuggestions && newSuggestions[0]) {
                    // console.log(newSuggestions[0].properties.formatted)
                    this.address = address;
                    this.updateSuggestion(newSuggestions[0])
                    this.suggestions = newSuggestions
                }
            }  
        },
        updateSuggestion(suggestion) {
            const propertyDetails = suggestion.properties
            if (propertyDetails && propertyDetails.formatted && propertyDetails.lat && propertyDetails.lon ) {
                this.coordinates = {
                    lat: suggestion.properties.lat,
                    lon: suggestion.properties.lon,
                    address: suggestion.properties.formatted
                } 
            }
        },
        acceptSuggestion() {
            if (this.coordinates) {
                this.sendUpCoordinates()
                this.resetSearch()
            }
        },
        sendUpCoordinates() {
            if (this.coordinates) {
                const trimmedAddress = this.address.replace(', United States of America', '')
                this.$store.commit('SET_COORDINATES', this.coordinates);
                this.$store.dispatch('updateAddress', trimmedAddress)
            } else {
                this.hint = 'Location not found. Try again.'
            }
            
        },
        resetSearch() {
            this.address = ''
            this.suggestions = []
            this.suggestion = ''
            this.coordinates = null
        },
    }
}
</script>