import './sass/index.scss'

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store  from './stores' 
import global from './global.js'

const app = createApp(App)

app.use(router).use(store)

app.mount('#app')

