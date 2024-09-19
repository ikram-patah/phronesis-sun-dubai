<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import LayoutDefault from '@/components/layout/Layout-default.vue'
import api from '@/helpers/api'
import { useUserStore } from '@/store'

const userStore = useUserStore()
const router = useRouter()

const state = reactive({
  isLoading: false
})

const onLogin = async () => {
  try {
    state.isLoading = true
    const { token } = await api({
      method: 'POST',
      resource: 'login'
    })

    userStore.setToken(token)
    router.push({ name: 'dashboard' })
  } catch (error) {
    console.error(error)
    alert('Unable to log in!')
  } finally {
    state.isLoading = false
  }
}
</script>

<template>
  <LayoutDefault>
    <div class="py-5 bg-body-tertiary">
      <div class="container py-5">
        <div class="row justify-content-center">
          <div class="col-4">
            <div class="card shadow-lg">
              <div class="card-body">
                <h5 class="card-title text-center mb-4">Login to your account</h5>
                <div class="mb-3">
                  <input type="email" class="form-control" placeholder="Email address" />
                </div>
                <div class="mb-3">
                  <input type="password" class="form-control" placeholder="Password" />
                </div>
                <div class="d-grid">
                  <button class="btn btn-primary" @click="onLogin" :disabled="state.isLoading">
                    <template v-if="state.isLoading">
                      <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                      <span role="status" class="ml-2"> &nbsp;Loging in... </span>
                    </template>
                    <template v-else> Log in </template>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </LayoutDefault>
</template>
