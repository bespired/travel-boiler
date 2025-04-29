<template>
	<i :class="[`icon-${name}`, spin ? 'animate-spin' : '']" v-if="name" />
	<i :data-missing="`icon-${name}`" v-else />
</template>
<script>
export default {
	name: 'FontIcon',
	props: {
		name: { type: String, default: null },
		spin: { type: Boolean, default: false },
	}
}
</script>

