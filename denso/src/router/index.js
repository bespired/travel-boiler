import { createRouter, createWebHistory } from 'vue-router'
import MapView from '../views/MapsView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: MapView
		}, {
			path: '/icons',
			name: 'icons',
			component: () => import('../views/IconsView.vue')
		}, {
			path: '/buttons',
			name: 'buttons',
			component: () => import('../views/ButtonsView.vue')
		}
	]
})

export default router
