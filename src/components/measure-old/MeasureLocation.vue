<template>
<v-container class="my-12">
    <v-row>
        <v-col class="d-flex flex-column justify-center">
            <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                density="compact"
                variant="outlined"
                label="Enter Address"
                class="bg-white"
                :color="isFocused ? 'darkbrand' : 'dark' "
                autofocus
                @focus="isFocused = true"
                @blur="isFocused = false"
                @keyup.enter="initCanvas"
                @input="fetchAutocompleteSuggestions"
                single-line
                hide-details
            ></v-text-field>
            <v-btn
                color="darkbrand"
                size="regular"
                v-ripple
                flat
                class="text-white h-full px-2 py-2 mt-2 rounded-md"
                @click="initCanvas"
            >
                Start Measuring
            </v-btn>
        </v-col>
    </v-row>
    <v-row>
        <v-list class="elevation-4">
            <v-list-item
                v-for="(suggestion, index) in suggestions"
                :key="index"
            >
                <v-icon>mdi-map-marker</v-icon>
                <v-list-item-title @click="selectSuggestion(suggestion)">{{ suggestion.properties.formatted }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-row>
    <v-row>
        <v-col class="d-flex justify-end">
            <v-sheet class="bg-transparent mx-4">
                <canvas class="" ref="aerialCanvas" width="500" height="500" />
            </v-sheet>
            <v-sheet class="bg-transparent">
                <v-btn class="mb-2" style="width: 100%" variant="outlined" color="accent" @click="resetCanvas">
                    Reset
                </v-btn>
                <v-btn style="width: 100%" color="brand" @click="saveCanvasAsImage">
                    Submit
                </v-btn>
            </v-sheet>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { fabric } from 'fabric';
import { addressAutoComplete, submitImage, dataURLtoBlob } from '../../services/apiService'


export default {
    name: "MeasureForm",
    components: {
        // 
    },
    data() {
        return {
            search: '',
            suggestions: [],
            address: '',
            coordinates: null,
            isFocused: false,

            canvas: null,
            points: [],
            actions: [],
            polygon: null,
            isDrawing: false,
        }
    },
    mounted() {
        // this.initCanvas();
    },
    methods: {
        async fetchAutocompleteSuggestions() {
            if (this.search.length < 4) {
                this.suggestions = [];
                return;
            } else {
                this.suggestions = await addressAutoComplete(this.search)
            }  
        },
        selectSuggestion(suggestion) {
            this.search = suggestion.properties.formatted;
            this.suggestions = [];
            this.coordinates = {
                lat: suggestion.properties.lat,
                lon: suggestion.properties.lon
            }
            this.address = this.search
        },

        attachImage(imageUrl) {
            fabric.Image.fromURL(imageUrl, (img) => {
                img.scaleToWidth(this.canvas.width);
                img.selectable = false; // Make the image non-selectable
                this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas));

                // event listeners for drawing
                this.canvas.on('mouse:down', (options) => this.addPoint(options));
                this.canvas.on('mouse:move', (options) => this.drawPolygon(options));
                this.canvas.on('mouse:dblclick', () => this.completePolygon());
            });   
        },
        async initCanvas() {
            await this.$store.dispatch('fetchLocationImage', this.address)
            const canvasElement = this.$refs.aerialCanvas;

            if (canvasElement) {
                this.canvas = new fabric.Canvas(canvasElement)
                this.attachImage(this.$store.state.imageUrl)
            }   
        },
        drawPolygon(options) {
            if (this.isDrawing && this.points.length > 1) {
                const points = [...this.points, options.pointer];
                if (this.polygon) {
                    this.canvas.remove(this.polygon);
                }
                this.polygon = new fabric.Polygon(points, {
                    stroke: '#111111',
                    strokeWidth: 2,
                    fill: 'rgba(0,0,0,0.5)',
                    selectable: true,
                    hasBorders: false,
                    hasControls: false,
                });
                this.canvas.add(this.polygon);
            }
        },
        addPoint(options) {
            if (!this.isDrawing) {
                this.isDrawing = true;
                this.points.push(options.pointer);
            } else {
                this.points.push(options.pointer);
                const circle = new fabric.Circle({
                    radius: 4,
                    fill: 'black',
                    left: options.pointer.x,
                    top: options.pointer.y,
                    selectable: false,
                    hasBorders: false,
                    hasControls: false,
                    originX: 'center',
                    originY: 'center',
                });
                this.canvas.add(circle);
            }
        },
        completePolygon() {
            if (this.isDrawing) {
                this.isDrawing = false;
                this.points = [];
            }
        },
        resetCanvas() {
            this.canvas.clear();
            this.points = [];
            this.actions = [];
            this.initCanvas()
        },
        saveCanvasAsImage() {
            const canvas = this.$refs.aerialCanvas;
            if (canvas) {
                const editedImageUrl = canvas.toDataURL('image/png');
                const blob = dataURLtoBlob(editedImageUrl)
                const formData = new FormData();
                formData.append('image', blob, 'image.png')
                submitImage(formData)

                // Create a link and trigger a download
                const link = document.createElement('a');
                link.href = editedImageUrl;
                link.download = 'canvas-image.png';
                link.click();
            }
        }
    }
}
</script>
