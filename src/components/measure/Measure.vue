<template>
    <v-container>
        <v-row class="mt-8">
            <v-col>
                <LocationSearch />
            </v-col>
        </v-row>
        <v-row class="w-screen my-4" style="height: 600px">
            <v-col v-if="coordinates" class="h-full w-full">
                <MeasureMap :lat="coordinates.lat" :lon="coordinates.lon" />
            </v-col>
        </v-row>
        


        <v-row>
            <v-col>
                                
                                <!-- <v-card 
                                    v-if="coordinates"
                                    class="my-card" 
                                    @click="expanded = !expanded"
                                    v-ripple="false"
                                >
                                    <v-sheet class="d-flex justify-space-between align-start">
                                        <v-sheet class="">
                                            <v-card-title class="text-left mb-0 pb-1">{{ addressOnly(0) }}</v-card-title>
                                            <v-card-subtitle class="text-subtitle-1 font-weight-regular mt-0">{{ addressOnly(1) }}, {{ addressOnly(2) }}</v-card-subtitle>
                                        </v-sheet>
                                        <v-sheet>
                                            
                                        </v-sheet>
                                    </v-sheet>
                                
                                
                                <v-card-text>
                                    Property detail...
                                <v-expand-transition>
                                <div v-if="expanded">
                                    
                                    Lot Size: <span class="text-accent">15,000 sq ft</span>
                                </div>
                                </v-expand-transition>
                                </v-card-text>
                                </v-card> -->
                            
            </v-col>
        </v-row>
        <!-- <v-row>
            <v-col>
                <p v-if="coordinates">
                    {{ coordinates.lat }} and {{  coordinates.lon }}
                </p>
            </v-col>
        </v-row> -->
    </v-container>
</template>

<script>
import LocationSearch from './LocationSearch.vue';
import MeasureMap from './MeasureMap.vue'

export default {
    name: 'Measure',
    components: {
        LocationSearch,
        MeasureMap,
    },
    data() {
        return {
            expanded: false,
        }
    },
    computed: {
        coordinates() {
            return this.$store.state.coordinates;
        },
    },
    methods: {
        handleCoordinates(coordinates) {
            this.coordinates = coordinates
        },
        addressOnly(split_part) {
            const split_address = this.coordinates.address.toString().split(',');
            return split_address[split_part]
        }
    }
}

</script>