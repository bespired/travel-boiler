export default {

	namespaced: true,

	state: {
		server: import.meta.env.DEV ? import.meta.env.VITE_SERVICES_LOCAL : import.meta.env.VITE_SERVICES_WEB,
	},

}
