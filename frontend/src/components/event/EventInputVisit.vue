<template>
	<div><i class="icon-eye-outline" /> Bezoeken</div>
	<input-row :data-handle="datafill">
		<div>
			<text-input :lblen="2" label="Naam" v-model="name" />
		</div>
		<div>
			<text-input :lblen="2" label="Straat" v-model="address" />
		</div>
		<div>
			<text-input :lblen="2" label="Stad" v-model="town" />
		</div>
		<div>
			<latlong-input :lblen="2" label="Lat Long" v-model="latlong" />
		</div>
		<div>
			<text-input :lblen="2" label="Tijdstip" v-model="time" />
		</div>
		<div>
			<image-input :lblen="2" label="Url" v-model="imgurl" />
		</div>
		<div>
			<text-input :lblen="2" label="Bericht" v-model="message" />
		</div>
		<div>
			<text-input :lblen="2" label="Link" v-model="link" />
		</div>
	</input-row>
	<action-row>
		<click-button label="Verwijderen" @click="remove()" align="left" />
		<click-button label="Laat maar"   @click="close()"  />
		<click-button label="Bewaren"     @click="save()"   />
	</action-row>
</template>
<script>

export default {
	name: 'EventInputVisit',

	props: {
		handle: { type: String, default: null },
	},

	data() {
		return {
			name:     '',
			address:  '',
			town:     '',
			latlong:  '',
			time:     '',
			imgurl:   '',
			message:  '',
			link:     '',
		}
	},

	computed: {
		datafill() {
			this.fillData(this.handle)
			return this.handle
		},

		places() {
			return this.$store.getters['main/places']
		},
	},

	emits: {
		close: null,
	},

	methods: {
		close() {
			this.$emit('close')
		},

		fillData(handle) {
			this.name=    ''
			this.address= ''
			this.town=    ''
			this.latlong= ''
			this.time=    ''
			this.imgurl=  ''
			this.message= ''
			this.link=    ''
			this.uuid=    null

			if (handle === 'plc') return

			if (!this.places) return
			let payload = this.places.find(p => p.handle === handle)

			if (!payload) return

			this.name=    payload.name
			this.address= payload.address
			this.town=    payload.town
			this.latlong= payload.latlong
			this.time=    payload.time
			this.imgurl=  payload.imgurl
			this.message= payload.message
			this.link=    payload.link
			this.uuid=    payload.uuid

		},

		remove() {
			const payload = {
				'table': 'places',
				'handle': this.handle
			}
			this.$store.dispatch('main/remove', payload)
			.then(()=>{ this.$store.dispatch('main/loadAll') })
			.then(()=>{ this.$emit('close') })

		},

		save() {
			const payload = {
				'table': 'places',
				'record': {
					handle:  this.handle,
					type:    'visit',
					name:    this.name,
					address: this.address,
					town:    this.town,
					latlong: this.latlong,
					time:    this.time,
					imgurl:  this.imgurl,
					message: this.message,
					link:    this.link,
					booking: null,
					pincode: null,
					zipcode: null,
				}
			}

			this.$store.dispatch('main/save', payload)
			.then(()=>{ this.$store.dispatch('main/loadAll') })
			.then(()=>{ this.$emit('close') })

		},

	}


}
</script>