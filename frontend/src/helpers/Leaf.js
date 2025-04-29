import MetroLines from './MetroLines';

const Leaf = {

	map: null,

	hereIcon: L.icon({
    	iconUrl: 'maps/here.png',
    	iconSize:     [30, 40],
    	iconAnchor:   [20, 40],
    	popupAnchor:  [20, -40]
	}),

	sleepIcon: L.icon({
    	iconUrl: 'maps/sleep.png',
    	iconSize:     [30, 40],
    	iconAnchor:   [20, 40],
    	popupAnchor:  [20, -40]
	}),

	visitIcon: L.icon({
    	iconUrl: 'maps/visit.png',
    	iconSize:     [30, 40],
    	iconAnchor:   [20, 40],
    	popupAnchor:  [20, -40]
	}),

	setStyle(feature) {
  		return {
  			// color: 'red',
    		color: feature.properties.colour,
  		}
	},

	getStyle(feature) {
  		return {
  			color: 'red',
    		// color: feature.properties.colour,
  		}
	},

	// install(map) {
	install(context) {

		let map = context.state.map

		let mapId   = document.getElementById('map')
		let leaflet =  mapId.classList.contains('leaflet-container')

		if (leaflet) return

		map = L.map('map').setView([32.347482, 130.847168], 8)
		// map = L.map('map').setView([ 35.695126,  139.75391], 14)

		L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png',
			{ maxZoom: 19 }
		).addTo(map)

		L.control.scale().addTo(map);

		// L.marker([32.347482, 130.847168], {icon: this.hereIcon}).addTo(map);

		this.map = map

		map.on('click', function(e) {
			context.state.mapclick = e.latlng.lat.toFixed(10) + ", " + e.latlng.lng.toFixed(10)
		});

		map.on('movestart', function(e){
			context.state.mapclick = null
		})

	},

	center(lat, lon, zoom) {

		this.map.setView([lat, lon], zoom)
		L.marker([lat, lon], {icon: this.hereIcon}).addTo(this.map);

	},

	clearLayers() {
		let layers = Object.keys(this.map._layers)
		layers.forEach((key) => {
			let layer = this.map._layers[key]
			if (!layer.hasOwnProperty('_url')) {
				this.map.removeLayer(layer)
			}
		})

	},

	drawGpsPoly(latlongs, data) {


		L.polyline(
			latlongs, { color: 'blue', fillColor: 'transparent', name: 'where' }
		).addTo(this.map)

		// const last = latlongs[latlongs.length - 1];
		const last = [33.535936480366495, 135.12799424133095]
		this.map.setView(last, 6)

	},

};

export default Leaf;