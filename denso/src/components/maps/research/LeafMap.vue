<template>
	<div id="map"></div>
	<div class="overlay">
		<div class="pill" id="location"> Location </div>
		<div class="pill" id="mapcode"> Mapcode </div>
	</div>
</template>
<style>
	#map {
	    width: 100%;
	    height: 100dvh;
	    margin: 0;
	}
	.overlay {
		position: fixed;
		top:0; left:0;
		pointer-events: none;
	}

	#mapcode, #location {
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
	#mapcode {
		 top: 50px;
	}
	.zone-overlay {
		position: absolute;
		font-size: 10px;
	}
</style>
<script>

import densoZones from "./zones.js"

export default {

	// Many thanks to
	// https://saibara.sakura.ne.jp/map/convgeo.cgi

	name: 'LeafMap',

	mounted() {
		if (!this.first) this.initMap()
	},

	data() {
		return {
			map: null,
			first: false,
			zoomfactor:  7,
			tiles: 'https://tile.openstreetmap.de/{z}/{x}/{y}.png',
			// densoZones: this.fixZones(densoZones),
			densoZones: densoZones,
		}
	},

	methods: {

		fixZones(densoZones) {
			let fixed=[]
			let latdiff = 0.0002896 / 2
			let londiff = 0.0003600 / 2

			// let latblockHeight = 0
			// let lonblockWidth  = 0
			// let zonecount = 0

			densoZones.forEach((zone) => {
				// latblockHeight += zone.to.lat - zone.from.lat
				// lonblockWidth  += zone.to.lon - zone.from.lon
				// zonecount++
				fixed.push({
					zone: zone.zone,
					from: {lat: zone.from.lat - latdiff, lon: zone.from.lon - londiff},
					to:   {lat: zone.to.lat + latdiff, lon: zone.to.lon + londiff},
				})
			})

			// console.log('latblockHeight: ', latblockHeight / zonecount)
			// console.log('lonblockWidth:  ', lonblockWidth/ zonecount)

			return fixed
		},

		random_rgba() {
    		var o = Math.round, r = Math.random, s = 255;
    		return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
		},
		pad3(n) {
    		return ('000' + n).substr(-3)
		},

		drawBox(e) {
			const lat = e.latlng.lat.toFixed(7)
  			const lon = e.latlng.lng.toFixed(7)

  			let boxes = document.getElementsByClassName('zone-box')
  			for (const element of boxes) {
  				element.remove()
			}

  			let L = window.L
			let renderer = L.canvas()
			let boundbox = null
			let rectObj1  = { color: "#00ff78", weight: 1, className: "zone-box"}
			let rectObj2  = { color: "#ff7800", weight: 1, className: "zone-box"}
			let rectObj3  = { color: "#ff0078", weight: 1, className: "zone-box"}

  			let zones = ''
  			let mapcode = ''

  			this.densoZones.forEach((zone) => {
  				if ((lat >= zone.from.lat) && (lat <= zone.to.lat)) {
  					if ((lon >= zone.from.lon) && (lon <= zone.to.lon)) {
  						zones += zone.zone + ' '

  						// Draw the zone
  						boundbox = [[zone.from.lat,zone.from.lon],[zone.to.lat,zone.to.lon]]
						L.rectangle(boundbox, rectObj1, {renderer}).addTo(this.map);

						// Find the block
						let dlat = zone.to.lat - zone.from.lat
						let dlon = zone.to.lon - zone.from.lon

						let latblock= dlat / 30.0
						let lonblock= dlon / 30.0

						let blkperlat = Math.floor(30 * ((lat - zone.from.lat) / dlat))
						let blkperlon = Math.floor(30 * ((lon - zone.from.lon) / dlon))

						let blkslat = zone.from.lat + blkperlat * latblock
						let blkslon = zone.from.lon + blkperlon * lonblock

						let block = blkperlon + 30 * blkperlat

						// Draw the block
						boundbox = [[blkslat, blkslon], [blkslat + latblock, blkslon + lonblock]]
						L.rectangle(boundbox, rectObj2, {renderer}).addTo(this.map);

						// Find the unit
						let latunit= dlat / 900.0  // let latunit= latblock / 30.0
						let lonunit= dlon / 900.0  // let lonunit= lonblock / 30.0

						let uniperlat = Math.floor(30 * ((lat - blkslat) / latblock))
						let uniperlon = Math.floor(30 * ((lon - blkslon) / lonblock))

						let unislat = blkslat + uniperlat * latunit
						let unislon = blkslon + uniperlon * lonunit

						let unit = uniperlon + 30 * uniperlat

						// Draw the unit
						boundbox = [[unislat, unislon], [unislat + latunit, unislon + lonunit]]
						L.rectangle(boundbox, rectObj3, {renderer}).addTo(this.map);

						mapcode = zone.zone + ' ' + this.pad3(block) + ' ' + this.pad3(unit) + '*55  '

  					}
  				}
  			})

  			zones = lat + "," + lon + " " + zones
			var domLocation = document.getElementById('location')
  			domLocation.innerHTML = zones

			var domMapCode = document.getElementById('mapcode')
  			domMapCode.innerHTML = mapcode

		},


		initMap(){

			var L = window.L
	        // var map = L.map('map').setView([34.840859, 136.856689], 7)
	        var map = L.map('map').setView([36.4197371,138.2987309], 12)

	        L.tileLayer(this.tiles, { maxZoom: 18 }).addTo(map)

	        var renderer = L.canvas()
	        var domLocation = document.getElementById('location')

	        let me = this

	        map.on('drag', function(evt) {
	        	domLocation.innerHTML = map.getCenter()
			});

			map.on('mousemove', function(e) {
  				me.drawBox(e)
			});

			map.on('click', function(e) {
				const lat = e.latlng.lat.toFixed(7)
  				const lon = e.latlng.lng.toFixed(7)
  				let   url = 'https://www.mapion.co.jp/f/mmail/send_mobile/SendMobile_map.html?'
  				url += `lon=${lon}&lat=${lat}`
  				console.log(url)
  				window.open(url);
			});

			// https://www.mapion.co.jp/f/mmail/send_mobile/SendMobile_map.html?lon=130.99586961830084&lat=34.272715550129554

			this.map = map

		}
	}


}
</script>
