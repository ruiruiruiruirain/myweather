// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css'
import './common/font/iconfont.css'

Vue.config.productionTip = false

import {getWeather} from '@/common/js/utils'
Vue.prototype.getWeather=getWeather;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data:{
    conn:true,
    // cityList:localStorage.getItem('cityList')||[],
    cityList:["黄石市,湖北省","十堰市,湖北省","宜昌市,湖北省","襄樊市,湖北省","鄂州市,湖北省","荆门市,湖北省","孝感市,湖北省","荆州市,湖北省","黄冈市,湖北省","咸宁市,湖北省","随州市,湖北省","恩施土家族苗族自治州,湖北省","仙桃市,湖北省","潜江市,湖北省","天门市,湖北省","神农架林区,湖北省"],
    active:-1,
    lifeComfort:{comf:"舒适度",cw:"洗车",drsg:"穿衣",flu:"感冒",sport:"运动",trav:"旅游",uv:"紫外线",air:"空气污染扩散条件",ac:"空调开启",ag:"过敏",gl:"太阳镜",mu:"化妆",airc:"晾晒",ptfc:"交通",fsh:"钓鱼",spi:"防晒"}
  },
  components: { App },
  template: '<App/>',
  created(){
    // const getLocHandle=(pos)=>{
    //   pos=pos?`${pos.coords.longitude},${pos.coords.latitude}`:'auto_ip';
    //   this.getWeather('now',pos).then((res)=>{
    //     res=res.basic;
    //     this.cityList.unshift(`${res.location},${res.parent_city}`);
    //     console.log(this.cityList);
    //   },(e)=>{this.conn=false;console.log(e);});
    // }
    // if(navigator.geolocation){
    //   navigator.geolocation.getCurrentPosition((pos)=>getLocHandle(pos),(e)=>{console.log(e);getLocHandle();},{timeout:5000});
    // }
  }
})
