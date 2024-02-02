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
            <OrderCalcCard />
        </v-col>
        <v-col cols="12" md="6">
            <OrderHistCard />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
            <LocationMapCard :locations="locations" />
        </v-col>
      </v-row>
    </v-container>
  </template>
  
<script>
import { supabase } from '../../supabase'

import DashboardMetrics from './DashboardMetrics.vue'
import LocationTable from './LocationTable.vue';
import OrderCalcCard from './OrderCalcCard.vue';
import OrderHistCard from './OrderHistCard.vue';
import LocationMapCard from './LocationMapCard.vue';

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
                .select('customer_name, status, address, square_feet, lat, lon')
            if (error) {
                console.log(error)
            } else {
                return data
            }
        },
    }
};
</script>
