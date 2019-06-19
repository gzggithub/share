// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import '@/assets/css/base.css'

Vue.config.productionTip = false;

Vue.use(VueAwesomeSwiper);

// 设置浏览器标题
Vue.directive('title', {
    inserted: function (el, binding) {
        document.title = el.dataset.title
    }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
