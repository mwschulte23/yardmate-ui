<template>
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
            :dot-color="getOrderTypeColor(order.type)"
            size="small"
        >
            <p class="text-subtitle-2 font-weight-semibold">
                {{ order.orders.type }} on {{ order.orders.created_at.slice(0, 10) }}
            </p>
        </v-timeline-item>
    </v-timeline>
    <div v-else>
        <p class="text-center text-overline font-weight-semibold">No orders found</p>
    </div>
</template>

<script>
import { queryLocationOrder } from '../../services/supaService'

export default {
    name: 'locationOrderHist',
    props: {
        locationId: Number
    },
    data() {
        return {
            orders: null,
        }
    },
    mounted() {
        queryLocationOrder(this.locationId).then((data) => {
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
        },
    }
}
</script>
