<template>
    <v-container class="bg-light w-50">
        <v-row>
            <v-col class="">
                <h3>{{ location.customer_name }} <span class="ml-2 text-subtitle-1 font-weight-light">{{ location.status }}</span></h3>
                <p class="text-subtitle-2 font-weight-thin">
                    {{ location.address }}
                </p>
            </v-col>
        </v-row>
        <v-row class="mb-4">
            <v-col>
                <v-text-field
                        v-model="customerName"
                        hint="Customer Name"
                        persistent-hint
                        
                        variant="outlined"
                        density="comfortable"
                        class="mb-8"
                        :color="isFocused == 'customer' ? 'darkbrand' : 'dark' "
                        @focus="isFocused = 'customer'"
                        @blur="isFocused != 'customer'"
                        clearable
                    />
                    <v-select 
                        v-model="customerStatus"
                        :items="statuses"    
                        label="Customer Status"
                        :item-value="location.status"
                        variant="outlined"
                        density="comfortable"
                        :color="isFocused == 'status' ? 'darkbrand' : 'dark' "
                        @focus="isFocused = 'status'"
                        @blur="isFocused != 'status'"
                        required
                        hide-details
                    />
                
            </v-col>
        </v-row>
        <v-divider />
        <v-row class="mt-4">
            <v-col class="d-flex justify-space-between align-center">
                <v-sheet class="bg-transparent">
                    <h3 class="mb-2 font-weight-regular">Square Foot Adjuster</h3>
                    <p class="text-subtitle-2 font-weight-light">Current Sq. Feet: <span class="text-subtitle-1">{{ Math.round(location.square_feet) }}</span></p>
                </v-sheet>
            </v-col>
        </v-row>
        <v-row cols="12" class="flex-nowrap">
            <v-col cols="6" class="offset-1">
                <v-sheet class="bg-transparent">
                    <p class="mb-2 font-weight-thin">Adjust Square Footage</p>
                    <v-btn @click="adjustSqFootage('bigDecrease')" variant="tonal" color="red-darken-4 mr-1 mb-1">
                        <v-icon>mdi-chevron-double-down</v-icon>
                    </v-btn>
                    <v-btn @click="adjustSqFootage('decrease')" variant="tonal" color="red-lighten-2 mr-1 mb-1">
                        <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                    <v-btn @click="adjustSqFootage('increase')" variant="tonal" color="indigo-lighten-2 mr-1 mb-1">
                        <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
                    <v-btn @click="adjustSqFootage('bigIncrease')" variant="tonal" color="indigo-darken-4 mr-1 mb-1">
                        <v-icon>mdi-chevron-double-up</v-icon>
                    </v-btn>
                </v-sheet>
            </v-col>
            <v-col class="d-flex flex-column justify-center align-center">
                <p class="text-subtitle-2 font-weight-light mb-2">Adjusted Sq. Feet</p>
                <p class="text-h3 mb-1">{{ Math.round(adjustedSqFeet) }}</p>

                <v-tooltip location="bottom" text="100 sq feet = Standard shed; 250 sq ft = single car garage; 500 sq ft = two car garage">
                    <template v-slot:activator="{ props }">
                        <v-chip
                            class="px-4" 
                            variant="tonal" 
                            size="small" 
                            v-bind="props"
                            v-if="squareFeetDelta != 0"
                            :color="squareFeetDelta > 0 ? 'brand' : 'red'" 
                            :prepend-icon="squareFeetDelta > 0 ? 'mdi-arrow-up' : 'mdi-arrow-down'"
                        >
                            <span class="text-h6">{{ squareFeetDelta }}</span>
                        </v-chip>
                    </template>
                </v-tooltip>

                    
            </v-col>
            <v-col class="flex-shrink-1"></v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-sheet class="bg-transparent d-flex justify-end align-center mt-8 mb-4">
                    <v-btn variant="outlined" color="accent1" class="mr-4 px-4" @click="closeEdit">Close</v-btn>
                    <v-btn color="brand" class="px-4" @click="updateLocation">Save</v-btn>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { supabase } from '../../supabase'

export default {
    name: 'LocationProfile',
    props: {
        location: Object
    },
    data() {
        return {
            customerName: this.location.customer_name,
            customerStatus: this.location.status,
            statuses: ['Customer', 'Prospect', 'Churned'],
            isFocused: '',
            adjustedSqFeet: this.location.square_feet
        }
    },
    computed: {
        squareFeetDelta() {
            return Math.round(this.adjustedSqFeet - this.location.square_feet)
        }
    },
    methods: {
        adjustSqFootage(adjustment) {
            if (adjustment == 'bigDecrease') {
                this.adjustedSqFeet -= 100
            } else if (adjustment == 'decrease') {
                this.adjustedSqFeet -= 50
            } else if (adjustment == 'increase') {
                this.adjustedSqFeet += 50
            }  else if (adjustment == 'bigIncrease') {
                this.adjustedSqFeet += 100
            }
        },
        async updateLocation() {
            const records = {
                customer_name: this.customerName,
                status: this.customerStatus,
                square_feet: this.adjustedSqFeet
            }
            const { data, error } = await supabase
                .from('locations')
                .update(records)
                .eq('id', this.location.id)
            
            if (error) {
                alert('Issue with updating location. Contact abc for def')
                console.error('Error inserting data:', error);
                return null;
            } else {
                console.log('goodie goodie')
                this.closeEdit()
            }
        },
        closeEdit() {
            this.$emit('editClicked', false)
        },
    }
}
</script>
