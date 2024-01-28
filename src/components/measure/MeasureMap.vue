<template>
    <div class="d-flex justify-space-between bg-transparent">
        <v-btn @click="openForm = true" :class="measuredArea > 0 ? 'primary-button' : 'bg-grey-darken-1' " class="text-white font-weight-bold px-8">Save Measurement</v-btn>
        <v-dialog
            v-model="openForm"
            width="auto"
        >
            <SubmitLocation v-if="measuredArea > 0" :area="measuredArea" @openForm="closeLocationForm"/>
            <v-card v-else>
                <v-card-title>
                    <v-icon>mdi-info</v-icon> Please make measurements on map first!
                </v-card-title>
            </v-card>
        </v-dialog>

        <div class="d-flex justify-end bg-transparent">
            <v-btn @click="changeMode('simple_select')" :class="!isPolygonMode ? 'bg-accent1 elevation-0' : '' " class="font-weight-bold ma-1" >
                <v-icon size="large">mdi-cursor-pointer</v-icon>
            </v-btn>
            <v-btn @click="changeMode('draw_polygon')" :class="isPolygonMode ? 'bg-accent1 elevation-0' : '' " class="font-weight-bold ma-1">
                <v-icon size="large">mdi-vector-polyline-plus</v-icon>
            </v-btn>
        </div>
    </div>
    <v-sheet id="map" style="height: 100%; width: 100%;"/>
</template>

<script>
import { mapMutations } from 'vuex';

import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import area from '@turf/area'
import { formToJSON } from 'axios';

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
        this.loadMap();
        this.setupCursorChange();
        this.map.on('draw.modechange', this.onModeChange)
    },
    methods: {
        // core map methods
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
                defaultMode: this.isPolygonMode ? 'draw_polygon' : 'simple_select',
                // controls: {
                //     polygon: true,
                //     trash: false
                // }
            })
            this.map.addControl(this.draw);
            this.map.on('draw.create', this.updateArea);
            this.map.on('draw.delete', this.updateArea);
            this.map.on('draw.update', this.updateArea);
        },
        updateArea(e) {
            console.log(this.draw.getMode())
            const data = this.draw.getAll()

            if (data.features.length > 0) {
                this.measuredArea = area(data)
                // const rounded_area = Math.round(area * 100) / 100;
            } else {
                if (e.type !== 'draw.delete') {
                    alert('Click the map to draw a polygon.');
                }
            }
        },
        // custom controls

        // draw mode change stuff
        onModeChange() {
            const drawMode = this.draw.getMode()
            if (drawMode == 'draw_polygon') {
                this.isPolygonMode = true
            } else {
                this.isPolygonMode = false
            }
        },
        changeMode(newMode) {
            if (!['simple_select', 'draw_polygon'].includes(newMode)) {
                return;
            } else {
                this.draw.changeMode(newMode)

                if (newMode == 'draw_polygon') {
                    this.isPolygonMode = true
                } else {
                    this.isPolygonMode = false
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
            console.log(this.openForm)
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
    background-image: linear-gradient(to right, #30B03E 60%, #214725);
}

/* brand: '#51CC5F',
          light: '#ECECEC',
          dark: '#131212',
          accent1: '#05668D',
          accent2: '#D3BB1E',
          lightbrand: '#caefcf',
          darkbrand: '#304532', */

</style>