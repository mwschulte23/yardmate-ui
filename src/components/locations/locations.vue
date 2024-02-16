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
            <v-row cols="12">
                <v-col cols="12" md="7" class="ml-4">
                    <v-text-field
                        v-model="locationSearch"
                        :color="isFocused ? 'darkbrand' : 'dark' "
                        @focus="isFocused = true"
                        @blur="isFocused = false"
                        @input="console.log('thing input')"
                        placeholder="Filter Locations"
                        append-inner-icon="mdi-magnify"
                        density="comfortable"
                        variant="outlined"
                        class="mr-4"
                    />
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="4" class="mr-4">
                    <v-select
                        chips
                        multiple
                        placeholder="Customer Status"
                        variant="outlined"
                        density="comfortable"
                        v-model="statuses"
                        :items="statusList"
                    />
                </v-col>
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
                                    <p class="text-subtitle-1 font-weight-light">Square Feet</p>
                                    <p class="text-h6">{{ Math.round(location.square_feet) }}</p>
                                </div>
                            </div>
                        </v-list-item>
                    </v-list>
                </v-col>
            </v-row>
        </v-sheet>
    </v-container>
    <v-bottom-sheet v-model="openLocation" height="90%">
        <LocationProfile :location="targetLocation" />
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
            statuses: ['Customer', 'Prospect', 'Churned'],
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
                .select('id, customer_name, status, address, square_feet, lat, lon')
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