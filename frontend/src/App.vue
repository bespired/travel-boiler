<template>
	<div id="map" v-show="map" />
	<router-view   />
	 <!-- <div class="gpsdot" /> -->
	<main-menu     />
	<message-panel />
	<login-panel   />
</template>

<script>

import BodyImg    from '@/helpers/BodyImg'
import AuthLogged from '@/helpers/AuthLogged.js'

export default {
	name: 'App',

	beforeMount() {
		if (!import.meta.env.DEV) {
			if (location.href === 'http://japan.bespired.nl/') {
				window.location = 'https://japan.bespired.nl/'
			}
		}

 		BodyImg.setStore(this.$store)
		BodyImg.bgImage()

	},

    mounted() {
        this.$store.dispatch('main/loadAll')

        this.windowFocus()
        document.addEventListener("visibilitychange", () => {
    		if (document.visibilityState === 'visible') {
        		this.windowFocus()
    		}
		});
		window.addEventListener("focus", () => { this.windowFocus() });
    },

    watch:{
    	$route (to, from){
        	// console.log(to.name)
        	document.body.setAttribute('class', to.name)

        	switch(to.name) {
        		case 'events':
        			this.$store.dispatch('main/load', 'documents')
        			break;

        		case 'map':
        			const gpsdata = this.$store.getters['main/gpsdata']
        			if (!gpsdata) this.$store.dispatch('main/geolocation')
        			break;

        		case 'blog':
        			this.$store.dispatch('main/blog')
        			break;

				case 'blog-entry':
					this.$store.dispatch('main/blog', to.params.id)

        		default:
        			console.log('to name: ', to.name)
        	}

    	}
	} ,

	computed: {

		map() {
			let meta = this.$route.meta
			if (!meta.hasOwnProperty('map')) return false;
			return meta.map
		},

		now() {
			return this.$store.getters['main/now']
		},

	},

	methods: {
		windowFocus() {
			// AuthLogged.timeForGps()
			this.$store.commit('user/validToken', 0)
		},
	}

}

</script>

<style>
	.fixed {
		position: absolute;
		top: 20px; left: 50%;
		transform: translateX(-50%);
		background-color: #ffffffaa;
		border-radius: 8px;
		padding: 8px;
	}

	.hero {
		position: absolute;
		top: 0; right: 0;
		left: 0; bottom: 0;
		background-size: contain;
    	transform: scale(1);
    	background-position: center center;
    	background-color: black;

	}
</style>
