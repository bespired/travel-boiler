<template>
    <div class="input-panel events" :class="show" >
        <component
            :is="`event-input-${eventtab}`"
            :handle="paneldata"
            @close="close()"/>
        <div class="close" @click="close()"><div class="icon-cancel"/></div>
    </div>
</template>

<script>

import DateUtils  from '@/helpers/DateUtils.js'
import EventInputFly   from './EventInputFly.vue'
import EventInputSleep from './EventInputSleep.vue'
import EventInputVisit from './EventInputVisit.vue'
import EventInputDocs  from './EventInputDocs.vue'
import EventInputInsta from './EventInputInsta.vue'

export default {
    name: 'EventPanel',

    components: {
        EventInputFly, EventInputSleep, EventInputVisit, EventInputDocs, EventInputInsta
    },

    computed: {

        handleToShow() {
            return this.$store.getters['main/showpanel']
        },

        paneldata() {
            return this.$store.getters['main/paneldata']
        },

        eventtab() {
            return this.$store.getters['main/eventmenu']
        },

        show() {
            return this.handleToShow === 'event' ? 'show' : 'hide'
        },

    },

    methods: {

        close() {
            this.$store.dispatch('main/showpanel', null)
        },

    }

}

</script>

