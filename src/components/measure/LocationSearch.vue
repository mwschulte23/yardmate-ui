<!-- 
    TODOs:
        on accept suggestion "tab" or "enter" - focus on submit magnify icon
        test, make more intuitive

 -->
<template>
    <v-text-field
        ref="addressSearch"
        v-model="address"
        append-inner-icon="mdi-magnify"
        variant="outlined"
        density="compact"
        :color="isFocused == 'address' ? 'accent1' : 'dark' "
        @focus="isFocused = 'address'"
        @blur="isFocused != 'address'"
        @keydown.enter="acceptSuggestion"
        @keydown.tab="acceptSuggestion"
        @input="fetchAutocompleteSuggestions"
        @click:append-inner="sendUpCoordinates"
        :hint="hint"
        autofocus
        single-line
    >
        <!-- <span class="autofill" v-if="suggestion">{{ hint }}</span> -->
    </v-text-field>
    
    
    <!-- <span>{{ address }}</span> -->
    
</template>

<script>
import { addressAutoComplete } from '../../services/apiService'

export default {
    name: "LocationSearch",
    props: {

    },
    emits: ['coordinates'],
    data() {
        return {
            address: '',
            hint: '',
            isFocused: '',
            coordinates: null,
            suggestions: [],
            suggestion: '',
        }
    },
    mounted() {

    },
    methods: {
        sendUpCoordinates() {
            if (this.coordinates) {
                // this.$emit('coordinates', this.coordinates)
                this.$store.commit('setCoordinates', this.coordinates);
                this.$store.dispatch('updateAddress', this.address)
                console.log(this.$store.state.address)
            } else {
                this.hint = 'Location not found. Try again.'
            }
            this.resetSearch()
        },
        async fetchAutocompleteSuggestions() {
            if (this.address.length < 4) {
                this.suggestions = [];
                return;
            } else {
                this.suggestions = await addressAutoComplete(this.address)
                this.updateSuggestion(this.suggestions[0])

            }  
        },
        updateSuggestion(suggestion) {
            if (suggestion) {
                const suggested_address = suggestion.properties.formatted
                const suggestion_match = suggested_address.slice(0, this.address.length)

                if (suggestion_match.toLowerCase() == this.address.toLowerCase()) {
                    this.hint = suggested_address
                    this.coordinates = {
                        lat: suggestion.properties.lat,
                        lon: suggestion.properties.lon,
                        address: suggestion.properties.formatted
                    }
                }
            }
        },
        acceptSuggestion() {
            if (this.hint && this.hint != 'Location not found. Try again.') {
                this.address = this.hint;
            }
        },
        resetSearch() {
            this.address = ''
            this.suggestions = []
            this.suggestion = ''
            this.coordinates = null
            this.hint = '',
            this.$nextTick(() => {
                this.$refs.addressSearch.focus();
            });
        }
    }
}
</script>

<style>

.autofill {
  position: absolute;
  left: 0;
  top: 0;
  margin-left: 1%;
  padding: 8px;
  color: grey;
  pointer-events: none; /* Make it unclickable */
}
</style>