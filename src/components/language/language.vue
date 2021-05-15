<template>
  <div @click="changeLang" class="lang-button">
    <span>Change language</span>
    <i class="el-icon-s-tools haguruma"></i>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue'
import store from '@/store'

export default {
  setup () {
    const state = reactive({
      /**
       * 更改语言 点击触发
       * @event
       */
      changeLang: () => {
        if (store.state.langFlag) {
          store.commit("setLangFlag", 0)
        } else {
          store.commit("setLangFlag", 1)
        }
      }
    })

    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
.lang-button {
  font-family: 'Ubuntu',sans-serif;
  position: fixed;
  display: flex;
  align-items: center;
  bottom: 10px;
  right: 20px;
  justify-content: center;
  z-index: 2147483647;
  transition: all .3s ease-in-out;
  cursor: pointer;

  &:hover {
    color: #f8ba0b;
  }

  .haguruma {
    margin-left: 5px;
    vertical-align: middle;
    user-select: none;
    animation: sakura 7s linear 0s infinite normal;
  }

  @keyframes sakura {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }
}
</style>
