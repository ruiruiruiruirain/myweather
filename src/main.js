// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css'
import axios from 'axios'

Vue.config.productionTip = false
axios.defaults.baseURL="https://free-api.heweather.net/s6/weather";
Vue.prototype.cityList=localStorage.getItem('cityList')||[];
Vue.prototype.conn=true;
Vue.prototype.$axios=axios;
Vue.prototype.key='f8d080810d4840468f67d430edc833b4';
Vue.prototype.getWeather=(type,location)=>{
  return axios.get(`/${type}`,{
    params:{
      location,
    }
  })
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
