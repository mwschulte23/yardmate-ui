<template>
        <p class="my-2">Totals</p>
        <v-card 
            cols="12" 
            class="py-2 d-flex justify-space-evenly bg-lightbrand elevation-1 rounded-md"
        >
            <v-col cols="4" class="d-flex justify-center">
                <v-sheet class="bg-transparent text-center">
                    <p class="text-subtitle-2 font-weight-light">Locations</p>
                    <h5 class="text-h6 font-weight-regular">{{ locations }}</h5>
                </v-sheet>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="4" class="d-flex justify-center">
                <v-sheet class="bg-transparent text-center">
                    <p class="text-subtitle-2 font-weight-light">Total Sq Feet</p>
                    <h5 class="text-h6 font-weight-regular">{{ Math.round(square_feet / 100) * 100 }}</h5>
                </v-sheet>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="4" class="d-flex justify-center">
                <v-sheet class="bg-transparent text-center">
                    <p class="text-subtitle-2 font-weight-light">Utilization</p>
                    <h5 class="text-h6 font-weight-regular">{{ locations / 20 }}</h5>
                </v-sheet>
            </v-col>
        </v-card>
</template>

<script>
import { supabase } from '../../supabase'

export default {
    name: 'DashboardMetrics',
    props: {
        locations: Number,
        square_feet: Number
    },
}
</script>