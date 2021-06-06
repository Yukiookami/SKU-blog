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
        <img :src="classObj.typeCover" alt="">

        <div class="sen-cover-title-box">
          <h1>{{classObj.keyword}}</h1>
        </div>
      </header>

      <section class="class-sen-sec">
        <class-page-item v-for="(item, index) in classObj.contentList"
        :key="`classPageItem${index}`" :cover="item.cover"
        :id="item.id" :createTime="item.createTime" :title="item.title"
        :author="item.author" :content="item.content"></class-page-item>
      </section>
    </div>

    <!-- 页脚 -->
    <blog-footer></blog-footer>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, reactive, toRefs, watch } from 'vue'
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
// classPageItem
import classPageItem from '../components/classPageItem/classPageItem.vue'
// 引入base64
import Base64 from '../assets/ts/base64'

export default {
  setup () {
    // 定义路由
    const route = useRoute()
    // 老婆
    // setYome

    const state = reactive({
      // id
      keyword: computed(() => Base64.decode(route.query.id as string)),
      // 文章数据
      classObj: {
        keyword: 'Vue 2.x',
        typeCover: require('../assets/img/testImg/type-cover-1.jpeg'),
        contentList: [
          {
            id: "1",
            createTime: '发布于2021-4-26',
            title: 'Docker 部署 Zabbix + Grafana',
            author: 'suukinu',
            tag: [
              {
                tagName: 'Vue 2.x'
              }
            ],
            content: `
  当我们需要用 GraphQL 查询多层套嵌的数据，比如像 WordPress 这样套嵌的评论信息时，通常的写法是：

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
                ...CommentFields
                replies: children {
                  nodes {
                    ...CommentFields
                    replies: children {
                      nodes {
                        ...CommentFields
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  }
  }

  fragment CommentFields on Comment {
  id
  date
  type
  approved
  content
  }
  以上的写法只实现了四层套嵌评论的查询，很麻烦对不对？这或许是 GraphQL 的缺陷，但这也或许正体现了 GraphQL 的设计理念——所得即所查。

  找了一下，没有现成的轮子，就自己写一个套嵌实现吧（注意 graphql 查询语句要顶头写，多余的缩进会影响递归结果）：`,
            cover: require('../assets/img/testImg/class-cover-1.jpeg')
          },
          {
            id: "1",
            createTime: '发布于2021-4-26',
            title: 'GraphQL实现递归查询',
            author: 'suukinu',
            tag: [
              {
                tagName: 'Vue 2.x'
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
            cover: require('../assets/img/testImg/class-cover-1.jpeg')
          },
          {
            id: "1",
            createTime: '发布于2021-4-26',
            title: 'Docker 部署 Zabbix + Grafana',
            author: 'suukinu',
            tag: [
              {
                tagName: 'Vue 2.x'
              }
            ],
            content: '',
            cover: require('../assets/img/testImg/class-cover-1.jpeg')
          },
          {
            id: "1",
            createTime: '发布于2021-4-26',
            title: 'Docker 部署 Zabbix + Grafana',
            author: 'suukinu',
            tag: [
              {
                tagName: 'Vue 2.x'
              }
            ],
            content: '',
            cover: require('../assets/img/testImg/class-cover-1.jpeg')
          }
        ]
      },
      /**
       * 根据id请求数据
       */
      getSen: () => {

      }
    })

    onMounted(() => {
      // 设置并监听标题
      if(state.keyword) {
        document.title = state.keyword
      }

      watch(() => state.keyword,
      keyword => {
        if(keyword) {
          document.title = keyword
        }
      })
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
    classPageItem
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/common.scss';

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
      font-family: $font-f;
      position: absolute;
      color: #fff;
      font-size: 30px;
      text-shadow: 0 0 10px rgba(0, 0, 0, 1);
      letter-spacing: 2px;

      h1 {
        font-weight: normal;
      }
    }
  }

  // 文章区域
  .class-sen-sec {
    width: 780px;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
  }
}
</style>
