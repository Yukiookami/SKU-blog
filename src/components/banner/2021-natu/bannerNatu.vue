<template>
  <div @mousemove="getMouseMove" @mouseenter="getFirstPoint" @mouseleave="clearFirstPoint" class="banner-natu-box">
    <video height="180" width="2200" autoplay loop
    muted
    :style="`transform: translate(${tranX}px, ${tranY}px);`"
    src="../../../assets/video/natu-banner.webm"></video>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue'

export default {
  setup () {
    const state = reactive({
      tranX: 0,
      tranY: 0,
      // 鼠标初始点位
      firstPoint: 0,
      /**
       * @param {Object} event
       * @description 获取鼠标初始点位
       */
      getFirstPoint (event:any) {
        state.firstPoint = event.clientX
      },
      /**
       * 鼠标离开时触发
       * @event
       * @description 重制初始点位
       */
      clearFirstPoint () {
        state.firstPoint = 0
        state.tranX = 0
        state.tranY = 0
      },
      /**
       * @param {Object} event
       * @description 计算偏移量
       */
      getMouseMove (event:any) {
        let moveX = event.clientX - state.firstPoint
        state.tranX = state.tranX - moveX * 0.0003
      },
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.banner-natu-box {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  overflow: hidden;
  height: 180px;
  width: 100%;
  background-image: url('../../../assets/img/banner-image/banner-natu-img/banner-natu.png');
  background-size: cover;

  video {
    transition: all .2s linear;
  }
}
</style>
