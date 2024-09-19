<script setup>
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/store'

const userStore = useUserStore()
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
          <a href="#apartment" class="nav-link">Villas</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link">FAQs</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link">About</a>
        </li>
        <li class="nav-item">
          <RouterLink v-if="userStore.isLoggedIn" :to="{ name: 'dashboard' }" class="nav-link">
            Dashboard
          </RouterLink>
          <RouterLink v-else :to="{ name: 'login' }" class="nav-link" activeClass="active">
            Login
          </RouterLink>
        </li>
      </ul>
    </header>
  </div>
</template>
