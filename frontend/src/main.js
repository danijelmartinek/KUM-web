import Vue from 'vue'
import App from './App.vue'
import router from './router'

require('./assets/css/main.css')

import {store} from './store/index.js'
Vue.config.productionTip = false

import VueGlide from 'vue-glide-js'
import 'vue-glide-js/dist/vue-glide.css'

Vue.use(VueGlide)

import "leaflet"
import "leaflet/dist/leaflet.css"

require('mapbox.js') // <-- auto-attaches to window.L

import Vuetify from 'vuetify'
Vue.use(Vuetify)
Vue.use(require('vue-moment'))
import 'vuetify/dist/vuetify.min.css'

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
