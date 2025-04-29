<template>

	<div class="page-padding">
		<big-label label="Buttons" />
		<div class="buttonrow">
			<click-button label="Click" />
			<click-button label="Home" iconname="home"/>
			<click-button iconname="home" />
		</div>
		<div class="buttonrow">
			<click-button label="Click" :smaller="true" />
		</div>
	</div>

</template>


<style>
	.page-padding { padding: 2em }
	.buttonrow ~ .buttonrow { margin-top: 4px }
</style>
