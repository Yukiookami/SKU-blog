<!--
 * @Author: zxy
 * @Date: 2021-07-08 23:13:36
 * @LastEditTime: 2021-07-08 23:49:11
 * @FilePath: /my-blog/src/components/home/homeCaIcon.vue
-->
<template>
  <a :href="url" target="_blank" v-if="url" class="icon-box">
    <img :src="icon" alt="" />
  </a>

  <div v-else class="icon-box">
    <img :src="icon" alt="" />
    <span v-show="false" class="copy">{{ text }}</span>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
import Clipboard from 'clipboard'
import { ElMessage } from 'element-plus'

export default {
  props: ["icon", "url", "text"],
  setup(props: any) {
    const state = reactive({
      copy: () => {
        console.log(1)
        let clipboard = new Clipboard(".copy");
        clipboard.on("success", e => {
          ElMessage.success("成功复制到剪切板");
          // 释放内存
          clipboard.destroy();
        });
        clipboard.on("error", e => {
          // 不支持复制
          ElMessage.error("该浏览器不支持自动复制");
          // 释放内存
          clipboard.destroy();
        });
      }
    });

    return {
      ...toRefs(state)
    };
  }
};
</script>

<style lang="scss" scoped>
  .icon-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    margin: 0 10px;

    img {
      width: 100%;
    }
  }
</style>
