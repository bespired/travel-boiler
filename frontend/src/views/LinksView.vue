<template>
    <section class="hero" />
    <div class="padding">
        <!-- {{ creator }} -->
        <!--
            <a href="https://minitokyo3d.com/" target="minitokyo3d" > mini tokyo 3d </a>
        -->

        <template v-for="item in list" >
            <div>
                <input type="checkbox" />
                <span>{{ item.label }}</span>
            </div>
        </template>

    </div>
</template>
<script>

import AuthLogged from '@/helpers/AuthLogged.js'

export default {
    name: 'LinksView',

    data() {
        return {
            list: [
                { checked: false, label: 'Paspoort' },
                { checked: false, label: 'Sim kaarten' },
                { checked: false, label: 'Vlieg ticket naar Osaka' },
                { checked: false, label: 'Vlieg ticket naar Tokyo' },
                { checked: false, label: 'Vlieg ticket naar Tokyo' },
                { checked: false, label: 'Vlieg ticket naar Tokyo' },
            ]
        }
    },

    methods: {

    },

    computed: {
        creator() {
            return AuthLogged.payload('C') ? true : false
        }
    }
}
</script>
<style type="text/css">

    .padding {
        padding: 30px;
    }

    body.links .hero {
        opacity: 0.2;
    }

</style>
