<template>
  <nav @mouseenter="changeMove"
  @mouseleave="changeMove" class="top-nav-sec">
    <!-- logo -->
    <top-logo :moveYou="moveYou"></top-logo>

    <!-- nav部分 -->
    <div class="top-nav-main">
      <router-link v-for="(item, index) in meunList" :key="`navList${index}`"
      :to="item.router"
      class="top-nav-span">
        <i :class="item.icon"></i>
        {{item.title}}
      </router-link>
    </div>

    <div class="top-nav-user-sec">
      <!-- 搜索 -->
      <i @click="showSearch(0)" class="el-icon-search search-bottoun"></i>
      <!-- 管理员登录 -->
      <div @click="showSearch(1)" class="top-nav-user-box">
        <i class="el-icon-user"></i>
      </div>
    </div>

    <!-- 展开面板 -->
    <div class="search-from-main"
    :class="{'search-from-main-show': isShowSearch}">
      <img @click="showSearch" class="close" src="../../assets/img/fontIcon/close.svg" alt="">
      <!-- 搜索部分 -->
      <div v-if="!showWitch">
        <div class="search-from">
          <h3 class="search-title">{{searchText}}</h3>
          <!-- 搜索 -->
          <i class="el-icon-search search-bottoun"></i>
          <input @keyup.enter="go" class="search-input" v-model="keyword" placeholder="Search">
        </div>
      </div>

      <!-- 登录部分 -->
      <div class="search-from" v-else>
        <input @keyup.enter="login" class="search-input login-input"
        @focus="clearError"
        :class="{'login-error': loginError}" v-model="username" placeholder="username">
        <input @keyup.enter="login" type="password" class="search-input"
        @focus="clearError"
        :class="{'login-error': loginError}" v-model="password" placeholder="password">
      </div>
      <img class="kanban" src="../../assets/img/search/kawai.gif" alt="">
    </div>
  </nav>
</template>

<script lang="ts">
import { computed, getCurrentInstance, reactive, toRefs } from 'vue'
import topLogo from '../topLogo/topLogo.vue'
import store from '@/store'
import { goToPage } from '../../assets/ts/common'

export default {
  setup () {
    const { ctx }:any = getCurrentInstance()

    const state = reactive({
      meunList: computed(() => store.state.meunList),
      // 控制小狐狸移动
      moveYou: false,
      /**
       * 改变移动值
       * @event
       */
      changeMove: () => {
        state.moveYou = !state.moveYou
      },
      // 搜索框文本
      searchText: '想要找点什么呢 ？',
      // 是否显示展开面板
      isShowSearch: false,
      // 显示搜索框还是显示登录
      showWitch: 0,
      /**
       * 显示展开界面，点击触发
       * @event
       *
       * @param {number} flag
       */
      showSearch:(flag:number = 0) => {
        state.showWitch = flag
        state.isShowSearch = !state.isShowSearch
      },
      // 输入框keyword
      keyword: '',
      // 用户名
      username: '',
      // 密码
      password: '',
      // 是否登录错误
      loginError: false,
      /**
       * 跳转到搜索结果页面
       * @event
       */
      go: () => {
        goToPage('search', state.keyword)
        state.showSearch()
      },
      /**
       * 登录跳转到管理员页面
       * @event
       */
      login: () => {
        if (state.username === 'Yuki' && state.password === 'qy12138ly.') {
          ctx.$cookie.setCookie("login_cookies", state.username, 60 * 60 * 24 * 30)

          goToPage('admin', state.username)
        } else {
          state.loginError = true
        }

        state.username = ''
        state.password = ''
      },
      /**
       * 清除登录错误，重新聚焦时触发
       * @event
       */
      clearError: () => {
        state.loginError = false
      }
    })

    return {
      ...toRefs(state)
    }
  },
  components: {
    topLogo
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/common.scss';

.top-nav-sec {
  position: fixed;
  display: flex;
  top: 0;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  height: 60px;
  width: calc(100vw - 80px);
  user-select: none;
  z-index: 2147483647;
  background-image: linear-gradient(#fff, rgba(255, 255, 255, .8), rgba(255, 255, 255, 0));
  // box-shadow: 0 0 5px rgba(0, 0, 0, .2);
  transition: all .5s ease-in-out;

  .top-nav-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    opacity: 0;
    transition: all .5s ease-in-out;
    transform: translateX(100px);

    .top-nav-span {
      position: relative;
      padding: 0 20px;
      cursor: pointer;
      transition: all .3s ease-in-out;
      text-decoration: none;
      color: #666;

      &::before {
        content: "";
        position: absolute;
        opacity: 1;
        bottom: -21px;
        left: 13%;
        display: block;
        height: 6px;
        width: 0;
        background-color: #fe8b00;
        transition: all .3s ease-in-out;
      }

      &:hover {
        color: #fe8b00;

        &::before {
          width: 80%;
        }
      }
    }
  }

  // 用户区域
  .top-nav-user-sec {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgba(0, 0, 0, .5);
    width: 70px;
    font-size: 25px;

    .search-bottoun {
      cursor: pointer;
      transition: all .3s ease-in-out;

      &:hover {
        color: $color-blog-yel;
      }
    }

    .top-nav-user-box {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 25px;
      width: 25px;
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, .5);
      cursor: pointer;
    }
  }

  &:hover {
    // background-image: linear-gradient(#fff, rgba(255, 255, 255, .8), rgba(255, 255, 255, .5));
    background-color: rgba(255, 255, 255, .8);
    box-shadow: 0 0 5px rgba(0, 0, 0, .5);

    .top-nav-main {
      opacity: 1;
      transform: translateX(0);
    }
  }

  // 搜索
  .search-from-main {
    overflow: hidden;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    visibility: hidden;
    background-color: rgba(255, 255, 255, .99);
    transition: visibility .25s ease,opacity .25s ease;
    z-index: 99999999;

    .close {
      position: absolute;
      top: 30px;
      right: 40px;
      width: 30px;
      cursor: pointer;
    }

    .search-from  {
      font-family: $font-f;
      position: relative;
      padding-bottom: 200px;
      width: 600px;
      color: #666;

      // 搜索标题
      .search-title {
        font-weight: normal;
        padding-left: 24px;
        font-size: 16px;
      }

      // 搜索按钮
      .search-bottoun {
        font-size: 35px;
        position: absolute;
        left: 15px;
        bottom: 210px;
        color: rgba(0, 0, 0, .2);
      }

      // 搜索框
      .search-input {
        font-size: 24px;
        background: #fff;
        padding: 12px 24px 12px 64px;
        width: 100%;
        outline: none;
        border-radius: 50px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border: 2px solid #ccc;

        &::placeholder {
          color: rgb(196, 194, 194);
          font-weight: normal;
        }
      }

      // 登录框
      .login-input {
        margin: 0 0 20px;
      }

      .login-error {
        box-shadow: 0 0 6px rgb(227 23 13 / .4);
        animation: loginError .3s linear;
      }

      @keyframes loginError {
        from {
          transform: translateX(0);
        }

        25% {
          transform: translateX(10px);
        }

        50% {
          transform: translateX(-10px);
        }

        75% {
          transform: translateX(10px);
        }

        to {
          transform: translateX(0px);
        }
      }
    }

    // 看板娘
    .kanban {
      position: absolute;
      right: 40px;
      bottom: 40px;
    }
  }

  // 显示搜索框
  .search-from-main-show {
    visibility: visible;
    opacity: 1;
    animation: showSearch .5s linear;
    transform-origin: center;
  }

  @keyframes showSearch {
    from {
      top: 50%;
      left: 50%;
      bottom: 50%;
      right: 50%;
      width: 0;
      height: 0;
    }

    54% {
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100vw;
      height: 100vh;
    }

    55% {
      transform: scale(1);
    }

    70% {
      transform: scale(.9);
    }

    85% {
      transform: scale(1);
    }

    95% {
      transform: scale(.95);
    }

    to {
      transform: scale(1);
    }
  }
}
</style>
