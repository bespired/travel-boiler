<template>
	{{ ucfirst(dateTime) }}
</template>
<script>
import { mapStores } from 'pinia'
import { useTimeStore } from '@/stores/time'

export default {
	name: 'DateTime',
	computed: {
		...mapStores(useTimeStore),

		dateTime: (store) => {
			const options = {
				weekday:  'long',
				year:     'numeric',
				month:    'long',
				day:      'numeric',
				hour:     '2-digit',
				minute:   '2-digit',
				second:   '2-digit',
				timeZone: 'asia/tokyo'
			}
			const dt = store.timeStore.dateTime
			if ((!dt) || (dt==0)) return ''

			const st = new Date(dt).toLocaleDateString('nl-NL', options)
			return st.replace(' om ', ' ')
		},
	},

	methods: {
		ucfirst(word) {
			return word.charAt(0).toUpperCase() + word.slice(1);
		}
	}
}
</script>

