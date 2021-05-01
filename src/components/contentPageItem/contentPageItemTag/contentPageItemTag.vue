<template>
  <div class="item-tag">
    <i class="el-icon-collection-tag"></i>
    <span>{{tagName}}</span>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue'

export default {
  props: ['tagName'],
  setup () {
    const state = reactive({
      // 点击后激活父元素方法
      count: 0
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.item-tag {
  font-size: 12px;
  color: #888;
  cursor: pointer;

  i {
    margin-right: 5px;
  }
}
</style>
