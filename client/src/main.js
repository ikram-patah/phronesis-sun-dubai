import Toast from 'vue-toastification'
import './assets/main.css'
import 'vue-toastification/dist/index.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

const pinia = createPinia()
pinia.use(piniaPersist)

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(Toast, {
  timeout: 3000
})

app.mount('#app')
