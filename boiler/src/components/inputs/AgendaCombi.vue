<template>
	<div class="agenda">
		<template v-for="w in weeks">
			<div class="agenda-week">
				<template v-for="d in 7">
					<box-button
						:year      = "year"
						:dayofyear = "dayOfYear(start, w-1, d-1)"
						:inrange   = "inRange(start, w-1, d-1)"
						:half      = "d > 5"
					/>
				</template>
			</div>
		</template>
		{{ weeks }} , {{ sdate }}, {{ edate }}
	</div>
</template>
<script>

export default {
	name: 'BigLabel',
	props: {
		data: { type: Object,   default: null },
	},

	data() {
		const sdate = this.data.startdate
		const edate = this.data.enddate
		return {
			year : parseInt(sdate.split('-')[0]),
			sdate: _doy(sdate + ' 00:00:00'),
			edate: _doy(edate + ' 23:59:59'),
		}
	},

	computed: {
		weeks() {
			return Math.ceil((this.last - this.start) / 7)
		},

		start() {
			return this.monday(this.sdate, 0)
		},

		last() {
			return this.monday(this.edate, -1)
		}
	},

	methods: {
		monday(doy, d) {
			const curdate = new Date(`${this.year}-1-1`)
			curdate.setDate(curdate.getDate() + doy + d);
			const cday = curdate.getDay()
			const dday = cday === 0 ? 7 : cday
			return 1 + doy - dday
		},

		inRange (s, w, d) {
			let diw = this.dayOfYear(s, w, d)
			let sd  = this.sdate
			let ed  = this.edate
			return (diw >= sd) && (diw < ed)
		},

		dayOfYear(s, w, d) {
			return s + w * 7 + d
		}

	}
}
</script>
<style>
	.agenda {
		display: flex;
		width: 100%;
		max-width: 400px;
		min-height: 100px;
		background-color: var(--color-bg-main);
    	flex-direction: column;
    	gap: 5px;
    	padding: 8px;
	}
	.agenda-week {
		display: flex;
		width: 100%;
		justify-content: space-evenly;
	}

</style>

