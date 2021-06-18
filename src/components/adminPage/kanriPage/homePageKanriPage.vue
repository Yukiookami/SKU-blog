<!--
 * @Author: zxy
 * @Date: 2021-06-06 15:51:21
 * @LastEditTime: 2021-06-17 21:47:39
 * @FilePath: /my-blog/src/components/adminPage/kanriPage/homePageKanriPage.vue
-->
<template>
  <div>
    <el-table
      :data="tableData"
      height="880"
      border>
      <el-table-column
        prop="imgUrl"
        label="图片">
        <template #default="scope">
          <div class="image-box">
            <img :src="scope.row.coverUrl" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="操作"
        label="操作">
        <template #default="scope">
          <el-button @click="delCover(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="up-img-box">
      <el-upload
        class="upload-demo"
        drag
        :action="`${API}api/upload/photo`"
        :on-success="imgAdd"
        name="file"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip">
            上传首页图片
          </div>
        </template>
      </el-upload>
    </div>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue'
import { ElMessage } from 'element-plus'

export default {
  setup () {
    const { ctx }:any = getCurrentInstance()
    const API = ctx.$API

    const state = reactive({
      // 文章列表
      tableData: [],
      /**
       * @description: 上传图片
       * @param {*} res
       * @return {*}
       */
      imgAdd: (res:any):void => {
        ctx.$http.post(`${API}api/homePage/saveCover`, {
          coverUrl: res.url
        }).then((res:any) => {
          if (res.data.status) {
            ElMessage.success(`上传成功`)
            state.getAllImg()
          } else {
            ElMessage.error(res.data.err)
          }
        })
      },
      /**
       * @description: 获取所有图片
       * @param {*}
       * @return {*}
       */
      getAllImg: ():void => {
        ctx.$http.get(`${API}api/homePage/getAllCover`)
          .then((res:any) => {
            state.tableData = res.data.list
          })
      },
      /**
       * @description: 删除指定图片
       * @param {*} row
       * @return {*}
       */
      delCover: (row:any) => {
        ctx.$http.delete(`${API}api/homePage/deleteCover`, {
          data: {
            id: row._id
          }
        }).then((res:any) => {
          if (res.data.status) {
            ElMessage.success(`删除成功`)
            state.getAllImg()
          } else {
            ElMessage.error(res.data.err)
          }
        })
      }
    })

    onMounted(() => {
      state.getAllImg()
    })

    return {
      ...toRefs(state),
      API
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/adminCss/adminCommon.scss';
// 表格图片
.image-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  img {
    width: 30%;
  }
}

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
