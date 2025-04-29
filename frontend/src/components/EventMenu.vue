<template>

	<div class="bottom-panel" :class="eventmenu" >
		<div class="overflow">
			<event-content
				@setHeight="getPanelHeight()"
				:filtered="placesFiltered" v-if="!docsevent && placesFiltered"
			/>
			<document-content
				v-if="docsevent"
				@setHeight="getPanelHeight()"
			/>
		</div>
	</div>

</template>

<script>

export default {
	name: 'EventMenu',


	beforeUnmount() {
		this.$store.dispatch('main/resetpanels')
	},

	methods: {
		getPanelHeight() {
			this.$nextTick(() => {
				this.$nextTick(() => {
					const panel = document.querySelector('.bottom-panel').getBoundingClientRect()
					const root  = document.documentElement;
					root.style.setProperty('--panel-height',  panel.height + "px");
				})
			})
		},
	},

	computed: {

		docsevent() {
			return this.eventmenu === 'docs'
		},

		agenda() {
			return this.$store.getters['main/agenda']
		},

		places() {
			return this.$store.getters['main/places']
		},

		placesFiltered() {

			switch(this.eventmenu) {
			case 'docs':
				return []
				break;
			default:
				if (!this.places) return []
				return this.places.filter( p => p.type === this.eventmenu )
			}

		},

		eventmenu() {
			return this.$store.getters['main/eventmenu']
		},

	}
}
</script>