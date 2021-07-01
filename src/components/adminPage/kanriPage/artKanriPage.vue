<!--
 * @Author: zxy
 * @Date: 2021-06-06 15:51:21
 * @LastEditTime: 2021-07-01 20:06:51
 * @FilePath: /my-blog/src/components/adminPage/kanriPage/artKanriPage.vue
-->
<template>
  <div>
    <div class="sel-box">
      <el-radio-group v-model="nowContentType" @change="getData(nowContentType)">
        <el-radio-button label="program">编程</el-radio-button>
        <el-radio-button label="japanese">日语</el-radio-button>
        <el-radio-button label="component">组件</el-radio-button>
      </el-radio-group>

      <el-radio-group v-model="nowLange" @change="changeLange()">
        <el-radio-button label="chinese">中文</el-radio-button>
        <el-radio-button label="japanese">日本語</el-radio-button>
      </el-radio-group>
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
      height="100vh"
      border>

      <el-table-column type="expand">
        <template #default="props">
          <el-form label-position="left" inline class="table-content">
            <el-form-item label="文章内容">
              <v-md-preview :text="props.row.markdownContent"></v-md-preview>
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
        prop="date"
        label="发布时间">
      </el-table-column>
      <el-table-column
        prop="tag"
        label="tag">
      </el-table-column>
      <el-table-column
        prop="typeClass"
        label="文章类型">
      </el-table-column>
      <el-table-column
        prop="操作"
        label="操作">
        <template #default="scope">
          <el-button @click="sureDel(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="putContent(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue'
import { timeChange } from '../../../assets/ts/common'
import { ElMessage, ElMessageBox } from 'element-plus'
import { goToPage } from '../../../assets/ts/common'
import router from '@/router'

export default {
  setup () {
    const { proxy }:any = getCurrentInstance()
    const API = proxy.$API

    const state = reactive({
      // 当前文章类型
      nowContentType: 'program',
      // 当前语言
      nowLange: 'chinese',
      // 文章列表
      tableData: [],
      // 搜索关键字
      keyword: '',
      // 请求得到的结果数组
      resList: [],
      /**
       * @description: 模糊搜索
       * @param {striing} keyword
       * @return {array}
       */
      search: (keyword:string) => {

      },
      /**
       * @description: 获取当前类型文章列表
       * @param {string} nowContentType
       * @return {*}
       */
      getData: (nowContentType:string) => {
        proxy.$http.get(`${API}api/content/getAllContent?contentType=${nowContentType}`)
          .then((res:any) => {
            state.resList = res.data.list

            state.tableData = state.setTableData(state.resList)
          })
      },
      /**
       * @description: 改变当前语言
       * @param {string} nowLange
       * @return {*}
       */
      changeLange: (nowLange:string) => {
        state.tableData = state.setTableData(state.resList)
      },
      /**
       * @description: 设置表格数据
       * @param {*}
       * @return {*}
       */
      setTableData: (arr:any) => {
        let nowTableData:any = []

        arr.forEach((ele:any) => {
          let { cnContentInfo, jaContentInfo } = ele

          if (state.nowLange === 'chinese') {
            cnContentInfo.date = timeChange(cnContentInfo.date)
            cnContentInfo.id = ele._id
            nowTableData.push(cnContentInfo)
          } else {
            jaContentInfo.date = timeChange(jaContentInfo.date)
            jaContentInfo.id = ele._id
            nowTableData.push(jaContentInfo)
          }
        });

        return nowTableData
      },
      /**
       * @description: 确认是否删除文件
       * @param {*} row
       * @return {*}
       */
      sureDel: (row:any) => {
        ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          state.delContent(row)
        }).catch(() => {
          ElMessage.warning('操作已取消')
        });
      },
      /**
       * @description: 删除文章
       * @param {*} row
       * @return {*}
       */
      delContent: (row:any) => {
        proxy.$http.delete(`${API}api/content/deleteContent`, {
          data: {
            id: row.id,
            contentType: state.nowContentType
          }
        }).then((res:any) => {
          if (res.status) {
            state.getData(state.nowContentType)
            ElMessage.success('删除成功')
          } else {
            ElMessage.error('删除失败')
          }
        })
      },
      /**
       * @description: 修改指定文章
       * @param {*}
       * @return {*}
       */
      putContent: (row:any) => {
        goToPage('add', row.id, row.contentType)
      }
    })

    onMounted(() => {
      state.getData('program')
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
  margin: 10px 0;
}

.sel-box {
  display: flex;
  justify-content: space-between;
}
</style>
