<template>
	<div class="picker-panel towns" :class="show">
		Waar zijn we vandaag?

		<input-row :class="morningplan">
			<text-input :label="label" v-model="morning" />
			<plan-fix v-model="morningplan" :options="{pencil:'edit', ink:'calendar-month'}" />
		</input-row>

		<input-row :class="eveningplan" v-if="heledag==='two'">
			<text-input label="avond" v-model="evening" />
			<plan-fix v-model="eveningplan" :options="{pencil:'edit', ink:'calendar-month'}" />
		</input-row>
		
		<action-row>
			<plan-fix v-model="heledag" :options="{one:'calendar', two:'event-upcoming'}" />
			<click-button label="Laat maar" @click="close()" />
			<click-button label="Bewaren"   @click="save()"  />
		</action-row>

		<div class="close" @click="close()"><div class="icon-cancel"/></div>
	</div>
</template>

<script>

import DateUtils  from '@/helpers/DateUtils.js'

export default {
	name: 'TownPicker',

	components: {
	},

	data() {
		return {
			morning: '',
			evening: '',
			morningplan: null,
			eveningplan: null,
			heledag: 'one',
			swapped: false
		}
	},

	computed: {

		panelToShow() {
			return this.$store.getters['main/showpicker']
		},


		show() {
			if (this.panelToShow === 'town') this.todaysPlaces()
			return this.panelToShow === 'town' ? 'show' : 'hide'
		},

		label() {
			return this.heledag === 'one' ? 'hele dag' : 'ochtend'
		}
	},

	methods: {

		save() {

			const date  = this.$store.getters['main/paneldata']
			const onDay = this.$store.getters['main/eventsOnDate'](date)

			let town = []
			if (this.morning.trim() !== '') {
				let morning = _ucFirst(this.morning)
				if (morning === 'Tokio') morning = 'Tokyo'

				town.push({ "name": morning, "plan": this.morningplan })
			}
			if (this.evening.trim() !== '') {
				let evening = _ucFirst(this.evening)
				if (evening === 'Tokio') evening = 'Tokyo'
				town.push({ "name": evening, "plan": this.eveningplan })
			}
			onDay.town = town

			const payload = {
				'table': 'agenda',
				'record': onDay
			}

			this.$store.dispatch('main/save', payload)
				.then(this.close())
		},

		close() {
			this.$store.dispatch('main/showpicker', null)
			this.$store.dispatch('main/pickerdata', null)

		},

		todaysPlaces() {
			if (!this.panelToShow) return 

			let date  = this.$store.getters['main/paneldata']
			let onDay = this.$store.getters['main/eventsOnDate'](date)

			console.log('onDay', onDay)

			if (!onDay) return
			if (!onDay.town) return

			if (this.swapped === onDay) return

			this.swapped = onDay

			this.morningplan = (onDay.town && onDay.town[0]) ? onDay.town[0].plan : 'pencil'
			this.eveningplan = (onDay.town && onDay.town[1]) ? onDay.town[1].plan : 'pencil'

			this.morning = (onDay.town && onDay.town[0]) ? onDay.town[0].name : ''
			this.evening = (onDay.town && onDay.town[1]) ? onDay.town[1].name : ''

			this.heledag = (this.evening === '') ? 'one' : 'two'

		}

	}

}

</script>


<style type="text/css">
	.town-panel {
		position: fixed;

	    max-width: 800px;
	    width: 90%;
	    bottom: 405px;
	    margin-left: 50%;
	    transform: translateX(-50%);
	    border: 1px solid rgba(0,0,0, 0.5);
	    background-color: rgb(255 255 255 / 88%);
	    border-radius: 16px;

	    transition: bottom 300ms;
	    padding: 12px 2vw;
	}

	.town-panel.hide {
		 bottom: 110vh;
	}

	.town-panel .close {
		display: flex;
		position: absolute;
		top: -15px; right: -15px;
		width: 30px; height: 30px;
		background-color: red;
		border-radius: 15px;
		color: white;
		justify-content: center;
		align-items: center;
		font-size: 24px;

	}

	.town-panel .header {
		display: flex;
		color: #878787;
		justify-content: space-between;    	
	}

	.town-panel .footer {
		display: flex;
		justify-content: space-around;    	
		align-items: center;
		position: absolute;
		bottom: 0;
		left: 0; right: 0;
		height: 30px;
		color: white;
	}

	.town-panel .close:hover {
		background-color: black;
		cursor: pointer;
	}



</style>