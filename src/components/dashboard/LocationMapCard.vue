<template>
    <div id="markerMap" style="height: 100%; width: 100%;"/>
</template>

<script>
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

export default {
    name: 'LocationMapCard',
    props: {
        locations: Array
    },
    data() {
        return {
            map: null,
            centerLat: 38.93741,
            centerLon: -94.700607,
            markers: [],
        }
    },
    mounted() {
        this.findCenter()
        this.loadMap();
        this.addMarkers();
        
    },
    methods: {
        getColor(status) {
            if (status == 'Churned') {
                return 'red'
            } else if (status == 'Customer') {
                return 'green'
            } else {
                return 'blue'
            }
        },
        findCenter() {
            // const coordinates = this.locations.map(location => [location.lon, location.lat]);
            const first_result = this.locations[0]

            if (first_result) {
                this.centerLon = first_result.lon
                this.centerLat = first_result.lat
            }
        },
        loadMap() {
            mapboxgl.accessToken = 'pk.eyJ1IjoibXdzY2h1bHRlMjMiLCJhIjoiY2w4a2tpaGo1MDEwNDN2cncxMzV1bmp4eSJ9.uPejfD8btp768rOZpMiVyA';
            this.map = new mapboxgl.Map({
                container: 'markerMap',
                style: 'mapbox://styles/mapbox/light-v11',
                center: [this.centerLon, this.centerLat],
                zoom: 9
            });
            this.map.on('load', () => {
                this.addMarkers();
                this.addCircle();
            });
            
        },
        addMarkers() {
            this.locations.forEach((location) => {
                const marker = new mapboxgl.Marker({
                        color: this.getColor(location.status), 
                        label: location.customer_name
                    })
                    .setLngLat([location.lon, location.lat])
                    .addTo(this.map);
                const popup = new mapboxgl.Popup({ offset: 25 })
                    .setText(location.customer_name);
                marker.setPopup(popup)
            });
        },
        addCircle() {
            this.map.addLayer({
                id: 'circle',
                type: 'circle',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [this.centerLon, this.centerLat] // Example coordinates
                        }
                    }
                },
                paint: {
                    'circle-radius': 50, // Radius size in pixels
                    'circle-color': '#007cbf', // Circle color
                    'circle-opacity': 0.5 // Circle opacity
                }
            });
        }
    }
}
</script>

<style>
.expandable-div {
    cursor: pointer;
}
</style>