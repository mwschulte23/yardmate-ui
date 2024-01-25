<template>
    <v-container>
        <Temp />
    </v-container>
</template>

<script>
import Temp from '../components/measure/Temp.vue';

export default {
    name: 'AcquireView',

    components: {
        Temp
    },

    data: () => ({
      //
    }),
}
</script>