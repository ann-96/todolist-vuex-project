import { createApp } from 'vue'
import App from './App.vue'
import { store } from './store/index'
import Notifications from '@kyvg/vue3-notification'
import VueCookies from 'vue3-cookies'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp(App);
app.use(Notifications)
app.use(store)
app.use(VueCookies, {expireTimes: "30d"})
app.mount('#app')