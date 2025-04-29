<template>
	<div><i class="icon-flight"></i>Vliegen </div>
	<table>
		<tr>
			<td>
				<div><label>Naam</label>     <span>{{ payload.name }}   </span></div>

				<div><label>Vertrek</label> <span>{{ payload.leave }}   </span></div>
				<div><label>Landing</label> <span>{{ payload.land  }}   </span></div>

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