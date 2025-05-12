<template>
	<div :class="`big-label-${size}`">{{ label }}</div>
</template>
<script>

export default {
	name: 'BigLabel',
	props: {
		label: { type: String,   default: '' },
		size:  { type: Number,   default: 2 },
	},
}
</script>
<style>
	.big-label-2 { font-size: 24px; }
</style>
