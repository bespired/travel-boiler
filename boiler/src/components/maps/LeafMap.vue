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


			// box-42  [[31.625891,130.497697],[31.836805,130.697697]]
			// box-172 [[31.634607,130.247719],[31.836802,130.447719]]

			bottomleft: [31.650714, 130.366641],
			topright:   [31.650714, 130.366641],

			zone:    147,
			status: 'BottomLeft',
			lastLat: 0,
			lastLon: 0,
			direction: 'Left',
			foundcode: null,
			step:    1,
			stepvals: [
				0.1, 0.05, 0.025, 0.0125, 0.00625, 0.003125, 0.0015625, 0.00078125, 0.000390625, 0.0001953125, 0.00009765625, 0.000048828125, 0.0000244140625, 0.00001220703125, 0.000006103515625, 0.000003
			]

		}
	},

	methods: {

		go() {
			this.mapcode(this.bottomleft[0], this.bottomleft[1])
		},


		mapcode(lat,lon) {
			setTimeout(()=>{this.getmapcode(lat,lon)}, 1500)
		},

		getmapcode(lat,lon) {
			// "31.666824"
			// "130.442047"
			const myHeaders = new Headers()
			myHeaders.append("Content-Type", "application/x-www-form-urlencoded")

			const urlencoded = new URLSearchParams()
			urlencoded.append("lat", lat.toFixed(6))
			urlencoded.append("lng", lon.toFixed(6))

			const requestOptions = {
  				method: "POST",
  				headers: myHeaders,
  				body: urlencoded,
  				redirect: "follow"
			}

			console.log('get ', this.step, this.stepvals[this.step], this.status, this.direction, lat.toFixed(6), lon.toFixed(6))

			fetch("https://japanmapcode.com/mapcode", requestOptions)
			  .then((response) => response.text())
			  .then((result)   => JSON.parse(result))
			  .then((json)     => {
			  		this.foundcode = this.mapcodeSplit(json.mapcode)
			  		console.log(this.foundcode)
			  		this.nextStep()
			  })
			  .catch((error) => {
			  	console.error(error)
			  	this.foundcode = this.mapcodeSplit('00 000 000*00')
			  	this.nextStep()
			  });

		},

		mapcodeSplit(code) {
			// zone, block, unit, score
			// 42 042 518*87
			code = code.replace("*", " ");
			return {
				zone:  code.split(' ')[0],
				block: code.split(' ')[1],
				unit:  code.split(' ')[2],
				score: code.split(' ')[3],
			}
		},

		drawBox() {
			let rem = document.getElementsByClassName('boundbox')
			rem[0].remove()
			var L = window.L
			var renderer = L.canvas()
			var boundbox = [this.bottomleft, this.topright]
			var rectObj = {className: "boundbox", color: "#ff7800", weight: 1}
			L.rectangle(boundbox, rectObj, {renderer}).addTo(this.map);

			let name = `box-${this.zone}`
			localStorage.setItem(name, JSON.stringify(boundbox))


			var boundbox = [[31.625891,130.497697],[31.836805,130.697697]]
			var rectObj = { color: "#00ff78", weight: 1}
			L.rectangle(boundbox, rectObj, {renderer}).addTo(this.map);

			var boundbox = [[31.634607,130.247719],[31.836802,130.447719]]
			var rectObj = { color: "#00ff78", weight: 1}
			L.rectangle(boundbox, rectObj, {renderer}).addTo(this.map);

			// box-42  [[31.625891,130.497697],[31.836805,130.697697]]
			// box-172 [[31.634607,130.247719],[31.836802,130.447719]]


		},

		nextStep() {

			let side = this.status == "BottomLeft" ? 'bottomleft' : 'topright'
			let dir  = this.status == "BottomLeft" ? 1 : -1

			let lat= this[side][0]
			let lon= this[side][1]

			this.drawBox()

			switch(this.direction) {

			case 'Left':
				if (this.foundcode.zone == this.zone) {
					lon -= this.stepvals[this.step] * dir
					this[side][1]= parseFloat(lon.toFixed(6))
					this.mapcode(lat,lon)
				}else{
					// flip direction
					this.direction = "Right"
					this.step++
					if (this.step < 16) {
						lon += this.stepvals[this.step] * dir
						this.mapcode(lat,lon)
					}else{
						console.log('Switch to Top')
						this.step = 1
						this.direction = "Up"
						this.mapcode(lat,lon)
					}
				}
				break;

			case 'Right':
				if (this.foundcode.zone != this.zone) {
					lon += this.stepvals[this.step] * dir
					this[side][1]= parseFloat(lon.toFixed(6))
					this.mapcode(lat,lon)
				}else{
					// flip direction
					this.direction = "Left"
					this.step++
					if (this.step < 16) {
						lon -= this.stepvals[this.step] * dir
						this.mapcode(lat,lon)
					}else{
						console.log('Switch to top')
						this.step = 1
						this.direction = "Up"

						this.topright[0] = this.bottomleft[0] + 0.2
						this.topright[1] = this.bottomleft[1] + 0.2

						this.mapcode(this.topright[0],this.topright[1])
					}
				}
				break;

			case 'Up':
				if (this.foundcode.zone == this.zone) {
					lat -= this.stepvals[this.step] * dir
					this[side][0]= parseFloat(lat.toFixed(6))
					this.mapcode(lat,lon)
				}else{
					// flip direction
					this.direction = "Down"
					this.step++
					if (this.step < 16) {
						lat += this.stepvals[this.step] * dir
						this.mapcode(lat,lon)
					}else{
						// switch to TopRight
						if (this.status == "BottomLeft"){
							this.step = 1
							this.direction = "Right"
							this.status = "TopRight"

							this.topright[0] = this.bottomleft[0] + 0.2
							this.topright[1] = this.bottomleft[1] + 0.2

							this.mapcode(this.topright[0],this.topright[1])
						}

					}
				}
				break;

			case 'Down':
				if (this.foundcode.zone != this.zone) {
					lat += this.stepvals[this.step] * dir
					this[side][0]= parseFloat(lat.toFixed(6))
					this.mapcode(lat,lon)
				}else{
					// flip direction
					this.direction = "Up"
					this.step++
					if (this.step < 16) {
						lat -= this.stepvals[this.step] * dir
						this.mapcode(lat,lon)
					}else{
						// switch to TopRight
						if (this.status == "BottomLeft"){
							this.step = 1
							this.direction = "Right"
							this.status = "TopRight"

							this.topright[0] = this.bottomleft[0] + 0.2
							this.topright[1] = this.bottomleft[1] + 0.2

							this.mapcode(this.topright[0],this.topright[1])
						}
					}
				}
				break;
			}


			// this.mapcode(lat,lon)
		},

		initMap(){
			var L = window.L
	        var map = L.map('map').setView([31.64, 130.66], 10)
	        L.tileLayer(this.tiles, { maxZoom: 14 }).addTo(map)

	        var renderer = L.canvas()
	        var domLocation = document.getElementById('location')

	        map.on('drag', function(evt) {
	        	domLocation.innerHTML = map.getCenter()
	        	console.log(map.getCenter())
			});

	        // This is all just for mapcode...

			var boundbox = [this.bottomleft, this.topright]
			var rectObj = {className: "boundbox", color: "#ff7800", weight: 1}
			L.rectangle(boundbox, rectObj, {renderer}).addTo(map);

			this.map = map
			this.drawBox()

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
