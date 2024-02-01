<template>
    <v-card class="bg-white text-dark rounded-lg elevation-1 mb-16" min-height="50">
        <v-sheet class="bg-lightbrand d-flex justify-space-between pb-2">
            <v-sheet class="bg-transparent">
                <v-card-title>
                    Location Map
                </v-card-title>
                <v-card-subtitle>
                    View Selected Locations on Map
                </v-card-subtitle>
            </v-sheet>
        </v-sheet>
        <div class="h-screen w-screen" style="min-height: 150px; max-height: 600px;">
            <!-- MAP HERE -->
            <div id="markerMap" style="height: 100%; width: 100%;"/>
        </div>
    </v-card>
</template>

<script>
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

export default {
    name: 'LocationMapCard',
    data() {
        return {
            map: null
        }
    },
    computed: {
        // 
    },
    mounted() {
        this.loadMap()
    },
    methods: {
        loadMap() {
            mapboxgl.accessToken = 'pk.eyJ1IjoibXdzY2h1bHRlMjMiLCJhIjoiY2w4a2tpaGo1MDEwNDN2cncxMzV1bmp4eSJ9.uPejfD8btp768rOZpMiVyA';
            this.map = new mapboxgl.Map({
                container: 'markerMap',
                style: 'mapbox://styles/mapbox/light-v11',
                center: [-96.094088, 41.223709],
                zoom: 16
            });
            // new mapboxgl.Marker()
            //     .setLngLat([-96.094088, 41.223709])
            //     .addTo(this.map);
        }
    }
}
</script>

<style>
.expandable-div {
    cursor: pointer;
}
</style>