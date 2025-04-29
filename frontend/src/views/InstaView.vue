<template>

    <section class="hero" />

    <div class="map-panel">
        <a  class="menu-button" @click="next(-1)">
            <i class="icon-arrow-back-ios"></i><label>Vorige</label>
        </a>
        <div class="menu-pill" :class="localYear === 2023 ? 'selected' : '' " @click="time(2023)">2023</div>
        <div class="menu-pill" :class="localYear !== 2023 ? 'selected' : '' " @click="time(2024)">2024</div>

        <a class="menu-button" @click="next(1)">
            <i class="icon-arrow-forward-ios"></i><label>Volgende</label>
        </a>
    </div>

</template>
<script>

import BodyImg from '@/helpers/BodyImg'

export default {
    name: 'InstaView',

    mounted() {
    },

    data() {
        return {
            localYear: parseInt(localStorage.getItem('whatYear'))
        }
    },

    methods: {
        time(year) {
            this.localYear = year
            BodyImg.whatYear(year)
        },
        next(direction) {
            BodyImg.nextImage(direction)
        },

    },

    computed: {
    }

}
</script>
