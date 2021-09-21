import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import axios from 'axios'

Vue.prototype.$http = axios;

window.$ = window.jQuery = require("jquery");

import bootstrap from 'bootstrap'
require('./plugins/css/bootstrap.min.css')

import bootstrapSwitch from "bootstrap-switch"
Vue.use(bootstrapSwitch)
import VueMeta from 'vue-meta'

import VueDebounce from 'vue-debounce'

Vue.use(VueDebounce)

import VueAlertify from 'vue-alertify';

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

Vue.use(VueAlertify)


// css
import styles from "./fonts/css/all.min.css"
import animateCss from 'animate.css'

Vue.use(styles)
Vue.use(animateCss)


Vue.config.productionTip = false

new Vue({
  store,
  router,
  data: {
    loading: false,
  },
  render: h => h(App)
}).$mount('#app')
