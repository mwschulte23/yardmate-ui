<template>
    <v-container>
        <v-row 
            cols="12" 
            class="py-2 mt-2 justify-space-evenly bg-white elevation-1 rounded-lg"
        >
            <v-col cols="4" class="d-flex justify-center">
                <v-sheet class="bg-transparent text-start">
                    <p class="text-subtitle-2 font-weight-light">Locations</p>
                    <h5 class="text-h6 font-weight-regular">25</h5>
                </v-sheet>
            </v-col>
            <v-col cols="4" class="d-flex justify-center">
                <v-sheet class="bg-transparent text-start">
                    <p class="text-subtitle-2 font-weight-light">Total Sq Feet</p>
                    <h5 class="text-h6 font-weight-regular">230k</h5>
                </v-sheet>
            </v-col>
            <!-- <v-divider vertical></v-divider> -->
            <v-col cols="4" class="d-flex justify-center">
                <v-sheet class="bg-transparent text-start">
                    <p class="text-subtitle-2 font-weight-light">Total Sq Feet</p>
                    <h5 class="text-h6 font-weight-regular">230k</h5>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'DashboardMetrics',
}
</script>