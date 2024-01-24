<template>
    <v-container class="my-12">
        <v-row>
            <v-col>
                <div class="d-flex justify-space-between align-end">
                    <h1 class="text-grey-darken-2 font-weight-regular pb-4">
                        Dashboard
                    </h1>
                    
                    <v-sheet class="text-right py-4 bg-transparent">
                        <v-btn 
                            prepend-icon="mdi-plus" size="large" 
                            class="rounded-lg bg-darkbrand text-subtitle-1 font-weight-semibold" 
                            @click="goToMeasure"
                          >
                            Add Location
                        </v-btn>
                    </v-sheet>
                </div>
            </v-col>
        </v-row>

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
                        :items="customers" 
                        :search="search" 
                        height="400" 
                        density="compact"
                        show-select
                    ></v-data-table>
                </v-card>
            </v-col>
        </v-row>


      <!-- Orders Card -->
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="pa-2 text-darkbrand" height="500">
            <v-card-title>Orders</v-card-title>
            <v-spacer></v-spacer>
            
            <v-card-text class="text-center text-grey-lighten-1 text-h2 mt-16">Coming Soon!</v-card-text>
            <!-- Orders content here -->
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="pa-2 text-darkbrand" height="500">
            <v-card-title>Map</v-card-title>
            <Map />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
<script>
import Map from './Map.vue';

  export default {
    name: 'Dashboard  ',
    components: {
      Map
    },
    data() {
      return {
        search: '',
        headers: [
          { title: 'Customer', key: 'customer' },
          { title: 'Address', key: 'address' },
          { title: 'Yard Sq Ft', key: 'yardSqFt' },
        ],
        customers: [
            { customer: 'John Doe', address: '123 Elm Street', yardSqFt: 1500 },
            { customer: 'John Doe', address: '123 Elm Street', yardSqFt: 1500 },
            { customer: 'Barry Sanders', address: '28 Valley Street', yardSqFt: 1250 },
            { customer: 'John Doe', address: '123 Elm Street', yardSqFt: 1500 },
            { customer: 'John Doe', address: '123 Elm Street', yardSqFt: 1500 },
            { customer: 'John Doe', address: '123 Elm Street', yardSqFt: 1500 },
            { customer: 'John Doe', address: '123 Elm Street', yardSqFt: 1500 },
            { customer: 'John Doe', address: '123 Elm Street', yardSqFt: 1500 },
            { customer: 'John Doe', address: '123 Elm Street', yardSqFt: 1500 },
            { customer: 'John Doe', address: '123 Elm Street', yardSqFt: 1500 },
            { customer: 'John Doe', address: '123 Elm Street', yardSqFt: 1500 },
            { customer: 'John Doe', address: '123 Elm Street', yardSqFt: 1500 },
            { customer: 'John Doe', address: '123 Elm Street', yardSqFt: 1500 },
            { customer: 'John Doe', address: '123 Elm Street', yardSqFt: 1500 },
            { customer: 'Gary Payton', address: '0 Glove Blvd', yardSqFt: 2250 },
        ] // Populate with customer data
      };
    },
    methods: {
        goToMeasure() {
            this.$router.push('measure');
        }
    }
};
</script>
