<template>
  <div class="weather-detail" ref="wd" :class="{night:isNight}">
    <div class="header-bar" v-show="isActive" :style="{opacity:barOpacity}">
      <span @click.stop="del" class="iconfont icon-delete"></span>
      <span @click.stop="add" class="iconfont icon-add"></span>
      <span @click.stop="$root.active=-1" class="iconfont icon-dublicate"></span>
    </div>
    <div class="header">
      <span class="main-city">{{cityName[0]}}</span>
      <span class="parent-city" v-show="isActive">{{cityName[1]}}</span>
      <span class="sub-weather">{{subWeather}}</span>
      <img :src="iconSrc" alt="" v-show="isActive">
      <span class="cur-temp">{{curTemp}}</span>
    </div>
    <transition name="details" v-show="isActive">
      <div class="details">
        <div class="forecast">
          <foreDay class="fore-days"></foreDay>
          <foreDay class="fore-days"></foreDay>
          <foreDay class="fore-days"></foreDay>
        </div>
        <div class="day-detail">
          <dayItem class="day-items"></dayItem>
          <dayItem class="day-items"></dayItem>
          <dayItem class="day-items"></dayItem>
          <dayItem class="day-items"></dayItem>
          <dayItem class="day-items"></dayItem>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import shade from '../common/shade'
import foreDay from './foreDay'
import dayItem from './dayItem'
export default {
  props:{
    city:{
      type:String,
      required:true,
    },
    isActive:{
      type:Boolean,
      required:true
    }
  },
  data(){
    return{
      subWeather:'多云转晴',
      scrollTop:0,
      curTemp:16,
      isNight:false,
    }
  },
  computed: {
    cityName(){
      return this.city.split(',');
    },
    iconSrc(){
      return require('../../common/weatherIcon/'+'501.png');
    },
    barOpacity(){
      return this.scrollTop<30?(30-this.scrollTop)/30:0;
    }
  },
  watch:{
    isActive:function(){
      let wd=this.$refs.wd;
      let lis=()=>{
        this.scrollTop=wd.scrollTop;
      }
      if(this.isActive){
        wd.addEventListener('scroll',lis);
      }
      else{
        wd.removeEventListener('scroll',lis);
        this.scrollTop=0;
      }
    }
  },
  components:{
    shade,
    foreDay,
    dayItem
  },
  methods:{
    del(){
      let root=this.$root;
      if(root.active===root.cityList.length-1){
        root.active--;
        root.cityList.splice(root.active+1,1);
      }
      else{
        root.cityList.splice(root.active,1);
      }
    },
  }
}
</script>
<style lang="less" scoped>
@import url('../../common/css/base.less');
.weather-detail{
  // background: @green-blue;
  &.night{
    background: @night-back;
  }
  &.slad{
    background:@blur-white;
  }
}
.slad{
  .header{
    .flex-between();
    align-items: flex-end;
    height: 2rem;
    .main-city{
      font-size: .9rem;
      line-height: 1rem;
      margin-left: .14rem;
      flex: 0 1 50%;
      .word-ellip();
    }
    .sub-weather{
      font-size: .7rem;
      .word-ellip();
    }
    .cur-temp{
      font-size: 1.3rem;
      line-height: 1rem;
      margin-right: .14rem;
      .word-ellip();
    }
  }
}
.active{
  overflow:auto;
  .header-bar{
    line-height: 1.2rem;
    height: 1.2rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(248, 234, 234, 0.274);
    .flex-between();
    .icon-delete,.icon-add,.icon-dublicate{
      font-size: .8rem;
    }
    span{
      &:nth-child(1){
        margin-left: .2rem;
      }
      &:nth-child(3){
        margin-right: .2rem;
      }
    }
  }
  .header{
    text-align: center;
    transition:all .24s;
    height: 11rem;
    .main-city,.parent-city,.sub-weather,.cur-temp{
      display: block;
    }
    .main-city{
      padding-top:2rem;
      font-size: 1.6rem;
    }
    .parent-city{
      font-size: .6rem;
      padding-top: .4rem;
    }
    .sub-weather{
      padding-top: .3rem;
      font-size: .85rem;
    }
    img{
      height:2rem;
      opacity: .8;
      vertical-align: bottom;
    }
    .cur-temp{
      margin-top:-.4rem;
      font-size: 2.6rem;
      font-weight: 300;
    }
  }
  .details{
    .forecast{
      height: 3rem;
      background: @blur-white;
      .flex-between;
      align-items: flex-end;
      width: 100%;
      .fore-days{
        height: 3rem;
        flex:1 0 1.5rem;
        .word-ellip();
      }
      padding-bottom: .2rem;
    }
    .day-detail{
      .day-items{
        padding-top: .2rem;
        height: 2.3rem;
        background:@blur-white;
        box-sizing: border-box;
      }
    }
  }
}

</style>
