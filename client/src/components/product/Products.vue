<script setup>
import { PRODUCTS } from '@/data/products'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="py-5 bg-body-tertiary">
    <div class="container">
      <div class="text-center mb-5">
        <h2>Our products</h2>
        <p class="text-muted">Explore Our Diverse Range of Quality Products!</p>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="row g-4">
            <div class="col-md-6" v-for="product in PRODUCTS" :key="product.id">
              <div class="card shadow-lg mb-4">
                <div class="card-body">
                  <img :src="`/images/products/${product.id}.webp`" alt="" style="" />
                  <h5 class="card-title my-3">
                    {{ product.name }}
                  </h5>
                  <RouterLink
                    :to="{ name: 'product', params: { id: product.id } }"
                    custom
                    v-slot="{ navigate }"
                  >
                    <button type="button" class="btn btn-primary" @click="navigate">
                      Learn more
                    </button>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
