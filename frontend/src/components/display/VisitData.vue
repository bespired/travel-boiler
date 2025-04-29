<template>
	<div><i class="icon-eye-outline"></i>Bezoeken </div>
	<table>
		<tr>
			<td>
				<div><label>Naam</label>     <span>{{ payload.name }}   </span></div>
				<div><label>Straat</label>   <span>{{ payload.address }}</span></div>
				<div><label>Stad</label>     <span>{{ payload.town }}   </span></div>
				<div><label>Tijdstip</label> <span>{{ payload.time }}   </span></div>
				<div><label>Bericht</label>  <span>{{ payload.message }}</span></div>
				<div v-if="payload.link">
					<label>Link</label>
					<a target="window" :href="payload.link">{{ payload.link }}</a>
				</div>
			</td>
			<td width="30%">
				<img :src="payload.imgurl" v-if="payload.imgurl"  />
			</td>
		</tr>
	</table>
</template>
<script>

export default {
	name: 'FlyData',
	props: {
		payload: { type: Object, default: null },
	}
}
</script>