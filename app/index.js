import Vue from 'vue';
import App from './components/App.vue'
import router from "./router";
import Axios from 'axios'

Vue.prototype.$http = Axios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
