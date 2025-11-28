// src/router.ts

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './components/HomeView.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import ExploreView from './components/ExploreView.vue'
import CommunityView from './components/CommunityView.vue'
import DashboardView from './components/DashboardView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/explore',
    name: 'explore',
    component: ExploreView
  },
  {
    path: '/community',
    name: 'community',
    component: CommunityView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true } // Add meta field to indicate this route requires authentication
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router