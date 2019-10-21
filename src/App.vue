<template>
  <div id="app">
    <transition name="shade">
      <shade v-if="!$root.conn" @click.stop>
        <div class="los-tab">
          <span class="tips">暂时与服务器断开连接，请退出重新尝试</span>
          <span class="close" @click="ext">+</span>
        </div>
      </shade>
    </transition>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import shade from './components/common/shade'
export default {
  name:'App',
  components:{
    shade,
  },
  methods:{
    ext(){
      window.close();
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./common/css/base.less');
#app{
  color:@font-white;
  .full-fixed();
  #shade{
    z-index: 999;
  }
  .shade-enter,.shade-leave-to{
    opacity: 0;
  }
  .shade-enter-active,.shade-leave-active{
    transition:all .6s;
  }
  .los-tab{
    color:#000;
    .ab-to-center();
    width: 8rem;
    height: 6rem;
    background: @warn;
    box-shadow: @shadow;
    margin-top: -.7rem;
    .tips{
    .ab-to-center();
    width: 7rem;
    font-size: .8rem;
    text-align: center;
    padding-top: .3rem;
    }
    .close{
      position: absolute;
      transform: rotate(45deg);
      font-size: 2rem;
      left: .2rem;
      top:-.6rem;
    }
  }
}
</style>
