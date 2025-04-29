<template>
	<div class="button icon" @click="$emit('clicked')">
		<font-icon :name="name" />
	</div>
</template>

<script>
	export default {
		name: 'IconButton',
		props: {
			name: { type: String, default: 'close' },
		}
	}
</script>