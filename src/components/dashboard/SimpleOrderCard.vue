<template>
    <v-card class="pa-2 bg-white text-dark rounded-lg elevation-1" min-height="250" max-height="500">
        <v-card-title>
            Quick Order Calculator
        </v-card-title>
        <v-card-subtitle>
            Pounds per Square Foot
        </v-card-subtitle>
        <v-sheet class="d-flex justify-space-around align-start my-8 bg-transparent mx-4">
            <v-sheet class="mb-4">
                <p class="text-subtitle-2 font-weight-light mb-2">
                    Yard Size:
                </p>
                <p class="text-subtitle-1 font-weight-bold"> {{ Math.round(selectedSquareFeet * 100) / 100 }} Sq. Feet</p>
                <!-- <p>{{ selectedSquareFeet }}</p> -->
            </v-sheet>
            <v-sheet class="">
                <p class="text-subtitle-2">Pounds per Sq. Foot: </p>
                <v-text-field
                    class="ml-2 text-center"
                    v-model="lbsPerSqFt"
                    color="lightbrand"
                    single-line
                    density="compact"
                    variant="outlined"
                    hide-details
                ></v-text-field>
            </v-sheet>
        </v-sheet>
        <v-sheet class="d-flex justify-space-around align-center">
            <v-sheet>
                <p v-if="lbsPerSqFt" class="text-black text-subtitle-1"> Pounds Needed </p>
                <p v-if="lbsPerSqFt" class="text-black text-subtitle-1"> {{ Math.round(selectedSquareFeet / lbsPerSqFt * 100) / 100 }} </p>
            </v-sheet>
            <v-btn variant="outlined" color="brand">
                Save
            </v-btn>
        </v-sheet>
        <v-card-actions>
            
        </v-card-actions>
    </v-card>
</template>

<script>

export default {
    name: 'SimpleOrderCard',
    data() {
        return {
            lbsPerSqFt: 0
        }
    },
    computed: {
        selectedSquareFeet() {
            console.log(this.$store.state.selectedSquareFeet)
            return this.$store.state.selectedSquareFeet
        }
    },
    methods: {
        // 
    }
}
</script>