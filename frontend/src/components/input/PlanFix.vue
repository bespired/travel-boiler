<template>
  	<span class="planfix" >
	    <icon-button :name="icon1" :class="selected1" @click="set(0)"/>
	    <icon-button :name="icon2" :class="selected2" @click="set(1)"/>
	</span>
</template>

<script>
	export default {
		name: 'PlanFix',
		props: {
			modelValue: { type: [String, Number], default: null },
			options:    { type: Object, default: { ja:'x', nee: 'check'} },
		},

		methods: {
			set(idx) {
				this.$emit('update:modelValue', Object.keys(this.options)[idx])
			}
		},

		computed: {

			icon1() {
				return Object.values(this.options)[0]
			},

			icon2() {
				return Object.values(this.options)[1]
			},

			selected1() {
				return Object.keys(this.options)[0] === this.modelValue ? 'selected' : ''
			},

			selected2() {
				return Object.keys(this.options)[1] === this.modelValue ? 'selected' : ''
			}

		},

	}
</script>
<style>

	.planfix .button.selected {
		background-color: var(--color-green);
	}
	.planfix .button i:before{
		font-size: 18px;
	}
	.planfix .button:nth-child(1) {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
	.planfix .button:nth-child(2) {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		margin-left: 2px;
	}
</style>

