<template>
  <div class="top-nav-logo">
    <router-link class="top-nav-link-box" to="/">
      <span>SKU</span>
      <img src="../../assets/logo-blog.png" alt="">
    </router-link>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  setup () {
    const state = reactive({
      count: 0,
    })

    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
// logo
.top-nav-logo {
width: 110px;

  .top-nav-link-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-family: 'Authentica';
    text-decoration: none;

    img {
      width: 40%;
    }

    span {
      display: block;
      padding: 10px;
      font-size: 22px;
      margin-right: 5px;
      color: rgba(0, 0, 0, .6);
      background-color: rgba(255,255,255,.5);
      border-radius: 10px;
      transition: all .5s ease-in-out;
    }
  }

  &:hover {
    span {
      background-color: #f8ba0b;
      color: #fff;
    }
  }
}
</style>
