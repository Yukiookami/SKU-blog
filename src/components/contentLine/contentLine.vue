<template>
  <router-link v-if="router" :to="router" class="content-line">
    <div class="content-line-icon-box">
      <img :src="icon" alt="">
    </div>

    <h3>{{title}}</h3>
  </router-link>

  <div v-else class="content-line">
    <div class="content-line-icon-box">
      <img :src="icon" alt="">
    </div>

    <h3>{{title}}</h3>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue'

export default {
  props: ['icon', 'title', 'router'],
  setup () {
    const state = reactive({
      count: 0
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.content-line {
  font-family: 'Ubuntu',sans-serif;
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 5px;
  margin-bottom: 30px;
  color: #666;
  font-weight: 400;
  border-bottom: 1px dashed #ececec;
  text-decoration: none;

  .content-line-icon-box {
    width: 20px;
    margin-right: 10px;

    img {
      width: 100%;
    }
  }

  h3 {
    margin: 0;
    font-weight: 400;
  }
}
</style>
