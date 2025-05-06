<template>
	<router-view   />
</template>

<script>
export default {
	name: 'App',

	beforeMount(){
		// this can become prefered theme
		const css = document.getElementById('theme.css');
		const jst = document.getElementById('theme.js');

		css.setAttribute('href', '../themes/jungle.css');

		var script = document.createElement('script');
    	script.id  = 'theme.dutch';
    	script.src = '../themes/dutch.js';
    	document.head.appendChild(script);

    	jst.remove()

	}

}
</script>
