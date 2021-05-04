<template>
  <div>
    <top-nav></top-nav>
    <bakc-top></bakc-top>


    <blog-footer></blog-footer>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue'
// 顶部导航
import topNav from '../components/nav/topNav.vue'
// 返回顶部小狐狸
import bakcTop from '../components/backTop/backTop.vue'
// 页脚
import blogFooter from '../components/blogFooter/blogFooter.vue'
// 老婆
import { setYome } from '../assets/ts/yome'

export default {
  setup () {
    // 老婆
    setYome

    const state = reactive({
      count: 0,
    })

    return {
      ...toRefs(state),
    }
  },
  components: {
    bakcTop,
    topNav,
    blogFooter,
    setYome
  }
}
</script>

<style lang="scss" scoped>

</style>
