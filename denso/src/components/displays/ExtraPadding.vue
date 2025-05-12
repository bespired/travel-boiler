<template>
	<div :class="`extra-padding-${size}`"/>
</template>
<script>

export default {
	name: 'ExtraPadding',
	props: {
		size: { type: Number,   default: 4 },
	},
}
</script>
<style>
	.extra-padding-4 { padding: 8px }
</style>
