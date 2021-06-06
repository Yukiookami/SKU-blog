<template>
  <div class="admin-main-sec">
    <!-- 导航 -->
    <top-nav></top-nav>
    <!-- 返回小狐狸 -->
    <bakc-top></bakc-top>
    <!-- 顶部进度条 -->
    <top-progress></top-progress>

    <section class="show-view">
      <!-- 侧边导航 -->
      <sidebar class="sidebar-box"></sidebar>
      <!-- 显示区域 -->
      <router-view class="view-box"></router-view>
    </section>

    <!-- 页脚 -->
    <blog-footer></blog-footer>
  </div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, reactive, toRefs } from 'vue'
// 顶部导航
import topNav from '../../components/nav/topNav.vue'
// 返回顶部小狐狸
import bakcTop from '../../components/backTop/backTop.vue'
// 页脚
import blogFooter from '../../components/blogFooter/blogFooter.vue'
// 顶部滚动条
import topProgress from '../../components/topProgress/topProgress.vue'
// 侧边栏
import sidebar from '../../components/adminPage/sidebar.vue'

export default {
  setup () {
    const { ctx }:any  = getCurrentInstance()

    const state = reactive({
      // 拿到id
      userId: computed(() => {
        return ctx.$cookie.getCookie("login_cookies")
      }),
    })

    return {
      ...toRefs(state),
    }
  },
  components: {
    bakcTop,
    topNav,
    blogFooter,
    topProgress,
    sidebar
  }
}
</script>

<style lang="scss" scoped>
.admin-main-sec {

  .show-view {
    display: flex;
    justify-content: space-between;
    width: calc(100vw - 3px);
    min-height: calc(100vh - 248px);

    .sidebar-box {
      width: 15%;
      min-height: calc(100vh - 248px);
    }

    .view-box {
      width: 85%;
    }
  }
}
</style>
