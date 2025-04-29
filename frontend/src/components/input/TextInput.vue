<template>
	<div class="input" :class="prelabel">
		<label>
			{{ label }}
		</label>
		<input :type="type" v-model="localvalue" :inputmode="inputmode" />
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
					this.$emit('update:modelValue', newValue)
				}
			},
		},
	}
</script>