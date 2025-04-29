<template>
	<button-renderer
		class="click-button"
		:label    = "label"
		:iconname = "iconname"
		@click="clicking()"
	/>
</template>
<script>

export default {
	name: 'ClickButton',
	props: {
		label:     { type: String,   default: null           },
		hint:      { type: String,   default: null           },
		tooltip:   { type: String,   default: null           },
		color:     { type: String,   default: 'default'      },
		smaller:   { type: Boolean,  default: false          },
		disabled:  { type: Boolean,  default: false          },
		iconname:  { type: String,   default: null           },
		align:     { type: String,   default: 'none'         },
		callback:  { type: Function, default: null           },
		tabindex:  { type: Number,   default: -1             },
	},

	computed: {
		// isDisabled() {
		// 	return this.disabled !== false
		// },
		// bindDisabled() {
		// 	return this.disabled !== false ? { disabled: 'disabled' } : {}
		// },
		// goto() {
		// 	if (this.href) return this.href;
		// 	if (this.routename) {
		// 		return this.$router.resolve({ name: this.routename }).path
		// 	}
		// 	return '#'
		// },
		// alignClass() {
		// 	return this.align ? `align-${this.align}` : ''
		// }
	},

	methods: {
		clicking() {
			if (_notValid(this.callback)) return
			this.callback()
		}
	}
}
</script>
