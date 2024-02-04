<template>
    <p class="my-2">Locations</p>
    <v-card flat class="elevation-1 bg-lightbrand">
        <template v-slot:text>
            <v-text-field
                v-model="search"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                single-line
                density="compact"
                variant="outlined"
                hide-details
            ></v-text-field>
        </template>
        <v-data-table
            v-model="selected"
            class="bg-transparent"
            item-value="id"
            :headers="headers" 
            :items="locations" 
            :search="search"
            min-height="250" 
            max-height="500"
            density="comfortable"
            show-select
        ></v-data-table>
    </v-card>
</template>

<script>
export default {
    name: 'LocationTable',
    props: {
        locations: Array
    },
    data() {
        return {
            search: '',
            headers: [
                { title: 'Customer', key: 'customer_name' },
                { title: 'Status', key: 'status' },
                { title: 'Address', key: 'address' },
                { title: 'Sq Feet', key: 'square_feet' },
            ],
            selected: []
        };
    },
    watch: {
        selected: {
            handler(newVal) {
                const total = newVal.reduce((accumulator, locationId) => {
                    const location = this.locations.find(location => location.id == locationId);
                    return accumulator + (location ? location.square_feet : 0)
                }, 0)
                this.$store.commit('SET_SELECTED_LOCATION_IDS', newVal)
                this.$store.commit('SET_SELECTED_SQUARE_FEET', total)
            },
            immediate: true, // This will run the handler immediately upon component creation
            deep: true // This will watch nested properties inside 'selected'
        }
    },
    mounted() {
    },
    methods: {
        // 
    }
}
</script>