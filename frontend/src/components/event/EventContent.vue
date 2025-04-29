<template>
	<div class="dotline" 
			:id="item.handle"
			:key="item.handle"
			v-for="item in filtered" 
		> 
			<div> 
				<span @click="showAgenda(item.handle)">
					<i class="hover" :class="onAgenda(item.handle)" />
				</span>
				<span class="label"> {{ item.name    }} </span>
				<span class="note" > {{ item.message }} </span>
			</div>
			<div class="buttons">
				<span @click="editEvent(item.handle)" v-if="canCreate">
					<i class="icon-edit hover" />
				</span>
			</div>
		</div>
</template>

<script>

export default {
	name: 'EventContent',

    emits: ['setHeight'],

	props: {
		filtered : { type: Array, default: [] }
	},

	computed: {
	
		agenda() {
			return this.$store.getters['main/agenda']
		},

		places() {
			return this.$store.getters['main/places']
		},
		
		canCreate() {
			return this.$store.getters['user/canCreate']
		},

	},

	methods: {

		showAgenda(handle) {
			this.$emit('setHeight')
			this.$store.dispatch('main/paneldata', handle)
			this.$store.dispatch('main/showpanel', 'planned')
		},

		editEvent(handle) {
			this.$emit('setHeight')
			this.$store.dispatch('main/paneldata', handle)
			this.$store.dispatch('main/showpanel', 'event')
		},

		onAgenda(handle) {
			if (!this.agenda) return ''

			let string = ''
			string  = JSON.stringify(this.agenda.map(a => a.sleep)); 
			string += JSON.stringify(this.agenda.map(a => a.visits)); 
				
			const exists = string.indexOf(`"${handle}"`) !== -1
			return exists ? 'icon-calendar-month' : 'icon-add'
		},

	}

}

</script>

