<template>
	<label>
		<img :src="icon" v-if="icon" />
		{{ label }}
	</label>
</template>

<script>
	export default {
		name: 'TextInput',
		props: {
			icon:  { type: String, default: null },
			label: { type: [String,Number], default: null },
		},
	}
</script>