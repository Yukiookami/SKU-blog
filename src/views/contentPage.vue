<template>
  <div ref="pageTop" class="content-page">
    <top-nav></top-nav>
    <banner-haru></banner-haru>
    <bakc-top :show="winShow"></bakc-top>

    <section class="main-content-sec">
      <h1 class="page-title">{{pageTag}}</h1>

      <content-line title="START:DASH!!" :icon="require('../assets/img/fontIcon/anchor.svg')"></content-line>

      <!-- 置顶文章 -->
      <div class="page-top-content-sec">
        <content-top v-for="(item, index) in contentTopList" :key="`contentTop${index}`"
        :cover="item.cover" :title="item.title" :content="item.content"
        :router="item.router" :cont="contentTopList.length"></content-top>
      </div>

      <!-- 文章 -->
      <div class="page-content-sec" v-for="(item, index) in contentObject" :key="`contentObject${index}`">
        <content-line :title="item.typeName" :icon="item.typeIcon"
        :router="`/${item.typeRouter}`"></content-line>

        <content-page-item v-for="(contentItem, contentIndex) in item.contentList"
        :key="`contentItem${contentIndex}`" :createTime="contentItem.createTime"
        :title="contentItem.title" :tag="contentItem.tag"
        :content="contentItem.content" :cover="contentItem.cover"
        :id="contentItem.id" :index="contentIndex"></content-page-item>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { computed, reactive, toRefs, getCurrentInstance, onMounted, ref } from 'vue'
// import { useRouter } from 'vue-router'
import bannerHaru from '../components/banner/bannerHaru.vue'
import topNav from '../components/nav/topNav.vue'
import bakcTop from '../components/backTop/backTop.vue'
import contentLine from '../components/contentLine/contentLine.vue'
import contentTop from '../components/contentTop/contentTop.vue'
import contentPageItem from '../components/contentPageItem/contentPageItem.vue'
import store from '@/store'

export default {
  setup () {
    // 获得顶部元素
    // let pageTop = ref(null as HTMLDivElement | null)

    const state = reactive({
      pageTag: computed(() => {
        const { ctx }:any = getCurrentInstance()
        const pageName:string = ctx.$router.currentRoute.value.path

        let page = store.state.meunList.find(ele => ele.router === pageName)
        return page?.pageTitle
      }),
      /**
       * 获取视窗高度
       *
       * @returns {number}
       */
      getViewHeight: () => document.documentElement.clientHeight,
      // 返回视窗布尔值
      winShow: false,
      /**
       * 监听页面顶部
       */
      listenPageTop: () => {
        let winTop:number = document.documentElement.scrollTop
        // console.log('可视高度', state.getViewHeight())
        // console.log(winTop)
        if (winTop > state.getViewHeight() / 3) {
          state.winShow = true
        } else {
          state.winShow = false
        }
      },
      // 置顶文章数组
      contentTopList: [
        {
          cover: require('../assets/img/testImg/cover-1.jpg'),
          title: 'SAKURA',
          content: '本站的web press主题',
          router: '/'
        },
        {
          cover: require('../assets/img/testImg/cover-2.png'),
          title: 'SAKURA',
          content: '本站的web press主题',
          router: '/'
        },
        {
          cover: require('../assets/img/testImg/cover-3.png'),
          title: 'SAKURA',
          content: '本站的web press主题',
          router: '/'
        }
      ],
      // 文章数组
      contentObject: [
        {
          typeName: 'Vue 2.x',
          typeRouter: 'Vue2',
          typeIcon: require('../assets/img/fontIcon/vue2.xLogo.svg'),
          typeCover: require('../assets/img/testImg/type-cover-1.jpeg'),
          contentList: [
            {
              id: "1",
              createTime: '发布于2021-4-26',
              title: 'Docker 部署 Zabbix + Grafana',
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
              cover: require('../assets/img/testImg/content-cover-1.jpeg')
            },
            {
              id: "1",
              createTime: '发布于2021-4-26',
              title: 'GraphQL实现递归查询',
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
              cover: require('../assets/img/testImg/content-cover-2.jpeg')
            },
            {
              id: "1",
              createTime: '发布于2021-4-26',
              title: 'Docker 部署 Zabbix + Grafana',
              tag: [
                {
                  tagName: 'Vue 2.x'
                }
              ],
              content: '',
              cover: require('../assets/img/testImg/content-cover-3.jpeg')
            },
            {
              id: "1",
              createTime: '发布于2021-4-26',
              title: 'Docker 部署 Zabbix + Grafana',
              tag: [
                {
                  tagName: 'Vue 2.x'
                }
              ],
              content: '',
              cover: require('../assets/img/testImg/content-cover-3.jpeg')
            }
          ]
        },
        {
          typeName: 'Vue 3.x',
          typeRouter: 'Vue3',
          typeIcon: require('../assets/img/fontIcon/vue3.xLogo.svg'),
          typeCover: require('../assets/img/testImg/type-cover-2.jpeg'),
          contentList: [
            {
              id: "1",
              createTime: '发布于2021-4-26',
              title: 'GraphQL实现递归查询',
              tag: [
                {
                  tagName: 'Vue 3.x'
                }
              ],
              content: '',
              cover: require('../assets/img/testImg/content-cover-3.jpeg')
            },
            {
              id: "1",
              createTime: '发布于2021-4-26',
              title: 'GraphQL实现递归查询',
              tag: [
                {
                  tagName: 'Vue 3.x'
                }
              ],
              content: '',
              cover: require('../assets/img/testImg/content-cover-2.jpeg')
            },
            {
              id: "1",
              createTime: '发布于2021-4-26',
              title: 'Docker 部署 Zabbix + Grafana',
              tag: [
                {
                  tagName: 'Vue 3.x'
                }
              ],
              content: '',
              cover: require('../assets/img/testImg/content-cover-1.jpeg')
            },
          ]
        }
      ]
    })


    onMounted(() => {
      window.addEventListener('scroll', state.listenPageTop, true)
    })


    return {
      ...toRefs(state),
    }
  },
  components: {
    bannerHaru,
    topNav,
    bakcTop,
    contentLine,
    contentTop,
    contentPageItem
  }
}
</script>

<style lang="scss" scoped>
// 页面
.content-page {
  // padding-top: 70px;
  min-height: 200vh;
  width: calc(100vw - 3px);
  background-color: #fff;

  // 显示区域
  .main-content-sec {
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    // width: calc(100vw - 3px);
    max-width: 800px;
    margin: 0 auto;

    // 标题
    .page-title {
      font-size: 30px;
      // font-family: 'Noto Serif SC','Source Han Serif SC','Source Han Serif','source-han-serif-sc','PT Serif','SongTi SC','MicroSoft Yahei',Georgia,serif;;
      font-family: 'Ubuntu',sans-serif;
      text-shadow: 2px 2px 5px rgba(0, 0, 0, .5);
      font-weight: 100;

      &::after {
        content: '}';
        margin-left: 6px;
      }

      &::before {
        content: '{';
        margin-right: 6px;
      }

      &::after,
      &::before {
        color: #f8ba0b;
        font-size: 1.5em;
        font-weight: 100;
        vertical-align: sub;
      }
    }

    // 顶部置顶文章
    .page-top-content-sec {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
      width: 100%;
    }

    // 文章区域
    .page-content-sec {
      margin-bottom: 40px;
      width: 100%;
    }
  }
}
</style>
