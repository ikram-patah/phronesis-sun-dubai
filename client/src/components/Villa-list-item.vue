<script setup>
import humanizeNumber from 'humanize-number'

const props = defineProps({
  villa: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="col-md-4">
    <div class="card shadow-lg">
      <img :src="props.villa.imgPath" class="bd-placeholder-img card-img-top" />
      <div class="card-body">
        <h5 class="card-title">
          {{ props.villa.name }}
        </h5>
        <p class="card-text">
          {{ props.villa.descriptionShort }}
        </p>
        <div class="d-flex justify-content-between align-items-center">
          <RouterLink
            :to="{ name: 'villa', params: { id: props.villa.id } }"
            custom
            v-slot="{ navigate }"
          >
            <button type="button" class="btn btn-primary" @click="navigate">Learn more</button>
          </RouterLink>
          <span class="text-body-secondary">
            ${{ humanizeNumber(props.villa.monthlyPrice) }} / month
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
