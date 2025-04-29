<template>
	<div class="input" :class="prelabel">
		<label v-if="label">{{ label }}</label>
		<select v-model="localvalue">
			 <option v-for="(option, key) in options" :value="key">
			 	{{ option }}
			 </option>
		</select>
		<icon-button name="clear" @click="localvalue=''" v-if="clear"/>
	</div>
</template>

<script>
	export default {
		name: 'TextInput',
		props: {
			type:       { type: String, default: 'text' },
			clear:      { type: Boolean, default: false },
			lblen:      { type: [String,Number], default: null },
			label:      { type: [String,Number], default: null },
			options:    { type: [Object], default: null },
			modelValue: { type: [String,Number], default: '' },
		},

		computed: {
			prelabel() {
				return this.lblen ? `row-${this.lblen}` : null
			},

			inputmode() {
				return this.type==='number' ? 'decimal' : ''
			},

			localvalue: {
				get() {
					return this.modelValue
				},
				set(newValue) {
					// console.log('update:modelValue', newValue)
					if (newValue === 'null') newValue = null
					this.$emit('update:modelValue', newValue)
				}
			},
		},
	}
</script>