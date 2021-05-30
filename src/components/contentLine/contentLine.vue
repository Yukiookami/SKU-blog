<template>
  <div class="content-line" @click="go">
    <div class="content-line-icon-box">
      <img :src="icon" alt="">
    </div>

    <h3>{{title}}</h3>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue'
import { goToPage } from '../../assets/ts/common'

export default {
  props: ['icon', 'title', 'id'],
  setup (props:any) {
    const state = reactive({
      count: 0,
      go: () => {
        if (props.id) {
          goToPage('class', props.id)
        }
      }
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/common.scss';

.content-line {
  font-family: $font-f;
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 5px;
  margin-bottom: 30px;
  color: #666;
  font-weight: 400;
  border-bottom: 1px dashed #ececec;
  text-decoration: none;
  cursor: pointer;

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
