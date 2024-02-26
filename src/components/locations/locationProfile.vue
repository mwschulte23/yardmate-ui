<template>
<div class="pt-16 pb-4 px-4 bg-white h-100 w-100 overflow-y-auto" style="padding-top: 10%;">
    <v-row cols="12" class="h-100">
        <v-col cols="12" md="4" class="h-100">
            <!-- left "cards" -->
            <v-row class="h-50 pa-0 my-0">
                <!-- carousel -->
                <v-col class="pa-1">
                    <v-sheet class="h-100 w-100 mb-1 bg-accent1 rounded-lg pt-1">
                        <v-carousel 
                            class="h-100" 
                            :show-arrows="false" 
                            vertical-delimiters="left"
                            direction="vertical"
                            hide-delimiter-background 
                            
                        >
                            <v-carousel-item >
                                <locationDetail :location="location" />
                            </v-carousel-item>
                            <v-carousel-item class="mb-4">
                                <p class="text-center text-overline font-weight-semibold">Additional Detail</p>
                                <div class="h-75 d-flex align-center justify-center">COMING SOON!</div>    
                            </v-carousel-item>
                            <v-carousel-item class="mb-4">
                                <locationOrderHist :locationId="location.id" />
                            </v-carousel-item>
                        </v-carousel>
                    </v-sheet>
                </v-col>
            </v-row>
            <v-row class="h-50 pa-0 my-0">
                <!-- future map -->
                <v-col class="pa-1">
                    <v-sheet class="h-100 w-100 bg-grey-lighten-1 rounded-lg pt-1">
                        <p class="text-center text-overline font-weight-semibold">Map</p>
                        <div class="h-75 d-flex align-center justify-center">COMING SOON!</div>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-col>

        <v-col rows="12" md="8" class="h-100 py-4">
            <v-sheet class="h-100 bg-lightbrand rounded-lg pt-1">
                <p class="text-center text-overline font-weight-semibold">Update</p>
                
                <v-row cols="12">
                    <v-col cols="12" md="4" class="mt-4">
                        <div class="mx-6">
                            <v-text-field
                                v-model="customerName"
                                label="Customer Name"
                                hide-details="auto"
                                variant="outlined"
                                density="comfortable"
                                class="my-2"
                                clearable
                            />
                            <v-select 
                                v-model="customerStatus"
                                :items="statuses"
                                label="Customer Status"
                                :item-value="location.status"
                                variant="outlined"
                                density="comfortable"
                                class="my-4"
                                required
                                hide-details
                            />
                        </div>
                    </v-col>
                    <v-col cols="12" md="7">
                        <div class="mt-6">
                            <p class="text-center text-subtitle-2 font-weight-light">Adjust Yard Size</p>
                            <v-slider
                                v-model="adjustedSqFeet"
                                :min="this.location.square_feet / 1.2"
                                :max="this.location.square_feet * 1.15"
                                color="darkbrand"
                                track-color="dark"
                                prepend-icon="mdi-arrow-down"
                                append-icon="mdi-arrow-up"
                                thumb-label
                            />
                        </div>
                        <div class="d-flex justify-space-around align-center mt-1 mb-6">
                            <div>
                                <p class="text-center text-subtitle-2 font-weight-light">Current Sq Feet</p>
                                <p class="text-center text-subtitle-2">{{ Math.round(location.square_feet) }}</p>
                            </div>
                            <div>
                                <p class="text-center text-subtitle-2 font-weight-light">Adjusted Sq Feet</p>
                                <p class="text-center text-subtitle-2">{{ Math.round(adjustedSqFeet) }}</p>
                            </div>
                            <div>
                                <p
                                    class="text-center text-subtitle-2 font-weight-light"
                                    :class="{'text-darkbrand': adjustedSqFeet >= location.square_feet - 1, 'text-red-darken-4': adjustedSqFeet < location.square_feet}"
                                >
                                    Difference
                                </p>
                                <p 
                                    class="text-center text-subtitle-2 font-weight-bold"
                                    :class="{'text-darkbrand': adjustedSqFeet >= location.square_feet - 1, 'text-red-darken-4': adjustedSqFeet < location.square_feet}"
                                >
                                    {{ Math.round(adjustedSqFeet - location.square_feet) }}
                                </p>
                            </div>
                        </div>


                    </v-col>
                </v-row>

                <v-container>
                    <p class="text-center text-overline font-weight-semibold mt-4 mb-2">Additional Details</p>
                    <v-row>
                        <v-col>
                            <div class="pa-2 border-sm rounded-lg h-100 w-100">
                                <p class="text-center text-subtitle-2 font-weight-light">Location Details</p>
                                <div class="d-flex justify-space-around align-center">
                                    <v-checkbox v-model="hasDog" label="Has Dog?"></v-checkbox>
                                    <v-checkbox v-model="hasFence" label="Has Fence?"></v-checkbox>
                                    <v-checkbox v-model="hasSprinkler" label="Has Sprinkler?"></v-checkbox>
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="12" md="4">
                            <div class="pa-2 border-sm rounded-lg h-100 w-100">
                                <p class="text-center text-subtitle-2">Normal Service Day</p>
                                <v-chip-group 
                                    color="brand" 
                                    class="d-flex justify-center align-end"
                                    v-model="serviceDay"
                                >
                                    <v-chip :value="day.id" v-for="day in serviceDays" :active="serviceDay === day.id">
                                        
                                        {{ day.name }}
                                    </v-chip>
                                </v-chip-group>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-textarea counter label="Notes" class="h-100" />
                        </v-col>
                    </v-row>
                    <v-row class="mt-0 pt-">
                        <v-col class="d-flex justify-end align-center">
                            <v-btn 
                                @click="resetDetails"
                                variant="outlined"
                                color="darkbrand"
                            >
                                Reset
                            </v-btn>
                            <v-btn
                                class="ml-4"
                                color="darkbrand"
                                @click="updateLocation"
                            >
                                Update
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-sheet>
        </v-col>
    </v-row>
    <v-snackbar
        v-model="locationUpdated"
        :timeout="2500"
        elevation="24"
        color="light"
        multi-line
        >
        <p class="text-dark text-center font-weight-bold">Location Updated <v-icon>mdi-robot-happy-outline</v-icon></p>
    </v-snackbar>
</div>
</template>

<script>
import { supabase } from '../../supabase'
import { queryServiceDay, queryLocationExtras } from '../../services/supaService'

import locationDetail from './locationDetail.vue'
import locationOrderHist from './locationOrderHist.vue'


export default {
    name: 'locationProfile',
    components: {
        locationDetail,
        locationOrderHist
    },
    props: {
        location: Object,
        statuses: Array
    },
    data() {
        return {
            locationUpdated: false,

            adjustedSqFeet: Math.round(this.location.square_feet),
            customerName: this.location.customer_name,
            customerStatus: this.location.status,
            hasDog: this.location.has_dog,
            hasFence: this.location.has_fence,
            hasSprinkler: this.location.has_sprinkler,
            serviceDays: null,
            serviceDay: this.location.service_day_id,
        }
    },
    beforeMount() {
        queryServiceDay().then((data) => {
            this.serviceDays = data
        });
    },
    methods: {
        async updateLocation() {
            const records = {
                customer_name: this.customerName,
                status: this.customerStatus,
                square_feet: this.adjustedSqFeet,
                has_dog: this.hasDog,
                has_fence: this.hasFence,
                has_sprinkler: this.hasSprinkler,
                service_day_id: this.serviceDay,
                notes: this.notes
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
                this.location.customer_name = this.customerName
                this.location.status = this.customerStatus
                this.location.square_feet = this.adjustedSqFeet
                this.location.has_dog = this.hasDog
                this.location.has_fence = this.hasFence
                this.location.has_sprinkler = this.hasSprinkler
                this.location.service_day_id = this.serviceDay,
                this.location.notes = this.notes

                this.locationUpdated = true
            }
        },
        closeWindow() {

        },
        resetDetails() {
            this.adjustedSqFeet = this.location.square_feet
            this.customerName = this.location.customer_name
            this.customerStatus = this.location.status
            this.hasDog = this.location.has_dog
            this.hasFence = this.location.has_fence
            this.hasSprinkler = this.location.has_sprinkler
            this.serviceDay = this.location.service_day_id
            this.notes = this.location.notes
        },
    }
}
</script>
