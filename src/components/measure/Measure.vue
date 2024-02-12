<template>
    <v-container class="page-container py-0">
        <v-row class="my-0 my-0">
            <v-col class="my-0 py-0">
                <LocationSearch />
            </v-col>
        </v-row>
        <v-row class="mt-0 w-screen mb-12" style="height: 600px">
            <v-col v-if="coordinates" class="h-full w-full">
                <MeasureMap :lat="coordinates.lat" :lon="coordinates.lon" />
            </v-col>
        </v-row>
        <v-row>

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

        <!-- MEASURE NOTIFS -->
        <v-snackbar
            v-model="locationSubmitted"
            :timeout="4000"
            elevation="24"
            color="lightbrand"
            multi-line
            >
            <p class="text-dark font-weight-bold">Location Saved <v-icon>mdi-party</v-icon></p>

            <template v-slot:actions>
                <v-btn
                color="dark"
                variant="outlined"
                @click="$router.push('/')"
                >
                    View
                </v-btn>
            </template>
        </v-snackbar>

    </v-container>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import LocationSearch from './LocationSearch.vue';

// lazy load map
const MeasureMap = defineAsyncComponent({
  loader: () => import('./MeasureMap.vue'),
//   loadingComponent: LoadingComponent, TODO add components these components in distant future
//   errorComponent: ErrorComponent,
  delay: 100, 
  timeout: 5000
});


export default {
    name: 'Measure',
    components: {
        LocationSearch,
        MeasureMap
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
        locationSubmitted: {
            get() {
                return this.$store.state.locationSubmitted
            },
            set() {
                this.$store.dispatch('triggerLocationSubmitNotif', false)
            }
        }
    },
    methods: {
        handleCoordinates(coordinates) {
            this.coordinates = coordinates
        },
        addressOnly(split_part) {
            const split_address = this.coordinates.address.toString().split(',');
            return split_address[split_part]
        },
        // closeSnack
    }
}
</script>
