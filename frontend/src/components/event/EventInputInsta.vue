<template>
	<div><i class="icon-eye-outline" /> Photos</div>
	<input-row :data-handle="datafill">
		<div>
			<image-input :lblen="2" label="Url" v-model="imgurl" />
		</div>
	</input-row>
	<action-row>
		<click-button label="Laat maar"   @click="close()"  />
		<click-button label="Bewaren"     @click="save()"   />
	</action-row>
</template>
<script>

export default {
	name: 'EventInputInsta',

	props: {
		handle: { type: String, default: null },
	},

	data() {
		return {
			imgurl:   '',
		}
	},

	computed: {
		datafill() {
			this.fillData(this.handle)
			return this.handle
		},
	},

	emits: {
		close: null,
	},

	methods: {
		close() {
			this.$emit('close')
		},

		fillData(handle) {
			this.imgurl=''
		},

		remove() {
			const payload = {
				'table': 'insta',
				'handle': this.handle
			}
			this.$store.dispatch('main/remove', payload)
			.then(()=>{ this.$store.dispatch('main/loadAll') })
			.then(()=>{ this.$emit('close') })

		},

		save() {
			const payload = {
				'table': 'insta',
				'record': {
					handle: 'jpg-' + this.imgurl.split('/')[3].split('.')[0],
					timestamp: new Date().getTime(),
					imgurl: this.imgurl,
				}
			}

			this.$store.dispatch('main/save', payload)
			.then(()=>{ this.$store.dispatch('main/loadAll') })
			.then(()=>{ this.$emit('close') })

		},

	}


}
</script>
