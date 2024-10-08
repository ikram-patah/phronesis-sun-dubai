<template>
  <div class="py-5 bg-body-tertiary">
    <div class="container">
      <div class="row">
        <div class="col text-center">
          <h2>Memberships</h2>
          <div class="d-inline-block mt-4 mb-4">
            <div class="form-check form-switch">
              <input
                v-model="state.isYearly"
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
              <label class="form-check-label" for="flexSwitchCheckDefault">
                <h6>Pay yearly</h6>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-4" v-for="item in memberships" :key="item.id">
          <div class="card shadow-lg">
            <div class="card-body">
              <h5 class="card-title">
                {{ item.name }}
              </h5>
              <p class="card-text">
                {{ item.description }}
              </p>
              <div class="d-flex justify-content-between align-items-center">
                <button type="button" class="btn btn-primary" @click="onBuy(item.id)">
                  Buy membership
                </button>
                <span class="text-body-secondary">
                  ${{ humanizeNumber(item.price) }} / {{ state.isYearly ? 'yearly' : 'monthly' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal
      id="membership"
      size="lg"
      title="Buy a membership"
      :closeFunc="
        () => {
          closeModal('membership')
          destroyInstruments()
        }
      "
    >
      <template #body>
        <div class="rebilly-instruments-summary"></div>
        <div class="rebilly-instruments"></div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import RebillyInstruments from '@rebilly/instruments'
import humanizeNumber from 'humanize-number'
import { reactive, computed } from 'vue'
import { useModal } from '@/composables/use-modal'
import Modal from '@/components/Modal.vue'

const state = reactive({
  isYearly: false
})

const memberships = computed(() => {
  return [
    {
      id: state.isYearly ? 'premium-yearly' : 'premium',
      name: 'Premium membership',
      description:
        'Experience elevated living in our Premium Apartments, offering a perfect blend of comfort, pricing and style',
      price: state.isYearly ? 500 : 50
    },
    {
      id: state.isYearly ? 'platinum-yearly' : 'platinum',
      name: 'Platinum membership',
      description:
        'Indulge in the ultimate luxury with our Platinum Apartments, featuring top-tier finishes, expansive views, and exclusive amenities',
      price: state.isYearly ? 1500 : 150
    }
  ]
})

const { showModal, closeModal } = useModal(['membership'])

function destroyInstruments() {
  RebillyInstruments.destroy()
}

function onBuy(planId) {
  showModal('membership')

  RebillyInstruments.mount({
    organizationId: 'phronesis-sun-dubai',
    publishableKey: 'pk_sandbox_n6_C4CB3xxXxKfeLTcPSfSb4e2SCOE9iwh59PPF',
    websiteId: 'sun-dubai.ae',
    apiMode: 'sandbox',
    items: [
      {
        planId,
        quantity: 1
      }
    ],
    i18n: {
      en: {
        consentCheck: {
          agreeToTOS:
            'I agree to the [terms of service](https://www.example.com/tos) and the [billing policy](https://www.example.com/privacy)'
        }
      }
    },
    ...(planId === 'premium' && {
      features: {
        showConsentCheck: ['form']
      }
    })
  })
}
</script>
