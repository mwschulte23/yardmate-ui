<template>
    <v-row cols="12" class="pt-16 pb-6 px-12 bg-white rounded-lg">
        <v-col class="">
            <v-text-field
                class="pb-2"
                v-model="full_name"
                variant="underlined"
                label="Name"
                density="compact"
            />
            <v-text-field
                class="pb-2"
                v-model="email"
                type="email"
                variant="underlined"
                density="compact"
                label="Email"
                
            />
            <!-- <v-text-field
                class="pb-2"
                v-model="company"
                variant="underlined"
                density="compact"
                label="Company"
                :placeholder="company"
                
            /> -->
            <v-sheet class="d-flex justify-end bg-transparent mt-4 mb-0">
                <v-btn @click="console.log('hooray')" color="brand" variant="tonal">
                    Save
                </v-btn>
            </v-sheet>
        </v-col>
    </v-row>
    
    <ContactInfo />
</template>


<script>
import ContactInfo from './ContactInfo.vue';

export default {
    name: 'Profile',
    components: {
        ContactInfo,
    },
}
</script>