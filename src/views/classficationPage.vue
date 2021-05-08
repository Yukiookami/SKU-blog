<template>
  <div>
    <!-- 导航 -->
    <top-nav></top-nav>
    <!-- 返回小狐狸 -->
    <bakc-top></bakc-top>
    <!-- 顶部进度条 -->
    <top-progress></top-progress>

    <div class="sen-main-sec">
      <header class="header-banner">
        <img :src="senObj.senPageCover" alt="">

        <div class="sen-cover-title-box">
          <h1>{{senObj.title}}</h1>
        </div>
      </header>
    </div>

    <!-- 页脚 -->
    <blog-footer></blog-footer>
  </div>
</template>

<script lang="ts">
import { computed, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
// 顶部导航
import topNav from '../components/nav/topNav.vue'
// 返回顶部小狐狸
import bakcTop from '../components/backTop/backTop.vue'
// 页脚
import blogFooter from '../components/blogFooter/blogFooter.vue'
// 老婆
// import { setYome } from '../assets/ts/yome'
// 顶部滚动条
import topProgress from '../components/topProgress/topProgress.vue'


export default {
  setup () {
    // 定义路由
    const route = useRoute()
    // 老婆
    // setYome

    const state = reactive({
      // id
      id: computed(() => route.query.id),
      // 文章数据
      classObj: {
        id: "1",
        createTime: '发布于2021-4-26',
        title: 'GraphQL实现递归查询',
        author: 'suukinu',
        tag: [
          {
            tagName: 'Vue 3.x'
          }
        ],
        content: `当我们需要用 GraphQL 查询多层套嵌的数据，比如像 WordPress 这样套嵌的评论信息时，通常的写法是：

{
  posts(first: 100) {
    nodes {
      id
      title
      comments {
        nodes {
          ...CommentFields
          replies: children {
            nodes {
              ...CommentFields
              replies: children {
                nodes {
                  ...CommentFields`,
        cover: require('../assets/img/testImg/content-cover-3.jpeg'),
        senPageCover: require('../assets/img/senImg/sen-cover-1.jpeg')
      },
      /**
       * 根据id请求数据
       */
      getSen: () => {

      }
    })

    return {
      ...toRefs(state),
    }
  },
  components: {
    bakcTop,
    topNav,
    blogFooter,
    topProgress
  }
}
</script>

<style lang="scss" scoped>
// 主区域
.sen-main-sec {
  min-height: calc(100vh - 248.3px);

  .header-banner {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 400px;

    img {
      object-fit: cover;
      width: 100%;
      pointer-events: none;
      user-select: none;
    }

    .sen-cover-title-box {
      font-family: 'Ubuntu',sans-serif;
      width: 800px;
      position: absolute;
      color: #fff;
      text-shadow: 0 0 10px rgba(0, 0, 0, 1);
      padding-bottom: 40px;
      letter-spacing: 2px;

      h1 {
        font-weight: normal;
      }
    }
  }
}
</style>
