<template>
    <map-menu  />
    <map-click />
</template>

<script>

export default {
    name: 'MapView',

    mounted() {
        this.$store.dispatch('main/install')
    },

    beforeUnmount() {
        this.$store.dispatch('main/clearLayers')
    },

}
</script>
