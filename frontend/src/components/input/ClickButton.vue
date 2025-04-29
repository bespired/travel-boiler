<template>
	<div class="button" @click="$emit('clicked')">
		<font-icon :name="name" />
		{{ label }}
	</div>
</template>

<script>
	export default {
		name: 'IconButton',
		props: {
			name:  { type: String, default: null },
			label: { type: String, default: '' },
		}
	}
</script>