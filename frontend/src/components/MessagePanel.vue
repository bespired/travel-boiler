<template>
    <div :class="show" class="message-panel" >
        {{ message }}
        <div class="close" @click="close()"><div class="icon-cancel"/></div>
    </div>
    
</template>
<script>


export default {
    name: 'MessagePanel',

    watch: {
        $route(newValue) {
            this.$store.dispatch('main/message', false)
        },
    },

    methods: {
        close() {
            this.$store.dispatch('main/message', false)
        }
    },

    computed: {
        show() {
            return this.message ? 'show' : 'hidden'
        },

        message() {
            return this.$store.getters['main/message'] 
        },
    }
}
</script>