<template>
    <v-sheet 
        class="d-flex justify-space-between align-center pa-4 bg-transparent mr-16"
        style="position: absolute; top: 0; right: 0"
    >
        <v-badge :content="10" color="lightbrand" class="mr-8">
            <v-icon color="grey-lighten-2" size="large">mdi-bell</v-icon>
        </v-badge>
        <v-avatar
            class="mr-4"
            color="dark"
            size="32"
        >
        </v-avatar>
        <v-sheet v-bind="attrs" v-on="on" class="d-flex justify-center flex-column bg-transparent">
            <p class="text-dark text-subtitle-2 font-weight-light">Mike Schulte</p>
            <p class="text-dark text-caption font-weight-thin">1989</p>
        </v-sheet>
    </v-sheet>
</template>

<script>
export default {
    name: 'InfoBar'
}
</script>