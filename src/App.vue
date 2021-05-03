<template>
  <div>
    <router-view class="router-view" v-slot="{ Component }">
      <transition name="router-loding">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  setup () {
    // 老婆
    setTimeout(() => {
      window.L2Dwidget.init({
        pluginRootPath: '/live2dw/',
        pluginJsPath: 'lib/',
        pluginModelPath: 'live2d-widget-model-koharu/assets/',
        tagMode: false,
        debug: false,
        model: { jsonPath: '/live2dw/live2d-widget-model-koharu/assets/koharu.model.json' },
        display: { position: 'left', width: 250, height: 350 },
        mobile: { show: true },
        log: false
      })
    }, 1000)
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}
</script>

<style>
*:focus {
  outline: none;
}

.router-view {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  -webkit-overflow-scrolling: touch;
}

body {
  margin: 0;
  padding: 0;
}

.router-loding-enter,
.router-loding-leave-to {
  opacity: 0;
}

.router-loding-enter-to,
.router-loding-leave {
  opacity: 1;
}

.router-loding-enter-active,
.router-loding-leave-active {
  transition: all .5s ease-in-out
}

/* 更改滚动条样式 */
/* 滚动条宽度 */
::-webkit-scrollbar {
 width: 3px;
 /* height: 10px; */
}
/* 滚动条的滑块 */
::-webkit-scrollbar-thumb {
 background-color: #f8ba0b;
 border-radius: 3px;
}
</style>
