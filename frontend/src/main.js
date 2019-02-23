import Vue from 'vue'
import App from './App.vue'
import router from './router'

import {store} from './store/index.js'
Vue.config.productionTip = false

import Vuetify from 'vuetify'
Vue.use(Vuetify)
import 'vuetify/dist/vuetify.min.css'

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
