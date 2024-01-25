<template>
    <v-container class="my-12">
        <!-- HEADER -->
        <v-row>
            <v-col>
                <div class="d-flex justify-space-between align-end">
                    <h1 class="text-grey-darken-2 font-weight-regular pb-4">
                        Dashboard
                    </h1>
                    
                    <v-sheet class="text-right py-4 bg-transparent">
                        <v-btn 
                            prepend-icon="mdi-plus" size="large" 
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
        <v-row cols="12" class="my-2">
            <v-col cols="4">
                <v-sheet class="bg-transparent text-center">
                    <p class="text-subtitle-1 font-weight-thin">Locations</p>
                    <h5 class="text-subtitle-1 font-weight-regular">20</h5>
                </v-sheet>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="4">
              <v-sheet class="bg-transparent text-center">
                  <p class="text-subtitle-1 font-weight-thin">Total Sq Feet</p>
                  <h5 class="text-subtitle-1 font-weight-regular">230k</h5>
              </v-sheet>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="4">
              <v-sheet class="bg-transparent text-center">
                  <p class="text-subtitle-1 font-weight-thin">Usage Percent</p>
                  <h5 class="text-subtitle-1 font-weight-regular">20%</h5>
              </v-sheet>
            </v-col>
        </v-row>
        
        <!-- TABLE -->
        <v-row class="mt-0">
            <v-col>
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
                        height="400" 
                        density="compact"
                        show-select
                        v-model="selected"
                    ></v-data-table>
                </v-card>
            </v-col>
        </v-row>
      <!-- Orders Card -->
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="pa-2 text-darkbrand" height="500">
            <v-card-title>Orders</v-card-title>
            <v-card-text class="text-center text-grey-lighten-1 text-h2 mt-16">Coming Soon!</v-card-text>
            <!-- Orders content here -->
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="pa-2 text-darkbrand" height="500">
            <v-card-title>Map</v-card-title>
            <!-- <Map /> -->
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
<script>
import { supabase } from '../../supabase'

  export default {
    name: 'Dashboard',
    components: {
      // Map
    },
    data() {
      return {
        search: '',
        selected: [],
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
