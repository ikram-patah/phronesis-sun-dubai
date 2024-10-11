<script setup>
import Sidebar from '@/components/layout/Sidebar.vue'
</script>

<template>
  <div class="d-flex flex-nowrap" style="height: 100vh">
    <Sidebar />
    <slot></slot>
  </div>
</template>
