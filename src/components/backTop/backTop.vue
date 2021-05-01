<template>
  <div class="go-to-top"
  :class="{'show': showKi}"
  @click="goBackToTop">
    <img ref="starImg" class="star-img" :class="{'star-move': showKi}"
    src="../../assets/img/pageTools/star.png" alt="">
  </div>

  <div class="kitune-hide"
  :class="{'kitune-show': showKi || kituneFlag}"
  :style="{'top': `${kituneHeight}px`}"
  @mouseenter="showKitune"
  @mouseleave="showKitune"
  @click="goBackToTop">
    <img :class="{'kitune-move': showKi || kituneFlag}" :src="kituneImg" alt="">
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, ref, toRefs, watchEffect } from 'vue'
import './css/kituneMove.css'

export default {
  props: ['show'],
  setup (props:any) {
    const state = reactive({
      showKi: false,
      /**
       * 返回顶部，在点击时触发
       *
       * @event
       */
      goBackToTop: ():void => {
        let timer = setInterval(() => {
          let top = document.documentElement.scrollTop - 40
          if (top <= 0) {
            window.scrollTo(0, 0)
            clearInterval(timer)
          } else {
            window.scrollTo(0, top - 40)
          }
        }, 20)

        timer
      },
      // 小狐狸图片
      kituneImg: require('../../assets/img/pageTools/kitune-hide.png'),
      // 显示小狐狸
      kituneFlag: false,
      // 小狐狸的高度
      kituneHeight: 662,
      /**
       * 显示小狐狸，当鼠标放上时触发
       *
       * @event
       */
      showKitune: ():void => {
        state.kituneFlag = !state.kituneFlag
        console.log(1)
      }
    })

    watchEffect(() => {
      if (props.show) {
        state.showKi = true
        state.kituneImg = require('../../assets/img/pageTools/kitune-come.png')
      } else {
        state.showKi = false
        state.kituneImg = require('../../assets/img/pageTools/kitune-hide.png')
      }
    })

    // 获取绳子高度
    const starImg = ref(null as HTMLImageElement | null)

    const getHeight = async () => {
      setTimeout(() => {
        state.kituneHeight = starImg!.value!.clientHeight - 60
      }, 2000)
    }

    onMounted(() => {
      getHeight()
    })

    return {
      ...toRefs(state),
      starImg
    }
  }
}
</script>

<style lang="scss" scoped>
.go-to-top {
  cursor: pointer;
  position: fixed;
  right: -4vw;
  top: 0;
  transition: all 1s ease-in-out;
  transform: rotate(-90deg);
  transform-origin: 0% 0%;

  .star-img {
    width: 250px;
  }

}

.kitune-hide {
  position: fixed;
  right: -4vw;
  width: 100px;
  transition: all 1s ease-in-out;
  transform: rotate(-15deg);
  cursor: pointer;

  img {
    width: 100%;
  }
}

.kitune-show {
  right: .3vw;
}

.show {
  transform: rotate(-1deg);
}

</style>
