<template>
  <progress class="top-pro" max="100" :value="proValue"></progress>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue'

export default {
  setup () {
    const state = reactive({
      // 进度条值
      proValue: 0,
      /**
       * 计算进度条进度，页面滑动时触发
       *
       * @event
       */
      calPro: () => {
        // 页面高度
        let pageHeight:number = document.body.scrollHeight || document.documentElement.scrollHeight
        // 视窗高度
        let windowHeight:number = document.documentElement.clientHeight || document.body.clientHeight
        // 滚动高度
        let scrollAvail:number = pageHeight - windowHeight
        // 当前滚动高度
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop

        // 计算出数值
        state.proValue = (scrollTop / scrollAvail) * 100
      }
    })

    onMounted(() => {
      window.addEventListener('scroll', state.calPro, true)
    })

    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
.top-pro {
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100vw;
  height: 2px;
  z-index: 9999;
  background: rgba(0, 0, 0, 0);

  // 总长度背景色，谷歌
  &::-webkit-progress-bar {
    background: rgba(0, 0, 0, 0);
  }

  // 已完成进度背景色，谷歌
  &::-webkit-progress-value {
    background: linear-gradient(to right,rgba(248, 186, 11, .4), rgba(248, 186, 11, .8));
  }
}

</style>
