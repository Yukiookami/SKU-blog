<template>
  <div>
    <!-- 导航 -->
    <top-nav></top-nav>
    <!-- banner区域 -->
    <banner-natu class="load-from-top"></banner-natu>
    <!-- bannerEnd -->
    <!-- 返回小狐狸 -->
    <bakc-top></bakc-top>
    <!-- 顶部进度条 -->
    <top-progress></top-progress>

    <main class="app-page-main">
      <h1 class="page-title">{{pageTag}}</h1>

      <content-line title="Web application" :icon="require('../assets/img/fontIcon/webapp.svg')"></content-line>
      <div class="app-item-sec">
        <template class="load-from-bottom" v-for="(item, index) in appList" :key="`web${index}`">
          <app-item :cover="item.cover" :appName="item.appName"
          :isPay="item.isPay" v-if="item.type === 0"></app-item>
        </template>
      </div>

      <content-line title="Windows application" :icon="require('../assets/img/fontIcon/app.svg')"></content-line>
      <div class="app-item-sec">
        <template class="load-from-bottom" v-for="(item, index) in appList" :key="`web${index}`">
          <app-item :cover="item.cover" :appName="item.appName"
          :isPay="item.isPay" v-if="item.type === 1"></app-item>
        </template>
      </div>

      <content-line title="Mac application" :icon="require('../assets/img/fontIcon/macapp.svg')"></content-line>
      <div class="app-item-sec">
        <template class="load-from-bottom" v-for="(item, index) in appList" :key="`web${index}`">
          <app-item :cover="item.cover" :appName="item.appName"
          :isPay="item.isPay" v-if="item.type === 2"></app-item>
        </template>
      </div>

      <content-line title="IOS" :icon="require('../assets/img/fontIcon/iosapp.svg')"></content-line>
      <div class="app-item-sec">
        <template class="load-from-bottom" v-for="(item, index) in appList" :key="`web${index}`">
          <app-item :cover="item.cover" :appName="item.appName"
          :isPay="item.isPay" v-if="item.type === 3"></app-item>
        </template>
      </div>

      <content-line title="Android" :icon="require('../assets/img/fontIcon/androidapp.svg')"></content-line>
      <div class="app-item-sec">
        <template v-for="(item, index) in appList" :key="`web${index}`">
          <app-item :cover="item.cover" :appName="item.appName"
          :isPay="item.isPay" v-if="item.type === 4"></app-item>
        </template>
      </div>
    </main>

    <!-- 页脚 -->
    <blog-footer></blog-footer>
  </div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, reactive, toRefs } from 'vue'
// 顶部导航
import topNav from '../components/nav/topNav.vue'
// 返回顶部小狐狸
import bakcTop from '../components/backTop/backTop.vue'
// 页脚
import blogFooter from '../components/blogFooter/blogFooter.vue'
// 顶部滚动条
import topProgress from '../components/topProgress/topProgress.vue'
import store from '@/store'
import bannerNatu from '@/components/banner/2021-natu/bannerNatu.vue'
// content-line
import contentLine from '../components/contentLine/contentLine.vue'
// appItem
import appItem from '../components/appItem/appItem.vue'
// 初始动画
import '../assets/css/loadAnime.css'

export default {
  setup () {
    const state = reactive({
      /**
       * 获取当前页面路由
       */
      pageTag: computed(() => {
        const { proxy }:any = getCurrentInstance()
        const pageName:string = proxy.$router.currentRoute.value.path

        let page = store.state.meunList.find(ele => ele.router === pageName)
        return page?.pageTitle
      }),
      // appList
      appList: [
        {
          cover: require('../assets/img/testImg/app-cover-1.jpeg'),
          appName: 'Amaroq',
          isPay: 0,
          type: 0
        },
        {
          cover: require('../assets/img/testImg/app-cover-1.jpeg'),
          appName: 'Amaroq',
          isPay: 1,
          type: 0
        },
        {
          cover: require('../assets/img/testImg/app-cover-1.jpeg'),
          appName: 'Amaroq',
          isPay: 1,
          type: 1
        }
      ]
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
    bannerNatu,
    contentLine,
    appItem
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/common.scss';

.app-page-main {
  width: 800px;
  margin: 40px auto;
  min-height: calc(100vh - 468.3px);

  .app-item-sec {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }

  // 标题
  .page-title {
    font-size: 30px;
    // font-family: 'Noto Serif SC','Source Han Serif SC','Source Han Serif','source-han-serif-sc','PT Serif','SongTi SC','MicroSoft Yahei',Georgia,serif;;
    font-family: $font-f;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, .5);
    font-weight: 100;
    text-align: center;

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
}
</style>
