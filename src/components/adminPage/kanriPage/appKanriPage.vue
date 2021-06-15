<!--
 * @Author: zxy
 * @Date: 2021-06-06 15:51:21
 * @LastEditTime: 2021-06-15 20:43:56
 * @FilePath: /my-blog/src/components/adminPage/kanriPage/appKanriPage.vue
-->
<template>
  <div>
    <div class="add-app-sec">
      <div class="text-info-sec">
        <div class="input-box">
          <span>名称</span>
          <el-input class="input-magin" v-model="appObj.name" placeholder="请输入名称"></el-input>
        </div>

        <div class="input-box">
          <span>链接</span>
          <el-input class="input-magin" v-model="appObj.appUrl" placeholder="请输入链接"></el-input>
        </div>

        <div class="input-box">
          <span>平台</span>
          <el-input class="input-magin" v-model="appObj.tag" placeholder="请输入平台"></el-input>
        </div>
      </div>

      <div class="upload-box">
        <!-- icon上传 -->
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <!-- 安装包上传 -->
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <template #tip>
            <div class="el-upload__tip">如果为非web平台项目请上传安装包</div>
          </template>
        </el-upload>
      </div>

      <!-- 提交 -->
      <div class="up-button">
        <el-button type="primary" @click="addApp" round>新增</el-button>
      </div>
    </div>

    <el-input
      placeholder="请输入内容"
      v-model="keyword"
      class="search-input"
      @keyup="search(keyword)">

      <template #append>
        <el-button icon="el-icon-search"></el-button>
      </template>

    </el-input>

    <el-table
      :data="tableData"
      height="330"
      border>

      <el-table-column type="expand">
        <template #default="props">
          <el-form label-position="left" inline class="table-content">
            <el-form-item label="文章内容">
              <span>{{ props.row.content }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="appUrl"
        label="url">
      </el-table-column>
      <el-table-column
        prop="package"
        label="安装包">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="发布时间">
      </el-table-column>
      <el-table-column
        prop="platform"
        label="平台">
      </el-table-column>
      <el-table-column
        prop="icon"
        label="图标">
      </el-table-column>
      <el-table-column
        prop="操作"
        label="操作">
        <template #default="scope">
          <el-button @click="search(scope.row)" type="text" size="small">删除</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
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
          name: "test",
          appUrl: "zxy",
          createTime: "2021-6-15",
          package: '',
          platform: "macOS",
          icon: ''
        }
      ],
      // 添加app
      appObj: {
        // 名称
        name: '',
        // 链接
        appUrl: '',
        // 平台
        platform: '',
        // 图标
        icon: ''
      },
      // 搜索关键字
      keyword: '',
      /**
       * @description: 模糊搜索
       * @param {striing} keyword
       * @return {array}
       */
      search: (keyword:string) => {

      },
      // 文件列表
      fileList: [],
      // icon地址
      iconUrl: '',
      /**
       * @description: 图片上传成功
       * @param {*} res
       * @param {*} file
       * @return {*}
       */
      handleAvatarSuccess(res:any, file:any) {
        state.iconUrl = URL.createObjectURL(file.raw);
      },
      /**
       * @description: 新增app
       * @param {*}
       * @return {*}
       */
      addApp: ():void => {

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
// 添加应用
.add-app-sec {
  padding-bottom: 40px;
  margin-bottom: 40px;
  border-bottom: 1px dashed #ccc;

  // 添加文字信息
  .text-info-sec {
    display: flex;
    width: 100%;

    .input-box {
      width: calc(100% / 3);

      .input-magin {
        width: 80%;
      }
    }
  }

  // 上传区域
  .upload-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 50%;

    .avatar-uploader {
      font-size: 20px;
      color: #8c939d;
      width: 78px;
      height: 78px;
      line-height: 78px;
      text-align: center;
      border: 1px dashed #ccc;
    }
  }

  // 提交
  .up-button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 40px;
    width: calc(100% - 40px);
  }
}


// 搜索框
.search-input {
  margin-bottom: 10px;
}
</style>
