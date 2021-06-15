<!--
 * @Author: zxy
 * @Date: 2021-06-06 15:51:21
 * @LastEditTime: 2021-06-15 19:57:54
 * @FilePath: /my-blog/src/components/adminPage/kanriPage/artKanriPage.vue
-->
<template>
  <div>
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
      height="630"
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
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="sakusya"
        label="作者">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="发布时间">
      </el-table-column>
      <el-table-column
        prop="tag"
        label="tag">
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
          title: "test",
          sakusya: "zxy",
          createTime: "2021-6-15",
          content: "1111111111111111111111111111111111111111111111111111",
          tag: "vue3"
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
// 搜索框
.search-input {
  margin-bottom: 10px;
}
</style>
