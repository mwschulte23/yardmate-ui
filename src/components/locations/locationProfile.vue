<template>
<div class="pt-16 pb-4 px-4 bg-white h-100 w-100" style="padding-top: 10%;">
    <v-row cols="12" class="h-50">
        <v-col cols="12" md="4" class="ma-2 bg-accent1 rounded-lg">
            <p class="text-center text-overline font-weight-bold">Location Details</p>
            <v-table class="bg-transparent mx-auto" style="width: 80%;">
                <tbody>
                    <tr class="text-subtitle-2 font-weight-light">
                        <td>Customer</td><td>{{ location.customer_name }}</td>
                    </tr>
                    <tr class="text-subtitle-2 font-weight-light">
                        <td>Address</td><td>{{ location.address }}</td>
                    </tr>
                    <tr class="text-subtitle-2 font-weight-light">
                        <td>Status</td><td>{{ location.status }}</td>
                    </tr>
                    <tr class="text-subtitle-2 font-weight-light">
                        <td>Yard Size</td><td>{{ Math.round(location.square_feet) }} sq ft</td>
                    </tr>
                    <tr class="text-subtitle-2 font-weight-light">
                        <td>Add'n Details</td><td>4 Trees, 200 sq ft patio, 2 flower beds, have dog, meanies</td>
                    </tr>
                </tbody>
            </v-table>
        </v-col>
        <v-col class="ma-2 bg-darkbrand rounded-lg">
            <p class="text-center text-overline font-weight-semibold">Map</p>
        </v-col>
    </v-row>
    <v-row cols="12" class="h-50">
        <v-col cols="12" md="8" class="ma-2 bg-lightbrand rounded-lg h-100">
            <p class="text-center text-overline font-weight-semibold">Adjust</p>
            <div class="d-flex justify-space-between align-center flex-wrap">
                <div class="bg-orange flex-grow-1 mr-4">
                    <p>Yard Size</p>
                    <v-slider>
                        
                    </v-slider>
                </div>
                <v-divider vertical />
                <div class="bg-orange w-25 mr-4">
                    abc
                </div>
                <v-divider vertical />
                <div class="bg-orange w-25">
                    abc
                </div>
            </div>
        </v-col>
        <v-col class="ma-2 bg-accent2 rounded-lg">
            <p class="text-center text-overline font-weight-semibold">Recent Orders</p>
            <v-timeline side="end" class="px-4" style="height: 80%;" truncate-line="start">
                <v-timeline-item
                    v-for="item in items"
                    :dot-color="item.color"
                    size="small"
                >
                    <p class="text-subtitle-2 font-weight-semibold">
                        {{ item.type }} on {{ item.date }}
                    </p>
                </v-timeline-item>
            </v-timeline>
        </v-col>
    </v-row>
</div>
</template>

<script>

export default {
    name: 'locationProfile',
    props: {
        location: Object
    },
    data() {
        return {
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
    }
}
</script>