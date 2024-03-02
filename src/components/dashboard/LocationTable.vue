<template>
    <v-card flat class="mb-0 mx-12 bg-transparent">
        <template v-slot:text>
            <v-text-field
                v-model="search"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                single-line
                density="compact"
                variant="outlined"
                bg-color="bg-transparent"
                hide-details
            ></v-text-field>
        </template>
        <v-data-table-virtual
            v-model="selected"
            class="bg-transparent font-weight-light text-subtitle-2"
            item-value="id"
            :headers="headers" 
            :items="locations"
            :search="search"
            height="400"
            min-height="250" 
            max-height="350"
            density="comfortable"
            show-select
        >
            <!-- Update, Delete: EDIT > PROFILE -->
            <template v-slot:item.actions="{ item }">
                <!-- <v-icon
                    color="accent1"
                    class="pa-1"
                    @click="getLocationProfile(item)"
                >
                    mdi-pencil
                </v-icon> -->
                <v-icon
                    color="dark"
                    class="px-6"
                    @click="deleteLocation(item)"
                >
                    mdi-delete-outline
                </v-icon>
            </template>
        </v-data-table-virtual>
    </v-card>

    <!-- delete modal -->
    <v-dialog v-model="deleteClicked">
        <DeleteLocation v-show="deleteClicked" :location="targetLocation" @deleteClicked="closeDelete"  />
    </v-dialog>
</template>

<script>
import LocationProfile from './LocationProfile.vue'
import DeleteLocation from './DeleteLocation.vue';

export default {
    name: 'LocationTable',
    components: {
        LocationProfile,
        DeleteLocation
    },
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
                { title: 'Delete', key: 'actions', sortable: false },
            ],
            selected: [],
            // update & delete
            editClicked: false,
            targetLocation: '',
            deleteClicked: false
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
    methods: {
        deleteLocation(location) {
            this.deleteClicked = true
            this.targetLocation = location
        },
        closeDelete(deleteClicked) {
            this.deleteClicked = deleteClicked
        }
    }
}
</script>
