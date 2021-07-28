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
        :key="`classPageItem${index}`" :cover="item.coverImg"
        :id="item.id" :createTime="item.date" :title="item.title"
        :author="item.sakusya" :content="item.content" :contentType="item.contentType"></class-page-item>
      </section>
    </div>

    <!-- 页脚 -->
    <blog-footer></blog-footer>
  </div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, onMounted, reactive, toRefs, watch } from 'vue'
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
// 引入公用ts
import { timeChange } from '../assets/ts/common'
import store from '@/store'

export default {
  setup () {
    const { proxy }:any = getCurrentInstance()
    const API = proxy.$API
    // 定义路由
    const route = useRoute()
    // 老婆
    // setYome

    const state:any = reactive({
      // keyword
      keyword: computed(() => Base64.decode(route.query.id as string)),
      // 语言类型
      langFlag: computed(() => store.state.langFlag),
      // 文章数据
      classObj: {
        keyword: computed(() => state.keyword),
        typeCover: require('../assets/img/search/type-cover-1.jpeg'),
        contentList: [] as any
      },
      searchList: [],
      /**
       * 根据keyword请求数据
       */
      getSen: () => {
        proxy.$http.get(`${API}api/content/searchContent?keyword=${state.keyword}&&langFlag=${state.langFlag}`)
          .then((res:any) => {
            let list = res.data.list
            state.searchList = list.flat()

            state.changeContentByLang(state.searchList)
          })
      },
      /**
       * @description: 根据语言更改文章内容
       * @param {*} arr
       * @return {*}
       */ 
      changeContentByLang: (arr:any) => {
        let lang = store.state.langFlag
        let newArr:any = []

        arr.forEach((ele:any) => {
          let { cnContentInfo, jaContentInfo } = ele

          if (!lang) {
            cnContentInfo.date = timeChange(cnContentInfo.date)
            cnContentInfo.id = ele._id
            newArr.push(cnContentInfo)
          } else {
            jaContentInfo.id = ele._id
            jaContentInfo.date = timeChange(jaContentInfo.date)
            newArr.push(jaContentInfo)
          }
        })

        state.classObj.contentList = newArr
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

      watch(() => store.state.langFlag, () => {
        state.changeContentByLang(state.searchList)
      })

      state.getSen()
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
