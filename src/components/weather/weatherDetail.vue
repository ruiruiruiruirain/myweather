<template>
  <div class="weather-detail" ref="wd">
    <div class="header-bar" v-show="isActive" :style="{opacity:barOpacity}">
      <span @click.stop="del" class="iconfont icon-delete" v-show="$root.active!==0&&isActive"></span>
      <span @click.stop="$emit('add')" class="iconfont icon-add"></span>
      <span @click.stop="toList" class="iconfont icon-dublicate"></span>
    </div>
    <div class="header">
      <span class="main-city">{{cityName[0]}}</span>
      <span class="parent-city" v-show="isActive">{{cityName[1]}}</span>
      <span class="sub-weather">{{subWeather}}</span>
      <img :src="iconSrc" alt="" v-show="isActive">
      <span class="cur-temp">{{curTemp}}</span>
    </div>
    <div class="details"  v-show="isActive">
      <div class="forecast">
        <foreDay class="fore-days"
        v-for="t of foreDays" :key="t.date" :foreDay="t.date" :txt="t.cond_txt_d" :minTemp="t.tmp_min" :maxTemp="t.tmp_max"
        ></foreDay>
      </div>
      <div class="day-detail">
        <div v-if="!lifeStyle">
          <span>暂不支持</span>
          <span>{{city.split(',')[0]}}地区</span>
          <span>生活详情的查询</span>
        </div>
        <dayItem v-else class="day-items"
        v-for="t of lifeStyle" :key="t.type" :comType="t.type" :brf="t.brf" :txt="t.txt"
        ></dayItem>
      </div>
    </div>
  </div>
</template>
<script>
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
      subWeather:'-',
      scrollTop:0,
      curTemp:16,
      webIcon:100,
      foreDays:[],
      lifeStyle:[],
      count:-1,
    }
  },
  created(){
    let tc=setTimeout(()=>{
      this.initDay().then(()=>{
        clearTimeout(tc);
      },(e)=>{
        clearTimeout(tc);
        this.$root.conn=false;
        console.error(`initDay error ${this.city} : ${e}`)
      })
    },100*Math.random())
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
    },
  },
  watch:{
    isActive:function(){
      this.count++;
      if(this.isActive){
        this.$refs.wd.addEventListener('scroll',this.lis);
      }
      else{
        this.$refs.wd.removeEventListener('scroll',this.lis);
        this.scrollTop=0;
      }
    },
    count:function(){
      if(!this.count){
        this.initDayDetail().catch((e)=>{
          this.$root.conn=false;
          console.error(`initDayDetail error ${this.city} : ${e}`)
        })
      }
    }
  },
  components:{
    foreDay,
    dayItem
  },
  methods:{
    del(){
      let root=this.$root;
      if(root.cityList.length==1)return;
      root.cityList.splice(root.active,1);
      root.active=-1;
      localStorage.setItem('cityList',JSON.stringify(this.$root.cityList.slice(1)));
    },
    toList(){
      this.scrollTop=0;
      this.$root.active=-1;
    },
    lis(){
      this.scrollTop=this.$refs.wd.scrollTop;
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
    padding: 0 .2rem;
    background: rgba(248, 234, 234, 0.274);
    .flex-between();
    .icon-delete,.icon-add,.icon-dublicate{
      font-size: .8rem;
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
      span{
        display:block;
        text-align:center;
        font-size:.8rem;
        margin:.2rem 0;
        opacity:.6;
      }
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
