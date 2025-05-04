<template>
	<router-view   />
</template>

<script>
export default {
	name: 'App',

	beforeMount(){
		// this can become prefered theme
		var link = document.getElementById('theme');
		link.setAttribute('href', '../themes/jungle.css');
	}

}
</script>
