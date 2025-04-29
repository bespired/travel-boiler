<template>
    <section class="hero" />
    <div class="vimeoplayer">
        <iframe src="https://player.vimeo.com/video/1002404733?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="japan 2024"></iframe>
    </div>
</template>
<script>

import AuthLogged from '@/helpers/AuthLogged.js'

export default {
    name: 'LinksView',

    data() {
        return {
        }
    },

    methods: {

    },

    computed: {
    }
}
</script>
<style type="text/css">
    .vimeoplayer {
        position: fixed;
        top: 10px;
        left: 0;
        width: 100%;
        height: calc(100dvh - 80px);
    }

    body.vimeo .hero {
        opacity: 0.2;
    }

</style>