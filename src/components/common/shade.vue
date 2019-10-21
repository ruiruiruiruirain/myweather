<template>
  <div id="shade">
    <slot></slot>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
@import url('../../common/css/base.less');
#shade{
  .full-fixed();
  background: rgba(44, 37, 37, 0.74);
}
</style>
