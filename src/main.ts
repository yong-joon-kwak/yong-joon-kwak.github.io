import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Blog from './views/Blog.vue'
import About from './views/About.vue'

import './style.css'

const routes = [
  { path: '/', component: Home },
  { path: '/blog', component: Blog },
  { path: '/about', component: About },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app') 