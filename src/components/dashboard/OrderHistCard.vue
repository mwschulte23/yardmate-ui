<template>
    <v-card class="bg-white text-dark rounded-lg elevation-1" min-height="50" max-height="500">
        <v-sheet class="bg-transparent d-flex justify-space-between pb-2">
            <v-sheet class="bg-transparent">
                <v-card-title>
                    Order History
                </v-card-title>
                <v-card-subtitle class="pb-2">
                    Lookup Saved Past Orders
                </v-card-subtitle>
            </v-sheet>
            <v-sheet class="bg-transparent mx-3 mt-3">
                <p class="text-center font-weight-light mb-2">Past Orders</p>
                <p class="text-center">0</p>
            </v-sheet>
        </v-sheet>
        <v-expand-transition>
            <div class="bg-accent1" v-show="show">
                <v-card-text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et saepe maxime nihil modi itaque eos eligendi magni, error totam alias ab dolorum vitae quas. Adipisci natus deleniti fuga aliquid accusantium.
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