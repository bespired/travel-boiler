<template>
	<input-row :data-handle="datafill">
    	<div><i class="icon-plane" /> Vliegen</div>
	    <div>
	    	<text-input :lblen="2" label="Naam" v-model="name" />
	    </div>
	    <div>
	    	<text-input :lblen="2" label="Van"  v-model="leave" />
	    </div>
	    <div>
	    	<text-input :lblen="2" label="Naar" v-model="land" />
	    </div>
	   
		<div>
			<text-input :lblen="2" label="Tijdstip" v-model="time"    />
		</div>
		<div>
			<image-input :lblen="2" label="Url" v-model="imgurl"  />
		</div>
		<div>
			<text-input :lblen="2" label="Bericht" v-model="message"  />
		</div>
		<div>
			<text-input :lblen="2" label="Link" v-model="link"  />
		</div>
	</input-row>

	<action-row>
		<click-button label="Verwijderen" @click="remove()" align="left" />
		<click-button label="Laat maar" @click="close()" />
		<click-button label="Bewaren"   @click="save()"  />
	</action-row>
	
</template>

<script>

export default {
	name: 'EventInputFly',

	props: {
		handle: { type: String, default: null },
	},

	components: {},

	data() {
		return {
			name:    '',
			leave:   '',
			land:    '',
			time:    '',
			imgurl:  '',
			message: '',
			link:    ''
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
			this.name    = ''
			this.leave   = ''
			this.land    = ''
			this.time    = ''
			this.imgurl  = ''
			this.message = ''
			this.link    = ''

			if (handle === 'plc') return 

			if (!this.places) return 
			let payload = this.places.find(p => p.handle === handle)
			
			if (!payload) return
			this.name    = payload.name
			this.leave   = payload.leave
			this.land    = payload.land
			this.time    = payload.time
			this.imgurl  = payload.imgurl
			this.message = payload.message
			this.link    = payload.link

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
					type:    'fly',

					name:    this.name,
					leave:   this.leave,
					land:    this.land,
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