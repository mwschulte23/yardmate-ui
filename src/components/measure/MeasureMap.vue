<template>
    <div class="d-flex justify-space-between bg-transparent">
        <div class="d-flex justify-end align-center bg-transparent">
            <v-btn @click="changeDrawMode" :class="!isPolygonMode ? 'bg-accent1 elevation-0' : '' " class="font-weight-bold ma-1" >
                <v-icon size="large">mdi-cursor-pointer</v-icon>
            </v-btn>
            <v-btn @click="changeDrawMode" :class="isPolygonMode ? 'bg-accent1 elevation-0' : '' " class="font-weight-bold ma-1">
                <v-icon size="large">mdi-vector-polyline-plus</v-icon>
            </v-btn>
            <p class="ml-1 text-grey-darken-2 ">{{ isPolygonMode ? 'Draw Mode' : 'Select Mode' }}</p>
        </div>
        <v-btn @click="openForm = true" :class="measuredArea > 0 ? 'primary-button' : 'bg-grey-darken-1' " class="text-white font-weight-bold px-8">Save Measurement</v-btn>
        
        <!-- Submission form -->
        <v-dialog
            v-model="openForm"
            width="w-screen"
        >
            <SubmitLocation v-if="measuredArea > 0" :area="measuredArea" @openForm="closeLocationForm" class="mx-auto" style="width: 50%;"/>
            <v-card v-else>
                <v-card-title>
                    <v-icon>mdi-info</v-icon> Please make measurements on map first!
                </v-card-title>
            </v-card>
        </v-dialog>
    </div>
    
    <!-- MAP -->
    <v-sheet id="map" style="height: 100%; width: 100%;"/>
    <!-- LOCATION INFO -->
    <div class="mb-1">
        <p class="text-subtitle-1 "><span class="font-weight-thin">Location: </span>{{ $store.state.address }}</p>
    </div>
</template>

<script>
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import area from '@turf/area'
// import { formToJSON } from 'axios';

import SubmitLocation from './SubmitLocation.vue'

export default {
    name: "MeasureMap",
    components: {
        SubmitLocation
    },
    props: {
        lat: Number,
        lon: Number
    },
    data() {
        return {
            map: null,
            draw: null,
            measuredArea: 0,
            isPolygonMode: true,
            openForm: false
        }
    },
    mounted() {
        this.forRendering();
    },
    computed: {
        latLon() {
            return [this.lat, this.lon];
        },
    },
    watch: {
        latLon() {
            this.forRendering();
        },
    },
    methods: {
        forRendering() {
            this.loadMap();
            this.setupCursorChange();
        },
        // core map methods
        loadMap() {
            mapboxgl.accessToken = 'pk.eyJ1IjoibXdzY2h1bHRlMjMiLCJhIjoiY2w4a2tpaGo1MDEwNDN2cncxMzV1bmp4eSJ9.uPejfD8btp768rOZpMiVyA';
            this.map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/satellite-v9',
                center: [this.lon, this.lat],
                zoom: 19 // probz set to 18 or so on search
            });
            new mapboxgl.Marker({draggable: true})
                .setLngLat([this.lon, this.lat])
                .addTo(this.map);
            
            this.draw = new MapboxDraw({
                displayControlsDefault: false,
                defaultMode: 'draw_polygon' // this.isPolygonMode ? 'draw_polygon' : 'simple_select',
            })
            this.map.addControl(this.draw);
            this.map.on('draw.create', this.updateArea);
            this.map.on('draw.delete', this.updateArea);
            this.map.on('draw.update', this.updateArea);

            this.map.on('draw.modechange', this.changeDrawMode);
        },
        updateArea(e) {
            const data = this.draw.getAll()

            if (data.features.length > 0) {
                const squareMeters = area(data)
                this.measuredArea = squareMeters * 10.7639104167 // equivalent to 1 sq meter

            } else {
                if (e.type !== 'draw.delete') {
                    alert('Click the map to draw a polygon.');
                }
            }
        },
        // custom controls

        // draw mode change stuff
        changeDrawMode() {
            this.isPolygonMode = !this.isPolygonMode
            if (this.draw) {
                if (this.isPolygonMode) {
                    this.draw.changeMode('draw_polygon')
                } else {
                    this.draw.changeMode('simple_select')
                }
            }
        },
        setupCursorChange() {
            this.map.on('mousemove', (e) => {
                const mode = this.draw.getMode();
                
            if (mode === 'draw_polygon' || mode === 'draw_line_string') {
                this.map.getCanvas().style.cursor = 'crosshair'; // Cursor for drawing
            } else if (mode === 'simple_select') {
                this.map.getCanvas().style.cursor = 'pointer'; // Cursor for selecting
            } else {
                this.map.getCanvas().style.cursor = ''; // Default cursor
            }
            });
        },
        closeLocationForm(openForm) {
            this.openForm = openForm
        },
    },  
}
</script>

<style scoped>
.primary-button {
    background-color: #30B03E;
}
.primary-button:hover {
    background-image: linear-gradient(to right, #7fcb87, #30B03E 60%, #7fcb87);
}
</style>