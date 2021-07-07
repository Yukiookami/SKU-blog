<template>
  <div ref="pageTop" class="content-page">
    <top-nav></top-nav>
    <!-- banner区域 -->
    <banner-haru class="load-from-top" v-if="pageTag === 'Programming Basics' || pageTag === 'Component Implementation'"></banner-haru>
    <banner-natu class="load-from-top" v-if="pageTag === 'Japanese learning'"></banner-natu>
    <!-- bannerEnd -->
    <bakc-top></bakc-top>
    <top-progress></top-progress>

    <section class="main-content-sec">
      <!-- 文章目录 -->
      <div ref="indexList" v-if="contentObject.length" class="main-content-index-list-box">
        <index-list :senArr="contentObject" :titleIndex="contentLineIndex"
        :contentIndex="contentPageItemIndex" :numberList="arrLength"
        @goTo="goTo"></index-list>
      </div>

      <h1 class="page-title">{{pageTag}}</h1>

      <!-- 空状态 -->
      <div v-if="!contentObject.length" class="empty-box">
        <el-empty :image-size="200" 
        :image="`${require('../assets/img/statusImg/empty.png')}`"
        :description="descriptionText"></el-empty>
      </div>

      <content-line title="START:DASH!!" v-if="contentTopList.length" :icon="require('../assets/img/fontIcon/anchor.svg')"></content-line>

      <!-- 置顶文章 -->
      <div class="page-top-content-sec" v-if="contentTopList.length">
        <content-top class="load-from-bottom" v-for="(item, index) in contentTopList" :key="`contentTop${index}`"
        :cover="item[0].coverImg" :title="item[0].title" :content="item[0].content"
        :id="item[0].contentId" :cont="contentTopList.length" :contentType="contentType"></content-top>
      </div>

      <!-- 文章 -->
      <div class="page-content-sec load-from-bottom" v-for="(item, index) in contentObject" :key="`contentObject${index}`">
        <div :ref="contentLine">
          <content-line :title="item.typeName" :icon="item.typeIcon"
          :id="item.typeId" :contentType="contentType"></content-line>
        </div>

        <div :ref="contentPageItem" v-for="(contentItem, contentIndex) in item.contentList"
        :key="`contentItem${contentIndex}`" >
          <content-page-item :createTime="contentItem.date"
          :title="contentItem.title" :tag="contentItem.tag"
          :content="contentItem.content" :cover="contentItem.coverImg"
          :id="contentItem.contentId" :index="contentIndex" 
          :contentType="contentType"></content-page-item>
        </div>

        <view-more :typeId="item.typeId" :contentType="contentType"></view-more>
      </div>
    </section>

    <blog-footer></blog-footer>
  </div>
</template>

<script lang="ts">
import { computed, reactive, toRefs, getCurrentInstance, onMounted, ref, onBeforeUpdate, onBeforeUnmount, watch } from 'vue'
// import { useRouter } from 'vue-router'
// 2021 春
import bannerHaru from '../components/banner/2021-haru/bannerHaru.vue'
// 2021 夏
import bannerNatu from '../components/banner/2021-natu/bannerNatu.vue'
// 顶部导航
import topNav from '../components/nav/topNav.vue'
// 返回顶部小狐狸
import bakcTop from '../components/backTop/backTop.vue'
// 页脚
import blogFooter from '../components/blogFooter/blogFooter.vue'
// 老婆
// import { setYome } from '../assets/ts/yome'
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
// 公用ts
import { handleScroll, throttle, timeChange } from '../assets/ts/common'
// 初始动画
import '../assets/css/loadAnime.css'
// 查看更多
import viewMore from '../components/viewMore/viewMore.vue'
import store from '@/store'

export default {
  setup () {
    // 老婆
    // setYome

    const { proxy }:any = getCurrentInstance()
    const API = proxy.$API

    const state = reactive({
      // 页面为空时的描述文字
      descriptionText: '当前页面还没有发布的内容，敬请期待!',
      // 当前语言
      langFlag: computed(() => store.state.langFlag),
      // 当前页面类型
      contentType: 'program',
      /**
       * 获取当前页面路由
       */
      pageTag: computed(() => {
        const pageRouter = proxy.$router.currentRoute.value
        const pageName:string = pageRouter.path
        state.contentType = pageRouter.name
        // 利用计算属性运行请求事件 合理性存疑
        state.getContentData()
        state.getTopContent()

        let page = store.state.meunList.find(ele => ele.router === pageName)
        return page?.pageTitle
      }),
      // 目录index（大标题）
      contentLineIndex: 0,
      // 目录index（小标题）
      contentPageItemIndex: 0,
      // 判断上滑还是下滑
      checkScrollFlag: 0,
      /**
       * 监听页面顶部，判断是往上还是往下滑动，以及锚点元素，滚动触发
       *
       * @event
       */
      listenPageTop: () => {
        // 判断上下滑动
        state.checkScrollFlag = handleScroll()

        // 更改index
        state.changeIndex(contentLineArr, 0, 150, -100, state.checkScrollFlag)
        state.changeIndex(contentPageItemArr, 1, 80, -100, state.checkScrollFlag)
      },
      /**
       * @description: 进行节流操作
       * @param {*}
       * @return {*}
       */
      throttleFun: '' as any,
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
      contentTopList: [],
      // 文章数组
      contentObject: [],
      // 原始数组数据
      motoData: {
        // 原始文章数据
        contentData: [],
        // 原始typeClass数据
        typeClassData: []
      },
      /**
       * @description: 获得文章数据
       * @param {*}
       * @return {*}
       */
      getContentData: () => {
        let contentType = state.contentType

        proxy.$http.get(`${API}api/content/getAllContent?contentType=${contentType}`)
          .then((res:any) => {
            state.motoData.contentData = res.data.list
            
            proxy.$http.get(`${API}api/typeClass/getAllTypeClass`)
              .then((res:any) => {
                state.motoData.typeClassData = res.data.list
                state.setResData()
              })
          })
      },
      /**
       * @description: 处理获得数据
       * @param {*}
       * @return {*}
       */      
      setResData: () => {
        let {contentData, typeClassData} = state.motoData

        let newData = state.getFinCityList(contentData)
        let newTypeData:any = []

        typeClassData.forEach((ele:any) => {
          newData.forEach((newDataEle:any) => {
            if (!state.langFlag) {
              // 中文
              if (newDataEle[0].typeClass === ele.cnTypeClassInfo.typeName) {
                let obj = {
                  typeId: ele._id,
                  ...ele.cnTypeClassInfo,
                  contentList: newDataEle
                }

                newTypeData.push(obj)
              }
            } else {
              // 日语
              if (newDataEle[0].typeClass === ele.jaTypeClassInfo.typeName) {
                let obj = {
                  typeId: ele._id,
                  ...ele.jaTypeClassInfo,
                  contentList: newDataEle
                }

                newTypeData.push(obj)
              }
            }
          })
        })

        state.contentObject = newTypeData
        // 设置目录数组
        state.setArrLeagth()
      },
      /**
       * @description: 处理文章数组分组
       * @param {*}
       * @return {*}
       */
      getFinCityList: (oldData:any) => {
        const s = new Set()

        let newData:any = []

        if (!state.langFlag) {
          // 中文
          oldData.forEach((ele:any) => {
            s.add(ele.cnContentInfo.typeClass)
          })

          newData = Array.from({ length: s.size }, () => [])

          oldData.forEach((ele:any) => {
            let index = [...s].indexOf(ele.cnContentInfo.typeClass)

            if(typeof ele.jaContentInfo.tag === 'string') {
              ele.cnContentInfo.tag = ele.cnContentInfo.tag.split(',')
              ele.cnContentInfo.date = timeChange(ele.cnContentInfo.date)
            }

            let obj = {
              contentId: ele._id,
              ...ele.cnContentInfo
            }

            newData[index].push(obj)
          })
        } else {
          // 日语
          oldData.forEach((ele:any) => {
            s.add(ele.jaContentInfo.typeClass)
          })

          newData = Array.from({ length: s.size }, () => [])

          oldData.forEach((ele:any) => {
            let index = [...s].indexOf(ele.jaContentInfo.typeClass)

            if(typeof ele.jaContentInfo.tag === 'string') {
              ele.jaContentInfo.tag = ele.jaContentInfo.tag.split(',')
              ele.jaContentInfo.date = timeChange(ele.jaContentInfo.date)
            }

            let obj = {
              contentId: ele._id,
              ...ele.jaContentInfo
            }

            newData[index].push(obj)
          })
        }

        return newData
      },    
      /**
       * @description: 获得置顶文章
       * @param {*}
       * @return {*}
       */      
      getTopContent: () => {
        proxy.$http.get(`${API}api/content/getTopContent?contentType=${state.contentType}&&topNum=3`)
          .then((res:any) => {
            let newArr = state.getFinCityList(res.data.list)
            state.contentTopList = newArr
          })
      }  
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

    // 监听语言变化
    watch(() => state.langFlag,
      (nowLang) => {
        if (!nowLang) {
          state.descriptionText = '当前页面还没有发布的内容，敬请期待!'
        } else {
          state.descriptionText = '準備しております！お楽しみに！'
        }

        state.setResData()
      })

    onBeforeUpdate (() => {
      contentLineArr = []
      contentPageItemArr = []
    })

    onMounted(() => {
      state.throttleFun = throttle(state.listenPageTop, 10)

      window.addEventListener('scroll', state.throttleFun, true)
      // 记得在请求后调用
      state.setArrLeagth()
    })

    onBeforeUnmount(() => {
      // 销毁滚动事件
      window.removeEventListener('scroll', state.throttleFun, true)
    })

    return {
      ...toRefs(state),
      contentLine,
      contentPageItem
    }
  },
  components: {
    bannerHaru,
    bannerNatu,
    topNav,
    bakcTop,
    contentLine,
    contentTop,
    contentPageItem,
    indexList,
    blogFooter,
    topProgress,
    viewMore
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/common.scss';

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

    // 空状态
    .empty-box {
      width: calc(60vw);
      height: calc(100vh - 519px);
      box-shadow: 0 0 5px #e5e9ef;
      border-radius: 30px;
      background-repeat: no-repeat;
      background-position: 75% 100%;
      background-image: url('../assets/img/statusImg/jingle.png')
    }

    // 标题
    .page-title {
      font-size: 30px;
      // font-family: 'Noto Serif SC','Source Han Serif SC','Source Han Serif','source-han-serif-sc','PT Serif','SongTi SC','MicroSoft Yahei',Georgia,serif;;
      font-family: $font-f;
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
        color: $color-blog-yel;
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
