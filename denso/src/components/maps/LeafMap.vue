<template>
	<div id="map"></div>
	<div class="overlay">
		<div class="pill" id="location"> Location </div>
		<div class="pill" id="mapcode"> Mapcode </div>
		<div class="pill" id="infobox"> Infobox </div>
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

	#infobox, #mapcode, #location {
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
	#infobox {
		 top: 90px;
	}
	.zone-overlay {
		position: absolute;
		font-size: 10px;
	}
	.my-labels {
		margin-top: 9px;
		font-size: 10px;
		padding: 0 8px;
	}
</style>
<script>

import Zone from "@/helpers/Zone.js"

export default {


	name: 'LeafMap',

	mounted() {
		if (this.first) this.initMap()
		// Zone.fetchLines()
		// Zone.getZoneCoords()
	},

	data() {
		return {
			map: null,
			first: true,
			zoomfactor:  7,
			tiles: 'https://tile.openstreetmap.de/{z}/{x}/{y}.png',

			lat: 0,
			lon: 0,
		}
	},

	methods: {

		clearRects() {
  			let boxes = document.getElementsByClassName('zone-box')
  			for (const element of boxes) {
  				element.remove()
			}
		},

		drawRect(lat1,lon1, lat2,lon2, color) {
  			let L = window.L
			let renderer = L.canvas()
			let rectObj  = { color: color, weight: 1, className: "zone-box"}

  			let boundbox = [[lat1,lon1],[lat2,lon2]]
			L.rectangle(boundbox, rectObj, {renderer}).addTo(this.map);
		},

		drawBox(lat, lon) {

  			this.clearRects()

			const zones = Zone.inZone(lat, lon)
			zones.forEach( zone => {
				this.drawRect( zone.from.lat, zone.from.lon, zone.to.lat, zone.to.lon, '#8888ff' )
			})

			if (zones.length) {
				let color = '#ffff78'
				let zone  = zones[0]
				let height = zone.to.lat - zone.from.lat
				if ((height < 0.24) || (height > 0.33)) color = '#77ff78'
				this.drawRect(zone.from.lat, zone.from.lon, zone.to.lat, zone.to.lon, color )

				var domMapCode = document.getElementById('mapcode')
				domMapCode.innerHTML = zone.zone

			}

			var domLocation = document.getElementById('location')
  			domLocation.innerHTML = lat + "," + lon

			var domMapCode = document.getElementById('mapcode')
  			domMapCode.innerHTML = Zone.mapCode(lat, lon)

			var domInfoBox  = document.getElementById('infobox')
			var dataInfobox = Zone.infobox(lat, lon)
  			domInfoBox.innerHTML = dataInfobox.html

  			if (dataInfobox.perc) {
  				var block = dataInfobox.perc.draw.block
  				this.drawRect(block.from.lat, block.from.lon, block.to.lat, block.to.lon, '#77ffff' )
  				var unit  = dataInfobox.perc.draw.unit
  				this.drawRect(unit.from.lat,  unit.from.lon,  unit.to.lat,  unit.to.lon,  '#ff77ff' )
  			}

		},


		initMap(){

			var L = window.L
	        var map = L.map('map').setView([36.4197371,138.2987309], 9)

	        L.tileLayer(this.tiles, { maxZoom: 18 }).addTo(map)

	        var renderer = L.canvas()
	        var domLocation = document.getElementById('location')

	        let me = this

	        // map.on('drag', function(evt) {
	        	// domLocation.innerHTML = map.getCenter()
			// });

			// map.on('keyup', function(e) {
			// 	if (e.originalEvent.altKey) {

			// 		switch (e.originalEvent.code) {
			// 		case 'ArrowLeft':
			// 		case 'ArrowRight':
			// 			break;

			// 		case 'ArrowUp':
			// 			var zones = Zone.inZone(me.lat, me.lon)
			// 			Zone.fix('up', zones[0])
			// 			me.drawBox(me.lat, me.lon)
			// 			break;
			// 		case 'ArrowDown':
			// 			var zones = Zone.inZone(me.lat, me.lon)
			// 			Zone.fix('down', zones[0])
			// 			me.drawBox(me.lat, me.lon)
			// 			break;

			// 		}
			// 	}
  			// 	// console.log(e)
			// });

			map.on('mousemove', function(e) {
  				me.lat = e.latlng.lat.toFixed(7)
  				me.lon = e.latlng.lng.toFixed(7)
  				me.drawBox(me.lat, me.lon)
			});

			map.on('click', function(e) {
				const lat = e.latlng.lat.toFixed(7)
  				const lon = e.latlng.lng.toFixed(7)
  				let   url = `http://localhost/mapcode.php?lat=${lat}&lon=${lon}`
  				// window.open(url);
			});

			this.map = map
			this.first = false
			// this.drawBoxes()

		}
	}


}
</script>
