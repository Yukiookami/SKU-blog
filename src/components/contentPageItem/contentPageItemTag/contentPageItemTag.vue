<template>
  <div @click="go" class="item-tag">
    <i class="el-icon-collection-tag"></i>
    <span>{{tagName}}</span>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue'
import { goToPage } from '../../../assets/ts/common'

export default {
  props: ['tagName', 'tagId'],
  setup (props:any) {
    const state = reactive({
      count: 0,
      go: () => {
        console.log(1)
        goToPage('class', props.tagId)
      }
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.item-tag {
  font-size: 12px;
  color: #888;
  cursor: pointer;

  i {
    margin-right: 5px;
  }
}
</style>
