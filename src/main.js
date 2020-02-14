import Vue from 'vue'
import Store from '@/store/index';
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store: Store
}).$mount('#app')
