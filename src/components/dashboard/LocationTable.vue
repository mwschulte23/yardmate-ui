<template>
    <p class="my-2">Locations</p>
    <v-card flat class="elevation-1 bg-white">
        <template v-slot:text>
            <v-text-field
                v-model="search"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                single-line
                density="compact"
                variant="outlined"
                bg-color="light"
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
        >
            <!-- Update, Delete: EDIT > PROFILE -->
            <template v-slot:item.actions="{ item }">
                <v-icon
                    size="small"
                    class="me-2"
                    @click="getLocationProfile(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                    size="small"
                    @click="deleteLocation(item)"
                >
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
    </v-card>

    <!-- edit modal -->
    <v-dialog v-model="editClicked">
        <div class="bg-accent2" v-show="editClicked">
            EDIT WAS CLICKED!!! LOCATION EDIT COMPONENT HERE <br>
            {{ targetLocation }}
        </div>
    </v-dialog>

    <!-- delete modal -->
    <v-dialog v-model="deleteClicked">
        <div class="bg-darkbrand" v-show="deleteClicked">
            Delete functionality is for "Full Time" customers. Please visit account page to signup <br>
            {{ targetLocation }}
        </div>
    </v-dialog>
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
                { title: 'Actions', key: 'actions', sortable: false },
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
    mounted() {
    },
    methods: {
        getLocationProfile(location) {
            this.editClicked = true
            this.targetLocation = location
        },
        deleteLocation(location) {
            this.deleteClicked = true
            this.targetLocation = location
        }
    }
}
</script>