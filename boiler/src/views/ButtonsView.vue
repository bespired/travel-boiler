<template>

	<div class="page-padding">
		<link-button label="Home" iconname="home" routename="home"/>
		<extra-padding />
		<big-label label="Buttons" />
		<div class="buttonrow">
			<click-button label="Click" />
			<click-button label="Home" iconname="home"/>
			<click-button iconname="home" />
			<click-button iconname="home" :rounder="true" />
		</div>
		<div class="buttonrow">
			<click-button label="Smaller"   :smaller="true" />
			<click-button iconname="home" :rounder="true" :smaller="true" />
			<click-button label="Success" :smaller="true" skin="success"  />
			<click-button label="Warning" :smaller="true" skin="warning"  />
			<click-button label="Error"   :smaller="true" skin="error"    />
			<click-button label="Cancel"  :smaller="true" skin="cancel"   />
			<click-button label="Apply"   :smaller="true" skin="apply"    />
		</div>
	</div>

</template>


<style>
	.page-padding { padding: 2em }
	.buttonrow ~ .buttonrow { margin-top: 4px }
</style>
