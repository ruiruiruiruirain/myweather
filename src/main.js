// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css'
import './common/font/iconfont.css'
Vue.config.productionTip = false

import {getWeather} from '@/common/js/utils'
import {initDay} from '@/common/js/utils'

Vue.prototype.getWeather=getWeather;
Vue.prototype.initDay=initDay;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data:{
    conn:true,
    // cityList:localStorage.getItem('cityList')||[],
    cityList:["海淀,北京","朝阳,北京","延庆,北京","石景山,北京","和平,天津","津南,天津","巫山,重庆","武隆,重庆","道外,黑龙江","齐齐哈尔,黑龙江","长春,吉林","公主岭,吉林","巴雅尔吐胡硕,通辽","香格里拉,云南","和布克赛尔,新疆","孟州,焦作"],
    active:-1,
    lifeComfort:{comf:"舒适度",cw:"洗车",drsg:"穿衣",flu:"感冒",sport:"运动",trav:"旅游",uv:"紫外线",air:"空气污染扩散条件",ac:"空调开启",ag:"过敏",gl:"太阳镜",mu:"化妆",airc:"晾晒",ptfc:"交通",fsh:"钓鱼",spi:"防晒"}
  },
  components: { App },
  template: '<App/>',
  created(){
    //api
    const getLocHandle=(pos)=>{
      pos=pos?`${pos.coords.longitude},${pos.coords.latitude}`:'auto_ip';
      this.getWeather('now',pos).then((res)=>{
        res=res.basic;
        this.cityList.unshift(`${res.location},${res.parent_city}`);
      },(e)=>{this.conn=false;console.log(e);});
    }
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((pos)=>getLocHandle(pos),(e)=>{console.log(e);getLocHandle();},{timeout:5000});
    }
  }
  //api
})
