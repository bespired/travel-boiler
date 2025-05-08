<template>
	<div id="map"></div>
	<div class="overlay">
		<div class="pill" id="location" @click="go()"> Location </div>
	</div>
</template>
<style>
	.overlay {
		position: fixed;
		top:0; left:0;
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
		pointer-events: all;
	}
	.zone-overlay {
		position: absolute;
		font-size: 10px;
	}
</style>
<script>
export default {

	// https://saibara.sakura.ne.jp/map/convgeo.cgi

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

	    	script = document.createElement('script')
	    	script.src = '/denso-mapcode-zones.js'
	    	script.id  = 'mapcode.denso'
			script.defer = true
			script.onload = () => { this.drawBoxes() }

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
			map: null,
			first: false,
			zoomfactor:  7,
			tiles: 'https://tile.openstreetmap.de/{z}/{x}/{y}.png',
		}
	},

	methods: {


		random_rgba() {
    		var o = Math.round, r = Math.random, s = 255;
    		return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
		},

		drawBoxes() {

			if (!this.map) return

			let L = window.L
			let renderer = L.canvas()
			let boundbox = null
			let rectObj  = { color: "#00ff78", weight: 1}

			let ttlayer = document.querySelector('.leaflet-pane.leaflet-marker-pane')
			let origin  = this.map.getPixelOrigin()

			document.densoZones.forEach((zone)=>{


				if (zone.hasOwnProperty('div')){

					var latlng = L.latLng([zone.from.lat,zone.from.lon])
					var pixels = this.map.options.crs.latLngToPoint(latlng, this.map._zoom)
					zone.div.style = `left: ${pixels.x - origin.x }px; top: ${pixels.y - origin.y - 20 }px;`

				} else {

					rectObj.color = this.random_rgba()
					rectObj.className = `class-zone-${zone.zone}`

					boundbox = [[zone.from.lat,zone.from.lon],[zone.to.lat,zone.to.lon]]
					L.rectangle(boundbox, rectObj, {renderer}).addTo(this.map);

					var latlng = L.latLng([zone.from.lat,zone.from.lon])
					var pixels = this.map.options.crs.latLngToPoint(latlng, this.map._zoom)

					zone.div = document.createElement("div")
					zone.div.id = `zone-${zone.zone}`
					zone.div.className = 'zone-overlay'
					zone.div.style = `left: ${pixels.x - origin.x }px; top: ${pixels.y - origin.y - 20 }px;`
					zone.div.innerHTML = zone.zone
					ttlayer.appendChild(zone.div)
				}
			})


		},


		initMap(){
			var L = window.L
	        // var map = L.map('map').setView([34.840859, 136.856689], 7)
	        var map = L.map('map').setView([35.602602, 139.682236], 12)

	        L.tileLayer(this.tiles, { maxZoom: 14 }).addTo(map)

	        var renderer = L.canvas()
	        var domLocation = document.getElementById('location')

	        let me = this

	        map.on('drag', function(evt) {
	        	domLocation.innerHTML = map.getCenter()
	        	// console.log(map.getCenter())
			});

			map.on("zoomend", function (evt) {
				me.drawBoxes()
			});

			this.map = map
			this.drawBoxes()

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
