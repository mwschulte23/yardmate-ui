<template>
    <v-row cols="12" class="pt-8 pb-6 px-12 bg-white rounded-lg">
        <v-col cols="12" md="6">
            <p class="text-h6 pb-4">Basics</p>
            <v-list class="bg-transparent">
                <v-list-item class="font-weight-light">
                    <v-tooltip location="bottom" text="Company Name">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="mr-8">mdi-domain</v-icon>
                        </template>
                    </v-tooltip>
                    <span class="font-weight-regular">{{ $store.state.companyName }}</span>
                </v-list-item>
                <v-list-item class="font-weight-light">
                    <v-tooltip location="bottom" text="Company Admin">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="mr-8">mdi-shield-account</v-icon>
                        </template>
                    </v-tooltip>
                    <span class="font-weight-regular">{{ $store.state.userName }}</span>
                </v-list-item>
                <v-list-item class="font-weight-light">
                    <v-tooltip location="bottom" text="Account Created Date">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="mr-8">mdi-clock-time-eight-outline</v-icon>
                        </template>
                    </v-tooltip>
                    <span class="font-weight-regular">{{ company }}</span>
                </v-list-item>
            </v-list>
        </v-col>
        <v-col>
            <p class="text-h6 pb-4">Plan & Billing</p>
            <v-list class="bg-transparent">
                <v-list-item class="font-weight-light">
                    <v-tooltip location="bottom" text="Plan">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="mr-8">mdi-card-outline</v-icon>
                        </template>
                    </v-tooltip>
                    <span class="font-weight-regular">Beta Customer</span>
                </v-list-item>
                <v-list-item class="font-weight-light">
                    <v-tooltip location="bottom" text="Monthly Price">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="mr-8">mdi-cash</v-icon>
                        </template>
                    </v-tooltip>
                    <span class="font-weight-regular">Free</span>
                </v-list-item>
                <v-list-item class="font-weight-light">
                    <v-tooltip location="bottom" text="Upgrade">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="mr-8">mdi-one-up</v-icon>
                        </template>
                    </v-tooltip>
                    <span @click="console.log('abc')" class="font-weight-bold text-light rounded-lg bg-accent1 px-2 py-1">
                        Upgrade
                    </span>
                </v-list-item>
            </v-list>
        </v-col>
    </v-row>
</template>


<script>

export default {
    name: 'Account',
}
</script>