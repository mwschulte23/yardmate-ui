<template>
    <v-col cols="10" class="h-100 w-100">
        <v-sheet class="h-100" id="map" />
    </v-col>
    <v-col class="d-flex flex-column justify-start">
        <v-btn class="pa-2 mb-2" color="brand" variant="tonal">
            Save
        </v-btn>
        <v-btn @click="resetMap" class="pa-2 mb-2" color="accent" variant="outlined">
            Reset
        </v-btn>
        <p v-if="measuredArea > 0" class="text-subtitle-2">
            Sq Meters: <span class="text-darkbrand text-subtitle-1">{{ roundArea(measuredArea) }}</span>
        </p>
    </v-col>
</template>


<script>
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
// import * as turf from '@turf/turf';
import { area } from '@turf/turf'
// import { decimal } from '@vuelidate/validators';


export default {
    name: "MeasureForm",
    components: {
        // 
    },
    props: {
        lat: decimal,
        lon: decimal
    },
    data() {
        return {
            search: '',
            suggestions: [],
            address: '',
            map: null,
            draw: null,
            measuredArea: null,
        }
    },
    mounted() {
        this.loadMap(),
        console.log(this.lat, this.lon)
    },
    methods: {
        loadMap() {
            mapboxgl.accessToken = 'pk.eyJ1IjoibXdzY2h1bHRlMjMiLCJhIjoiY2w4a2tpaGo1MDEwNDN2cncxMzV1bmp4eSJ9.uPejfD8btp768rOZpMiVyA';
            this.map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/satellite-v9',
                center: [this.lon, this.lat],
                zoom: 18 // probz set to 18 or so on search
            });
            this.draw = new MapboxDraw({
                displayControlsDefault: false,
                defaultMode: 'draw_polygon',
                controls: {
                    polygon: true,
                    trash: true
                }
            })
            this.map.addControl(this.draw);
            this.map.on('draw.create', this.updateArea);
            this.map.on('draw.delete', this.updateArea);
            this.map.on('draw.update', this.updateArea);
        },
        updateArea(e) {
            const data = this.draw.getAll()

            if (data.features.length > 0) {
                this.measuredArea = area(data)
                console.log(this.measuredArea)
                // const rounded_area = Math.round(area * 100) / 100;
            } else {
                if (e.type !== 'draw.delete') {
                    alert('Click the map to draw a polygon.');
                }
            }
        },
        roundArea(measuredArea) {
            if (area) {
                return Math.round(measuredArea * 100) / 100
            }
        },
        resetMap() {
            this.map = null
            this.draw = null
            this.measuredArea = null
        }
    }
}
</script>

<style>
#map {
    height: 100%;
}
p {
    font-family: 'Open Sans';
    margin: 0;
    font-size: 13px;
}
</style>