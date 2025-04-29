<template>
	<div class="agenda-day" :class="weekday" :data-date="abrv(columnDate)">
		<div class="header" >
			<span :class="townNames[0].plan" 
				v-if="townNames && townNames[0]">{{ townNames[0].name }}
			</span>
			<span :class="townNames[1].plan" 
				v-if="townNames && townNames[1]">{{ townNames[1].name }}
			</span>
			<span>
				<span :class="`icon-${icon}`" />
				<span class="month" v-if="1 === day">{{ month }}</span>
				<span class="date" :class="todayClass">{{ day }}</span>
			</span>
		</div>

		<div class="body" v-if="todayEvents">
			<template v-for="visit in todayEvents.visits" >
				<div>{{ visitName(visit.name) }}</div>
			</template>
		</div>

		<div class="footer" :class="sleeps(sleepToday)" v-if="todayEvents && sleepToday">
			<span class="out" >{{ sleepName(sleepToday[1]) }}</span>
			<span class="in"  >{{ sleepName(sleepToday[0]) }}</span>
		</div>
	</div>
</template>

<script>

import DateUtils from '@/helpers/DateUtils.js'

export default {
	name: 'DayBox',

	props: {
		c:   { type: Number },
		r:   { type: Number },
		w:   { type: Number },
		now: { type: Date },
	},


	computed: {

		agenda() {
			return this.$store.getters['main/agenda']
		},

		places() {
			return this.$store.getters['main/places']
		},

		todayEvents() {
			const md = this.columnDate.getMonth() + 1
			const dd = this.columnDate.getDate()

			const inMonth = this.agenda.filter(a => a.month === md)
			const onDay   = inMonth.find(m => m.date === dd)

			return onDay
		},

		sleepToday() {
			if (!this.todayEvents) return []
			return this.todayEvents.sleep
		},

		townNames() {
			if (!this.todayEvents) return ''
			if (!this.todayEvents.town) return ''

			return this.todayEvents.town
		},

		icon() {
			return this.todayEvents ? this.todayEvents.icon : 'none'
		},

		flying() {
			return this.icon === 'takeoff' || this.icon === 'landing' || this.icon === 'plane'
		},

		plane() {
			return this.icon === 'plane'
		},

		takeoff() {
			return this.icon === 'takeoff'
		},

		landing() {
			return this.icon === 'landing'
		},


		firststay() {
			return this.flying && this.r < 3
		},

		laststay() {
			return this.flying && this.r > 3
		},

		settings() {
			return this.$store.getters['main/settings']
		},

		weekday() {
			let visible = this.settings !== null

			if (this.settings && this.settings.startdate) {
				let first = new Date(this.settings.startdate)
				let last  = new Date(this.settings.enddate)

				let bigger  = this.columnDate.getTime() >= first.getTime()
				let smaller = this.columnDate.getTime() <= last.getTime()

				visible = bigger && smaller
				
			} 
			return visible ? `weekday-${this.c}` : 'hidden'
		},

		todayClass() {
			const cdt = this.columnDate.getMonth() + '-' + this.columnDate.getDate()
			const now = this.now.getMonth() + '-' + this.now.getDate()

			return cdt === now ? 'today' : ''
		},

		columnDate() {
			return DateUtils.dateOnGrid(this.w + 1, this.r - 1, this.c )
		},

		day() {
			return this.columnDate.getDate()
		},

		month() {
			return DateUtils.monthName(this.columnDate.getMonth())
		},

		beforeMid() {

		},

	},

	methods: {
		abrv(date) {
			return date.getDate() + '/' + (date.getMonth() + 1)
		},

		sleepName(id) {
			if (id === null) return ''
			const place = this.places.find(p => p.handle === id.name)
			
			if (!place) return ''
			return place.name
		},

		visitName(handle) {
			if (!this.places) return ''
			let place = this.places.find(p => p.handle === handle)
			return place ? place.name : ''
		},

		sleeps(arrIn) {

			const arr = [
				arrIn[0] ? arrIn[0].name : null,
				arrIn[1] ? arrIn[1].name : null
			]

			const plans = [
				arrIn[1] ? arrIn[1].plan : '',
				arrIn[0] ? arrIn[0].plan : ''
			].join('-')

			let stay = ' ' + plans + ' '
			if (this.plane)   stay += ' flying'
			if (this.takeoff) stay += (this.r < 3) ? ' hide'  : ' leave'
			if (this.landing) stay += (this.r < 3) ? ' land' : ' hide'

			if (arr[0] === null) {
				return arr[1] === null ? 'none' + stay : 'out' + stay
			}

			if (arr[0] === arr[1]) return 'same ' + plans
			return arr[1] === null ? 'in' + stay: 'both' + stay
		}
	}
}
</script>
