<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import LayoutDefault from '@/components/layout/Layout-default.vue'
import VillaDetails from '@/components/Villa-details.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import VILLAS from '@/data/villas'

const route = useRoute()
const villa = computed(() => VILLAS.find(({ id }) => id === route.params.id))
const breadcrumbPath = ['home', 'villas', villa.value.name]
</script>

<template>
  <LayoutDefault>
    <div class="py-4 bg-body-tertiary">
      <div class="container pb-5 pt-3">
        <Breadcrumb :path="breadcrumbPath" />
        <div class="card shadow-lg">
          <VillaDetails :villa="villa" />
        </div>
      </div>
    </div>
  </LayoutDefault>
</template>
