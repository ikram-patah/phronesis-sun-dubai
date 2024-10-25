<template>
    <casino-header />

    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div v-if="userStore.isLoggedIn">
            <div class="form-check">
              <input v-model="state.isCad" class="form-check-input" type="checkbox" id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                I want to deposit in CAD
              </label>
            </div>
            <button class="btn btn-primary" @click="initDepositRequest" :disabled="state.isProcessing">
              Deposit</button>
            <div class="rebilly-instruments-summary"></div>
            <div class="rebilly-instruments"></div>
          </div>
          <button v-else class="btn btn-primary" @click="onLogin" :disabled="state.isLogginIn">
                    <template v-if="state.isLogginIn">
                      <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                      <span role="status" class="ml-2"> &nbsp;Logging in... </span>
                    </template>
                    <template v-else> Log in </template>
          </button>
        </div>
      </div>
    </div>

    <footer class="pt-5">
      <div class="d-flex flex-column flex-sm-row justify-content-center py-4 border-top align-items-center">
        <p class="white-text my-0">&copy; 2024 Phronesis Sun Dubai, Inc. All rights reserved.</p>
        <RouterLink :to="{ name: 'debriefs' }" class="btn btn-danger ms-4">
            Go to Debriefs
          </RouterLink>
      </div>
    </footer>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount, reactive } from 'vue'
import RebillyInstruments from '@rebilly/instruments'
import casinoHeader from '@/components/casino/Header.vue'
import { useUserStore } from '@/store'
import api from '@/helpers/api';

const userStore = useUserStore()
const state = reactive({
  isLogginIn: false,
  isProcessing: false,
  isCad: false,
  isInited: false,
})

const onLogin = async () => {
  try {
    state.isLoading = true
    const { token } = await api({
      method: 'POST',
      resource: 'login'
    })

    userStore.setToken(token)
    initDepositRequest();
  } catch (error) {
    console.error(error)
    alert('Unable to log in!')
  } finally {
    state.isLoading = false
  }
}

async function initDepositRequest() {
  state.isProcessing = true

  if(state.isInited) {
    RebillyInstruments.destroy();
  }

  try {
    const { depositRequestId, token } = await api({
      method: 'POST',
      resource: 'deposit-request',
      body: { currency: state.isCad ? 'CAD' : 'USD' }
    })

    initiateInstrument({ token, depositRequestId })
  } catch (error) {
    console.log(error)
    alert('An error occurred. Please try again later.')
  } finally {
    state.isInited = true;
    state.isProcessing = false
  }
}

function initiateInstrument({ token, depositRequestId }) {
  RebillyInstruments.mount({
    apiMode: 'sandbox',
    jwt: token,
    deposit: { depositRequestId }
  })
}

onBeforeMount(() => {
  document.title = 'Sub Dubai Casino';
})

onBeforeUnmount(() => {
  document.title = 'Sub Dubai';
  document.body.classList.remove('purple-background')
})

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
}
</style>