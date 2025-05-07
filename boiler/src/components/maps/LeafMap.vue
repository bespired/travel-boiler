<template>
	<div id="map"></div>
	<div class="overlay">
		<div class="pill" id="location"> Location </div>
	</div>

</template>
<style>
	.overlay {
		position: fixed;
		top:5em; left:10px; right:1em; bottom: 1em;
		pointer-events: none;
	}

	#location {
		display: inline-flex;
		position: fixed;
		right: 10px; top: 10px;
		border-radius: 12px;
		padding: 8px;
		background-color: white ;
		color: black;
		font-family: monospace;
	}
</style>
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
	        var map = L.map('map').setView([31.64, 130.66], 10)
	        L.tileLayer(this.tiles, { maxZoom: 14 }).addTo(map)

	        var renderer = L.canvas()
	        var domLocation = document.getElementById('location')

	        map.on('drag', function(evt) {
	        	domLocation.innerHTML = map.getCenter()
			});

	        // This is all just for mapcode...
			var bounds1 = [[31.60, 130.60], [31.70, 130.70]]
			var bounds2 = [[31.60, 130.90], [31.70, 131.10]];

			L.rectangle(bounds1, {color: "#ff7800", weight: 1}, {renderer}).addTo(map);
			L.rectangle(bounds2, {color: "#00ff78", weight: 1}, {renderer}).addTo(map);


			this.map = map

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
