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
			path: '/insta',
			name: 'insta',
			component: () => import('../views/InstaView.vue')
		}, {
			path: '/vimeo',
			name: 'vimeo',
			meta: { map: true },
			component: () => import('../views/VimeoView.vue')
		}, {
			path: '/blog/:id',
			name: 'blog-entry',
			component: () => import('../views/BlogPage.vue')
		}, {
			path: '/blog',
			name: 'blog',
			component: () => import('../views/BlogView.vue')
		}, {
			path: '/login',
			name: 'login',
			component: () => import('../views/LoginView.vue')
		}, {
			path: '/agenda',
			name: 'agenda',
			meta: { map: true },
			component: () => import('../views/AgendaView.vue')
		}, {
			path: '/map',
			name: 'map',
			meta: { map: true },
			component: () => import('../views/MapView.vue')
		}, {
			path: '/credits',
			name: 'credits',
			component: () => import('../views/CreditsView.vue')
		}, {
			path: '/links',
			name: 'links',
			component: () => import('../views/LinksView.vue')
		}, {
			path: '/list',
			name: 'list',
			component: () => import('../views/listView.vue')
		}, {
			path: '/events/:hash?',
			name: 'events',
			component: () => import('../views/EventView.vue')
		}, {
			path: '/yen',
			name: 'yen',
			component: () => import('../views/YenView.vue')
		}, {
			path: '/icons',
			name: 'icons',
			component: () => import('../views/IconsView.vue')
		},

	]
})

export default router
