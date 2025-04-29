<template>
	<span :class="`icon icon-${iconname} icon-size-${size}`" />
</template>
<script>

export default {
	name: 'FontIcon',
	props: {
		iconname: { type: String,   default: '' },
		size:     { type: Number,   default: 1 },
	},
}
</script>
<style>
	.icon-size-1 {  }
</style>
