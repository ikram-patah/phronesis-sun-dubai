import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import DebriefView from '../views/DebriefView.vue'
import MembershipsView from '../views/MembershipsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/villas/:id',
      name: 'villa',
      component: () => import('../views/VillaView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: (to, from) => {
        if (useUserStore().isLoggedIn) {
          return { name: 'dashboard' }
        }
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/memberships',
      name: 'memberships',
      component: MembershipsView,
    },
    {
      path: '/debriefs',
      name: 'debriefs',
      component: DebriefView,
    },
  ]
})

export default router
