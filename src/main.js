import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import router from './router'

import 'common/stylus/index.styl'

Vue.config.productionTip = false

fastclick.attach(document.body)
// body下面的所有按钮都能避免300ms的延迟

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
