<template>
  <div>
    <!-- 头像 -->
    <div>
      <img :src="cover" alt="">
    </div>

    <!-- 文章主体 -->
    <div>
      <h2>{{title}}</h2>
      <div>{{content}}</div>
    </div>

    <!-- 侧边显示 -->
    <div>
      <span>{{createTime}}</span>
      <span>{{author}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue'

export default {
  // 封面，id，时间，标题，作者，内容
  props: ['cover', 'id', 'createTime', 'Title', 'author', 'content'],
  setup () {
    const state = reactive({
      count: 0,
    })

    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
