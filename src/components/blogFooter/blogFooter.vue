<template>
  <div class="blog-footer">
    <img class="sakura" src="../../assets/img/footerImg/sakura.svg" alt="">
    <span class="creater">
      Crafted with<img src="../../assets/img/fontIcon/heart.svg" alt="">by
      <em class="myself">Suukinu</em>
    </span>
    <span class="record">© 2020 Suukinu 沪ICP备17028213号</span>
  </div>
</template>

<script lang="ts">
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
@import '../../assets/css/common.scss';

.blog-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 60px;
  margin-top: 100px;
  font-family: $font-f;
  background: linear-gradient(rgba(0, 0, 0, 0) 70%, rgba(255, 192, 203, .2) 80%, rgba(255, 192, 203, .7));

  .sakura {
    width: 30px;
    opacity: .3;
    user-select: none;
    animation: sakura 10s linear 0s infinite normal;
  }

  @keyframes sakura {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }

  .creater {
    color: #666;
    font-size: 13px;
    margin: 10px 0;

    img {
      width: 13px;
      margin: 0 5px;
    }

    .myself {
      font-weight: bold;
      font-style: normal;
      color: #000;
    }
  }

  .record {
    display: block;
    margin-top: 10px;
    color: #b9b0b9;
    font-size: 13px;
  }
}
</style>
