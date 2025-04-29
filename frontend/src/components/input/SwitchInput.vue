<template>
	<div class="input" :class="prelabel">
		<label class="checkback">{{ label }}
			<input type="checkbox" v-model="localvalue" :inputmode="inputmode" />
		</label>
		<icon-button name="clear" @click="localvalue=''" v-if="clear" />
	</div>
</template>
<style>
.checkback  {
	padding: 4px 8px;
	border: 1px solid var(--color-border);
	background-color: var(--color-bginput);
	border-radius: 3px;
	font-size: 12px;
}
.checkback input {
	width: 100%;
	height: 24px;
}
</style>
<script>
export default {
	name: 'SwitchInput',
	props: {
		type:  { type: String, default: 'text' },
		clear: { type: Boolean, default: false },
		lblen: { type: [String, Number], default: null },
		label: { type: [String, Number], default: null },
		modelValue: { type: [String, Number,Boolean], default: '' },
	},

	computed: {
		prelabel() {
			return this.lblen ? `row-${this.lblen}` : null
		},

		inputmode() {
			return this.type === 'number' ? 'decimal' : ''
		},

		localvalue: {
			get() {
				return this.modelValue
			},
			set(newValue) {
				// console.log('update:modelValue', newValue)
				this.$emit('update:modelValue', newValue)
			}
		},
	},
}
</script>