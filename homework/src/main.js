import Vue from 'vue'
import Homework from './Homework.vue'
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(Homework),
}).$mount('#app')
