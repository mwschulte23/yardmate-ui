<template>
    <v-container class="mt-0">
        <v-row cols="12" class="mb-4">
            <v-col>
                <div class="d-flex justify-end align-end">
                    <v-btn 
                        prepend-icon="mdi-plus" size="large"  flat
                        class="primary-button ball rounded-lg text-white text-subtitle-1 font-weight-bold elevation-4" 
                        @click="$router.push('measure')"
                        >
                        Add Location
                    </v-btn>
                </div>
            </v-col>
        </v-row>
        <v-sheet class="bg-white rounded-lg elevation-4 pa-4">
            <v-row cols="12" class="mb-0 pb-0">
                <v-col cols="12" class="d-flex justify-start align-start">
                    <v-text-field
                        v-model="locationSearch"
                        :color="isFocused ? 'darkbrand' : 'dark' "
                        @focus="isFocused = true"
                        @blur="isFocused = false"
                        placeholder="Filter Locations"
                        append-inner-icon="mdi-magnify"
                        density="comfortable"
                        variant="outlined"
                        class="flex-grow-1"
                    />
                    <v-btn class="pt-4 pl-6" variant="text" prepend-icon="mdi-map-outline">
                        map view
                    </v-btn>
                </v-col>
            </v-row>
            <v-row class="mt-0 pt-0 mb-4">
                <v-col>
                    <p class="text-center text-subtitle-2 font-weight-light">Customer Status</p>
                    <v-chip-group
                        multiple
                        column
                        v-model="statuses"
                        class="d-flex justify-center align-center"
                    >
                        <v-chip
                            v-for="(status, index) in statusList" 
                            :key="index" 
                            :value="status"
                            variant="outlined"
                            color="accent1"
                            size="small"
                        >
                            {{ status }}
                        </v-chip>
                    </v-chip-group>
                </v-col>
                <v-col cols="3">
                    <p class="text-center text-subtitle-2 font-weight-light">Location Details</p>
                    <v-chip-group
                        multiple
                        column
                        class="d-flex justify-center align-center"
                    >
                        <v-chip
                            value="hasDog"
                            @click="hasDog = !hasDog"
                            variant="outlined"
                            color="accent1"
                            size="small"
                        >
                            Dog
                        </v-chip>
                        <v-chip
                            value="hasFence"
                            @click="hasFence = !hasFence"
                            variant="outlined"
                            color="accent1"
                            size="small"
                        >
                            Fence
                        </v-chip>
                        <v-chip
                            value="hasSprinkler"
                            @click="hasSprinkler = !hasSprinkler"
                            variant="outlined"
                            color="accent1"
                            size="small"
                        >
                            Sprinkler
                        </v-chip>
                    </v-chip-group>
                </v-col>

                <v-col cols="5">
                    <p class="text-center text-subtitle-2 font-weight-light">Normal Service Day</p>
                    <v-chip-group
                        multiple
                        column
                        v-model="selectedServiceDays"
                        class="d-flex justify-center align-center"
                    >
                        <v-chip
                            v-for="day in serviceDays" 
                            :key="day.id" 
                            :value="day.name"
                            variant="outlined"
                            color="accent1"    
                            size="small"
                        >
                            {{ day.name }}
                        </v-chip>
                    </v-chip-group>
                </v-col>
            </v-row>
            <v-row cols="12">
                <v-col 
                    cols="12"
                    class="bg-transparent"
                    
                >
                    <v-list class="bg-transparent" v-for="location in filteredSearch">
                        <v-list-item 
                            class="my-0 py-4 border-b-sm h-100 h-100"
                            @click="openLocationProfile(location)"
                        >
                            <div class="d-flex justify-space-between align-center flex-wrap">
                                <div>
                                    <div class="d-flex justify-start align-center ">
                                        <p class="text-h6 font-weight-semibold text-dark ml-1 mb-1">
                                            {{ location.customer_name }}
                                        </p>
                                        <p class="text-subtitle-1 font-weight-light text-grey-darken-3 mx-4">
                                            <!-- <v-icon>mdi-map-marker</v-icon> -->
                                            {{ location.address }}
                                        </p>
                                    </div>
                                    
                                    <div class="d-flex align-center mt-4 w-100">
                                        <v-chip size="small" class="ml-2" :color="getStatusChipColor(location.status)">
                                                {{ location.status }}
                                        </v-chip>
                                        <template v-if="location.has_dog">
                                            <div class="px-4 d-flex flex-column align-center">
                                                <v-icon class="text-center">mdi-dog-side</v-icon>
                                                <p class="text-center text-subtitle-2 font-weight-light">Dog</p>
                                            </div>
                                        </template>
                                        <template v-if="location.has_fence">
                                            <div class="px-4 d-flex flex-column align-center">
                                                <v-icon class="text-center">mdi-gate</v-icon>
                                                <p class="text-center text-subtitle-2 font-weight-light">Fence</p>
                                            </div>
                                        </template>
                                        <template v-if="location.has_sprinkler">
                                            <div class="px-4 d-flex flex-column align-center">
                                                <v-icon class="text-center">mdi-sprinkler</v-icon>
                                                <p class="text-center text-subtitle-2 font-weight-light">Sprinkler</p>
                                            </div>
                                        </template>
                                    </div>
                                    
                                </div>
                                
                                <div class="text-center mr-8">
                                    <p class="text-subtitle-1 font-weight-light">Yard Size</p>
                                    <p class="text-h6">{{ formatArea(location.square_feet) }} sq ft</p>
                                </div>
                            </div>
                        </v-list-item>
                    </v-list>
                </v-col>
            </v-row>
        </v-sheet>
    </v-container>
    <v-bottom-sheet v-model="openLocation" height="90%">
        <LocationProfile :location="targetLocation" :statusList="statusList" :serviceDays="serviceDays" />
        <v-btn @click="openLocation = false" color="dark" variant="text" class="absolute-top-right mt-4 mr-2">
            <v-icon class="text-h4">mdi-close</v-icon>
        </v-btn>
    </v-bottom-sheet>
</template>


<script>
import { supabase } from '../../supabase';
import { queryServiceDay } from '../../services/supaService'

import LocationProfile from '../locations/locationProfile.vue';

export default {
    name: 'locations',
    components: {
        LocationProfile
    },
    data() {
        return {
            locations: null,
            locationSearch: '',
            targetLocation: null,
            hasDog: false,
            hasFence: false,
            hasSprinkler: false,
            statusList: ['Customer', 'Prospect', 'Churned'],
            statuses: ['Customer', 'Prospect'],
            serviceDays: null,
            selectedServiceDays: null,
            isFocused: false,
            openLocation: false,
        };
    },
    computed: {
        filteredSearch() {
            if (this.locations) {
                if (!this.locationSearch && this.statuses.length == 0) {
                    return this.locations;
                }
                else {
                    const search = this.locationSearch.toLowerCase();
                    return this.locations.filter(location => {
                        const matchesSearch = location.customer_name.toLowerCase().includes(search) || location.address.toLowerCase().includes(search);
                        const matchesStatus = this.statuses.some(status => location.status.includes(status));

                        const matchesDog = this.hasDog ? location.has_dog === this.hasDog : true;
                        const matchesFence = this.hasFence ? location.has_fence === this.hasFence : true;
                        const matchesSprinkler = this.hasSprinkler ? location.has_sprinkler === this.hasSprinkler : true;

                        const matchesDay = this.filterServiceDay(location)
                        
                        return matchesSearch && matchesStatus && matchesDog && matchesFence && matchesSprinkler && matchesDay;
                    });
                }
            }
        }
    },
    beforeMount() {
        this.getLocations().then((data) => {
            this.locations = data;
        });
        queryServiceDay().then((data) => {
            this.serviceDays = data
        });
        console.log(this.serviceDays)
    },
    methods: {
        async getLocations() {
            const { data, error } = await supabase
                .from('locations')
                .select()
                .eq('is_deleted', false);
            if (error)
                throw error;
            return data;
        },
        filterServiceDay(location) {
            if (this.selectedServiceDays && this.selectedServiceDays.length > 0) {
                const ids = this.serviceDays.filter(day => this.selectedServiceDays.includes(day.name)).map(day => day.id)
                return ids.some(id => location.service_day_id == id);
            } else {
                return true
            }
        },
        getStatusChipColor(status) {
            if (status == 'Customer') {
                return 'brand';
            }
            else if (status == 'Churned') {
                return 'red';
            }
            else {
                return 'blue';
            }
        },
        formatArea(area) {
            return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(area);
        },
        openLocationProfile(location) {
            this.targetLocation = location;
            this.openLocation = true;
        },
    },
}
</script>

<style scoped>
.primary-button {
    background-color: #30B03E;
}
.primary-button:hover {
    background-image: linear-gradient(to right, #7fcb87, #30B03E 60%, #7fcb87);
}

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
      transform: scale(1.05); /* Increase size by 50% */
    }
  }
</style>