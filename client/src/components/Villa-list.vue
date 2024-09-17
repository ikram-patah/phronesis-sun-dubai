<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import VillaListItem from '@/components/Villa-list-item.vue'
import VILLAS from '@/data/villas'

const props = defineProps({
  showHeader: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div id="apartment" class="album py-5 bg-body-tertiary">
    <div class="container">
      <div v-if="props.showHeader" class="text-center mb-5">
        <h2>Our apartments</h2>
        <p class="text-muted">
          Choose from a variety of packages to suit your lifestyle and budget
        </p>
      </div>

      <div class="row justify-content-center">
        <VillaListItem v-for="villa in VILLAS" :villa="villa" :key="villa.id" />
      </div>
    </div>
  </div>
</template>
