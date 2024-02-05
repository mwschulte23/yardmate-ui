<template>
    <v-container class="mb-8">
        <!-- HEADER -->
        <v-row class="mb-1">
            <v-col>
                <div class="d-flex justify-end align-end">
                    <v-sheet class="text-right bg-transparent">
                        <v-btn 
                            prepend-icon="mdi-plus" size="large"  flat
                            class="primary-button ball rounded-lg text-white text-subtitle-1 font-weight-bold ma-0" 
                            @click="goToMeasure"
                          >
                            Add Location
                        </v-btn>
                    </v-sheet>
                </div>
            </v-col>
        </v-row>
        <v-sheet class="bg-white rounded-lg elevation-4">
        <!-- TABLE -->
        <v-row cols="12" class="mt-1 mb-4">
            <v-col cols="12">
                <p class="ml-16 text-h6 text-grey-darken-2 font-weight-semibold">Locations</p>
                <LocationTable :locations="locations" />
            </v-col>
        </v-row>
      
      <v-divider class="my-4"></v-divider>

      <!-- Orders Card -->
      <v-row cols="12">
        <v-col cols="12" md="6" class="ml-12">
            <OrderCalcCard :locations="locations" />
        </v-col>
        <v-divider vertical />
        <v-col class="flex-grow-1 mr-12">
            <OrderHistCard />
        </v-col>
      </v-row>

      <v-divider class="my-4"></v-divider>
      <v-row>
        <v-col class="mx-12">
            <v-card flat class="bg-white text-dark rounded-lg mb-16" min-height="50">
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
                <!-- <v-divider></v-divider> -->
                <div class="h-screen w-screen" style="min-height: 150px; max-height: 600px;">
                    <LocationMapCard :locations="locations" v-if="isMapVisible" />
                </div>
            </v-card>
        </v-col>
      </v-row>
      <!-- METRICS -->
        <v-row>
            <v-col>
                <p>Summary Stats</p>
                <DashboardMetrics :locations="locationStats.locations" :square_feet="locationStats.squareFeet" />
            </v-col>
        </v-row>
        </v-sheet>
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

.ball {
    border-radius: 50%;
    position: relative;
    animation: pulse 2s ease-out 1;
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1); /* Original size */
      opacity: 1;
    }
    25%, 50% {
      transform: scale(1.05); /* Increase size by 50% */
    }
  }
</style>