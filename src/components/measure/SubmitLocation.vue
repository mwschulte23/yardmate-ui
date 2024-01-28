<template>
    <v-card>
        <v-form>
            <v-text-field
                v-model="customerName"
                label="Customer"
                variant="outlined"
                class="bg-white"
                :color="isFocused == 'customer' ? 'darkbrand' : 'dark' "
                @focus="isFocused = 'customer'"
                @blur="isFocused != 'customer'"
                autofocus
                required
                hide-details
            />
            <v-select 
                v-model="customerStatus"
                :items="statuses"    
                label="Customer Status"     
                variant="outlined"
                class="bg-white"
                :color="isFocused == 'status' ? 'darkbrand' : 'dark' "
                @focus="isFocused = 'status'"
                @blur="isFocused != 'status'"
                required
                hide-details
            />
            <v-card-actions>
                <v-btn @click="closeForm">Close</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>

export default {
    name: 'SubmitLocation',
    props: {
        area: Number,
    },
    data() {
        return {
            customerName: '',
            customerStatus: '',
            address: ''
        }
    },
    methods: {
        closeForm() {
            this.$emit('openForm', false)
        },
    }
};

</script>