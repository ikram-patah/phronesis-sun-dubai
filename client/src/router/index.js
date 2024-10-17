import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store'
import { useCartStore } from '@/store/cart'
import { useToast } from 'vue-toastification'

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
      beforeEnter: () => {
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
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductsView.vue')
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue'),
      beforeEnter: () => {
        if (!useCartStore().hasItems) {
          useToast().error('Your cart is empty!')
          return { name: 'home' }
        }
      }
    },
    {
      path: '/funnel-hacking-live',
      name: 'funnel-hacking-live',
      component: () => import('../views/FunnelHackingLiveView.vue')
    },
    {
      path: '/casino',
      name: 'casino',
      component: () => import('../views/CasinoView.vue')
    },
  ]
})

export default router
