<script setup>
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/store'
import { useCartStore } from '@/store/cart'

const userStore = useUserStore()
const cartStore = useCartStore()
</script>

<template>
  <div class="container">
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <span class="fs-4 d-flex align-items-center mb-3 mb-md-0 me-md-auto">
        Phronesis Sun Dubai
      </span>

      <ul class="nav nav-pills">
        <li class="nav-item">
          <RouterLink :to="{ name: 'home' }" class="nav-link" activeClass="active">
            Home
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink :to="{ name: 'villas' }" class="nav-link" activeClass="active">
            Villas
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink :to="{ name: 'memberships' }" class="nav-link" activeClass="active">
            Memberships
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink :to="{ name: 'products' }" class="nav-link" activeClass="active">
            Products
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink :to="{ name: 'debriefs' }" class="nav-link" activeClass="active">
            Debriefs
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink v-if="userStore.isLoggedIn" :to="{ name: 'dashboard' }" class="nav-link">
            Dashboard
          </RouterLink>
          <RouterLink v-else :to="{ name: 'login' }" class="nav-link" activeClass="active">
            Login
          </RouterLink>
        </li>
        <li class="nav-item" v-if="cartStore.hasItems">
          <RouterLink :to="{ name: 'checkout' }" custom v-slot="{ navigate }">
            <button type="button" class="btn btn-primary position-relative" @click="navigate">
              <i class="bi bi-cart"></i>
              <span
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              >
                {{ cartStore.items.length }}
              </span>
            </button>
          </RouterLink>
        </li>
      </ul>
    </header>
  </div>
</template>
