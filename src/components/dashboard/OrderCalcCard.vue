<template>
    <v-card flat class="bg-transparent text-dark rounded-lg h-100" min-height="250" max-height="500">
        <v-sheet class="bg-transparent d-flex justify-space-between pb-2">
            <v-sheet class="bg-transparent">
                <v-card-title>
                    Quick Order Calculator
                </v-card-title>
                <v-card-subtitle class="pb-2">
                    Fertelizer (Lbs) per 1k Sq. Feet
                </v-card-subtitle>
            </v-sheet>
            <v-sheet class="ball bg-transparent mx-3 mt-3">
                <p class="text-center font-weight-light mb-2">Selected Sq. Feet</p>
                <p class="text-center text-h6 rounded-lg">{{ selectedSquareFeet }}</p>
            </v-sheet>
        </v-sheet>
        <div>
            <v-card-text>
                <v-form class="mt-4" @submit.prevent="submitOrderCalc">
                    <v-sheet class="bg-transparent">
                        <div class="pl-1 mb-0 text-subtitle-2">% Nitrogen</div>
                        <v-slider
                            v-model="percentNitrogen"
                            min="0"
                            max="100"
                            step="1"
                            color="brand"
                            track-color="darkbrand"
                        >
                            <template v-slot:append>
                                <v-text-field
                                    v-model="percentNitrogen"
                                    variant="outlined"
                                    density="compact"
                                    type="number"
                                    class="bg-white"
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
                            hint="Fertilizer (Lbs) per 1k Sq. Feet"
                            class="ml-2"
                            flat
                            persistent-hint
                            clearable
                            single-line
                        />
                    </v-sheet>
                    
                    <v-sheet class="bg-transparent d-flex justify-space-between">
                        <p class="pa-2 text-subtitle-2">Bags Needed: {{ fertilizerBags }} </p>
                        <v-sheet class=bg-transparent>
                            <v-btn variant="tonal" color="dark" class="text-caption mr-2" @click="$router.push('/order')">
                                Advanced
                            </v-btn>
                            <v-btn
                                flat
                                color="accent2"
                                type="submit"
                            >
                                Save
                            </v-btn>
                        </v-sheet>
                    </v-sheet>
                </v-form>
                
            </v-card-text>
        </div>
    </v-card>
</template>

<script>
import { supabase } from '../../supabase'

export default {
    name: 'SimpleOrderCard',
    
    data() {
        return {
            lbsPerBag: 50,
            fertilizerPer1k: 1,
            percentNitrogen: 5,
            bagsNeeded: null
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
        submitOrderCalc() {
            this.saveOrder().then((orderId) => {
                if (orderId) {
                    this.saveOrderLocations(orderId)
                    console.log('order locations updated')
                }
            })
        },
        async saveOrder() {
            if (this.selectedSquareFeet > 0) {
                const records = {
                    company_id: this.$store.state.companyId,
                    type: 'fertilizer',
                    order_info: {
                        'square_feet': this.selectedSquareFeet,
                        'percent_nitrogen': this.percentNitrogen,
                        'lbs_per_bag': this.lbsPerBag,
                        'fertilizer_per_thousand': this.fertilizerPer1k,
                        'bags_needed': this.fertilizerBags,
                    }
                }
                const { data, error } = await supabase
                    .from('orders')
                    .insert(records)
                    .select()
                    .single()
                
                if (error) throw error;
                console.log('order updated')
                return data.id
            } else {
                alert('Please select locations from table to build order')
            }
        },
        async saveOrderLocations(order_id) {
            const locationIds = this.$store.state.locationIds

            if (locationIds) {
                console.log(locationIds)

                const records = locationIds.map(locationId => ({
                    order_id: order_id,
                    location_id: locationId
                }))
                console.log('records:   ', records)

                const { error} = await supabase
                    .from('order_locations')
                    .insert(records)

            if (error) throw error;
            }
        }
    }
}
</script>

<style>
.ball {
    border-radius: 50%;
    position: relative;
    animation: pulse 2s ease-out 1;
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1); /* Original size */
      opacity: 1;
    }
    25%, 50% {
      transform: scale(1.15); /* Increase size by 50% */
    }
  }
</style>