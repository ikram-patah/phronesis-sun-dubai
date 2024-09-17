<script setup>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
</script>

<template>
  <div>
    <Header />
    <slot></slot>
    <Footer />
  </div>
</template>
