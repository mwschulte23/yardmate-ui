<template>
    <v-container class="mb-8">
        <v-row class="pa-8">
            <!-- <v-col>
                <v-card flat class="elevation-1 rounded-lg bg-white">
                    <v-card-title>Build Order</v-card-title>
                    <v-card-subtitle>PUT MORE ADVANCED ORDER BUILDER HERE!!!</v-card-subtitle>
                    <v-card-text>
                        <div class="d-flex justify-space-between">
                            <v-select chips label="Supply to Order" :items="['Fertilizer', 'Seed', 'Weed Control']" variant="underlined" />
                            <v-text-field label="" type="number"></v-text-field>
                        </div>
                    </v-card-text>
                    
                </v-card>
            </v-col> -->
            
        </v-row>
        <v-row>
            <v-col class="mx-10 rounded-lg bg-white pb-12 elevation-1">
                <p class="text-h6 font-weight-semibold mx-2 my-4">Order History</p>
                <v-expansion-panels flat variant="accordion" v-if="orders">
                    <v-expansion-panel
                        class="bg-transparent"
                        elevation="0"
                        v-for="order in orders"
                        :key="order.id"
                    >
                        <v-expansion-panel-title>Order #{{ order.id }} - {{ order.type }}</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-sheet class="d-flex justify-space-around align-center">
                                <v-sheet class="text-center bg-transparent">
                                    <p class="text-subtitle-2 font-weight-light">Material</p>
                                    <p class="text-subtitle-1">{{ order.order_info.bags_needed }} bags</p>
                                </v-sheet>
                                <v-divider vertical></v-divider>
                                <v-sheet class="text-center bg-transparent">
                                    <p class="text-subtitle-2 font-weight-light">Sq. Feet</p>
                                    <p class="text-subtitle-1">{{ order.order_info.square_feet }}</p>
                                </v-sheet>
                                <v-divider vertical></v-divider>
                                <v-sheet class="text-center bg-transparent">
                                    <p class="text-subtitle-2 font-weight-light">Fertilizer per 1k Sq. Feet</p>
                                    <p class="text-subtitle-1">{{ order.order_info.fertilizer_per_thousand }}</p>
                                </v-sheet>
                                <v-divider vertical></v-divider>
                                <v-sheet class="text-center bg-transparent">
                                    <p class="text-subtitle-2 font-weight-light">Lbs per Bag</p>
                                    <p class="text-subtitle-1">{{ order.order_info.lbs_per_bag }}</p>
                                </v-sheet>
                                <v-divider vertical></v-divider>
                                <v-sheet class="text-center bg-transparent">
                                    <p class="text-subtitle-2 font-weight-light">Nitrogen Percent</p>
                                    <p class="text-subtitle-1">{{ order.order_info.percent_nitrogen }}</p>
                                </v-sheet>
                                <v-divider vertical></v-divider>
                                <v-sheet class="text-center bg-transparent">
                                    <p class="text-subtitle-2 font-weight-light">Locations</p>
                                    <p class="text-subtitle-1">20</p>
                                </v-sheet>
                            </v-sheet>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    
                    <v-expansion-panel
                        v-for="i in 3"
                        :key="i"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    ></v-expansion-panel>
                </v-expansion-panels>
            </v-col>


        </v-row>
        <v-row>
            <v-col>
                <!-- <v-card flat class="rounded-lg bg-accent1 pa-6">
                    <v-sheet class="bg-transparent d-flex justify-space-between align-center">
                        <v-sheet class="bg-transparent">
                            <v-card-title>
                                Order #{{ orders.id }}
                            </v-card-title>
                            <v-card-subtitle>
                                Created on {{ orders.created_at.slice(0, 10) }}
                            </v-card-subtitle>
                        </v-sheet>
                        <v-chip class="ml-2" size="small" color="lightbrand" variant="elevated">{{ orders.type }}</v-chip>
                    </v-sheet>
                    <v-card-text>
                        <v-list class="bg-transparent" direction="horizontal">
                            <v-list-item>
                                Bags Needed: {{ orders.order_info.bags_needed }}
                            </v-list-item>
                            <v-list-item>
                                Square Feet: {{ orders.order_info.square_feet }}
                            </v-list-item>
                            <v-list-item>
                                Fertilizer per 1k Square Feet: {{ orders.order_info.fertilizer_per_thousand }} Lbs
                            </v-list-item>
                            <v-list-item>
                                Lbs per Bag: {{ orders.order_info.lbs_per_bag }}%
                            </v-list-item>
                            <v-list-item>
                                Nitrogen Percent: {{ orders.order_info.percent_nitrogen }}%
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card> -->
            </v-col>
        </v-row>
        <v-row>

        </v-row>
    </v-container>
</template>

<script>
import { supabase } from '../../supabase'

export default {
    name: 'Order',
    data() {
        return {
            orders: null
        }
    },
    mounted() {
        this.getOrders().then((orders) => {
            if (orders) {
                console.log(orders[0])
                this.orders = orders
            }
        })
    },
    // mounted() {
        
    // },
    methods: {
        async getOrders() {
            const { data, error } = await supabase
                .from('orders')
                .select('id, type, order_info, created_at')
                .order('created_at', {ascending: false})
            
            if (error) {
                throw error;
            } else {
                return data
            }
        }
    }
}
</script>