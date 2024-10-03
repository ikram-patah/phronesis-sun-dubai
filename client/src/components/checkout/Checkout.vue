<script setup>
import { computed, onMounted } from 'vue'
import { useCartStore } from '@/store/cart'
import RebillyInstruments from '@rebilly/instruments'

const cartStore = useCartStore()

const items = computed(() =>
  cartStore.items.map((item) => ({
    planId: item.id,
    quantity: {
      default: item.quantity,
      multipleOf: 1,
      minimum: 1
    }
  }))
)

onMounted(() => {
  RebillyInstruments.mount({
    organizationId: 'phronesis-sun-dubai',
    publishableKey: 'pk_sandbox_n6_C4CB3xxXxKfeLTcPSfSb4e2SCOE9iwh59PPF',
    websiteId: 'sun-dubai.ae',
    apiMode: 'sandbox',
    items: items.value
  })
})
</script>

<template>
  <div class="py-5 bg-body-tertiary">
    <div class="container">
      <h3 class="mb-4">Complete your purchase</h3>
      <div class="row">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <div class="rebilly-instruments-summary"></div>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <div class="card">
            <div class="card-body">
              <div class="rebilly-instruments"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
