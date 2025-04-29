<template>
	<div class="menu-pill clickpos" v-if="mapclick" @click.stop="copyBuffer()">
        {{ mapclick }}
    </div>
</template>
<script>

export default {
	name: 'MapClick',

	computed: {
	    mapclick() {
            return this.$store.getters['main/mapclick']
        },
	},

	methods: {
		copyBuffer() {
			if (!window.isSecureContext) {
				alert('works on site')
			} else {
				try {
        			navigator.clipboard.writeText(this.mapclick);
        			alert(this.mapclick + ' copied to clipboard')
    			} catch (error) {
        			alert('failed to copy to clipboard. error=' + error);
    			}
    		}
		}
	},
}
</script>
<style>
	.clickpos {
		position: fixed;
		top: 10px;
		right: 8px;
	}
</style>