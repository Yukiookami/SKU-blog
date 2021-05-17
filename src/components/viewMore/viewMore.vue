<template>
  <div class="view-more-box">
    <span @click="go">view more</span>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue'
import { goToPage } from '../../assets/ts/common'

export default {
  props: ['typeId'],
  setup (props:any) {
    const state = reactive({
      go: () => {
        goToPage('class', props.typeId)
      }
    })

    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
.view-more-box {
  width: 100%;
  padding: 20px 0;
  text-align: center;
  margin: 40px auto 80px;
  display: inline-block;

  span {
    padding: 13px 35px;
    border: 1px solid #d6d6d6;
    border-radius: 50px;
    color: #adadad;
    cursor: pointer;
    transition: all .3s ease-in-out;

    &:hover {
      color: #f8ba0b;
      border-color: #f8ba0b;;
    }
  }

}
</style>
