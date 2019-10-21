<template>
  <div class="day-item">
    <span class="com-type">{{comtype}}</span>
    <span class="level">{{brf}}</span>
    <span class="txt">{{txt}}</span>
  </div>
</template>
<script>
export default {
  props:['comType','brf','txt'],
  computed: {
    comtype(){
      return this.$root.lifeComfort[this.comType];
    }
  },
}
</script>
<style lang="less" scoped>
@import url('../../common/css/base.less');
.day-item{
  position: relative;
  .com-type,.level,.txt{
    display: block;
  }
  .com-type{
    font-size:.8rem;
    line-height: 1rem;
    width:8rem;
    margin-left: .2rem;
  }
  .level{
    font-size: .5rem;
    position: absolute;
    top: 0;
    right: .2rem;
    padding-top: .4rem;
  }
  .txt{
    margin-top: .1rem;
    height: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size:.4rem;
    line-height: .4rem;
    text-indent: .4rem;
    margin-left: .2rem;
  }
}
</style>
