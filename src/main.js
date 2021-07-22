import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'

import { faUserSecret } from '@fortawesome/free-solid-svg-icons'


import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import './assets/bootstrap5/css/bootstrap.min.css'

import './assets/fontawesome5/css/all.css'


library.add(faUserSecret);

const app = createApp(App).use(store).use(router);

app.config.productionTip = false

app.component('font-awesome-icon',FontAwesomeIcon);

app.mount('#app');




