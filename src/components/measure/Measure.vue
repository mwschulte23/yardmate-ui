<template>
    <v-container class="page-container py-0">
        <v-row class="my-0 my-0">
            <v-col class="mt-0 py-0">
                <LocationSearch />
            </v-col>
        </v-row>
        <v-row class="mt-0 w-screen mb-12" style="height: 600px">
            <v-col v-if="coordinates" class="h-full w-full">
                <MeasureMap :lat="coordinates.lat" :lon="coordinates.lon" />
            </v-col>
            <v-col v-else class="w-full mt-12 rounded-lg bg-grey-darken-2">
                <p class="text-center text-h4 font-weight-bold">Enter Address Above to Pull Up Map</p>
            </v-col>
        </v-row>
        <v-row>

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
                this.$store.dispatch('SET_LOCATION_SUBMITTED', false)
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
