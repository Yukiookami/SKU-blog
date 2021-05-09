<template>
  <div class="banner-natu-box">
    <video height="180" width="2200" autoplay loop
    :style="`translate(${tranX}px, ${tranY}px));`"
    src="../../../assets/video/natu-banner.webm"></video>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue'

export default {
  setup () {
    const state = reactive({
      tranX: 52,
      tranY: -5
    })

    return {
      ...toRefs(state),
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
}
</style>
