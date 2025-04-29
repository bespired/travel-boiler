<template>
	<div class="menu-panel" :key="loggedIn">
		<template v-for="item in menu" :key="item.id">
			<router-link :to="{ name: item.route }" class="menu-pill">
				<font-icon :name="item.icon" />
				<label>{{ item.label }}</label>
			</router-link>
		</template>

 		<a @click="login" class="menu-pill" >
            <i class="icon-key"></i>
            <label :key="loggedIn">{{ logmelding }}</label>
        </a>

	</div>
</template>

<script>

export default {
	name: 'MainMeniu',


	methods: {
        login() {
            this.$store.commit('user/loginPanel', true)
        }
	},

	computed: {

		menu() {
			let menu = []

			menu.push({ id: 'home',     label: 'Home',   route: 'home',    icon: 'home' })
			menu.push({ id: 'vimeo',    label: 'Vimeo',  route: 'vimeo',   icon: 'movie' })
			menu.push({ id: 'insta',    label: 'Insta',  route: 'insta',   icon: 'image' })
			menu.push({ id: 'blog',     label: 'Blog',   route: 'blog',    icon: 'ballot' })
			menu.push({ id: 'agenda',   label: 'Agenda', route: 'agenda',  icon: 'calendar' })
			menu.push({ id: 'map',      label: 'Kaart',  route: 'map',     icon: 'map' })
			menu.push({ id: 'currency', label: 'Yen',    route: 'yen',     icon: 'yen' })

			if (this.canCreate) {
				menu.push({ id: 'event', label: 'Event', route: 'events', icon: 'visibility' })
			}

			return menu
		},

		loggedIn() {
			return this.$store.getters['user/loggedIn']
		},

		canCreate() {
			return this.$store.getters['user/canCreate']
		},

		canTravel() {
			return localStorage.getItem('japan.traveler') !== null
		},

		logmelding() {
            return this.loggedIn ? 'Uitloggen' : ''
        },

	}
}
</script>
