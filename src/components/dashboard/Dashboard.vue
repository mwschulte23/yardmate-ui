<template>
    <v-container class="">
        <!-- HEADER -->
        <v-row>
            <v-col>
                <div class="d-flex justify-end align-end">
                    <v-sheet class="text-right bg-transparent">
                        <v-btn 
                            prepend-icon="mdi-plus" size="large"  flat
                            class="primary-button rounded-lg text-white text-subtitle-1 font-weight-bold ma-0" 
                            @click="goToMeasure"
                          >
                            Add Location
                        </v-btn>
                    </v-sheet>
                </div>
            </v-col>
        </v-row>

        <!-- METRICS -->
        <v-row>
            <v-col>
                <DashboardMetrics :locations="locationStats.locations" :square_feet="locationStats.squareFeet" />
            </v-col>
        </v-row>

        <!-- TABLE -->
        <v-row cols="12" class="mt-0 mb-4">
            <v-col cols="12">
                <LocationTable :locations="locations" />
            </v-col>
        </v-row>
      <!-- Orders Card -->
      <v-row>
        <v-col cols="12" md="6">
            <OrderCalcCard :locations="locations" />
        </v-col>
        <v-col cols="12" md="6">
            <OrderHistCard />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
            <v-card class="bg-white text-dark rounded-lg elevation-1 mb-16" min-height="50">
                <v-sheet class="bg-white d-flex justify-space-between align-center pb-2">
                    <v-sheet class="bg-transparent pb-4">
                        <v-card-title>
                            Location Map
                        </v-card-title>
                        <v-card-subtitle>
                            View Selected Locations on Map
                        </v-card-subtitle>
                    </v-sheet>
                    <v-btn flat class="ma-4" variant="tonal" color="brand" @click="isMapVisible = true">Load Map</v-btn>
                </v-sheet>
                <v-divider></v-divider>
                <div class="h-screen w-screen" style="min-height: 150px; max-height: 600px;">
                    <LocationMapCard :locations="locations" v-if="isMapVisible" />
                </div>
            </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
<script>
import { defineAsyncComponent } from 'vue';
import { supabase } from '../../supabase'

import DashboardMetrics from './DashboardMetrics.vue'
import LocationTable from './LocationTable.vue';
import OrderCalcCard from './OrderCalcCard.vue';
import OrderHistCard from './OrderHistCard.vue';
// import LocationMapCard from './LocationMapCard.vue';

const LocationMapCard = defineAsyncComponent({
  loader: () => import('./LocationMapCard.vue'),
//   loadingComponent: LoadingComponent, TODO add components these components in distant future
//   errorComponent: ErrorComponent,
  delay: 100, 
  timeout: 5000
});


export default {
    name: 'Dashboard',
    components: {
        DashboardMetrics,
        LocationTable,
        OrderCalcCard,
        OrderHistCard,
        LocationMapCard
    },
    data() {
        return {
            locations: [],
            isMapVisible: false
        }
    },
    computed: {
        locationStats() {
            return {
                locations: this.locations.length,
                squareFeet: this.locations.reduce((sum, item) => sum + item.square_feet, 0)
            }
        },
    },
    mounted() {
        this.getLocations().then((data) => {
            this.locations = data;
        });
    },
    methods: {
        goToMeasure() {
            this.$router.push('measure');
        },
        async getLocations() {
            const { data, error } = await supabase
                .from('locations')
                .select('id, customer_name, status, address, square_feet, lat, lon')
            
            if (error) throw error;
            
            return data
        },
    }
};
</script>

<style scoped>
.primary-button {
    background-color: #30B03E;
}
.primary-button:hover {
    background-image: linear-gradient(to right, #7fcb87, #30B03E 60%, #7fcb87);
}
</style>