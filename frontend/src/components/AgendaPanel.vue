<template>
	<div class="agenda-panel" :class="[rowview, colview]"
		v-if="settings" :data-show="dateToShow">
		<div :class="`agenda-row-${r}`" v-for="r in 4">
			<template v-for="c in 7">
				<day-box
				:c="c"
				:r="r"
				:w="weekOfYear"
				:now="now"
				@click="setDay(weekOfYear, r, c)"
			/>
			</template>
		</div>
	</div>
</template>

<script>

import DateUtils from '../helpers/DateUtils.js'

export default {
	name: 'AgendaPanel',

	beforeUnmount() {
		this.$store.dispatch('main/resetpanels')
	},

	data() {
		return {
			rowview: '',
			colview: '',
			picked:  '',
		}
	},

	computed: {

		settings() {
			return this.$store.getters['main/settings']
		},

		now() {
			return this.$store.getters['main/now']
		},

		weekOfYear() {
			let calc  = new Date(this.now)
			let start = new Date(calc.setDate(calc.getDate() - 7));

			if (this.settings.startdate) {
				start = new Date(this.settings.startdate)
			}

			return DateUtils.getWeek(start)
		},

		dateToShow() {
			// feedback ...
			// this should set colview rowview really...
			let dateToShow = this.$store.getters['main/paneldata']
			if (!dateToShow) {
				this.rowview= ''
				this.colview= ''
				this.picked = ''
			}
			return dateToShow
		},

	},

	methods: {

		columnDate(w, r, c) {
			return DateUtils.dateOnGrid( w + 1, r - 1, c )
		},

		setDay(w, r, c) {
			let id = `${c}-${r}`
			if (id === this.picked) {
				this.rowview= ''
				this.colview= ''
				this.picked = ''
				this.$store.dispatch('main/resetpanels')
			} else {
				this.rowview= `row-${r}`
				this.colview= `col-${c}`
				this.picked = id
				this.$store.dispatch('main/paneldata', this.columnDate(w, r, c))
				this.$store.dispatch('main/showpanel', 'day')
				// this.$store.dispatch('main/showpicker', null)
			}

		}

	}

}

</script>
