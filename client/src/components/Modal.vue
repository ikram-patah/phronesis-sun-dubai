<script setup>
import { useSlots } from 'vue'

const slots = useSlots()

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  closeFunc: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <div class="modal fade" :id="props.id" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">{{ props.title }}</h1>
          <button type="button" class="btn-close" @click="props.closeFunc"></button>
        </div>
        <div v-if="slots.body" class="modal-body">
          <slot name="body"></slot>
        </div>
        <div v-if="slots.footer" class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
