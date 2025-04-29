<template>
	<div class="yen-backdrop"></div>
	<div class="yen-grid">
		<text-input type="number" label="Yen" :clear="true" v-model="yen" />
		<div align="right"> € {{ (yen * rate).toFixed(2) }}</div>
		<template v-for="mul in multi">
			<div align="right">{{ mul }} <span>¥</span></div>
			<div align="right"><span>€</span> {{ value(mul) }}</div>
		</template>
	</div>
</template>

<script>

export default {
	name: 'YenView',

	mounted() {
		this.$store.dispatch('main/load', 'currency')
	},

	data() {
		return {
			yen: 1000,
			multi: [
				'100', '200', '500',
				'1.000', '2.000', '3.000', '5.000', '8.000',
				'10.000', '20.000', '40.000', '50.000'
			]
		}
	},

	computed: {
		rate() {
			return this.$store.getters['main/rate']
		},
	},

	methods: {
		value(mul) {
			let val = parseInt(mul.replace('.', ''))
			return (val * this.rate).toFixed(2)
		}
	}
}
</script>