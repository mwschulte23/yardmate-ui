<template>
<div class="pt-16 pb-4 px-4 bg-white h-100 w-100 overflow-y-auto" style="padding-top: 10%;">
    <v-row cols="12" class="h-100">
        <v-col cols="12" md="4" class="h-100">
            <!-- left "cards" -->
            <v-row class="h-50 pa-0 my-0">
                <!-- carousel -->
                <v-col class="pa-1">
                    <v-sheet class="h-100 w-100 mb-1 bg-accent1 rounded-lg">
                        <v-carousel 
                            class="h-100" 
                            :show-arrows="false" 
                            vertical-delimiters="left"
                            direction="vertical"
                            hide-delimiter-background 
                            
                        >
                            <v-carousel-item class="mb-4">
                                <locationDetail :location="location" />
                            </v-carousel-item>
                            <v-carousel-item class="mb-4">
                                <p class="text-center text-overline font-weight-semibold">Map</p>
                                <div class="h-75 d-flex align-center justify-center">COMING SOON!</div>    
                            </v-carousel-item>
                            <v-carousel-item class="mb-4">
                                <p class="text-center text-overline font-weight-semibold">Recent Orders</p>
                                <v-timeline 
                                    v-if="orders"
                                    side="end" 
                                    class="px-4 mt-2" 
                                    style="height: 80%;" 
                                    truncate-line="start"
                                >
                                    <v-timeline-item
                                        v-for="order in orders"
                                        :dot-color="getOrderTypeColor(order.orders.type)"
                                        size="small"
                                    >
                                        <p class="text-subtitle-2 font-weight-semibold">
                                            {{ order.orders.type }} on {{ order.orders.created_at.slice(0, 10) }}
                                        </p>
                                    </v-timeline-item>
                                </v-timeline>
                                <div v-else>
                                    <p>No orders found</p>
                                    {{ this.orders }}
                                </div>
                            </v-carousel-item>
                        </v-carousel>
                    </v-sheet>
                </v-col>
            </v-row>
            <v-row class="h-50 pa-0 my-0">
                <!-- future map -->
                <v-col class="pa-1">
                    <v-sheet class="h-100 w-100 bg-grey-lighten-1 rounded-lg">
                        <p class="text-center text-overline font-weight-semibold">Map</p>
                        <div class="h-75 d-flex align-center justify-center">COMING SOON!</div>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-col>
        <v-col rows="12" md="8" class="h-100 py-4">
            <v-sheet class="h-100 bg-lightbrand rounded-lg">
                <p class="text-center text-overline font-weight-semibold">Refine</p>
                <div class="d-flex justify-space-around align-center flex-wrap mt-12">
                    <div class="mx-4">
                        <p>Square Foot Adjuster</p>
                        <v-slider></v-slider>
                    </div>
                    <div class="mx-4">
                        <p>Add Extra Detail</p>
                        <v-slider></v-slider>
                    </div>
                </div>
                <v-divider></v-divider>
                <div class="mt-12">
                    <p class="text-center text-overline font-weight-bold">Additional Details</p>
                    <v-table class="bg-transparent mx-auto" density="compact" style="width: 90%;">
                        <thead>
                            <tr>
                                <th class="text-center">Name</th>
                                <th class="text-center">Value</th>
                                <th class="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(detail, index) in [{'name': 'abc', 'value': 2}, {'name': 'def', 'value': 3}, {'name': 'ghi', 'value': 4}]"
                                :key="index"
                            >
                                <td class="text-center text-subtitle-2 font-weight-light">{{ detail.name }}</td>
                                <td class="text-center text-subtitle-2 font-weight-light">{{ detail.value }}</td>
                                <td class="text-center text-subtitle-2 font-weight-light w-25">
                                    <v-icon class="mr-1">mdi-pencil</v-icon><v-icon>mdi-delete-outline</v-icon>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </div>
            </v-sheet>
        </v-col>
    </v-row>
</div>
<!--
        <v-col class="ma-2 bg-darkbrand rounded-lg">
            <p class="text-center text-overline font-weight-semibold">Map</p>
            <div class="h-75 d-flex align-center justify-center">COMING SOON!</div>
        </v-col>
    </v-row>
    <v-row cols="12" class="h-50">
        <v-col cols="12" md="4" class="ma-2 bg-accent1 rounded-lg">
            

        </v-col>
        <v-col class="ma-2 bg-darkbrand rounded-lg">
            <p class="text-center text-overline font-weight-semibold mb-4">Add'n Info</p>
            <div class="d-flex justify-space-between align-center mx-auto" style="width: 90%;">
                <v-text-field
                    v-model="newInfoName"
                    label="Detail Name"
                    density="compact"
                    variant="outlined"
                    class="mr-1"
                ></v-text-field>
                <v-text-field
                    v-model="newInfoValue"
                    label="Detail"
                    density="compact"
                    variant="outlined"
                ></v-text-field>
            </div>
            
        </v-col>
    </v-row>
</div> -->
</template>

<script>
import { queryLocationOrder } from '../../services/supaService'
import locationDetail from './locationDetail.vue'

export default {
    name: 'locationProfile',
    components: {
        locationDetail
    },
    props: {
        location: Object
    },
    data() {
        return {
            orders: null,
            locationCards: 0,
            items: [
                {
                    'type': 'fertilizer',
                    'date': '2024-02-03',
                    'color': 'accent1'
                },
                {
                    'type': 'seed',
                    'date': '2024-01-03',
                    'color': 'brand'
                },
                {
                    'type': 'fertilizer',
                    'date': '2023-06-28',
                    'color': 'accent1'
                }
            ],
        }
    },
    beforeMount() {
        queryLocationOrder(this.location.id).then((data) => {
            this.orders = data
        })
    },
    methods: {
        getOrderTypeColor(type) {
            if (type == 'fertilizer') {
                return 'brand'
            } else if (type == 'seed') {
                return 'accent1'
            } else {
                return 'lightbrand'
            }
        }
    }
}
</script>