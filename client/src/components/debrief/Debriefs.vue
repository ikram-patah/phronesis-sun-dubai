<script setup>
import DebriefItem from '@/components/debrief/Debrief-item.vue'
import { debriefs } from '@/data/debriefs'
</script>

<template>
  <div class="py-5 bg-body-tertiary">
    <div class="container">
      <div class="text-center mb-4">
        <h2>Debriefs</h2>
      </div>
    </div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <DebriefItem v-for="debrief in debriefs" :key="debrief.id" :id="debrief.id">
            <template #title>
              {{ debrief.title }}
            </template>
            <template #smile>
              <ul>
                <li v-for="(smile, index) in debrief.smiles" v-html="smile" :key="index"></li>
              </ul>
            </template>
            <template #confusing>
              <ul>
                <li
                  v-for="(confusing, index) in debrief.confusings"
                  v-html="confusing"
                  :key="index"
                  class="mb-3"
                ></li>
              </ul>
            </template>
          </DebriefItem>
        </div>
      </div>
    </div>
  </div>
</template>
