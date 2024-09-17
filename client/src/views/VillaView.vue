<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import VillaDetails from '@/components/Villa-details.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import VILLAS from '@/data/villas'

const route = useRoute()
const villa = computed(() => VILLAS.find(({ id }) => id === route.params.id))
const breadcrumbPath = ['home', 'villas', villa.value.name]
</script>

<template>
  <div class="container pb-5 pt-3">
    <Breadcrumb :path="breadcrumbPath" />
    <VillaDetails :villa="villa" />
  </div>
</template>
