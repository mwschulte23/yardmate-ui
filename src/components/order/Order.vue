<template>
    <v-container class="mb-8">
        <v-row cols="12" class="rounded-lg bg-white elevation-1 mb-2">
            <v-col cols="2" class="bg-darkbrand rounded-s-lg">
                <h3 class="pb-4">Order Builder</h3>
                <v-radio-group v-model="orderType">
                    <v-radio label="Fertilizer" value="fertilizer"></v-radio>
                    <v-radio label="Seed" value="seed"></v-radio>
                    <v-radio label="Sod" value="sod"></v-radio>
                </v-radio-group>
            </v-col>
            <v-col class="px-12">
                <h3 class="font-weight-light">{{ orderType }}</h3>
                <v-form class="pt-4">
                    <div class="mt-8 mb-4">
                        <div
                            v-for="nutrient in [{'varName': 'percentNitrogen', 'label': 'Nitrogen (N)'}, {'varName': 'percentPhosphorus', 'label': 'Phosphorus (P)'}, {'varName': 'percentPotassium', 'label': 'Potassium (K)'}]"
                        >
                            <p class="mb-0 text-grey-darken-1 font-weight-light text-subtitle-2">{{ nutrient.label }}</p>
                            <v-slider
                                v-model="this[nutrient.varName]"
                                min="0"
                                max="100"
                                step="1"
                                color="brand"
                                track-color="darkbrand"
                                class="mr-4"
                            >
                                <template v-slot:append>
                                    <v-text-field
                                        v-model="this[nutrient.varName]"
                                        variant="outlined"
                                        density="compact"
                                        type="number"
                                        class="bg-white"
                                        style="width: 70px;"
                                        flat
                                        hide-details
                                        single-line
                                    />
                                </template>
                            </v-slider>
                        </div>
                    </div>

                    <div class="d-flex justify-space-between align-center mt-4">
                        <!-- <div class="w-25">
                            <v-select
                                multiple
                                chips
                                class="pr-4 w-100 flex-shrink-1"
                                variant="outlined"
                                label="Customer Status"
                                :items="['Customer', 'Prospect', 'Churned']"
                            />
                        </div> -->
                        <v-text-field
                            v-model="fertilizerPer1k"
                            variant="outlined"
                            color="brand"
                            type="number"
                            hint="Lbs per 1k Sq. Feet"
                            class="mx-2 w-25"
                            flat
                            persistent-hint
                            clearable
                            single-line
                        />

                        <v-select
                            chips
                            multiple
                            class="pr-4 w-100"
                            variant="outlined"
                            label="Select Locations"
                            :items=customerNames
                        ></v-select>
                    </div>

                    <div class="w-100 d-flex justify-end pr-4 mb-2">
                        <v-btn type="submit" color="brand" class="px-4">
                            Get Products
                        </v-btn>
                    </div>
                    
                    
                </v-form>
            </v-col>
        </v-row>
        <v-row cols="12" class="mb-12">
            <v-col cols="12" class="elevation-2 bg-accent1 rounded-lg">
                
                <p class="text-h6 font-weight-semibold mx-2 my-4">Details</p>
                <v-table class="bg-transparent">
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-center">Product</th>
                                <th class="text-center">Price</th>
                                <th class="text-center">Bags Needed</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                class="text-white"
                                v-for="i in [{'product': 'Ferty', 'price': '$1', 'bagsNeeded': '10'}, {'product': 'Apples', 'price': '$1', 'bagsNeeded': '5'}, {'product': 'a', 'price': '$1', 'bagsNeeded': '7'}, {'product': 'a', 'price': '$1', 'bagsNeeded': '3'}]"
                            >
                                <td class="text-center">{{ i.product }}</td>
                                <td class="text-center">{{ i.price }}</td>
                                <td class="text-center">{{ i.bagsNeeded }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-table>
            </v-col>
        </v-row>


        <v-row cols="12">
            <v-col cols="12" md="6" class="rounded-lg bg-white pb-12 elevation-1">
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
                {{ customerNames }}
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { supabase } from '../../supabase'

export default {
    name: 'Order',
    data() {
        return {
            orders: null,
            orderType: 'fertilizer',
            percentNitrogen: 10,
            percentPhosphorus: 0,
            percentPotassium: 0,
            fertilizerPer1k: 1,
            locations: null
        }
    },
    computed: {
        customerNames() {
            return this.locations ? this.locations.map(location => location.customer_name) : [];
        }
    },
    mounted() {
        this.getOrders().then((orders) => {
            if (orders) {
                console.log(orders[0])
                this.orders = orders
            }
        });
        this.getLocations().then((data) => {
            this.locations = data;
        });
    },
    // mounted() {
        
    // },
    methods: {
        async getLocations() {
            const { data, error } = await supabase
                .from('locations')
                .select('id, customer_name, status, address, square_feet')
                .eq('is_deleted', false)
            
            if (error) throw error;
            
            return data
        },
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
