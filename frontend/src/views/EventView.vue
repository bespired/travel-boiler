<template>
    <section class="hero" />
    <section class="events" v-if="canCreate">
        <top-menu      />
        <event-panel   />
        <planned-panel />
        <event-menu     v-if="!instaevent" />
        <passport-panel v-if="docsevent"/>
    </section>
</template>
<script>

import AuthLogged from '@/helpers/AuthLogged.js'

export default {
    name: 'EventView',

    beforeMount() {
        if (!AuthLogged.validToken()) {
            this.$router.push({name: 'login'})
        }
    },

    computed: {

        loggedIn() {
            return this.$store.getters['user/loggedIn']
        },

        canCreate() {
            return this.$store.getters['user/canCreate']
        },

        eventmenu() {
            return this.$store.getters['main/eventmenu']
        },

        docsevent() {
            return this.eventmenu === 'docs'
        },
        instaevent() {
            return this.eventmenu === 'insta'
        },


    }
}
</script>
