<!--
 * @Author: zxy
 * @Date: 2021-06-06 14:23:44
 * @LastEditTime: 2021-06-26 14:58:34
 * @FilePath: /my-blog/src/components/adminPage/sidebar.vue
-->
<template>
  <aside class="sidebar-sec">
    <el-col class="sidebar-main">
      <el-menu router
        default-active="2">
        <el-submenu index="1">
          <template #title>
            <i class="el-icon-collection"></i>
            <span>文章管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="add">文章增/改</el-menu-item>
            <el-menu-item index="kanri">文章删/查</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="appKanri">
          <i class="el-icon-star-off"></i>
          <template #title>应用管理</template>
        </el-menu-item>
        <el-menu-item index="homePageKanri">
          <i class="el-icon-picture-outline-round"></i>
          <template #title>首页图片</template>
        </el-menu-item>
        <el-menu-item index="UserKanri">
          <i class="el-icon-user"></i>
          <template #title>用户管理</template>
        </el-menu-item>
        <el-menu-item index="imgUpLoad">
          <i class="el-icon-upload"></i>
          <template #title>图片上传</template>
        </el-menu-item>
      </el-menu>
    </el-col>
  </aside>
</template>

<script lang="ts">
import { computed, getCurrentInstance, reactive, toRefs } from 'vue'
import store from '../../store'
import { useRoute } from 'vue-router'

export default {
  setup () {
    const { ctx }:any = getCurrentInstance()
    const route = useRoute()

    const state = reactive({
      // 侧边栏导航列表
      navList: computed(() => {
        return store.state.adminList
      }),
      /**
       * 获取当前页面路由
       */
      pageTag: computed(() => {
        const pageName:string = ctx.$router.currentRoute.value.path

        let page = store.state.meunList.find(ele => ele.router === pageName)
        return page?.pageTitle
      })
    })

    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-sec {

  .sidebar-main {
    height: 100%;
    width: 100%;

    ul {
      position: fixed;
      left: 0;
      padding-top: 80px;
      height: 100%;
      width: 15%;
      z-index: 1;
    }
  }
}
</style>
