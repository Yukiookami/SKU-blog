<template>
  <nav class="top-nav-sec">
    <!-- logo -->
    <top-logo></top-logo>

    <!-- nav部分 -->
    <div class="top-nav-main">
      <router-link v-for="(item, index) in meunList" :key="`navList${index}`"
      :to="item.router"
      class="top-nav-span">
        <i :class="item.icon"></i>
        {{item.title}}
      </router-link>
    </div>

    <!-- 管理员登录 -->
    <div class="top-nav-user-box">
      <i class="el-icon-user"></i>
    </div>
  </nav>
</template>

<script lang="ts">
import { computed, reactive, toRefs } from 'vue'
import topLogo from '../topLogo/topLogo.vue'
import store from '@/store'

export default {
  setup () {
    const state = reactive({
      meunList: computed(() => store.state.meunList)
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
  z-index: 9999;
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
        opacity: 0;
        bottom: -21px;
        left: 13%;
        display: block;
        height: 6px;
        width: 80%;
        background-color: #fe8b00;
        transition: all .5s ease-in-out;
      }

      &:hover {
        color: #fe8b00;

        &::before {
          opacity: 1;
        }
      }
    }
  }

  .top-nav-user-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, .5);
    color: rgba(0, 0, 0, .5);
    font-size: 25px;
    cursor: pointer;
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
}
</style>
