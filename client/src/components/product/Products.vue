<script setup>
import { PRODUCTS } from '@/data/products'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="py-5 bg-body-tertiary">
    <div class="container">
      <div class="row">
        <div class="col-md-4" v-for="product in PRODUCTS" :key="product.id">
          <div class="card shadow-lg">
            <div class="card-body">
              <h5 class="card-title">
                {{ product.name }}
              </h5>
              <p class="card-text">
                {{ product.description }}
              </p>
              <RouterLink
                :to="{ name: 'product', params: { id: product.id } }"
                custom
                v-slot="{ navigate }"
              >
                <button type="button" class="btn btn-primary" @click="navigate">Learn more</button>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
