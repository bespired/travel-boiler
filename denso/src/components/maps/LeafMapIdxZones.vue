<template>
	<div id="map"></div>
	<div class="overlay">
		<div class="pill" id="location" @click="go()"> Location </div>
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
		font-size: 8px;
	}
</style>
<script>

import idxDensoZones from "./idxZones.js"

export default {

	// Many thanks to
	// https://saibara.sakura.ne.jp/map/convgeo.cgi

	name: 'LeafMap',

	beforeMount() {

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
			densoZones: this.zoneFix(idxDensoZones),
		}
	},

	methods: {
		zoneFix(densoZones) {
			let minlat=  24.0043510
			let minlon= 122.8736509
			let maxlat=  45.7519756
			let maxlon= 154.1209048

			let distlat= maxlat - minlat
			let distlon= maxlon - minlon

			let latoffs= []
			let lonoffs= []


			let ybits = 261
			for(let hor=0; hor<ybits; hor++){
				// let offs = (distlat / ybits) * hor
				// let offs = (0.24969981272571 / 3 )* hor
				let offs = (0.25 / 3 )* hor
				latoffs.push(minlat + offs)
			}

			let xbits = 250
			for(let ver=0; ver<xbits; ver++){
				// let offs = (distlon / xbits) * ver
				// let offs = 0.24969981272571 * ver
				// let offs = (0.24969981272571 / 2) * ver
				let offs = (0.25 / 2) * ver
				lonoffs.push(minlon + offs)
			}


			let resolvedZones = []
			densoZones.forEach( (zone,idx) => {
				let	afr= zone.from.lat
				let ofr= zone.from.lon
				let ato= zone.to.lat
				let oto= zone.to.lon
				resolvedZones.push({
					zone: zone.zone,
					from: { lat: latoffs[afr], lon: lonoffs[ofr] },
					to:   { lat: latoffs[ato], lon: lonoffs[oto] }
				})
			})


			return resolvedZones
		},


		random_rgba() {
    		var o = Math.round, r = Math.random, s = 255;
    		return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
		},

		line(lat1, lon1, lat2, lon2) {
			let L = window.L
			let renderer = L.canvas()
			var latlngA  = L.latLng([lat1, lon1])
			var latlngB  = L.latLng([lat2, lon2])
			let rectObj  = { color: "#00ff78", weight: 1}
			let boundbox = [latlngA, latlngB]
			L.polyline(boundbox, rectObj, {renderer}).addTo(this.map)
		},

		drawBoxes() {

			if (!this.map) return

			let L = window.L
			let renderer = L.canvas()
			let boundbox = null
			let rectObj  = { color: "#00ff78", weight: 1}

			let ttlayer = document.querySelector('.leaflet-pane.leaflet-marker-pane')
			let origin  = this.map.getPixelOrigin()


			let boxes = document.getElementsByClassName('class-zone')
  			for (const element of boxes) {
  				element.remove()
			}

			let minlat = 360.0, minlon = 360.0
			let maxlat =   0.0, maxlon =   0.0
			// let lat = 0, lon = 0

			// this.densoZones.forEach((zone) => {
			// 	lat = zone.from.lat
			// 	lon = zone.from.lon
			// 	if (lat < minlat) minlat=lat
			// 	if (lon < minlon) minlon=lon

			// 	lat = zone.to.lat
			// 	lon = zone.to.lon
			// 	if (lat > maxlat) maxlat=lat
			// 	if (lon > maxlon) maxlon=lon
			// })


			minlat=  24.0043510
			minlon= 122.8736509
			maxlat=  45.7519756
			maxlon= 154.1209048

			let distlat= maxlat - minlat
			let distlon= maxlon - minlon

			// console.log(minlat,minlon , ' - ' , maxlat,maxlon )

			rectObj.color = this.random_rgba()
			rectObj.className = 'class-zone'

			this.line(minlat, minlon, minlat, maxlon)
			this.line(maxlat, minlon, maxlat, maxlon)

			this.line(minlat, minlon, maxlat, minlon)
			this.line(minlat, maxlon, maxlat, maxlon)

			let latoffs= []
			let lonoffs= []

			let ybits = 261
			for(let hor=0; hor<ybits; hor++){
				let offs = (distlat / ybits) * hor
				latoffs.push(minlat + offs)
				this.line(minlat + offs, minlon, minlat + offs, maxlon)
			}

			let xbits = 250
			for(let ver=0; ver<xbits; ver++){
				let offs = (distlon / xbits) * ver
				lonoffs.push(minlon + offs)
				this.line(minlat, minlon + offs, maxlat, minlon + offs )

			}

			// console.log(latoffs, lonoffs)

			this.densoZones.forEach((zone) => {

				let id = zone.zone

				let frlat = zone.from.lat
				let frlon = zone.from.lon
				let tolat = zone.to.lat
				let tolon = zone.to.lon

				let frlatind = 0
				let frlonind = 0
				let tolatind = 0
				let tolonind = 0
				let sfrdist = 100
				let stodist = 100

				latoffs.forEach((val,idx) => {
					let frdist = Math.abs(frlat - val)
					let todist = Math.abs(tolat - val)

					if (frdist < sfrdist) { sfrdist = frdist; frlatind = idx }
					if (todist < stodist) { stodist = todist; tolatind = idx }
				})

				sfrdist = 100
				stodist = 100

				lonoffs.forEach((val,idx) => {
					let frdist = Math.abs(frlon - val)
					let todist = Math.abs(tolon - val)

					if (frdist < sfrdist) { sfrdist = frdist; frlonind = idx }
					if (todist < stodist) { stodist = todist; tolonind = idx }
				})

				// console.log(frind, latoffs[frind], frlat, sfrdist)
				// console.log(toind, latoffs[toind], tolat, stodist)

				let out = `zone: ${id} `
				out += `from: { ${frlatind}, ${frlonind} },`
				out += `to { ${tolatind}, ${tolonind} } },`

				// console.log( out )

			})

			this.densoZones.forEach((zone)=>{

				if (zone.hasOwnProperty('div')){

					var latlng = L.latLng([zone.from.lat,zone.from.lon])
					var pixels = this.map.options.crs.latLngToPoint(latlng, this.map._zoom)
					zone.div.style = `left: ${pixels.x - origin.x }px; top: ${pixels.y - origin.y - 20 }px;`

				} else {

					rectObj.color = this.random_rgba()
					rectObj.className = `class-zone-${zone.zone}`

					boundbox = [[zone.from.lat,zone.from.lon],[zone.to.lat,zone.to.lon]]
					L.rectangle(boundbox, rectObj, {renderer}).addTo(this.map)


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

			// console.log(this.densoZones)
			// this.densoZones.forEach((zone) => {
			// 	zone.to.lat += 0.00027
			// 	zone.to.lon += 0.00036
			// })

			var L = window.L
	        // var map = L.map('map').setView([34.840859, 136.856689], 7)
	        var map = L.map('map').setView([24.069036, 122.99469], 9)

	        L.tileLayer(this.tiles, { maxZoom: 18 }).addTo(map)

	        var renderer = L.canvas()
	        var domLocation = document.getElementById('location')

	        let me = this

	        map.on('drag', function(evt) {
	        	domLocation.innerHTML = map.getCenter()
	        	// console.log(map.getCenter())
			});

	        map.on("zoomstart", function (evt) {
	        	// let ttlayer = document.querySelector('.leaflet-pane.leaflet-marker-pane')
	        	// ttlayer.style="opacity: 0"
			});

			map.on("zoomend", function (evt) {
				me.drawBoxes()
				// let ttlayer = document.querySelector('.leaflet-pane.leaflet-marker-pane')
				// ttlayer.style="opacity: 1"
			});

			this.map = map
			this.drawBoxes()

		}
	}


}
</script>
