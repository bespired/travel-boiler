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
				startdate: '2025-05-02',
				enddate:   '2025-06-05',

				travels: [
					{ stepin: '2025-05-02', stepout: '2025-05-03', stops: 0, type: 'flight', id: 'tra-1' },
					{ stepin: '2025-06-04', stepout: '2025-06-05', stops: 0, type: 'flight', id: 'tra-2' },
				],
				activities: [
					{ date: '2025-05-05', id: 'act-1' },
					{ date: '2025-05-07', id: 'act-2' },
					{ date: '2025-05-08', id: 'act-3' },
					{ date: '2025-05-09', id: 'act-4' },
					{ date: '2025-05-10', id: 'act-5' },
					{ date: '2025-06-04', id: 'act-6' },
				],
				stays: [
					{ checkin: '2025-05-05', checkout: '2025-05-06', id: 'sta-1' },
					{ checkin: '2025-05-07', checkout: '2025-05-10', id: 'sta-2' },
					{ checkin: '2025-05-11', checkout: '2025-05-12', id: 'sta-3' },
					{ checkin: '2025-05-12', checkout: '2025-05-14', id: 'sta-4' },
					{ checkin: '2025-05-14', checkout: '2025-06-05', id: 'sta-5' },
				],
			}
		}
	}
}
</script>


<style>
	.page-padding { padding: 2em }
	.buttonrow ~ .buttonrow { margin-top: 4px }
</style>
