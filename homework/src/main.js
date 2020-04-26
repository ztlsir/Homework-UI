import Vue from 'vue'
import Homework from './Homework.vue'
import './plugins/element.js'
import axios from 'axios'
import router from './router/index.js'
import VueRouter from 'vue-router'

Vue.config.productionTip = false
Vue.prototype.$http= axios
Vue.use(VueRouter)

new Vue({
  router,
  render: h => h(Homework)
}).$mount('#app')
