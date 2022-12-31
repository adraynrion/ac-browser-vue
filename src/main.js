import Vue from 'vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import router from './router'

import './assets/main.scss'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
