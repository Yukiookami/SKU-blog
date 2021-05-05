<template>
  <div ref="pageTop" class="content-page">
    <top-nav></top-nav>
    <banner-haru></banner-haru>
    <bakc-top></bakc-top>
    <top-progress></top-progress>

    <section class="main-content-sec">
      <!-- 文章目录 -->
      <div ref="indexList" class="main-content-index-list-box">
        <index-list :senArr="contentObject" :titleIndex="contentLineIndex"
        :contentIndex="contentPageItemIndex" :numberList="arrLength"
        @goTo="goTo"></index-list>
      </div>

      <h1 class="page-title">{{pageTag}}</h1>

      <content-line title="START:DASH!!" :icon="require('../assets/img/fontIcon/anchor.svg')"></content-line>

      <!-- 置顶文章 -->
      <div class="page-top-content-sec">
        <content-top v-for="(item, index) in contentTopList" :key="`contentTop${index}`"
        :cover="item.cover" :title="item.title" :content="item.topContent"
        :id="item.id" :cont="contentTopList.length"></content-top>
      </div>

      <!-- 文章 -->
      <div class="page-content-sec" v-for="(item, index) in contentObject" :key="`contentObject${index}`">
        <div :ref="contentLine">
          <content-line :title="item.typeName" :icon="item.typeIcon"
          :router="`/${item.typeRouter}`"></content-line>
        </div>

        <div :ref="contentPageItem" v-for="(contentItem, contentIndex) in item.contentList"
        :key="`contentItem${contentIndex}`" >
          <content-page-item :createTime="contentItem.createTime"
          :title="contentItem.title" :tag="contentItem.tag"
          :content="contentItem.content" :cover="contentItem.cover"
          :id="contentItem.id" :index="contentIndex"></content-page-item>
        </div>
      </div>
    </section>

    <blog-footer></blog-footer>
  </div>
</template>

<script lang="ts">
import { computed, reactive, toRefs, getCurrentInstance, onMounted, ref, onBeforeUpdate } from 'vue'
// import { useRouter } from 'vue-router'
// bilibilibanner
import bannerHaru from '../components/banner/bannerHaru.vue'
// 顶部导航
import topNav from '../components/nav/topNav.vue'
// 返回顶部小狐狸
import bakcTop from '../components/backTop/backTop.vue'
// 页脚
import blogFooter from '../components/blogFooter/blogFooter.vue'
// 老婆
import { setYome } from '../assets/ts/yome'
// tag线
import contentLine from '../components/contentLine/contentLine.vue'
// 置顶文章
import contentTop from '../components/contentTop/contentTop.vue'
// 文章
import contentPageItem from '../components/contentPageItem/contentPageItem.vue'
// 目录
import indexList from '../components/indexList/indexList.vue'
// 进度条
import topProgress from '../components/topProgress/topProgress.vue'
import store from '@/store'

export default {
  setup () {
    // 老婆
    setYome

    const state = reactive({
      /**
       * 获取当前页面路由
       */
      pageTag: computed(() => {
        const { ctx }:any = getCurrentInstance()
        const pageName:string = ctx.$router.currentRoute.value.path

        let page = store.state.meunList.find(ele => ele.router === pageName)
        return page?.pageTitle
      }),
      // 目录index（大标题）
      contentLineIndex: 0,
      // 目录index（小标题）
      contentPageItemIndex: 0,
      // 判断上滑还是下滑
      checkScrollFlag: 0,
      checkScroll: 0,
      /**
       * 判断页面滚动方向
       */
      handleScroll: () => {
        let scrollTop:number = document.documentElement.scrollTop
        let scroll:number = scrollTop - state.checkScroll
        state.checkScroll = scrollTop

        if (scroll < 0) {
          state.checkScrollFlag = 1
        } else {
          state.checkScrollFlag = 0
        }
      },
      /**
       * 监听页面顶部，判断是往上还是往下滑动，以及锚点元素，滚动触发
       *
       * @event
       */
      listenPageTop: () => {
        // 更改index
        state.changeIndex(contentLineArr, 0, 150, -100, state.checkScrollFlag)
        state.changeIndex(contentPageItemArr, 1, 80, -100, state.checkScrollFlag)

        // 判断上下滑动
        state.handleScroll()
      },
      /**
       * 改变目录index
       *
       * @param {array} arr
       * @param {number} targetIndex
       * @param {number} max
       * @param {number} min
       * @param {number} scrollFlag
       */
      changeIndex: (arr:any[], targetIndex:number, max:number, min:number, scrollFlag:number) => {
        Array.prototype.forEach.call(arr, (ele, index) => {
          let topMargin:number = Math.floor(ele.getBoundingClientRect().top)

          if (topMargin <= max && topMargin >= min) {
            if (!targetIndex) {
              state.contentLineIndex = index
            } else {
              state.contentPageItemIndex = index
            }
          }

          if (!targetIndex && scrollFlag) {
            if (topMargin >= max && topMargin <= Math.abs(min * 2)) {
              index - 1 > 0 ? state.contentLineIndex = index - 1 : state.contentLineIndex = 0
            }
          }
        })
      },
      // 给indexList传递的数组长度
      arrLength: [] as any,
      /**
       * 生成数组长度数组
       */
      setArrLeagth: () => {
        state.arrLength.splice(0)
        Array.prototype.forEach.call(state.contentObject, ele => {
          state.arrLength.push(ele.contentList.length)
        })
      },
      /**
       * 返回初始位置计时器
       *
       * @param {number} top
       * @param {number} time
       */
      setBackTimer: (top:number, time:number) => {
        let timer = setInterval(() => {
          let winTop:number = document.documentElement.scrollTop
          if (winTop <= top + 240 && winTop >= top - 240) {
            window.scrollTo(0, top + 100)
            clearInterval(timer)
          } else if (winTop > top) {
            window.scrollTo(0, winTop - 40)
          } else {
            window.scrollTo(0, winTop + 40)
          }
        }, time)

        timer
      },
      /**
       * 返回指定位置
       *
       * @param {number} index
       * @param {number} contentIndex
       * @param {number} titleFlag
       */
      goToContent: (index:number, contentIndex:number, titleFlag:number):void => {
        let top:number = contentLineArr[index].offsetTop
        let itemTop:number = contentPageItemArr[contentIndex].offsetTop

        if (titleFlag) {
          state.setBackTimer(top, 5)
        } else {
          state.setBackTimer(itemTop, 5)
        }
      },
      /**
       * 接受子组件传参，跳转页面
       * @param {number} index
       * @param {number} contentIndex
       * @param {number} titleFlag
       */
      goTo: (index:number, contentIndex:number, titleFlag:number) => {
        let contentItemIndex:number = 0
        if (!index) {
          contentItemIndex = contentIndex
        } else if (!(index - 1) && titleFlag) {
          contentItemIndex = state.arrLength[0]
        } else if (!(index - 1)) {
          contentItemIndex = contentIndex + state.arrLength[0]
        } else {
          let indexSum = state.arrLength.reduce((prev:number, cur:number, redIndex:number):any => {
            if (redIndex < index) {
              return prev + cur
            } else {
              return prev
            }
          })

          contentItemIndex = contentIndex + indexSum
        }

        state.goToContent(index, contentItemIndex, titleFlag)
      },
      // 置顶文章数组
      contentTopList: [
        {
          id: 1,
          cover: require('../assets/img/testImg/cover-1.jpg'),
          title: 'SAKURA',
          topContent: '本站的web press主题',
          content: '置顶文章',
          tag: [
            {
              tagName: 'Vue 2.x'
            }
          ],
          createTime: '发布于2021-4-26'
        },
        {
          id: 1,
          cover: require('../assets/img/testImg/cover-2.png'),
          title: 'SAKURA',
          topContent: '本站的web press主题',
          content: '置顶文章',
          tag: [
            {
              tagName: 'Vue 2.x'
            }
          ],
          createTime: '发布于2021-4-26'
        },
        {
          id: 1,
          cover: require('../assets/img/testImg/cover-3.png'),
          title: 'SAKURA',
          topContent: '本站的web press主题',
          content: '置顶文章',
          tag: [
            {
              tagName: 'Vue 2.x'
            }
          ],
          createTime: '发布于2021-4-26'
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
            }
          ]
        },
        {
          typeName: 'React',
          typeRouter: 'React',
          typeIcon: require('../assets/img/fontIcon/vue3.xLogo.svg'),
          typeCover: require('../assets/img/testImg/type-cover-2.jpeg'),
          contentList: [
            {
              id: "1",
              createTime: '发布于2021-4-26',
              title: 'GraphQL实现递归查询',
              tag: [
                {
                  tagName: 'React'
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
                  tagName: 'React'
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
                  tagName: 'React'
                }
              ],
              content: '',
              cover: require('../assets/img/testImg/content-cover-1.jpeg')
            }
          ]
        },
        {
          typeName: 'Ruby',
          typeRouter: 'Ruby',
          typeIcon: require('../assets/img/fontIcon/vue3.xLogo.svg'),
          typeCover: require('../assets/img/testImg/type-cover-2.jpeg'),
          contentList: [
            {
              id: "1",
              createTime: '发布于2021-4-26',
              title: 'GraphQL实现递归查询',
              tag: [
                {
                  tagName: 'ruby'
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
                  tagName: 'ruby'
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
                  tagName: 'ruby'
                }
              ],
              content: '',
              cover: require('../assets/img/testImg/content-cover-1.jpeg')
            }
          ]
        }
      ]
    })

    // 获得锚点元素
    let contentLineArr:any[] = []
    let contentPageItemArr:any[] = []

    const contentLine = ref((e:any) => {
      if (e) {
        contentLineArr.push(e)
      }
    })

    const contentPageItem = ref((e:any) => {
      if (e) {
        contentPageItemArr.push(e)
      }
    })

    onBeforeUpdate (() => {
      contentLineArr = []
      contentPageItemArr = []
    })

    onMounted(() => {
      window.addEventListener('scroll', state.listenPageTop, true)
      // 记得在请求后调用
      state.setArrLeagth()
    })

    return {
      ...toRefs(state),
      contentLine,
      contentPageItem
    }
  },
  components: {
    bannerHaru,
    topNav,
    bakcTop,
    contentLine,
    contentTop,
    contentPageItem,
    indexList,
    blogFooter,
    topProgress
  }
}
</script>

<style lang="scss" scoped>
// 页面
.content-page {
  // padding-top: 70px;
  min-height: 100vh;
  width: calc(100vw - 3px);
  background-color: #fff;

  // 显示区域
  .main-content-sec {
    position: relative;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    // width: calc(100vw - 3px);
    max-width: 800px;
    margin: 0 auto;

    // 目录
    .main-content-index-list-box {
      position: absolute;
      top: 380px;
      right: -250px;
    }

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
