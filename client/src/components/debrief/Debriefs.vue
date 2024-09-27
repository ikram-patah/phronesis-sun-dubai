<script setup>
import DebriefItem from '@/components/debrief/Debrief-item.vue'
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
          <DebriefItem id="week-8">
            <template #title>Project 8: Add consent check to the payment flow</template>
            <template #smile>
              <p>
                Easy to add to existing configuration. In the docs this feature has its own page,
                which makes it easy to follow (rather than just a reference).
              </p>
            </template>
            <template #confusing>
              <ul>
                <li class="list-item">
                  It would be nice to have a default value if the feature is turned on without any
                  additional i18n texting.
                </li>
                <li class="list-item">The docs could show an image preview of the feature.</li>
                <li class="list-item">
                  Copiable code on their own should work out of the box. Now it does not work
                  without the i18n code.
                </li>
                <li class="list-item">
                  The links' styles are not consistent with the rest of instruments links (use
                  primaryColor?)
                </li>
              </ul>
            </template>
          </DebriefItem>
        </div>
      </div>
    </div>
  </div>
</template>
