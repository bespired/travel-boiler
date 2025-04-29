<template>
	<div class="base-button">
		<font-icon v-if="iconname" :iconname="iconname" />
		<span class="label" v-if="label">{{ label }}</span>
	</div>
</template>
<script>

export default {
	name: 'ButtonRenderer',
	props: {
		label:     { type: String,   default: ''        },
		hint:      { type: String,   default: null      },
		color:     { type: String,   default: 'default' },
		smaller:   { type: Boolean,  default: false     },
		disabled:  { type: Boolean,  default: false     },
		tabindex:  { type: Number,   default: -1        },
		href:      { type: String,   default: null      },
		routename: { type: String,   default: null      },
		iconname:  { type: String,   default: null      },
		align:     { type: String,   default: 'none'    },
		callback:  { type: Function, default: null      },
		tooltip:   { type: String,   default: null      },
	},
}
</script>
<style>
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
		transition: background-color 200ms;
	}

	.base-button ~ .base-button {
		margin-left: 2px;
	}

	.base-button:hover {
		cursor: pointer;
		border: 1px solid var(--color-border);
		background-color: var(--color-bghover);

	}

	.base-button:active {
		transition: background-color 10ms;
		border: 1px solid var(--color-border);
		background-color: var(--color-bgactive);

	}

	.base-button .icon~.label {
		margin-right: 4px;
	}
</style>
