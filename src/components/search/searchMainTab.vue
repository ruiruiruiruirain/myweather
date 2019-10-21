<template>
  <div id="search-tab">
    <div class="input-area">
      <input type="text" ref="search" @click="$refs.search.focus()" @focus="$emit('update:focus',true)" @blur="$emit('update:focus',false)" placeholder="输入城市名称 中文或拼音" v-model.trim="city">&nbsp;
      <span @click="cancelSearch">取消</span>
    </div>
    <transition mode="out-in">
      <div class="tips" v-if="badInput" key="badInput">只能输中文或拼音</div>
      <div class="tips" v-else-if="cityUnkown" key="cityUnknown">您输入的城市不存在</div>
      <div class="ans-area" v-else-if="cities.length" key="ans">
        <div class="ans-item" v-for="t of cities" :key="t.basic.parent_city" @click="toDetail(t)">
          <span class="city">{{t.basic.location}}</span>
          <span class="parent-city">{{t.basic.parent_city}}</span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props:['search'],
  methods:{
    cancelSearch(){
      this.$emit('update:search',false);
      this.cityUnkown=false;
      this.cities=[];
      this.city='';
      this.badInput=false;
    },
    toDetail(t){
      this.$root.cityList.push(`${t.basic.location},${t.basic.parent_city}`);
      localStorage.setItem('cityList',JSON.stringify(this.$root.cityList.slice(1)));
      this.cancelSearch();
      this.$nextTick(()=>{
        this.$root.active=this.$root.cityList.length-1;
      });
    }
  },
  watch:{
    search:function(){
      if(this.search){
        this.$refs.search.focus();
      }
    },
    city(){
      let reg=/^[a-zA-Z\u4e00-\u9fa5]+$/;
      if(this.city.length==0){
        this.cities=[];
        this.badInput=false;
        this.cityUnkown=false;
        clearTimeout(this.bounceBar);
        this.bounceBar=null;
        return;
      }
      if(!reg.test(this.city)){
        this.badInput=true;
        this.cities=[];
        this.cityUnknown=false;
        clearTimeout(this.bounceBar);
        this.bounceBar=null;
        return;
      }
      if(this.bounceBar){
        clearTimeout(this.bounceBar);
      }
      this.bounceBar=setTimeout(()=>{
        this.searchCity(this.city).then((res)=>{
          if(res[0].status=="unknown location"){
            this.cityUnkown=true;
            this.cities=[];
          }
          else {
            this.cities=res;
            this.cityUnkown=false;
          }
        },(e)=>{
          this.$root.conn=false;
          console.error('serchcity error:'+e);
        });
        this.bounceBar=null;
      },1000);
    }
  },
  data(){
    return{
      city:'',
      cities:[],
      bounceBar:null,
      cityUnkown:false,
      badInput:false,
    }
  },
}
</script>
<style lang="less" scoped>
@import url('../../common/css/base.less');
.v-enter,.v-leave-to{
  opacity:0;
}
.v-enter-active,.v-leave-active{
  transition:all .4s;
}
#search-tab{
  .full-fixed();
  overflow:auto;
  text-align: center;
  padding-top:.6rem;
  background: rgba(0, 0, 0, 0.89);
  color:@font-white;
  .input-area{
    height: 2rem;
    font-size: .5rem;
    input{
      border: 0;
      outline: none;
      width: 6.7rem;
      transition: all .24s;
      color:@font-white;
      background: rgba(107, 102, 102, 0.342);
      &::placeholder{
        color:@font-white;
      }
    }
  }
  .tips{
    font-size:.5rem;
  }
  .ans-item{
    font-size: .8rem;
    padding-top:.2rem;
    height:.8rem;
    .word-ellip();
  }
}
</style>
