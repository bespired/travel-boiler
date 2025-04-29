<template>
    <section class="hero" />
    {{ creator }}
</template>
<script>

import AuthLogged from '@/helpers/AuthLogged.js'

export default {
    name: 'ListView',

    data() {
        return {
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

    body.list .hero {
        opacity: 0.1;
    }
    
</style>
