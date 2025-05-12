<template>
	<button-renderer
		:bind="bindings"
		@click="clicking()"
	/>
</template>
<script>

export default {
	name: 'ClickButton',
	props: {
		label:     { type: String,   default: null  },
		hint:      { type: String,   default: null  },
		tooltip:   { type: String,   default: null  },
		skin:      { type: String,   default: null  },
		smaller:   { type: Boolean,  default: false },
		rounder:   { type: Boolean,  default: false },
		disabled:  { type: Boolean,  default: false },
		iconname:  { type: String,   default: null  },
		align:     { type: String,   default: null  },
		callback:  { type: Function, default: null  },
		tabindex:  { type: Number,   default: -1    },
	},

	computed: {
		bindings() {
			let bind = {
				class: "click-button"
			}
			if (_isValid(this.label))    bind.label    = this.label
			if (_isValid(this.iconname)) bind.iconname = this.iconname
			if (_isValid(this.smaller))  bind.smaller  = this.smaller
			if (_isValid(this.rounder))  bind.rounder  = this.rounder
			if (_isValid(this.skin))     bind.skin     = 'skin-' + this.skin

			return bind
		},
	},
	methods: {
		clicking() {
			if (_notValid(this.callback)) return
			this.callback()
		}
	}
}
</script>
