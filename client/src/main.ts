import './assets/main.css'
import router from './router/index'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
.use(router)
.mount('#app')
