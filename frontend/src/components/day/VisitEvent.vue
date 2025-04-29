<template>
	<div class="picker-panel view" :class="show" >

		<fly-data   v-if="payload.type==='fly'"   :payload="payload" />
		<visit-data v-if="payload.type==='visit'" :payload="payload" />

		<action-row>
			<click-button label="Bewerken" @click="edit()"  v-if="canCreate" />
			<click-button label="Ja leuk"  @click="close()"  />
		</action-row>
	</div>
</template>
<script>


export default {
	name: 'VisitEvent',

	// components: { FlyData, VisitData },

	data() {
		return {
			type: '',
		}
	},

	computed: {

		payload() {
			let empty = { type: '' }
			if (!this.places) return empty

			if (!this.typeToShow) return empty

			const handle = this.typeToShow.name
			if (handle === 'plc') return empty

			const payload = this.places.find(p => p.handle === handle)
			if (!payload) return empty

			return payload
		},

		places() {
			return this.$store.getters['main/places']
		},

        typeToShow() {
            return this.$store.getters['main/pickerdata']
        },

        pickerToShow() {
            return this.$store.getters['main/showpicker']
        },

		show() {
			return this.pickerToShow === 'event' ? 'show' : 'hide'
		},

		canCreate() {
			return this.$store.getters['user/canCreate']
		},
	},

	methods: {


		edit() {
			this.$router.push({name: 'events', params: { hash: this.typeToShow.name }})
		},

		close() {
			this.$store.dispatch('main/showpicker', null)
			this.$store.dispatch('main/pickerdata', null)
		},


	}


}
</script>