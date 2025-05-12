<template>
	<div :class="classes" >
		<font-icon v-if="bind.iconname" :iconname="bind.iconname" />
		<span v-if="bind.label" class="label" >{{ bind.label }}</span>
	</div>
</template>
<script>

export default {
	name: 'ButtonRenderer',
	props: {
		bind:  { type: Object, default: null },
		// hint:      { type: String,   default: null      },
		// color:     { type: String,   default: 'default' },
		// smaller:   { type: Boolean,  default: false     },
		// disabled:  { type: Boolean,  default: false     },
		// tabindex:  { type: Number,   default: -1        },
		// href:      { type: String,   default: null      },
		// routename: { type: String,   default: null      },
		// iconname:  { type: String,   default: null      },
		// align:     { type: String,   default: 'none'    },
		// callback:  { type: Function, default: null      },
		// tooltip:   { type: String,   default: null      },
	},

	computed: {
		classes() {
			let classes= ['base-button']
			if (this.bind.smaller) classes.push('button-smaller')
			if (this.bind.rounder) classes.push('button-rounder')
			if (this.bind.skin)    classes.push( this.bind.skin )

			return classes
		}
	}

}
</script>
<style>
	.link-button {
		height: fit-content;
		display: inline-flex;
	}
	.base-button {
		user-select: none;
		display: inline-flex;
		align-items: center;
    	justify-content: center;

		border-radius: var(--border-radius);
		min-height:    var(--button-height);
		padding: 0 12px;

		cursor: pointer;

		border: 1px solid var(--color-border);
		background-color: var(--color-bginput);
		transition: filter 200ms;

	}

	.link-button ~ .link-button,
	.link-button ~ .base-button,
	.base-button ~ .link-button,
	.base-button ~ .base-button {
		margin-left: 2px;
	}

	.base-button:hover {
		cursor: pointer;
		filter: brightness(1.1);
	}

	.base-button:active {
		transition: background-color 10ms;
		filter: brightness(0.95);
	}

	.base-button .icon~.label {
		margin-right: 4px;
	}

	.button-smaller {
	    min-height:22px;
    	font-size: 14px;
	    border-radius: 4px;
	}
	.button-rounder {
	    border-radius: 50%;
	    max-width:  var(--button-height);
	}
	.button-rounder.button-smaller {
		min-width: 24px;
		max-width: 24px;
    	max-height: 24px;
    	min-height: 24px;
	}


	.base-button.skin-success,
	.base-button.skin-warning,
	.base-button.skin-error,
	.base-button.skin-cancel,
	.base-button.skin-apply {
		color: var(--skin-front-light);
		text-shadow: 0 0 8px rgba(0,0,0,0.2);
		overflow: hidden;
	}

	.base-button.skin-success {
		background-color: var(--skin-back-green);
	}

	.base-button.skin-warning {
		background-color: var(--skin-back-orange);
	}

	.base-button.skin-error {
		background-color: var(--skin-back-red);
	}

	.base-button.skin-cancel {
		background-color: var(--skin-back-grey);
	}

	.base-button.skin-apply {
		background-color: var(--skin-back-blue);
	}




</style>
