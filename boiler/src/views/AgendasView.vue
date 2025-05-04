<template>

	<div class="page-padding">
		<i-phone>

			<agenda-combi :data="agenda" />

		</i-phone>
	</div>

</template>
<script>
export default {
	name: 'AgandaView',

	data() {
		return {
			agenda: {
				startdate: '2025-05-04',
				enddate:   '2025-06-10',
			}
		}
	}
}
</script>


<style>
	.page-padding { padding: 2em }
	.buttonrow ~ .buttonrow { margin-top: 4px }
</style>
