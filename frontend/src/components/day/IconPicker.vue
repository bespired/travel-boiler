<template>
	<div class="picker-panel icons" :class="show">
		<input-row>
			<icon-button  :class="isSelected('car')"        name="car"        @click="setSelected('car')"        />
			<icon-button  :class="isSelected('takeoff')"    name="takeoff"    @click="setSelected('takeoff')"    />
			<icon-button  :class="isSelected('plane')"      name="plane"      @click="setSelected('plane')"      />
			<icon-button  :class="isSelected('flight')"     name="flight"     @click="setSelected('flight')"     />
			<icon-button  :class="isSelected('landing')"    name="landing"    @click="setSelected('landing')"    />
			<icon-button  :class="isSelected('boat')"       name="boat"       @click="setSelected('boat')"       />
			<icon-button  :class="isSelected('shinkansen')" name="shinkansen" @click="setSelected('shinkansen')" />
			<icon-button  :class="isSelected('train')"      name="train"      @click="setSelected('train')"      />
			<icon-button  :class="isSelected('landscape')"  name="landscape"  @click="setSelected('landscape')"  />
			<icon-button  :class="isSelected('city')"       name="city"       @click="setSelected('city')"       />
			<icon-button  :class="isSelected('building')"   name="building"   @click="setSelected('building')"   />
			<click-button label="-" @click="icon(null)"         />
		</input-row>
 
		<action-row>
			<click-button label="Laat maar" @click="close()" />
			<click-button label="Bewaren"   @click="save()"  />
		</action-row>

		<div class="close" @click="close()"><div class="icon-cancel"/></div>
	</div>
</template>

<script>

export default {
	name: 'IconPicker',

	data() {
		return {
			icon: '',
			swapped: false
		}
	},

	computed: {

		dateToShow() {
			this.todaysIcon()
			return this.$store.getters['main/paneldata']
		},

		panelToShow() {
			return this.$store.getters['main/showpicker']
		},

		show() {
			this.todaysIcon()
			return this.panelToShow === 'icon' ? 'show' : 'hide'
		},

	},

	methods: {

		save() {
			const date  = this.$store.getters['main/paneldata']
			const onDay = this.$store.getters['main/eventsOnDate'](date)

			onDay.icon = this.icon

			const payload = {
				'table': 'agenda',
				'record': onDay
			}

			this.$store.dispatch('main/save', payload)
				.then(this.close())
		},

		close() {
			this.$store.dispatch('main/showpicker', null)
		},

		isSelected(name) {
			return this.icon === name ? 'selected' : ''
		},

		setSelected(name) {
			this.icon = name
		},

		todaysIcon() {
			let date  = this.$store.getters['main/paneldata']
			let onDay = this.$store.getters['main/eventsOnDate'](date)

			if (!onDay) return
			if (!onDay.town) return

			if (this.swapped === onDay) return

			this.icon = onDay.icon

		}

	}

}

</script>

