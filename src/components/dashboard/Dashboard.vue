<template>
    <v-container class="">
        <!-- HEADER -->
        <v-row>
            <v-col>
                <div class="d-flex justify-end align-end">
                    <v-sheet class="text-right bg-transparent">
                        <v-btn 
                            prepend-icon="mdi-plus" size="large"  flat
                            class="rounded-lg bg-darkbrand text-subtitle-1 font-weight-bold ma-0" 
                            @click="goToMeasure"
                          >
                            Add Location
                        </v-btn>
                    </v-sheet>
                </div>
            </v-col>
        </v-row>

        <!-- METRICS -->
        <DashboardMetrics :locations="locationStats.locations" :square_feet="locationStats.squareFeet" />
        
        <!-- TABLE -->
        <v-row cols="12" class="mt-0">
            <v-col cols="12">
                <LocationTable :locations="locations" />
            </v-col>
        </v-row>
      <!-- Orders Card -->
      <v-row>
        <v-col cols="12" md="6">
            <SimpleOrderCard />
        </v-col>
        <v-col cols="12" md="6">
          <v-sheet class="pa-2 bg-white text-dark rounded-lg elevation-1 overflow-y-auto" height="250">
            <p class="pa-2 text-black text-h5" style="position: sticky; top: 0">Map</p>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
<script>
import { supabase } from '../../supabase'

import DashboardMetrics from './DashboardMetrics.vue'
import LocationTable from './LocationTable.vue';
import SimpleOrderCard from './SimpleOrderCard.vue';

export default {
    name: 'Dashboard',
    components: {
        DashboardMetrics,
        LocationTable,
        SimpleOrderCard
    },
    data() {
        return {
            locations: []
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
                .select('customer_name, address, square_feet')
            if (error) {
                console.log(error)
            } else {
                return data
            }
        },
    }
};
</script>
