<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  path: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <nav>
    <ol class="breadcrumb mb-4">
      <li v-for="item in props.path" class="breadcrumb-item" :key="item">
        <template v-if="item === 'home'">
          <RouterLink :to="{ name: 'home' }">Home</RouterLink>
        </template>
        <template v-else>
          {{ item }}
        </template>
      </li>
    </ol>
  </nav>
</template>
