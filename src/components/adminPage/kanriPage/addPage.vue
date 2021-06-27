<!--
 * @Author: zxy
 * @Date: 2021-06-06 15:50:41
 * @LastEditTime: 2021-06-27 22:45:09
 * @FilePath: /my-blog/src/components/adminPage/kanriPage/addPage.vue
-->
<template>
  <div class="add-page">
    <div class="content-sec">
      <div class="input-box">
        <span>标题</span>
        <div class="title-box">
          <el-input class="input-magin" v-model="contentObj.title" placeholder="请输入标题"></el-input>

          <el-switch v-model="contentObj.isTop" active-text="置顶文章" inactive-text="取消置顶"></el-switch>
        </div>
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
        :autosize="{ minRows: 7, maxRows: 7}"
        placeholder="请输入简介"
        v-model="contentObj.content">
      </el-input>

      <div class="up-img-box">
      <el-upload
        class="upload-demo"
        drag
        :action="`${API}api/upload/uploadFile`"
        :on-success="mdAdd"
        name="file"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip">
            上传markdown文件
          </div>
        </template>
      </el-upload>
    </div>
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
import { getCurrentInstance, reactive, toRefs } from 'vue'

export default {
  setup () {
    const { ctx }:any = getCurrentInstance()
    const API = ctx.$API

    const state = reactive({
      contentObj: {
        // 文章标题
        title: '',
        // 作者
        sakusya: 'skuZxy',
        // 标签分类
        tag: '',
        // 文章内容
        content: '',
        // 是否置顶
        isTop: false
      },
      // markdown转换预览
      mdcontent: '',
      mdAdd: ((res:any) => {
        console.log(state.contentObj.isTop)
        let { url } = res
      })
    })

    return {
      ...toRefs(state),
      API
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

.up-img-box {
  margin-top: 20px;
}

.title-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>
