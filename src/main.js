import Vue from 'vue'
import router from './router'
import App from './App.vue'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);
/* Vue.config.productionTip = false */

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
