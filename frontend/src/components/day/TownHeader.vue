<template>
	<span> 	
		<span v-if="canCreate && townNames.length === 0">
			<div class="pencil hover" @click="townInput()">
				<i class="icon-add-circle" />
			</div>
		</span>
		<span v-if="townNames[0]" :class="townNames[0].plan">
			{{ townNames[0].name }}
			<div class="pencil hover" @click="locate(townNames[0].name)">
				<i class="icon-earth" />
			</div>
			<div
				v-if="canCreate && !townNames[1]"
				class="pencil hover" @click="townInput()" >
					<i class="icon-edit" />
			</div>
		</span>
		<span v-if="townNames[1]" :class="townNames[1].plan">
			&nbsp;| {{ townNames[1].name }}
			<div class="pencil hover" @click="locate(townNames[1].name)">
				<i class="icon-earth" />
			</div>
			<div class="pencil hover" @click="townInput()" v-if="canCreate">
				<i class="icon-edit" />
			</div>

		</span>
	</span>
</template>

<script>

export default {
	name: 'TownHeader',

	methods: {
		townInput() {
			this.$store.dispatch('main/showpicker', 'town')
			this.$store.dispatch('main/pickerdata',  this.todayEvents)
		},
		
		locate(location) {
			this.$store.dispatch('main/findLocation', location)
		}
	},


	computed: {

		dateToShow() {
			return this.$store.getters['main/paneldata']
		},

		agenda() {
			return this.$store.getters['main/agenda']
		},

		places() {
			return this.$store.getters['main/places']
		},

		todayEvents() {
			if (!this.dateToShow) return []

			const md = this.dateToShow.getMonth() + 1
			const dd = this.dateToShow.getDate()

			const inMonth = this.agenda.filter(a => a.month === md)
			const onDay   = inMonth.find(m => m.date === dd)

			return onDay
		},

		townNames() {
			if (!this.todayEvents) return ''
			if (!this.todayEvents.town) return ''

			return this.todayEvents.town
		},

		canCreate() {
			return this.$store.getters['user/canCreate']
		}

	}
}
</script>