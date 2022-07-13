import { createApp } from 'vue'
import App from './App.vue'
import { store } from './store/index'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

createApp(App).use(store).component('pulse-loader', PulseLoader).mount('#app')
