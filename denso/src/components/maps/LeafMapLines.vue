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
	.leaflet-tooltip {
		font-size: 9px;
		padding: 2px;
	}
	/*.overlay {
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
	}*/
</style>
<script>

import idxDensoZones from "./idxZones.js"
import densoZones    from "./zones.js"
// import idxDensoZones from "./idxZones.js"
import idxLongitudes from "./idxLongitudes.js"
import idxLatitudes  from "./idxLatitudes.js"

export default {

	// Many thanks to
	// https://saibara.sakura.ne.jp/map/convgeo.cgi

	name: 'LeafMap',

	mounted() {
		if (!this.first) this.initMap()
	},

	data() {

		console.log(idxLongitudes, idxLatitudes)

		return {
			map: null,
			first: false,
			tiles: 'https://tile.openstreetmap.de/{z}/{x}/{y}.png',
		}
	},

	methods: {

		random_rgba() {
    		var o = Math.round, r = Math.random, s = 255;
    		return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
		},

		line(lat1, lon1, lat2, lon2, text) {
			let L = window.L
			let renderer = L.canvas()
			var latlngA  = L.latLng([lat1, lon1])
			var latlngB  = L.latLng([lat2, lon2])
			let rectObj  = { color: "#ff000077", weight: 1}
			let boundbox = [latlngA, latlngB]
			L.polyline(boundbox, rectObj, {renderer}).addTo(this.map)

			// let m1 = (lat2 - lat1 ) / 2
			// let m2 = (lon2 - lon1 ) / 2

			// let options = {direction: 'top'}
			// let tooltip = L.tooltip(options).setContent(''+text);
			// tooltip.setLatLng([lat1 + m1, lon1 + m2]);
			// this.map.addLayer(tooltip); // Add the tooltip to the map

		},

		box(lat1, lon1, lat2, lon2, color, text) {

			let L = window.L
			let renderer = L.canvas()
			let boundbox = [[lat1, lon1],[lat2,  lon2]]
			let rectObj  = { color, weight: 1}
			L.rectangle(boundbox, rectObj, {renderer}).addTo(this.map)

			let offz = 0.05
			let options = {direction: 'top'}
			// let tooltip = L.tooltip(options).setContent(''+text);
			// tooltip.setLatLng([lat1+offz/3, lon1+offz/2]);
			// this.map.addLayer(tooltip); // Add the tooltip to the map

		},


		drawLines() {
			let minlat=  24.0043510
			let maxlat=  45.7519756
			let minlon= 122.8736509
			let maxlon= 154.1209048

			idxLatitudes.forEach((lat,idx)=>{
				if (lat > 0) this.line(lat, minlon, lat, maxlon, idx)
			})

			idxLongitudes.forEach((lon,idx)=>{
				if (lon > 0) this.line(minlat, lon, maxlat, lon, idx)
			})

			densoZones.forEach( z => {
				let color = this.random_rgba()

				let coordZfa= z.from.lat
				let coordZfo= z.from.lon
				let coordZta= z.to.lat
				let coordZto= z.to.lon

				let m1 = 9999
				let m2 = 9999
				let idxZfa = 0, idxZta = 0, idxZfo = 0, idxZto = 0
				let dZfa = 0, dZta = 0, dZfo = 0, dZto = 0

				idxLatitudes.forEach((lat,idx)=>{
					if (lat>-1){
						// console.log(lat, idx)
						let d1= Math.abs(coordZfa - lat)
						let d2= Math.abs(coordZta - lat)
						if (d1<m1) {m1=d1; idxZfa= idx; dZfa= lat}
						if (d2<m2) {m2=d2; idxZta= idx; dZta= lat}
					}
				})

				m1 = 9999
				m2 = 9999
				idxLongitudes.forEach((lon,idx)=>{
					if (lon>-1){
						let d1= Math.abs(coordZfo - lon)
						let d2= Math.abs(coordZto - lon)
						if (d1<m1) {m1=d1; idxZfo= idx; dZfo= lon}
						if (d2<m2) {m2=d2; idxZto= idx; dZto= lon}
					}
				})

				this.box(dZfa, dZfo, dZta, dZto, color, z.zone)

				console.log(z)
			})

			// idxDensoZones.forEach(zone => {
			// 	let color = this.random_rgba()
			// 	let zfa= zone.from.lat
			// 	let zfo= zone.from.lon
			// 	let zta= zone.to.lat
			// 	let zto= zone.to.lon

			// 	this.box(
			// 		idxLatitudes[zfa], idxLongitudes[zfo],
			// 		idxLatitudes[zta], idxLongitudes[zto], color, zone.zone)
			// })

		},


		initMap(){

			var L = window.L
	        var map = L.map('map').setView([34.840859, 136.856689], 7)

	        L.tileLayer(this.tiles, { maxZoom: 18 }).addTo(map)

	        var renderer = L.canvas()
	        var domLocation = document.getElementById('location')

	        let me = this

			this.map = map

	        this.drawLines()

		}
	}


}
</script>
