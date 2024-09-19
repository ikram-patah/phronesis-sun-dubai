<script setup>
import { reactive } from 'vue'
import RebillyInstruments from '@rebilly/instruments'
import api from '@/helpers/api'
import Modal from '@/components/Modal.vue'
import { useModal } from '@/composables/use-modal'
import { useUserStore } from '@/store'

const userStore = useUserStore()

const state = reactive({
  isLoading: false,
  invoices: [],
  selectedInvoice: {},
  invoicePaid: false
})

const fetchInvoices = async () => {
  try {
    state.isLoading = true
    const invoices = await api({
      resource: 'invoices'
    })

    state.invoices = invoices
  } catch (error) {
    console.error('Something went wrong', error.message)
  } finally {
    state.isLoading = false
  }
}

const onPayInvoice = (invoice) => {
  state.invoicePaid = false
  state.selectedInvoice = invoice

  showModal('invoice')
  initiateInstrument({ invoiceId: invoice.id })
}

function initiateInstrument({ invoiceId }) {
  RebillyInstruments.mount({
    apiMode: 'sandbox',
    jwt: userStore.token,
    invoiceId
  })
}

RebillyInstruments.on('purchase-completed', () => {
  console.log('sjgndjfsgndfjnj')
  state.invoicePaid = true
})

function destroyInstruments() {
  RebillyInstruments.destroy()
}

const { showModal, closeModal } = useModal(['invoice'])

const refreshInvoices = () => {
  if (state.invoicePaid) {
    fetchInvoices()
  }
}

fetchInvoices()
</script>

<template>
  <div class="container-fluid py-5">
    <div class="row justify-content-center">
      <div class="col-11">
        <div
          v-if="state.isLoading"
          style="height: 250px; display: flex; justify-content: center; align-items: center"
        >
          <div class="spinner-grow" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div v-else>
          <h2 class="mb-3">Invoices</h2>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Invoice ID</th>
                <th scope="col">Issue date</th>
                <th scope="col">Status</th>
                <th scope="col">Amount due</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="invoice in state.invoices" :key="invoice.id">
                <td>{{ invoice.id }}</td>
                <td>{{ invoice.issuedTime }}</td>
                <td>{{ invoice.status }}</td>
                <td>{{ invoice.amountDue }}</td>
                <td>
                  <button
                    v-if="
                      ['unpaid', 'past-due', 'partially-paid', 'quotation'].includes(invoice.status)
                    "
                    @click="onPayInvoice(invoice)"
                    class="btn btn-primary btn-sm"
                  >
                    Pay invoice
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <Modal
      id="invoice"
      size="lg"
      :title="`Pay invoice ${state.selectedInvoice?.id}`"
      :closeFunc="
        () => {
          closeModal('invoice')
          destroyInstruments()
          refreshInvoices()
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
