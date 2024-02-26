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
                    <p class="text-start text-subtitle-1 mr-1">Customer Status</p>
                    <v-chip-group
                        multiple
                        column
                        v-model="statuses"
                        class="d-flex justify-start align-center"
                    >
                        <v-chip
                            v-for="(status, index) in statusList" 
                            :key="index" 
                            :value="status"
                            filter
                            variant="outlined"
                            color="accent2"    
                            size="small"
                        >
                            {{ status }}
                        </v-chip>
                    </v-chip-group>
                </v-col>
                <v-col>
                    <p>Location Details</p>
                    <v-chip-group
                        multiple
                        column
                        class="d-flex justify-start align-center"
                    >
                        <v-chip
                            value="has dog"
                            filter
                            variant="outlined"
                            color="accent1"
                            size="small"
                        >
                            Has Dog?
                        </v-chip>
                        <v-chip
                            value="has fence"
                            filter
                            variant="outlined"
                            color="accent1"
                            size="small"
                        >
                            Has Fence
                        </v-chip>
                        <v-chip
                            value="has sprinkler"
                            filter
                            variant="outlined"
                            color="accent1"
                            size="small"
                        >
                            Has Sprinkler?
                        </v-chip>
                    </v-chip-group>
                </v-col>
                <v-col cols="3"></v-col>
            </v-row>
            <v-row cols="12">
                <v-col 
                    cols="12"
                    class="bg-transparent"
                    v-for="location in filteredSearch"
                >
                    <v-list class="bg-transparent">
                        <v-list-item 
                            class="py-4 border-b-sm"
                            @click="openLocationProfile(location)"
                        >
                            <div class="d-flex justify-space-between align-center">
                                <div>
                                    <p class="text-h6 font-weight-semibold text-dark ml-1 mb-1">
                                        {{ location.customer_name }}
                                        <v-chip size="small" class="ml-2" :color="getStatusChipColor(location.status)">
                                            {{ location.status }}
                                        </v-chip>
                                    </p>
                                    <p class="text-subtitle-1 font-weight-light text-grey-darken-3">
                                        <v-icon>mdi-map-marker</v-icon>{{ location.address }}
                                    </p>
                                </div>
                                <div class="text-center mr-8">
                                    <p class="text-subtitle-1 font-weight-light">Yard Size</p>
                                    <p class="text-h6">{{ Math.round(location.square_feet) }} sq ft</p>
                                </div>
                            </div>
                        </v-list-item>
                    </v-list>
                </v-col>
            </v-row>
        </v-sheet>
    </v-container>
    <v-bottom-sheet v-model="openLocation" height="90%">
        <LocationProfile :location="targetLocation" :statuses="statuses" />
        <v-btn @click="openLocation = false" color="dark" variant="text" class="absolute-top-right mt-4 mr-2">
            <v-icon class="text-h4">mdi-close</v-icon>
        </v-btn>
    </v-bottom-sheet>
</template>


<script>
import { supabase } from '../../supabase';
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
            statusList: ['Customer', 'Prospect', 'Churned'],
            statuses: ['Customer', 'Prospect'],
            targetLocation: null,
            isFocused: false,
            openLocation: false
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
                        return matchesSearch && matchesStatus;
                    });
                }
            }
        }
    },
    mounted() {
        this.getLocations().then((data) => {
            this.locations = data;
        });
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
        openLocationProfile(location) {
            this.targetLocation = location;
            this.openLocation = true;
        }
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