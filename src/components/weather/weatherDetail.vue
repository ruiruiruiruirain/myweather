<template>
  <div class="weather-detail" ref="wd" :class="{night:isNight}">
    <div class="header-bar" v-show="isActive" :style="{opacity:barOpacity}">
      <span @click.stop="del" class="iconfont icon-delete"></span>
      <span @click.stop="add" class="iconfont icon-add"></span>
      <span @click.stop="toList" class="iconfont icon-dublicate"></span>
    </div>
    <div class="header">
      <span class="main-city">{{cityName[0]}}</span>
      <span class="parent-city" v-show="isActive">{{cityName[1]}}</span>
      <span class="sub-weather">{{subWeather}}</span>
      <img :src="iconSrc" alt="" v-show="isActive">
      <span class="cur-temp">{{curTemp}}</span>
    </div>
    <transition name="details">
      <div class="details"  v-show="isActive">
        <div class="forecast">
          <foreDay class="fore-days"
          v-for="t of foreDays" :key="t.date" :foreDay="t.date" :txt="t.cond_txt_d" :minTemp="t.tmp_min" :maxTemp="t.tmp_max"
          ></foreDay>
        </div>
        <div class="day-detail">
          <dayItem class="day-items"
          v-for="t of lifeStyle" :key="t.type" :comType="t.type" :brf="t.brf" :txt="t.txt"
          ></dayItem>
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
      subWeather:'',
      scrollTop:0,
      curTemp:16,
      isNight:false,
      webIcon:100,
      foreDays:[],
      lifeStyle:[],
    }
  },
  created(){
    let tc=setTimeout(()=>{
      this.initDay.call(this).then(()=>{
        clearTimeout(tc);
      },(e)=>{
        clearTimeout(tc);
        this.$root.conn=false;
        console.log(e);
      })
    },10*Math.random())
  },
  computed: {
    cityName(){
      return this.city.split(',');
    },
    iconSrc(){
      return require('../../common/weatherIcon/'+this.webIcon+'.png');
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
      if(root.cityList.length==1)return;
      if(root.active===root.cityList.length-1){
        root.active--;
        root.cityList.splice(root.active+1,1);
      }
      else{
        root.cityList.splice(root.active,1);
      }
    },
    toList(){
      this.scrollTop=0;
      this.$root.active=-1;
    }
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
      flex: 1 1 50%;
      .word-ellip();
    }
    .sub-weather{
      font-size: .7rem;
      .word-ellip();
      flex:1 1 25%;
      text-align:center;
    }
    .cur-temp{
      font-size: 1.3rem;
      line-height: 1rem;
      .word-ellip();
      flex:1 1 25%;
      text-align:center;

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
      font-size: 1.4rem;
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
