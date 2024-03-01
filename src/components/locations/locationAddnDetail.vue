<template>
    <p class="text-center text-overline font-weight-bold">Additional Details</p>
    <v-table class="bg-transparent mx-auto my-8 pl-4" style="width: 80%;">
        <tbody>
            <tr class="text-subtitle-2 font-weight-light">
                <td>Has Dog?</td><td><v-icon>{{ location.has_dog ? 'mdi-check-circle' : 'mdi-circle-outline' }}</v-icon></td>
            </tr>
            <tr class="text-subtitle-2 font-weight-light">
                <td>Has Fence?</td><td><v-icon>{{ location.has_fence ? 'mdi-check-circle' : 'mdi-circle-outline' }}</v-icon></td>
            </tr>
            <tr class="text-subtitle-2 font-weight-light">
                <td>Has Sprinkler?</td><td><v-icon>{{ location.has_sprinkler ? 'mdi-check-circle' : 'mdi-circle-outline' }}</v-icon></td>
            </tr>
            <tr class="text-subtitle-2 font-weight-light">
                <td>Normal Service Day</td><td>{{ serviceDay }}</td>
            </tr>
            <tr class="text-subtitle-2 font-weight-light">
                
            </tr>
        </tbody>
    </v-table>
</template>

<script>
export default {
    props: {
        location: Object,
        serviceDay: String
    }
}
</script>

