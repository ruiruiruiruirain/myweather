// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css'
import './common/font/iconfont.css'
import fastClick from 'fastclick'

Vue.config.productionTip = false

fastClick.attach(document.body);

import {getWeather} from '@/common/js/utils'
import {initDay} from '@/common/js/utils'
import {searchCity} from '@/common/js/utils'
import {initDayDetail} from '@/common/js/utils'

Vue.prototype.getWeather=getWeather;
Vue.prototype.initDay=initDay;
Vue.prototype.searchCity=searchCity;
Vue.prototype.initDayDetail=initDayDetail;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data:{
    conn:true,
    cityList:[],
    active:-1,
    lifeComfort:{comf:"舒适度",cw:"洗车",drsg:"穿衣",flu:"感冒",sport:"运动",trav:"旅游",uv:"紫外线",air:"空气污染扩散条件",ac:"空调开启",ag:"过敏",gl:"太阳镜",mu:"化妆",airc:"晾晒",ptfc:"交通",fsh:"钓鱼",spi:"防晒"}
  },
  components: { App },
  template: '<App/>',
  created(){
    const getLocHandle=(pos)=>{
      pos=pos?`${pos.coords.longitude},${pos.coords.latitude}`:'auto_ip';
      this.getWeather('now',pos).then((res)=>{
        res=res.basic;
        this.cityList.unshift(`${res.location},${res.parent_city}`);
        if(localStorage.getItem('cityList')){
          this.cityList.push(...JSON.parse(localStorage.getItem('cityList')));
        }
      },(e)=>{this.conn=false;console.error('LocHandle error:'+e);});
    }
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((pos)=>getLocHandle(pos),(e)=>{console.error(e);getLocHandle();},{timeout:500});
    }
  }
})
