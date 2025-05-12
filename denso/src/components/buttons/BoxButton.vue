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
			day:   curdate.getDate(),
			month: curdate.getMonth(),
		}
	},

	methods: {
		classes() {
			let classes = ['box']
			classes.push(this.inrange ? 'inrange' : 'outrange')
			if (this.inrange) {
				classes.push('m' + (this.month % 2) )
				if (this.half) classes.push('box-half')
			}
			return classes
		},
	},


}
</script>
<style>

    .box {
    	position: relative;
        width: 14.2857142857%;
        height: 58px;
	    margin: 0 1.5px;
    }
    .box.inrange:hover {
    	filter: brightness(1.1);
    	cursor: pointer;
    }
    .box.start {
        margin: 0 0 0 1.5px;
        width: calc(14.2857142857% + 1.5px);
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    .box.mid {
        margin: 0;
        width: calc(14.2857142857% + 3px);
        border-radius: 0;
    }
    .box.end {
        margin: 0 1.5px 0 0;
        width: calc(14.2857142857% + 1.5px);
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
    .box .date{
    	position: absolute;
    	top: 3px; left: 3px;
    	font-size: 12px;
    	opacity: 0.8;
    }
</style>
