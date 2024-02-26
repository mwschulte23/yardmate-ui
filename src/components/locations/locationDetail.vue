<template>
    <p class="text-center text-overline font-weight-bold">Location Details</p>
    <v-table class="bg-transparent mx-auto my-8 pl-4" style="width: 80%;">
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
        </tbody>
    </v-table>
</template>

<script>
export default {
    props: {
        location: Object
    }
}
</script>

