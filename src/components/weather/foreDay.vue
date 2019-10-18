<template>
  <div class="fore-day">
    <span class="day">{{day}}</span>
    <span class="sub-weather">{{subWeather}}</span>
    <span class="temp">{{minTemp}}~{{maxTemp}}</span>
  </div>
</template>
<script>
export default {
  props:['foreDetail'],
  data(){
    return {
      maxTemp:20,
      minTemp:10,
      day:'10/1',
      subWeather:'晴'
    }
  }
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
