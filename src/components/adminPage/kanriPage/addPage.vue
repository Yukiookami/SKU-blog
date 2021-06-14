<template>
  <div class="add-page">
    <div class="content-sec">
      <div class="input-box">
        <span>标题</span>
        <el-input class="input-magin" v-model="contentObj.title" placeholder="请输入标题"></el-input>
      </div>

      <div class="input-box">
        <span>作者</span>
        <el-input class="input-magin" v-model="contentObj.sakusya" placeholder="请输入作者"></el-input>
      </div>

      <div class="input-box">
        <span>标签</span>
        <el-input class="input-magin" v-model="contentObj.tag" placeholder="请输入标签"></el-input>
      </div>

      <el-input
        type="textarea"
        :autosize="{ minRows: 20, maxRows: 20}"
        placeholder="请输入内容"
        v-model="contentObj.content">
      </el-input>
    </div>

    <div class="md-sec">
      <el-input
        type="textarea"
        :autosize="{ minRows: 32, maxRows: 32}"
        v-model="mdcontent">
      </el-input>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue'

export default {
  setup () {
    const state = reactive({
      contentObj: {
        // 文章标题
        title: '',
        // 作者
        sakusya: 'skuZxy',
        // 标签分类
        tag: '',
        // 文章内容
        content: ''
      },
      // markdown转换预览
      mdcontent: ''
    })

    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
// 引入公共样式
@import '../../../assets/css/adminCss/adminCommon.scss';

.add-page {
  display: flex;
  justify-content: space-between;

  .content-sec {
    width: 47%;
    padding-right: 3%;
    border-right: 1px dashed #ccc;
  }
}

.md-sec {
  width: 47%;
}
</style>
