<template>

	<div class="event-menu" :key="`${loggedIn}-${selected}`" >

		<template v-for="item in menu" :key="item.id">
			<a  @click="setTab(item.id)"
				 class="menu-pill"
				:class="selected == item.id ? 'selected' : ''">
				<font-icon :name="item.icon" />
				<label>{{ item.label }}</label>
			</a>
		</template>

		<a  class="green-pill"
			v-if="canCreate"
			@click="editEvent('plc')"
			>
			<font-icon name="plus" />
		</a>

	</div>

</template>

<script>

export default {
	name: 'TopMenu',

	mounted() {
		window.addEventListener("resize",  this.windowResize );
	},

	beforeUnmount() {
		window.removeEventListener("resize", this.windowResize );
	},

	updated() {
		this.getPanelHeight()
	},

	methods: {

		setTab(id) {
			this.$store.dispatch('main/paneldata', null)

			this.$store.dispatch('main/eventmenu', id)
			this.$store.dispatch('main/showpanel', null)
			this.getPanelHeight()
		},

		editEvent(handle) {
			this.getPanelHeight()

			if (this.selected !== 'docs')
				this.$store.dispatch('main/paneldata', handle)

			this.$store.dispatch('main/showpanel', 'event')
		},

		windowResize() {
			const panel = document.querySelector('.input-panel.show')
			if (panel) {
				panel.style = "transition: initial"
				setTimeout( ()=>{panel.style = ""}, 100)
			}

			const bb = document.querySelector('.bottom-panel').getBoundingClientRect()
			document.documentElement.style.setProperty('--panel-height', bb.height + "px");
		},

		getPanelHeight() {
			this.$nextTick(() => {
				this.$nextTick(() => {
					this.$nextTick(() => {
						const panel = document.querySelector('.bottom-panel').getBoundingClientRect()
						const root  = document.documentElement;
						root.style.setProperty('--panel-height',  panel.height + "px");
					})
				})
			})
		},

	},

	computed: {

		places() {
			return this.$store.getters['main/places']
		},

		menu() {
			let menu = []

			menu.push({ id: 'fly',    label: 'Vliegen',  icon: 'plane' })
			menu.push({ id: 'sleep',  label: 'Slapen',   icon: 'hotel' })
			menu.push({ id: 'visit',  label: 'Bezoek',   icon: 'eye-outline' })
			menu.push({ id: 'docs',   label: 'Documenten', icon: 'description' })
			menu.push({ id: 'insta',  label: 'Insta',    icon: 'add-photo-alternate' })

			// menu.push({ id: 'travel', label: 'Reizen',   icon: 'shinkansen' })
			// menu.push({ id: 'city',   label: 'Steden',   icon: 'city' })

			return menu
		},

		selected() {
			const hash = location.hash.replace('#','')
			if ((hash.length > 0) && (this.places)){
				const place = this.places.find(p => p.handle === hash)
				if (place) this.$store.dispatch('main/eventmenu', place.type)
			}

			return this.$store.getters['main/eventmenu']
		},

		loggedIn() {
			return this.$store.getters['user/loggedIn']
		},

		canCreate() {
			return this.$store.getters['user/canCreate']
		},
		canTravel() {
			return this.$store.getters['user/canTravel']
		},
	}
}
</script>