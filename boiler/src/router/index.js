import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		}, {
			path: '/boiler/icons',
			name: 'icons',
			component: () => import('../views/IconsView.vue')
		}, {
			path: '/boiler/buttons',
			name: 'buttons',
			component: () => import('../views/ButtonsView.vue')
		}, {
			path: '/boiler/agendas',
			name: 'agendas',
			component: () => import('../views/AgendasView.vue')
		}, {
			path: '/boiler/map',
			name: 'maps',
			component: () => import('../views/MapsView.vue')
		},

	]
})

export default router
