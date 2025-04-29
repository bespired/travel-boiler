<template>
	<div class="input" :class="prelabel">
		<label>{{ label }}</label>
		<input type="text" v-model="localvalue" />
		<font-icon name="search" class="button-overlay" @click="search()"/>
	</div>
</template>

<script>
	import FetchForge from '@/helpers/FetchForge.js'

	export default {
		name: 'LatlongInput',
		props: {
			lblen:      { type: [String,Number], default: null },
			label:      { type: [String,Number], default: null },
			modelValue: { type: [String,Number], default: '' },
		},

		methods: {
			search() {
				const server= import.meta.env.DEV ?
					import.meta.env.VITE_SERVICES_LOCAL :
					import.meta.env.VITE_SERVICES_WEB

				const data = {
                	action:  "stack",
                	name:    this.modelValue
            	}

				fetch(server, FetchForge.post(data))
          			.then(response => response.json())
          			.then(data => {
  						let latitude  = data.location.latitude
  						let longitude = data.location.longitude
  						let newValue = latitude + "," + longitude
  						this.$emit('update:modelValue', newValue)
          			})
          			.catch((err) => {
              			console.log("Unable to fetch -", err)
          			})
			}
		},

		computed: {
			prelabel() {
				return this.lblen ? `row-${this.lblen}` : null
			},

			localvalue: {
				get() {
					return this.modelValue
				},
				set(newValue) {
					// console.log('update:modelValue', newValue)
					this.$emit('update:modelValue', newValue)
				}
			},
		},
	}
</script>
