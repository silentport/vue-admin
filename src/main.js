// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import 'iview/dist/styles/iview.css'
import {Message} from 'iview'
Vue.prototype.$Message = Message

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// router.beforeEach((to, from, next) => {
//   store.commit('addHistory', to)
//   console.log(to);

// })
// router.afterEach((to, from, next) => {
//   console.log(to);

// })