<template>
	<div class="day-panel" :class="[show, {edit:canCreate}]">
		<div class="header">
			<span>
				{{ displayDate }}
				<i :class="`icon-${icon} ${createHoover}`" @click="editIcon()"/>
			</span>
			<town-header />
		</div>
		<hr />
		<div class="body overflower" v-if="todayEvents">
			<template v-for="visit in todayEvents.visits">
				
				<div class="dotline" :id="visit.name" v-if="visit && visit.name">
					<div class="buttons" v-if="canCreate">
						<span class="hover" @click="removeEvent(visit)" >
	   						<i class="icon-delete" />
   						</span>
   					</div>

					<div :class="inPlacePlan(visit)">
						<span class="plc">{{ inPlaceName(visit) }}</span>
						<span class="msg">{{ inPlaceMsg(visit)  }}</span>
					</div>

					<div class="buttons">
						<span class="hover" @click="showEvent(visit)">
	   						<i class="icon-eye-outline" />
   						</span>

   						<i :class="inPlaceIcon(visit)" 
   							style="padding: 0 6px 0 5.5px;" v-if="inPlaceIcon(visit) !== ''" />
						<span v-else class="hover" @click="whereIs(visit)">
							<i class="icon-earth" />
						</span>
					</div>
				</div>
			</template>
			<div class="dotline">
				<div :class="examplePlan">{{ exampleName }} </div>
				<div class="buttons">
					<span class="hover" @click="addEvent($event)" v-if="canCreate">
   						<i class="icon-add-circle" />
					</span>
				</div>
			</div>
   		</div>
   		<div v-if="todayEvents" 
   			 class="footer"
   			:class="[sleepData(), sleepType, icon]" >
   			
   			<span :class="[sleepClass(1), sleepPlan(1)]" class="checkout">
   				<div class="label">{{ todaySleep(1) }}</div>
   				<div class="buttons">
   					<span class="hover pencil" @click="editSleep(1)" v-if="canCreate">
	   					<i class="icon-edit" />
   					</span>
   					<span class="hover earth" @click="sleepIs(1)">
   						<i class="icon-earth" />
   					</span>
   				</div>
   			</span>
   			<span :class="[sleepClass(0), sleepPlan(0)]" class="checkin">
   				<div class="label">{{ todaySleep(0) }}</div>
   				<div class="buttons">
   					<span class="hover pencil" @click="editSleep(0)"  v-if="canCreate">
	   					<i class="icon-edit" />
   					</span>
   					<span class="hover earth" @click="sleepIs(0)">
   						<i class="icon-earth" />
   					</span>
   				</div>
   			</span>
   		</div>

		<div class="close" @click="close()"><div class="icon-cancel"/></div>
	</div>
</template>

<script>

import DateUtils  from '@/helpers/DateUtils.js'
import TownHeader from './TownHeader.vue'

export default {
	name: 'DayPanel',

	components: {
		TownHeader
	},

	computed: {


		examplePlan() {
			return this.exampleData ? this.exampleData.plan : ''
		},

		exampleName() {
			return this.exampleData ? this.exampleData.name : ''
		},

		exampleData() {
			return this.$store.getters['main/exampledata']
		},

		dateToShow() {
			return this.$store.getters['main/paneldata']
		},

		panelToShow() {
			return this.$store.getters['main/showpanel']
		},

        typeToShow() {
            return this.$store.getters['main/pickerdata']
        },

        sleepType() {
        	if (typeof this.typeToShow === 'object') return ''
        	if ( this.typeToShow === 'sleep-0') return 'sleep-0'
        	if ( this.typeToShow === 'sleep-1') return 'sleep-1'
        	return ''
        },

		agenda() {
			return this.$store.getters['main/agenda']
		},

		places() {
			return this.$store.getters['main/places']
		},

		displayDate() {
			return this.dateToShow ? DateUtils.showDate(this.dateToShow) : ''
		},

		show() {
			return this.panelToShow === 'day' ? 'show' : 'hide'
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
			if (!this.todayEvents)      return ''
			if (!this.todayEvents.town) return ''
			return this.todayEvents.town
		},



		canCreate() {
			return this.$store.getters['user/canCreate']
		},

		createHoover() {
			return this.canCreate ? 'hover' : ''
		},

		icon() {
			if (!this.todayEvents) return ''
			if (!this.todayEvents.icon) return ''

			let icon = this.todayEvents.icon
			if (!icon) {
				icon = (this.canCreate) ? 'add-circle': ''
			}
			return icon
		}

	},

	methods: {

		close() {
			this.$store.dispatch('main/resetpanels')
		},

		inPlace(visit) {
			return this.places.find(p => p.handle === visit.name)
		},

		inPlaceName(visit) {
			let place = this.inPlace(visit)
			if (!place) return ''
			return place.name
		},

		inPlaceMsg(visit) {
			let place = this.inPlace(visit)
			if (!place) return ''
			return place.message
		},

		inPlaceIcon(visit) {
			let place = this.inPlace(visit)
			if (!place) return ''
			return place.type === 'fly' ? 'icon-plane' : ''
		},

		inPlacePlan(visit) {
			// find this plc in agenda of today to find plan
			if (!this.todayEvents) return
			if (!this.todayEvents.visits) return

			let found= this.todayEvents.visits.find( v => v.name === visit.name )
			return found ? found.plan : ''
		},

		sleepIs(idx) {
			console.log('sleepIs', this.todayEvents.sleep[idx])
			this.whereIs(this.todayEvents.sleep[idx])
		},

		whereIs(id) {
			let place = this.inPlace(id)
			if (!place) return

			let latlongs = place.latlong.split(',')
			this.$store.dispatch('main/showLocation', latlongs)
		},

		todaySleep(idx) {
			if (!this.todayEvents) return null
			if (!this.todayEvents.sleep) return null

			if (!this.todayEvents.sleep[idx]) return null

			let sleep= this.todayEvents.sleep[idx]
			if (!sleep) return null

			let place = this.places.find(p => p.handle === sleep.name)
			if (!place) return null

			return place.name
		},

		sleepPlan(idx) {
			if (!this.todayEvents) return null
			if (!this.todayEvents.sleep) return null
			if (!this.todayEvents.sleep[idx]) return null

			return this.todayEvents.sleep[idx].plan

		},

		addEvent(evt) {
			setTimeout( ()=>{evt.target.scrollIntoView('smooth')} , 300)
			this.$store.dispatch('main/showpicker', 'visit')
		},

		removeEvent(visit) {
			this.$store.dispatch('main/pickerdata', visit)
			this.$store.dispatch('main/showpicker', 'remove')
		},

		editEvent(visit) {
			this.$router.push({name: 'events', hash: `#${visit.name}` })
		},

		showEvent(visit) {
			this.$store.dispatch('main/pickerdata', visit)
			this.$store.dispatch('main/showpicker', 'event')
		},

		editIcon() {
			if (!this.canCreate) return
			this.$store.dispatch('main/showpicker', 'icon')
		},

		editSleep(idx) {
			if (this.typeToShow !== null) return

			console.log( this.typeToShow )
			const type = !this.todaySleep(idx) ? 'sleep' : 'remove'

			this.$store.dispatch('main/pickerdata', `sleep-${idx}`)
			this.$store.dispatch('main/showpicker', type)
		},

		sleepClass(idx) {
			return this.todaySleep(idx) === null ? 'empty' : 'sleep'
		},

		sleepData(idx) {
			return this.todaySleep(0) === this.todaySleep(1) ? 'same' : ''
		},

	}

}

</script>
