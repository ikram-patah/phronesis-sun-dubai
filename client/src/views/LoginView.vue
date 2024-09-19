<script setup>
import {reactive} from 'vue';
import { useRouter } from 'vue-router';
import LayoutDefault from '@/components/layout/Layout-default.vue'
import api from '@/helpers/api';
import { useUserStore } from '@/store';

const userStore = useUserStore();
const router = useRouter();

const state = reactive({
  email: '',
  password: '',
})

const onLogin = async () => {
  const { token } = await api({
    method: 'POST',
    resource: 'login'
  });

  userStore.setToken(token);
  router.push({name: 'dashboard'});
}
</script>

<template>
  <LayoutDefault>
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-6">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input v-model="state.email" type="email" class="form-control" id="email" placeholder="name@example.com">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input v-model="state.password" type="password" class="form-control" id="password">
          </div>
          <div class="mb-6 text-center">
            <button class="btn btn-primary" @click="onLogin">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </LayoutDefault>
</template>
