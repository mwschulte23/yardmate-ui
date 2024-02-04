<template>
    <v-card flat class="bg-white mt-16">
        <v-card-title>
            Contact Us
        </v-card-title>
        <v-card-subtitle class="pb-6">
            How to get in touch
        </v-card-subtitle>
        <v-expand-transition>
            <div v-show="show">
                <v-list density="comfortable">
                    <v-list-item class="font-weight-light">
                        Our Support Email is support@abc.com
                    </v-list-item>
                    <v-list-item class="font-weight-light">
                        Your direct point of contact is Mike (mike@abc.com or (555) 555-5555)
                    </v-list-item>
                    <v-list-item class="font-weight-light">
                        Have Feedback? Call the owners, Mike or James (call James, he is nicer :).
                    </v-list-item>
                </v-list>
            </div>
        </v-expand-transition>
        <div @click="show = !show" class="expandable-div d-flex justify-center bg-lightbrand w-full">
            <v-icon size="large" class="text-center">{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </div>
    </v-card>
</template>

<script>

export default {
    name: 'ContactFooter',
    data() {
        return {
            show: false
        }
    }
}
</script>

<style>
.expandable-div {
    cursor: pointer;
}
</style>