<template>
    <v-card flat class="bg-white text-dark rounded-lg" min-height="50" max-height="500">
        <v-sheet class="bg-transparent d-flex justify-space-between pb-2">
            <v-sheet class="bg-transparent">
                <v-card-title>
                    Order History
                </v-card-title>
                <v-card-subtitle class="pb-2">
                    Lookup Saved Past Orders
                </v-card-subtitle>
            </v-sheet>
            <v-sheet class="bg-transparent mx-3 mt-3">
                <p class="text-center font-weight-light mb-2">Past Orders</p>
                <p class="text-center">{{ orderCt }}</p>
            </v-sheet>
        </v-sheet>

        <v-table v-show="show" class="rounded-0">
            <thead>
                <tr>
                    <th class="text-center">Order ID</th>
                    <th class="text-center">Type</th>
                    <th class="text-center">Bags</th>
                    <th class="text-center">Created</th>
                </tr>
            </thead>
            <tbody> <!-- TODO each order clickable w/ order_detail & location list -->
                <tr
                    v-for="(order, index) in orders"
                    :key="index"
                >
                <td class="text-center font-weight-light">{{ order.id }}</td>
                <td class="text-center">{{ order.type }}</td>
                <td class="text-center">{{ order.order_info.bags_needed }}</td>
                <td class="text-center">{{ order.created_at.slice(0, 10) }}</td>
            </tr>
            </tbody>
        </v-table>
        <div class="w-100">
            <v-btn @click="$router.push('/order')" variant="text" color="darkbrand" class="text-center w-100">
                See More
            </v-btn>
        </div>
    </v-card>
</template>

<script>
import { supabase } from '../../supabase'

export default {
    name: 'OrderHistCard',
    data() {
        return {
            show: true,
            orderCt: 0,
            orders: []
        }
    },
    computed: {
        // 
    },
    mounted() {
        this.getOrderCount().then((orders) => {
            this.orderCt = orders.length
            this.orders = orders.slice(0, 3)
        })
    },
    methods: {
        async getOrderCount() {
            const { data, error } = await supabase
                .from('orders')
                .select('id, type, order_info, created_at')
                .order('created_at', {ascending: false})
            
            return data
        }
    }
}
</script>

<style>
.expandable-div {
    cursor: pointer;
}
</style>