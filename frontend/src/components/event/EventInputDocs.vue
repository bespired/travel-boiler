<template>
	<input-row >
    	<div><i class="icon-upload" /> Upload</div>
	   	<input 
	   		ref="upload"
       		type="file"
       		name="file-upload"
       		multiple="false"
       	>
       		<action-row>
				<click-button label="Laat maar" @click="close()" />
				<click-button label="Bewaren"   @click="save()"  />
			</action-row>
	</input-row>

</template>

<script>

export default {
	name: 'EventInputDocs',

	props: {
		handle: { type: String, default: null },
	},

	components: {},

	data() {
		return {
			file: null,
		}
	},

	computed: {
		server() {
			return this.$store.getters['user/server']
		},
	},

	emits: {
		close: null,
	},

	methods: {
		close() {
			this.$emit('close')
		},

		save() {
			let files = this.$refs.upload.files
			let token = localStorage.getItem('japan.token')

			if (!token) return

			let formData = new FormData();			
			formData.append( "upload", files[0]);

			fetch( `${this.server}/upload`, {
    			method: 'POST',
    			headers: {
        			'X-Token': token,
        			'Accept': '*/*',
    			},
    			body: formData
			})
			.then( (result) => {
				this.$refs.upload.value = null
				this.$store.dispatch('main/load', 'documents')
				this.close() 
			})
			.catch( (error) => {
				console.log(error)
			})
      		
   			
		}
	}


}
</script>