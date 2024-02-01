<template>
    <v-card class="bg-white text-dark rounded-lg elevation-1" min-height="50" max-height="500">
            <v-sheet class="bg-transparent d-flex justify-space-between pb-2">
                <v-sheet class="bg-transparent">
                    <v-card-title>
                        Quick Order Calculator
                    </v-card-title>
                    <v-card-subtitle class="pb-2">
                        Fertelizer (Lbs) per 1k Sq. Feet
                    </v-card-subtitle>
                </v-sheet>
                <v-sheet class="bg-transparent mx-3 mt-3">
                    <p class="text-center font-weight-light mb-2">Selected Sq. Feet</p>
                    <p class="text-center">{{ selectedSquareFeet }}</p>
                </v-sheet>
            </v-sheet>
            <v-expand-transition>
                <div class="bg-accent1" v-show="show">
                    <v-card-text>
                        <v-form class="mt-4">
                            <v-sheet class="bg-transparent">
                                <div class="pl-1 mb-0 text-subtitle-2">% Nitrogen</div>
                                <v-slider
                                    v-model="percentNitrogen"
                                    min="0"
                                    max="100"
                                    step="1"
                                    color="brand"
                                    track-color="dark"
                                >
                                    <template v-slot:append>
                                        <v-text-field
                                            v-model="percentNitrogen"
                                            variant="outlined"
                                            density="compact"
                                            type="number"
                                            class="bg-accent1"
                                            style="width: 70px;"
                                            flat
                                            hide-details
                                            single-line
                                        >
                                        </v-text-field>
                                    </template>
                                </v-slider>
                            </v-sheet>
                            <v-sheet class="bg-transparent mx-2 mb-6 d-flex justify-space-around">
                                <v-text-field
                                    v-model="lbsPerBag"
                                    variant="underlined"
                                    density="compact"
                                    color="brand"
                                    type="number"
                                    hint="Lbs Per Bag"
                                    class="mr-2"
                                    flat
                                    persistent-hint
                                    clearable
                                    single-line
                                />
                                <v-text-field
                                    v-model="fertilizerPer1k"
                                    variant="underlined"
                                    density="compact"
                                    color="brand"
                                    type="number"
                                    hint="Fertilizer (Lbs per 1k Sq. Feet"
                                    class="ml-2"
                                    flat
                                    persistent-hint
                                    clearable
                                    single-line
                                />
                            </v-sheet>
                            
                            <v-sheet class="bg-transparent d-flex justify-space-between">
                                <p class="pa-2 text-subtitle-2">Bags Needed: {{ fertilizerBags }} </p>
                                <v-btn
                                    variant="outlined"
                                    color="accent2"
                                    type="submit"
                                >
                                    Save
                                </v-btn>
                            </v-sheet>
                        </v-form>
                        
                    </v-card-text>
                </div>
            </v-expand-transition>
            <div @click="show = !show" class="expandable-div d-flex justify-center bg-accent1 w-full">
                <v-icon size="large" class="text-center">{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </div>
    </v-card>
</template>

<script>

export default {
    name: 'SimpleOrderCard',
    data() {
        return {
            show: false,
            lbsPerBag: 50,
            fertilizerPer1k: 1,
            percentNitrogen: 5,
            // lbsPerSqFt: 0,
        }
    },
    computed: {
        selectedSquareFeet() {
            return Math.round(this.$store.state.selectedSquareFeet)
        },
        fertilizerBags() {
            const bagsNeeded = (this.$store.state.selectedSquareFeet / 1000) * (this.fertilizerPer1k / (this.percentNitrogen / 100) ) / this.lbsPerBag
            return Math.round(bagsNeeded * 10) / 10
        }
    },
    methods: {
        // 
    }
}
</script>

<style>
.expandable-div {
    cursor: pointer;
}
</style>