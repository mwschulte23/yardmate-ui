<template>
    <v-stepper v-model="step" :items="['Basics', 'Extra Detail', 'Summary']" hide-actions class="w-100 h-100">
        <template v-slot:default="{ prev, next }">
            <v-stepper-window>
                <!-- BASICS -->
                <v-stepper-window-item :value="1">
                    <v-container>
                        <v-sheet class="d-flex justify-space-between mb-4 bg-transparent">
                            <v-sheet>
                                <h3 class="text-h6 font-weight-light">Location</h3>
                                
                                <p class="text-subtitle-1 pb-4 font-weight-light">
                                    {{ shortenedAddress }}
                                    <span><v-chip size="small" color="accent1" class="font-weight-bold">{{ message }}</v-chip></span>
                                </p>
                            </v-sheet>
                            <v-sheet>
                                <h3 class="text-h6 font-weight-light text-right">Measured Area</h3>
                                <p class="text-subtitle-1 pb-4 font-weight-light text-right">{{ formattedArea }} Sq Feet</p>
                            </v-sheet>
                        </v-sheet>
                        <v-text-field
                            v-model="customerName"
                            label="Customer"
                            variant="outlined"
                            density="comfortable"
                            class="bg-white mb-4"
                            :color="isFocused == 'customer' ? 'darkbrand' : 'dark' "
                            @focus="isFocused = 'customer'"
                            @blur="isFocused != 'customer'"
                            required
                            clearable
                        />
                        <v-select 
                            v-model="customerStatus"
                            :items="statuses"    
                            label="Customer Status"
                            variant="outlined"
                            density="comfortable"
                            class="bg-white"
                            :color="isFocused == 'status' ? 'darkbrand' : 'dark' "
                            @focus="isFocused = 'status'"
                            @blur="isFocused != 'status'"
                            required
                            hide-details
                        />
                        
                    </v-container>
                    <!-- <v-sheet class="bg-transparent d-flex justify-space-between align-center"> -->
                        
                        <!-- <v-sheet class="d-flex justify-end align-center my-8">
                            <v-btn variant="outlined" color="accent1" class="mr-4 px-4" @click="closeForm">Close</v-btn>
                            <v-btn color="brand" class="px-4" @click="submitMeasureForm">Submit</v-btn>
                        </v-sheet> -->
                    <!-- </v-sheet> -->
                </v-stepper-window-item>
                <!-- EXTRA DETAIL -->
                <v-stepper-window-item :value="2">
                    <v-container>
                        <v-sheet class="d-flex justify-space-between mb-4 bg-transparent">
                            <v-sheet>
                                <h3 class="text-h6 font-weight-light">Location</h3>
                                
                                <p class="text-subtitle-1 pb-4 font-weight-light">
                                    {{ shortenedAddress }}
                                    <span><v-chip size="small" color="accent1" class="font-weight-bold">{{ message }}</v-chip></span>
                                </p>
                            </v-sheet>
                            <v-sheet>
                                <h3 class="text-h6 font-weight-light text-right">Measured Area</h3>
                                <p class="text-subtitle-1 pb-4 font-weight-light text-right">{{ formattedArea }} Sq Feet</p>
                            </v-sheet>
                        </v-sheet>
                        <div class="d-flex justify-space-around align-center border-sm rounded-lg">
                            <div class="pa-2 w-100 d-flex flex-column justify-start align-center flex-grow-1">
                                <p class="text-center text-subtitle-2 ml-2">Extra Details</p>
                                <div class="d-flex justify-space-around align-center">
                                    <v-checkbox v-model="hasDog" label="Has Dog?" class="mr-4"></v-checkbox>
                                    <v-checkbox v-model="hasFence" label="Has Fence?" class="mr-4"></v-checkbox>
                                    <v-checkbox v-model="hasSprinkler" label="Has Sprinkler?"></v-checkbox>
                                </div>
                            </div>
                            <v-divider vertical class="my-1"></v-divider>
                            <div class="pa-2 ml-4 d-flex flex-column justify-start align-center flex-shrink-1">
                                <p class="text-center text-subtitle-2">Normal Service Day</p>
                                <v-chip-group 
                                    color="brand" 
                                    class="d-flex justify-center align-end"
                                    v-model="serviceDay"
                                >
                                    <v-chip :value="day.id" v-for="day in serviceDays">
                                        {{ day.name }}
                                    </v-chip>
                                </v-chip-group>
                            </div>
                        </div>
                        <div class="py-2 h-100 w-100">
                            <v-textarea counter v-model="notes" label="Notes" class="w-100" />
                        </div>
                    </v-container>
                </v-stepper-window-item>
                <v-stepper-window-item :value="3">
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="7">
                                <v-table class="bg-transparent mx-auto my-8 pl-4" style="width: 90%;">
                                    <tbody>
                                        <tr class="text-subtitle-2 font-weight-light">
                                            <td>Customer</td><td>{{ customerName }}</td>
                                        </tr>
                                        <tr class="text-subtitle-2 font-weight-light">
                                            <td>Address</td><td>{{ shortenedAddress }}</td>
                                        </tr>
                                        <tr class="text-subtitle-2 font-weight-light">
                                            <td>Status</td><td>{{ customerStatus }}</td>
                                        </tr>
                                        <tr class="text-subtitle-2 font-weight-light">
                                            <td>Yard Size</td><td>{{ Math.round(area) }} sq ft</td>
                                        </tr>
                                        <tr class="text-subtitle-2 font-weight-light">
                                            
                                        </tr>
                                    </tbody>
                                </v-table>
                            </v-col>
                            <v-col cols="12" md="5">
                                <v-table class="bg-transparent mx-auto my-8 pl-4" style="width: 90%;">
                                    <tbody>
                                        <tr class="text-subtitle-2 font-weight-light">
                                            <td>Has Dog?</td><td><v-icon>{{ hasDog ? 'mdi-check-circle' : 'mdi-circle-outline' }}</v-icon></td>
                                        </tr>
                                        <tr class="text-subtitle-2 font-weight-light">
                                            <td>Has Fence?</td><td><v-icon>{{ hasFence ? 'mdi-check-circle' : 'mdi-circle-outline' }}</v-icon></td>
                                        </tr>
                                        <tr class="text-subtitle-2 font-weight-light">
                                            <td>Has Sprinkler?</td><td><v-icon>{{ hasSprinkler ? 'mdi-check-circle' : 'mdi-circle-outline' }}</v-icon></td>
                                        </tr>
                                        <tr class="text-subtitle-2 font-weight-light">
                                            <td>Normal Service Day</td><td>{{ serviceDayName }}</td>
                                        </tr>
                                        <tr class="text-subtitle-2 font-weight-light">
                                            
                                        </tr>
                                    </tbody>
                                </v-table>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <div class="w-75 mx-auto pa-2 bg-light">
                                    <p class="text-subtitle-2">Notes:</p>
                                    <p class="text-subtitle-2 font-weight-light">{{ notes.length ? notes : 'No Notes' }}</p>
                                </div>
                            </v-col>
                        </v-row>
                    </v-container>

                </v-stepper-window-item>
            </v-stepper-window>
            <v-stepper-actions
                class="pt-6"
                color="brand"
                @click:prev="prev"
                @click:next="step === 3 ? submitLocation() : next()"
                :next-text="getNextText(step)"
                :disabled="false"

            />
        </template>
    </v-stepper>


</template>

<script>
import { supabase } from '../../supabase'
import { queryServiceDay } from '../../services/supaService'


export default {
    name: 'SubmitLocation',
    props: {
        area: Number
    },
    data() {
        return {
            step: 1,
            isFocused: '',
            message: 'New Location',

            locationId: null,
            customerName: '',
            customerStatus: '',
            statuses: ['Customer', 'Prospect', 'Churned'],
            hasDog: false,
            hasFence: false,
            hasSprinkler: false,
            serviceDays: null,
            serviceDay: null,
            notes: ''
        }
    },
    computed: {
        shortenedAddress() {
            return this.$store.state.address.replace(', United States of America', '')
        },
        formattedArea() {
            return Math.round(this.area * 100) / 100
        },
        serviceDayName() {
            if (this.serviceDay) {
                return this.serviceDays.find(day => day.id === this.serviceDay).name
            } else {
                return ''
            }
        }
    },
    mounted() {
        this.checkAddressExists();
        queryServiceDay().then((data) => {
            this.serviceDays = data
        });
    },
    methods: {
        async checkAddressExists() {
            try {
                const { data, error } = await supabase
                    .from('locations')
                    .select()
                    .eq('address', this.$store.state.address)
                    .single();

                this.locationId = data.id
                this.customerName = data.customer_name,
                this.customerStatus = data.status,
                this.hasDog = data.has_dog,
                this.hasFence = data.has_fence,
                this.hasSprinkler = data.has_sprinkler,
                this.serviceDay = data.service_day_id,
                this.notes = data.notes

                this.message = 'Existing Location'
            } catch {
                this.message = 'New Location'
            }
        },
        submitLocation() {
            this.upsertLocation();
            this.closeForm();
            // this.$store.commit('SET_COORDINATES', true);
            this.$store.commit('SET_LOCATION_SUBMITTED', true)
        },
        async upsertLocation() {
            const records = {
                company_id: this.$store.state.companyId,
                address: this.$store.state.address,
                lat: this.$store.state.coordinates.lat,
                lon: this.$store.state.coordinates.lon,
                square_feet: this.area,
                has_dog: this.hasDog,
                has_fence: this.hasFence,
                has_sprinkler: this.hasSprinkler,
                notes: this.notes
            }
            if (this.customerName.length > 4 && this.customerStatus.length > 0) {
                records['customer_name'] = this.customerName
                records['status'] = this.customerStatus
            }
            if (this.serviceDay) {
                records['service_day_id'] = this.serviceDay
            }
            if (this.locationId) {
                records['id'] = this.locationId
            }
            const { error } = await supabase
                .from('locations')
                .upsert(records);
            
            if (error) {
                alert('Issue saving location. Error: ' + error);
            }     
        },
        closeForm() {
            this.$emit('openForm', false)
        },
        getNextText(stepper) {
            return stepper === 3 ? 'Submit' : 'Next';
        },
    }
};

</script>