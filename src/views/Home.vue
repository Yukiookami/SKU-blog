<template>
  <div class="blog-home-page">
    <!-- 顶部 -->
    <header class="blog-home-page-header">
      <top-logo></top-logo>
      <div class="blog-menu"
      @mouseenter="changeLine('long')"
      @mouseleave="changeLine('long')"
      @click="changeLine('rotate')">
        <i class="blog-yoko-line blog-line-long"
        :class="{'blog-line-rotate--45 blog-yoko-line-color-black': changeRotate}"></i>
        <i class="blog-yoko-line"
        :class="{'blog-change-line': showLongLine,
        'blog-hide-line': changeRotate}"></i>
        <i class="blog-yoko-line blog-line-long"
        :class="{'blog-line-rotate-45 blog-yoko-line-color-black': changeRotate}"></i>
      </div>
    </header>
    <!-- 背景 -->
    <div class="blog-back-sec">
      <!-- 背景轮播图以及标题图片特效 -->
      <div class="blog-back-show blog-back-show-expand carousel-box"
      :class="{'blog-back-show-load-checked': loadCheck,
      'blog-back-show-load-size': changeSize}"
      :style="{backgroundImage: `url(${nowShowImg})`}">
        <!-- 标题 -->
        <h1 class="blog-title-font"
        :class="{'blog-title-font-show': changeSize}">Hi! YOUKOSO!</h1>

        <!-- 联系方式 -->
        <div class="cantact-me-box"
        :class="{'cantact-me-box-show': changeSize}">
          <div class="test-box">
            <img src="../assets/img/homeBack/ying-l.svg" alt="">
            <span>Any application that can be written in JavaScript, will eventually be written in JavaScript.</span>
            <img src="../assets/img/homeBack/ying-r.svg" alt="">
          </div>

          <div class="cantact-icon-sec">
            <home-ca-icon v-for="(item, index) in caList" :key="`caList${index}`"
            :icon="item.icon" :url="item.url" :text="item.text"></home-ca-icon>
          </div>
        </div>

        <!-- 波浪 -->
        <div class="blog-back-nami blog-back-nami-black blog-back-nami-box"></div>
        <div class="blog-back-nami-slowly blog-back-nami-white blog-back-nami-box"></div>
      </div>
      <!-- 确认图片加载成功后让浏览器读取缓存去加载背景图 -->
      <img class="blog-load-box" @load="backImgShow"
      src='../assets/img/homeBack/back-1.jpg' alt="">
    </div>

    <!-- 菜单栏 -->
    <div>
      <index-nav v-for="(item, index) in meunList" :key="index"
      :router="item.router" :index="index" :title="item.title"
      :cont="meunList.length" :changeRotate="changeRotate"></index-nav>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, onMounted, reactive, toRefs } from 'vue'
import topLogo from '../components/topLogo/topLogo.vue'
import indexNav from '../components/home/indexNav.vue'
import '../../common/font.css'
import '../assets/css/homeBack.css'
import homeCaIcon from '../components/home/homeCaIcon.vue'
import store from '@/store'

export default {
  setup () {
    const { proxy }:any = getCurrentInstance()
    const API = proxy.$API

    const state = reactive({
      // 联系方式
      caList: [
        {
          icon: require('../assets/img/homeBack/github.png'),
          text: '',
          url: 'https://github.com/Yukiookami'
        },
        {
          icon: require('../assets/img/homeBack/QQ.svg'),
          text: '1073898183',
          url: ''
        },
        {
          icon: require('../assets/img/homeBack/weixin.svg'),
          text: 'ookami_123',
          url: ''
        },
        {
          icon: require('../assets/img/homeBack/wangyiyun.png'),
          text: '',
          url: 'https://music.163.com/#/user/home?id=356514660'
        },
        {
          icon: require('../assets/img/homeBack/email.svg'),
          text: 'zouxinyu17@gmail.com',
          url: ''
        },
      ],
      // 显示长短线
      showLongLine: false,
      // 更改为叉
      changeRotate: false,
      /**
       * 更改线，点击菜单按钮触发
       *
       * @event
       * @param {string}
       */
      changeLine: (flag:string) => {
        if (flag === "long") {
          state.showLongLine = !state.showLongLine
        } else if (flag === "rotate") {
          state.changeRotate = !state.changeRotate
        }
      },
      // 判断是否加载图片完成
      loadCheck: false,
      // 改变背景图大小
      changeSize: false,
      // 当前显示的图片
      nowShowImg: require('../assets/img/homeBack/back-1.jpg'),
      // 静态轮播图存储地址
      staticImgArr: [
        {
          coverUrl: require('../assets/img/homeBack/back-1.jpg')
        },
        {
          coverUrl: require('../assets/img/homeBack/back-2.jpg')
        },
        {
          coverUrl: require('../assets/img/homeBack/back-3.jpg')
        },
        {
          coverUrl: require('../assets/img/homeBack/back-4.jpg')
        }
      ],
      // 动态获取网络图片
      netImgarr: [],
      /**
       * 显示背景图片，图片加载完成后触发
       *
       * @event
       * @param {string} flag
       */
      backImgShow: () => {
        state.loadCheck = true
        setTimeout(() => {
          state.changeSize = true
        }, 1300)
        state.carousel()
      },
      // 图片轮播index
      carIndex: 0,
      /**
       * @description 轮播图
       */
      carousel: () => {
        setInterval(() => {
          if (state.netImgarr.length < 2) {
            state.changeCarIndex(state.staticImgArr)
          } else {
            state.changeCarIndex(state.netImgarr)
          }
        }, 10000)
      },
      /**
       * @description: 更改轮播图index,并且返回当前图片链接
       * @param {*} arr
       * @return {*}
       */
      changeCarIndex: (arr:any):void => {
        if (state.carIndex === arr.length - 1) {
          state.carIndex = 0
        } else {
          state.carIndex++
        }

        state.nowShowImg = arr[state.carIndex].coverUrl
      },
      /**
       * @description: 获得cover数组
       * @param {*}
       * @return {*}
       */
      getAllImg: ():void => {
        proxy.$http.get(`${API}api/homePage/getAllCover`)
          .then((res:any) => {
            state.netImgarr = res.data.list
          })
      },
      // 菜单栏
      meunList: computed(() => store.state.meunList)
    })

    onMounted(() => {
      state.getAllImg()
    })

    return {
      ...toRefs(state)
    }
  },
  components: {
    indexNav,
    topLogo,
    homeCaIcon
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/common.scss';

// ページコート
.blog-home-page {
  overflow: hidden;
  height: 100vh;
  width: calc(100vw - 3px);
  background-image: url('../assets/img/homeBack/sakura-back.png');
  // background-image: url('../assets/homeBack/little-monster.png');
  z-index: 2147483640;

  // header
  .blog-home-page-header {
    position: fixed;
    top: 0;
    width: calc(100vw - 103px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 50px;
    z-index: 999;

    // 右侧菜单按钮
    .blog-menu {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      height: 20px;
      width: 40px;
      cursor: pointer;
      z-index: 9999;

      .blog-yoko-line {
        display: block;
        width: 20px;
        height: 2px;
        background-color: #fff;
        transition: .3s ease-in-out;
      }

      .blog-yoko-line-color-black {
        background-color: #191919;
      }

      .blog-change-line {
        width: 40px;
      }

      .blog-hide-line {
        width: 0;
      }

      .blog-line-long {
        width: 40px;
        transform-origin: 100%;
      }

      .blog-line-rotate-45 {
        transform: rotate(45deg);
        width: 26px;
      }

      .blog-line-rotate--45 {
        transform: rotate(-45deg);
        width: 26px;
      }
    }
  }

  // 背景
  .blog-back-sec {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: calc(100vw - 3px);

    .blog-back-show {
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 100%;
      width: 100%;
      background: no-repeat center center;
      background-size: 100%;
      transition: 1.5s ease-in-out;

      &::before {
        position: absolute;
        content: "";
        display: block;
        height: 100%;
        width: 100%;
        background-image: url('../assets/img/homeBack/dot.gif');
        opacity: 0;
        transition: .5s ease-in-out;
      }

      // 联系方式
      .cantact-me-box {
        position: relative;
        min-width: 600px;
        font-size: 18px;
        color: #fff;
        background: rgba(0,0,0,.5);
        padding: 15px;
        margin-top: 22px;
        letter-spacing: 0;
        line-height: 30px;
        height: 60px;
        border-radius: 10px;
        box-sizing: initial;
        white-space: nowrap;
        opacity: 0;
        transition: 1s ease-in-out;
        font-family: $font-f;

        .test-box {
          display: flex;
          align-items: center;
          
          img {
            width: 30px;
          }
        }

        &::before {
          content: "";
          position: absolute;
          top: -30px;
          left: 30%;
          margin-left: -15px;
          border-width: 15px;
          border-style: solid;
          border-color: transparent transparent rgba(0,0,0,.5) transparent;
        }

        .cantact-icon-sec {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 30px;
        }
      }

      .blog-title-font {
        user-select: none;
        margin: 30px 0 0 0;
        font-family: $font-f;
        opacity: 0;
        text-shadow: 0 0 15px rgba(0, 0, 0, 1);
        transition: 1s ease-in-out;
        font-size: 72px;
        color: #fff;
        z-index: 1;
      }

      .blog-title-font-show {
        transition-delay: 5s;
        opacity: 1;
      }

      .cantact-me-box-show {
        transition-delay: 5s;
        opacity: 1;
      }

      .blog-back-nami-box {
        position: absolute;
        bottom: 0px;
        width: 400vw;
        height: 65px;
      }

      .blog-back-nami-black {
        background: url('../assets/img/homeBack/nami-1.png') repeat-x;
      }

      .blog-back-nami-white {
        background: url('../assets/img/homeBack/nami-2.png') repeat-x;
      }
    }

    .blog-back-show-expand {
      margin-top: 200vh;
    }

    .blog-back-show-load-checked {
      transition-delay: 2s;
      margin: 0;
    }

    .blog-back-show-load-size {
      height: 98vh;
      width: 98vw;

      &::before {
        opacity: 1;
        transition-delay: 4s;
      }
    }

    .blog-load-box {
      opacity: 0;
      position: absolute;
      bottom: 0;
      display: none;
      z-index: -999;
    }
  }
}
</style>
