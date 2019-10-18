<template>
  <div class="day-item">
    <span class="com-type">{{comType}}</span>
    <span class="level">{{level}}</span>
    <span class="txt">{{txt}}</span>
  </div>
</template>
<script>
export default {
  data(){
    return {
      comType:'舒适度',
      level:'少发',
      txt:"建议着薄外套、开衫牛仔衫裤等服装。年老体弱者应适当添加衣物，宜着夹克衫、薄毛衣等。"
    }
  }
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
    width:2.8rem;
    margin-left: .2rem;
  }
  .level{
    font-size: .5rem;
    position: absolute;
    top: 0;
    left: 3rem;
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
