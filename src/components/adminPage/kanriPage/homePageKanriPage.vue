<!--
 * @Author: zxy
 * @Date: 2021-06-06 15:51:21
 * @LastEditTime: 2021-06-15 21:14:20
 * @FilePath: /my-blog/src/components/adminPage/kanriPage/homePageKanriPage.vue
-->
<template>
  <div>
    <el-table
      :data="tableData"
      height="430"
      border>
      <el-table-column
        prop="imgUrl"
        label="图片">
      </el-table-column>
      <el-table-column
        prop="操作"
        label="操作">
        <template #default="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="up-img-box">
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip">
            上传首页图片
          </div>
        </template>
      </el-upload>

      <div class="up-button">
        <el-button type="primary" @click="imgAdd" round>新增</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue'

export default {
  setup () {
    const state = reactive({
      // 文章列表
      tableData: [
        {
          imgUrl: ''
        }
      ],
      // 搜索关键字
      keyword: '',
      /**
       * @description: 模糊搜索
       * @param {striing} keyword
       * @return {array}
       */
      search: (keyword:string) => {

      },
      /**
       * @description: 上传图片
       * @param {*}
       * @return {*}
       */
      imgAdd: ():void => {

      }
    })

    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/adminCss/adminCommon.scss';
// 上传文件
.up-img-box {
  margin-top: 40px;
  display: flex;
  align-items: center;
  width: 100%;

  // 上传按钮
  .up-button {
    margin-left: 40px;
  }
}
</style>
