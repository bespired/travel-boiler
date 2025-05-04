<template>
	<div :class="classes()" >
		<div class="date">{{ day }}</div>
	</div>
</template>
<script>

export default {
	name: 'ClickButton',
	props: {
		half:    { type: Boolean,  default: false },
		inrange: { type: Boolean,  default: false },

		year:      { type: Number,  default: null },
		dayofyear: { type: Number,  default: null },
	},

	data() {
		let curdate = new Date(`${this.year}-1-1`)
		curdate.setDate(curdate.getDate() + this.dayofyear);
		return {
			day: curdate.getDate()
		}
	},

	methods: {
		classes() {
			let classes = ['box']
			classes.push(this.inrange ? 'inrange' : 'box-full')
			if (this.half) classes.push('box-half')

			return classes
		},
	},


}
</script>
<style>
    .box {
    	position: relative;
        width: 50px;
        height: 58px;
    }
    .box .date{
    	position: absolute;
    	top: 3px; left: 2px;
    	font-size: 14px;
    }
</style>
