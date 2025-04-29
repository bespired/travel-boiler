<template>
	<div class="input-panel planned" 
		:class="show" :key="handleToShow" :data-payload="payload">
		
		<span class="event-img" :style="bgimage" />

		<span class="column" v-if="placeByHandle" >
			{{ placeByHandle.name }}
			<input-row :class="plan" v-if="type==='visit'">
				<select-input v-model="date" :options="dateOptions" />
			</input-row>
			
			<input-row :class="plan" v-if="type==='sleep'">
				<select-input v-model="checkin"  :options="dateOptions" />
				<select-input v-model="checkout" :options="dateOptions" />
			</input-row>
	 		
			<action-row>
				<plan-fix v-model="plan" :options="{pencil:'edit', ink:'calendar-month'}" />
				<click-button label="Laat maar" @click="close()" />
				<click-button label="Bewaren"   @click="save()"  />
			</action-row>

		</span>

		<div class="close" @click="close()"><div class="icon-cancel"/></div>
	</div>
</template>

<script>

import DateUtils  from '@/helpers/DateUtils.js'

export default {
	name: 'PlannedPanel',

	data() {
		return {
			plan:  null,
			type:  null,
			date:  null,
			checkin:  null,
			checkout: null,
			bgimage: null
		}
	},

	computed: {

		
		places() {
			return this.$store.getters['main/places']
		},

		agenda() {
			return this.$store.getters['main/agenda']
		},

		dateOptions() {
			return this.$store.getters['main/dateOptions']
		},

		handleToShow() {
			return this.$store.getters['main/showpanel']
		},

		paneldata() {
			return this.$store.getters['main/paneldata']
		},

		placeByHandle() {
			if (!this.paneldata) return null

			const place = this.places.find(p => p.handle === this.paneldata)
			if (place) {
				this.bgimage = `background-image: url(${place.imgurl})`
			}
			return place
		},

		show() {
			return this.handleToShow === 'planned' ? 'show' : 'hide'
		},

		payload() {
			let onAgenda = this.onAgenda()
			this.plan  = onAgenda.plan
			this.type  = onAgenda.type
			this.date  = onAgenda.date ? onAgenda.date : null
			this.checkin  = onAgenda.dates ? onAgenda.dates[0] : null
			this.checkout = onAgenda.dates ? onAgenda.dates[1] : null

			return onAgenda
		}

	},

	methods: {

		onAgenda() {
			if (!this.agenda) return ''

			let handle = this.paneldata
			let exists = null
			let plan   = 'pencil'
			let first  = '99/99'
			let last   = '00/00'

			let onSleep = JSON.stringify(this.agenda.map(a => a.sleep)); 
			exists = onSleep.indexOf(`"${handle}"`) !== -1

			if (exists) {
				let dates = this.agenda.filter( a => {
					let l = a.sleep[0] ? a.sleep[0].name : null
					let r = a.sleep[1] ? a.sleep[1].name : null
					return (l === handle ) || (r === handle)
				})

				dates.forEach(d => {
					let t = _d(d.month)	+ '/' + _d(d.date)
					if (t < first) first = t
					if (t > last)  last  = t
					if (d.sleep[0] && d.sleep[0].name === handle) {
						plan = d.sleep[0].plan
					}
				})

				return { 
					type:  'sleep',
					plan:  plan, // pencil or ink ?
					dates: [ 
						first !== '99/99' ? first : null,
						last  !== '00/00' ? last  : null
					]
				}

			}

			let onVisit = JSON.stringify(this.agenda.map(a => a.visits)); 
			exists = onVisit.indexOf(`"${handle}"`) !== -1

			let edit = {
				type: 'visit',
				plan: 'pencil',
				date: null
			}

			if (exists) {
				let found = this.agenda.find( a => {
					let placed = a.visits.filter(v => v.name === handle)
					return placed.length > 0
				})
				
				if (!found) return edit

				let item = found.visits.find( v => v.name === handle)				
				return { 
					type:  'visit',
					plan:  item.plan, // pencil or ink
					date: _d(found.month) + '/' + _d(found.date)
				}
			}
		
			return edit
		},

		save() {
			let exists   = false
			const handle = this.paneldata
			const plan   = this.plan 
			const payload = {
				'table': 'agenda',
				'record': null
			}

			switch(this.type) {
				case 'sleep':

					let nights = DateUtils.nights(this.checkin, this.checkout)
					if (nights < 1) return

					let days= []

					// if on agenda remove it first... all the days...
					let onSleep = JSON.stringify(this.agenda.map(a => a.sleep)); 
					exists = onSleep.indexOf(`"${handle}"`) !== -1

					if (exists) {
						let dates = this.agenda.filter( a => {
							let l = a.sleep[0] ? a.sleep[0].name : null
							let r = a.sleep[1] ? a.sleep[1].name : null
							return (l === handle ) || (r === handle)
						})
						dates.forEach(d => {
							let l = d.sleep[0] ? d.sleep[0].name : null
							if (l === handle)  d.sleep[0] = null

							let r = d.sleep[1] ? d.sleep[1].name : null
							if (r === handle)  d.sleep[1] = null

							d.pick = `${_d(d.month)}/${_d(d.date)}`
						})

						days = dates

					}

					// put on agenda... all the days...
					
					for (let num = 0; num <= nights; num++){

						let first = DateUtils.dateFromMD(this.checkin)	
						let date  = new Date(first.setDate(first.getDate() + num))
						let onDay = this.$store.getters['main/eventsOnDate'](date)

						let pick = `${_d(onDay.month)}/${_d(onDay.date)}`

						// if this date is in days array, use the days array version.
						exists = days.findIndex(d => d.pick === pick)
						onDay = exists > -1 ? days[exists] : onDay
						
						if ( num === 0 )      onDay.sleep[0] = { name: handle, plan: plan }
						if ( num === nights ) onDay.sleep[1] = { name: handle, plan: plan }

						if (exists === -1) days.push(onDay)

					}

					console.log(days)

					payload.records = days // plural
					this.$store.dispatch('main/save', payload)

					this.close()

				break;

				default:
			
					// if on agenda remove it first...
					// bit ... overkill when only changing plan(ink/pencil)

					let onVisit = JSON.stringify(this.agenda.map(a => a.visits)); 
					exists = onVisit.indexOf(`"${handle}"`) !== -1
					if (exists) {

						let plan = ''
						let found = this.agenda.find( a => {
							let placed = a.visits.filter(v => v.name === handle)
							if (placed.length > 0) plan = placed[0].plan
							return placed.length > 0
						})

						// if on same date and same plan don't bother saving
						let date= _d(found.month) + '/' + _d(found.date)
						if ((date === this.date) && (plan === this.plan)) { 
							this.close(); 
							return 
						}
						
						// remove from visits
						found.visits.splice(found.visits.findIndex(f => f.name === handle), 1)
	

						// save the day
						payload.record = found
						this.$store.dispatch('main/save', payload)

					}

					// put on agenda...

					if (this.date !== null) {

						let onDay = this.$store.getters['main/eventsOnDate'](this.date)
						
						// add to visits
						onDay.visits.push({name: handle, plan: this.plan})
						payload.record = onDay
						
						this.$store.dispatch('main/save', payload)

					}

					this.close()
	
				break;
			}


		},

		close() {
			this.$store.dispatch('main/showpanel', null)
		},

	}

}

</script>

