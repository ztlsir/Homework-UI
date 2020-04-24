import Vue from 'vue'
import Homework from './Homework.vue'
import './plugins/element.js'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http= axios

new Vue({
  render: h => h(Homework),
}).$mount('#app')
