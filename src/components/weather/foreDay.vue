<template>
  <div class="fore-day">
    <span class="day">{{day}}</span>
    <span class="sub-weather">{{txt}}</span>
    <span class="temp">{{minTemp}}~{{maxTemp}}</span>
  </div>
</template>
<script>
export default {
  props:['foreDay','txt','minTemp','maxTemp'],
  computed: {
    day(){
      let temp=this.foreDay.split('-');
      return `${temp[1]}/${temp[2]}`;
    }
  },
}
</script>
<style lang="less" scoped>
@import url('../../common/css/base.less');
.fore-day{
  .flex-between();
  flex-direction: column;
  .day,.sub-weather,.temp{
  text-align: center;
  }
  .day{
    font-size: .8rem;
  }
  .sub-weather{
    font-size: .6rem;
  }
  .temp{
    font-size: .8rem;
  }
}


</style>
