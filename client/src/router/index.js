import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/villas',
      name: 'villas',
      component: () => import('../views/VillasView.vue')
    },
    {
      path: '/villas/:id',
      name: 'villa',
      component: () => import('../views/VillaView.vue')
    },
    {
      path: '/memberships',
      name: 'memberships',
      component: () => import('../views/MembershipsView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      beforeEnter: (to, from) => {
        if (useUserStore().isLoggedIn) {
          return { name: 'dashboard' }
        }
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/debriefs',
      name: 'debriefs',
      component: () => import('../views/DebriefView.vue')
    }
  ]
})

export default router
