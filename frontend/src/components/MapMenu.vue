<template>
    <div class="map-panel">
        <a class="menu-button" @click="where(2024)">
            <i class="icon-globe"></i><label>Waar zijn ze?</label>
        </a>
        <a class="menu-button" @click="where(2023)">
            <i class="icon-globe"></i><label>Waar waren ze?</label>
        </a>
        <a class="menu-button">
            <input type="text" v-model="location" @keydown.enter="find()" />
            <i class="icon-search" @click="find()"></i>
        </a>

    </div>

</template>
<style>
.map .map-panel {
	flex-wrap: wrap;
    flex-direction: row;
    max-width: 80vw;
    width: 80vw;
}
.map .map-panel .menu-button {
	min-width: 130px;
	margin-top: 4px;
}
.map .map-panel .menu-button input{
	width: 100%;
}
</style>
<script>
export default {
    name: 'MapMeniu',

    data() {
        return {
            location: '',
        }
    },

    computed: {
		beforeDate() {
			return this.$store.getters['main/beforeDate']
		},
		afterDate() {
			return this.$store.getters['main/afterDate']
		},
    },

    methods: {

        find() {
            this.$store.dispatch('main/findLocation', this.location)
        },

        where(when) {

        	if ((when === 2024) && (this.beforeDate))
        		this.$store.dispatch('main/message', 'Ze zijn nog thuis.')
        		
        	if  ((when === 2024) && (this.afterDate))
        		this.$store.dispatch('main/message', 'Ze zijn weer thuis.')

        	if (when === 2023) 
        		this.$store.dispatch('main/message', 'Ze zijn weer thuis.')

            this.$store.dispatch('main/drawGpsPoly', when)

        },

    }
}
</script>