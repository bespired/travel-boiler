<template>
	<div class="input-panel document" :class="show" >
		<img :src="secure()" class="paspoort"/>
		<div class="close" @click="close()"><div class="icon-cancel"/></div>
	</div>
</template>
<style type="text/css">
	.paspoort {
		border-radius: 15px;
    	width: 100%;
    	margin: -5px;
	}
	.input-panel.document {
		text-align: center;
	}
</style>
<script>

export default {
	name: 'PassportPanel',

	computed: {

		handleToShow() {
			return this.$store.getters['main/showpanel']
		},

		paneldata() {
			return this.$store.getters['main/paneldata']
		},

		server() {
			return this.$store.getters['user/server']
		},

		show() {
			return this.handleToShow === 'document' ? 'show' : 'hide'
		},


	},

	methods: {

		secure() {
			if (!this.paneldata) return ''

			const imgkey = localStorage.getItem('japan.imgkey')
			const id = this.paneldata.id
			return `${this.server}/image?name=${id}&key=${imgkey}`
		},

		close() {
			this.$store.dispatch('main/showpanel', null)
		},
	}

}

</script>

