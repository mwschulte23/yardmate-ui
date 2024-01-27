<template>
    <v-container class="my-16">
        <!-- HEADER -->
        <v-row>
            <v-col>
                <div class="d-flex justify-end align-end">
                    <v-sheet class="text-right py-4 bg-transparent">
                        <v-btn 
                            prepend-icon="mdi-plus" size="large"  flat
                            class="rounded-lg bg-darkbrand text-subtitle-1 font-weight-bold" 
                            @click="goToMeasure"
                          >
                            Add Location
                        </v-btn>
                    </v-sheet>
                </div>
            </v-col>
        </v-row>

        <!-- METRICS -->
        <DashboardMetrics />
        
        <!-- TABLE -->
        <v-row cols="12" class="mt-0">
            <v-col cols="12">
                <v-card flat class="elevation-1">
                    <template v-slot:text>
                        <v-text-field
                            v-model="search"
                            label="Search"
                            prepend-inner-icon="mdi-magnify"
                            single-line
                            density="compact"
                            variant="outlined"
                            hide-details
                        ></v-text-field>
                    </template>
                    <v-data-table 
                        :headers="headers" 
                        :items="locations" 
                        :search="search" 
                        height="350" 
                        density="compact"
                        show-select
                    ></v-data-table>
                </v-card>
            </v-col>
        </v-row>
      <!-- Orders Card -->
      <v-row>
        <v-col cols="12" md="6">
          <v-sheet class="pa-2 bg-white text-dark rounded-lg elevation-1 overflow-y-auto" height="250">
            <p class="pa-2 text-black text-h5" style="position: sticky; top: 0">Orders</p>
              <TempTimeline />
          </v-sheet>
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
import TempTimeline from './TempTimeline.vue';

export default {
    name: 'Dashboard',
    components: {
        DashboardMetrics,
        TempTimeline
    },
    data() {
      return {
        search: '',
        headers: [
          { title: 'Customer', key: 'customer_name' },
          { title: 'Address', key: 'address' },
          { title: 'Sq Feet', key: 'square_feet' },
        ],
        locations: [],
      };
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
        logStuff() {
            console.log(this.selected)
        }
    }
};
</script>
