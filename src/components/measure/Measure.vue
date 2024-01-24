<template>
    <v-container class="h-screen my-12">
        <v-row class="h-auto">
            <v-col>
                <h1 class="text-h5 font-weight-bold text-dark">
                    Measure
                </h1>
            </v-col>
        </v-row>
        <v-row class="h-auto">
            <v-col class="d-flex flex-column justify-center">
                <MeasureForm @coordinates="handleCoordinates" />
                <!-- <v-text-field
                    v-model="search"
                    prepend-inner-icon="mdi-magnify"
                    density="compact"
                    variant="outlined"
                    label="Enter Address"
                    class="bg-white"
                    :color="isFocused ? 'darkbrand' : 'dark' "
                    autofocus
                    @focus="isFocused = true"
                    @blur="isFocused = false"
                    @keyup.enter="loadMap = true"
                    @input="fetchAutocompleteSuggestions"
                    single-line
                    hide-details
                ></v-text-field>
                <v-btn
                    color="darkbrand"
                    size="regular"
                    v-ripple
                    flat
                    class="text-white h-full px-2 py-2 mt-2 rounded-md"
                    @click="loadMap = true"
                >
                    Start Measuring
                </v-btn> -->
            </v-col>
        </v-row>
        <v-row cols="12" v-if="coordinates" class="justify-space-between h-50">
            <MapDraw :lat="coordinates.lat" :lon="coordinates.lon" />
        </v-row>
        <v-row>
            <v-col>
                
            </v-col>
        </v-row>
        <!-- modal for submit form -->
    </v-container>
</template>

<script>
import MapDraw from "./MapDraw.Vue"
import MeasureForm from "./MeasureForm.vue"

import { addressAutoComplete, submitImage, dataURLtoBlob } from '../../services/apiService'

export default {
    name: 'Measure',
    components: {
        MapDraw,
        MeasureForm,
    },
    data() {
        return {
            search: '',
            suggestions: [],
            address: '',
            coordinates: null,
            isFocused: false,
        }
    },
    methods: {
        handleCoordinates(coordinates) {
            this.coordinates = coordinates
        },
    }
}

</script>