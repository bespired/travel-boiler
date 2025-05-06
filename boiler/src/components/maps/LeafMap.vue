<template>
	<div id="map"></div>
</template>

<script>
export default {
	name: 'LeafMap',

	beforeMount() {

		let lsc = document.getElementById('leaf.script');
		let lst = document.getElementById('leaf.style');

		if (lsc === null) {
			this.first= true
			let script = document.createElement('script')
	    	script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
	    	script.id  = 'leaf.script'
			script.defer = true
			script.onload = () => { this.initMap() }
	    	document.head.appendChild(script)
    	}

		if (lst === null) {
			let style  = document.createElement('link')
	    	style.rel  = 'stylesheet'
	    	style.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
	    	style.id   = 'leaf.style'
	    	document.head.appendChild(style);
	    }

	},

	mounted() {
		if (!this.first) this.initMap()
	},

	data() {
		return {
			map:   null,
			first: false,
			tiles: 'https://tile.openstreetmap.de/{z}/{x}/{y}.png',
		}
	},

	methods: {
		initMap(){
			var L = window.L
	        this.map = L.map('map').setView([53, 12], 5)
	        L.tileLayer(this.tiles, { maxZoom: 14 }).addTo(this.map)
		}
	}


}
</script>
<style>
	#map {
	    width: 100%;
	    height: 100dvh;
	    margin: 0;
	}
</style>
