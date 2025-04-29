<template>
	<div class="input" :class="prelabel">
		<label for="vsdf">{{ label }}</label>
  		<select id="vsdf" v-model="localvalue">
	    	<option value="visit">Bezoek  </option>
	    	<option value="sleep">Slapen  </option>
	    	<option value="drive">Rijden  </option>
	    	<option value="fly"  >Vliegen </option>
	  	</select>
	</div>
</template>

<script>
	export default {
		name: 'TextInput',
		props: {
			lblen:      { type: [String,Number], default: null },
			label:      { type: [String,Number], default: null },
			modelValue: { type: [String,Number], default: '' },
		},

		computed: {

			prelabel() {
				return this.lblen ? `row-${this.lblen}` : null
			},

			localvalue: {
				get() {
					return this.modelValue
				},
				set(newValue) {
					this.$emit('update:modelValue', newValue)
				}
			},
		},
	}
</script>

