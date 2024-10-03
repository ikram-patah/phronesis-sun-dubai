<script setup>
import { reactive, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { PRODUCTS } from '@/data/products'
import { useCartStore } from '@/store/cart'
import humanizeNumber from 'humanize-number'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useToast } from 'vue-toastification'

const route = useRoute()
const cartStore = useCartStore()
const toast = useToast()

const state = reactive({
  quantity: 1
})

const product = computed(() => {
  return PRODUCTS.find((product) => product.id === route.params.id)
})

function addToCart() {
  cartStore.addItem({
    id: product.value.id,
    quantity: state.quantity
  })
  state.quantity = null
  toast.success('Product added to cart')
}

const breadcrumbPath = computed(() => ['home', 'products', product.value.name])
</script>

<template>
  <div class="py-5 bg-body-tertiary">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <Breadcrumb :path="breadcrumbPath" />
          <div class="row g-5 align-items-center">
            <div class="col-md-6">
              <img :src="`/images/products/${product.id}.webp`" alt="" />
            </div>
            <div class="col-md-6">
              <h4 class="mb-4">
                {{ product.name }}
              </h4>
              <p class="card-text text-muted">
                {{ product.description }}
              </p>
              <div class="my-4">${{ humanizeNumber(product.price) }} per unit</div>
              <div class="row g-3">
                <div class="col-auto">
                  <label class="col-form-label">Quantity</label>
                </div>
                <div class="col-auto">
                  <input v-model.number="state.quantity" type="number" class="form-control" />
                </div>
                <div class="col-auto">
                  <button class="btn btn-primary" :disabled="!state.quantity" @click="addToCart">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
