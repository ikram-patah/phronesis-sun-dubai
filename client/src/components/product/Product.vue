<script setup>
import { reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { PRODUCTS } from '@/data/products'
import { useCartStore } from '@/store/cart'

const route = useRoute()
const cartStore = useCartStore()

const state = reactive({
  quantity: 1,
  successMessage: ''
})

const product = computed(() => {
  return PRODUCTS.find((product) => product.id === route.params.id)
})

function addToCart() {
  cartStore.addItem({
    id: product.value.id,
    quantity: state.quantity
  })
  state.successMessage = 'Product added to cart'
  state.quantity = 0
}
</script>

<template>
  <div class="py-5 bg-body-tertiary">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="card shadow-lg">
            <div class="card-body">
              <h5 class="card-title">
                {{ product.name }}
              </h5>
              <p class="card-text">
                {{ product.description }}
              </p>
              <input
                v-model.number="state.quantity"
                type="number"
                class="form-control"
                placeholder="Quantity"
              />
              <button class="btn btn-primary mt-3" :disabled="!state.quantity" @click="addToCart">
                Add to Cart
              </button>
              <div v-if="state.successMessage" class="text-muted mt-2">
                <small>{{ state.successMessage }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
