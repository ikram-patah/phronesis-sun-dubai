<script setup>
import { reactive, onMounted } from 'vue'
import RebillyInstruments from '@rebilly/instruments'
import humanizeNumber from 'humanize-number'
import api from '@/helpers/api'
import Modal from '@/components/Modal.vue'
import { useModal } from '@/composables/use-modal'

const props = defineProps({
  villa: Object
})

const state = reactive({
  isProcessing: false,
  planType: 'monthly'
})

function initiateInstrument({ token, depositRequestId }) {
  RebillyInstruments.mount({
    apiMode: 'sandbox',
    jwt: token,
    deposit: { depositRequestId }
  })
}

async function openDepositModal() {
  state.isProcessing = true
  const baseAmount =
    state.planType === 'monthly' ? [props.villa.monthlyPrice] : [props.villa.yearlyPrice]

  try {
    const { depositRequestId, token } = await api({
      method: 'POST',
      resource: 'deposit-request',
      body: { amounts: [0.2, 0.3, 0.5].map((m) => m * baseAmount) }
    })
    showModal('deposit')
    initiateInstrument({ token, depositRequestId })
  } catch (error) {
    console.log(error)
    alert('An error occurred. Please try again later.')
  } finally {
    state.isProcessing = false
  }
}

function destroyInstruments() {
  RebillyInstruments.destroy()
}

const { showModal, closeModal } = useModal(['details', 'deposit'])
</script>

<template>
  <div>
    <div class="row align-items-center gx-5">
      <div class="col-md-6">
        <img :src="props.villa.imgPath" />
      </div>
      <div class="col-md-6">
        <h2 class="mb-3">
          {{ props.villa.name }}
        </h2>
        <div class="text-muted d-flex mb-3">
          <span>
            <i class="bi bi-pin-map"></i>
            {{ props.villa.location }}
          </span>
          <span style="margin-left: 2rem">
            <i class="bi bi-house"></i>
            {{ props.villa.beds }}
          </span>
          <span style="margin-left: 2rem">
            <i class="bi bi-textarea-resize"></i>
            {{ humanizeNumber(props.villa.sqft) }} sqft
          </span>
        </div>
        <p class="mb-4">
          {{ props.villa.descriptionShort }}
        </p>
        <div class="text-muted">
          <span>${{ humanizeNumber(props.villa.yearlyPrice) }} monthly</span>
          <span class="px-2">or</span>
          <span>${{ humanizeNumber(props.villa.monthlyPrice) }} yearly</span>
        </div>

        <div class="pt-4">
          <button class="btn btn-primary" @click="() => showModal('details')">Book now</button>
        </div>
      </div>
    </div>

    <!-- ---------------------------------------- -->
    <!-- Details Modal -->
    <!-- ---------------------------------------- -->
    <Modal
      id="details"
      :title="`Book ${props.villa.name}`"
      :closeFunc="() => closeModal('details')"
    >
      <template #body>
        <div class="list-group">
          <label class="list-group-item d-flex gap-2">
            <input
              class="form-check-input flex-shrink-0"
              type="radio"
              name="planType"
              v-model="state.planType"
              value="monthly"
            />
            <span>
              Monthly plan
              <small class="d-block text-body-secondary">
                ${{ humanizeNumber(props.villa.monthlyPrice) }} per month
              </small>
            </span>
          </label>
          <label class="list-group-item d-flex gap-2">
            <input
              class="form-check-input flex-shrink-0"
              type="radio"
              name="planType"
              v-model="state.planType"
              value="yearly"
            />
            <span>
              Yearly plan
              <small class="d-block text-body-secondary">
                ${{ humanizeNumber(props.villa.yearlyPrice) }} per month
              </small>
            </span>
          </label>
        </div>
      </template>
      <template #footer>
        <button
          type="button"
          class="btn btn-primary"
          @click="openDepositModal"
          :disabled="state.isProcessing"
        >
          <template v-if="state.isProcessing"> Loading... </template>
          <template v-else> Proceed with booking </template>
        </button>
      </template>
    </Modal>

    <!-- ---------------------------------------- -->
    <!-- Deposit Modal -->
    <!-- ---------------------------------------- -->
    <Modal
      id="deposit"
      size="lg"
      :title="`Deposit for ${props.villa.name}`"
      :closeFunc="
        () => {
          closeModal('deposit')
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
