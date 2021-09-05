<!--
 * @Author: zxy
 * @Date: 2021-08-12 11:28:08
 * @LastEditTime: 2021-09-02 15:57:58
 * @FilePath: /my-blog/src/components/banner/2021-aki/bannerAki.vue
-->
<template>
  <div @mousemove="getMouseMove" @mouseenter="getFirstPoint" @mouseleave="clearFirstPoint" class="banner-natu-box">
    <video height="180" width="2200" autoplay loop
    muted @canplaythrough="showVideo" class="hide-you"
    :class="{'is-load': idLoad}"
    :style="`transform: translate(${tranX}px, ${tranY}px);`"
    :src="videoSrc"></video>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue'
import { getRan } from '../../../assets/ts/common'

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
      videoSrc: require('../../../assets/img/banner-image/banner-aki/b1d3fb6a-ce57-4eee-be6b-266054834bbb.mp4'),
      idLoad: false,
      /**
       * 显示视频，加载结束触发
       *
       * @event
       */
      showVideo: () => {
        state.idLoad = true
      }
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
    transition: all .4s linear;
  }

  .hide-you {
    opacity: 0;
  }

  .is-load {
    opacity: 1;
  }
}
</style>
