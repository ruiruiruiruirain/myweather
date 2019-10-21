<template>
  <div id="weatherMainTab" ref="weatherMainTab">
    <div class="list-title" :class="{deactive:$root.active!==-1}">
      速览
    </div>
    <weatherDetail class="city" :class="{slad:$root.active==-1,active:$root.active===i,deactive:$root.active!==i&&$root.active!==-1}" v-for="(t,i) of $root.cityList" :key="t"  :city="t"  @click.native="$root.active=i" :isActive="$root.active==i" @add="addCity"
    >
    </weatherDetail>
    <transition>
      <searchMainTab v-show="search" :focus.sync="focus" :search.sync="search"></searchMainTab>
    </transition>
  </div>
</template>
<script>
import weatherDetail from './weatherDetail'
import searchMainTab from '../search/searchMainTab'
export default {
  components:{
    weatherDetail,
    searchMainTab
  },
  data(){
    return {
      focus:false,
      search:false,
    }
  },
  methods:{
    addCity(){
      this.$root.active=-1;
      this.search=true;
    },
    stopScroll(e){
      e.preventDefault();
    }
  },
  watch:{
    focus(){
      if(this.focus){
        this.$refs.weatherMainTab.addEventListener('touchmove',this.stopScroll);
      }
      else{
        this.$refs.weatherMainTab.removeEventListener('touchmove',this.stopScroll)
        ;
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../common/css/base.less');
#weatherMainTab{
  .full-fixed();
  overflow: auto;
  display: flex;
  flex-direction: column;
  background: @green-blue;
  .list-title{
    color:rgba(248, 234, 234, 0.829);
    flex: 0 0 2rem;
    font-size: 1.7rem;
    transition:all .3s;
  }
  .city{
    transition:all .25s;
  }
  .slad{
    flex: 0 0 2rem;
    overflow: hidden;
  }
  .active{
    flex:1 0 100%;
  }
  .deactive{
    flex:0 0 0;
    overflow: hidden;
    opacity: 0;
  }
}
</style>
