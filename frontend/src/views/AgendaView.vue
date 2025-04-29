<template>
    <agenda-panel />
    <town-picker   v-if="editmode" />
    <icon-picker   v-if="editmode" />
    <sleep-picker  v-if="editmode" />
    <visit-picker  v-if="editmode" />
    <remove-picker v-if="editmode" />
    <visit-event  />
    <day-panel    />
</template>
<script>

export default {
    name: 'MapView',

    mounted() {
        this.$store.dispatch('main/install')
        window.addEventListener("resize",  this.windowResize );

    },

    beforeUnmount() {
        window.removeEventListener("resize", this.windowResize );
    },


    data() {
        return {
        }
    },

    methods: {

        windowResize() {
            let list = ['[class*=agenda-row-]', '.agenda-panel', '.show', '.hide']
            list.forEach( name => {
                let panels = document.querySelectorAll(name)
                panels.forEach(panel => {
                    panel.style = "transition: initial"
                    setTimeout( ()=>{panel.style = ""}, 100)
                })
            })
        },

    },

    computed: {

        editmode() {
            return this.loggedIn && this.canCreate
        },

        loggedIn() {
            return this.$store.getters['user/loggedIn']
        },

        canCreate() {
            return this.$store.getters['user/canCreate']
        },
    }
}
</script>
