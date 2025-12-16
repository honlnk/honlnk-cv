import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import 'uno.css'

const app = createApp(App)
app.use(MotionPlugin)
app.mount('#app')
