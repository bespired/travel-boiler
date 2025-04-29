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
		},

	]
})

export default router
