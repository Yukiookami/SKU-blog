<!--
 * @Author: zxy
 * @Date: 2021-06-06 15:52:03
 * @LastEditTime: 2021-06-15 21:25:45
 * @FilePath: /my-blog/src/components/adminPage/kanriPage/userSetPage.vue
-->
<template>
  <div class="add-page">
    <div class="content-sec">
      <div class="input-box">
        <span>用户名</span>
        <el-input class="input-magin" v-model="changeUserObj.username" placeholder="请输入用户名"></el-input>
      </div>

      <div class="input-box">
        <span>原密码</span>
        <el-input class="input-magin" v-model="changeUserObj.password" placeholder="请输入原密码"></el-input>
      </div>

      <div class="input-box">
        <span>邮箱</span>
        <el-input class="input-magin" v-model="changeUserObj.email" placeholder="请输入邮箱"></el-input>
      </div>

      <div class="input-box">
        <span>新密码</span>
        <el-input class="input-magin" v-model="changeUserObj.nPassword" placeholder="请输入新密码"></el-input>
      </div>

      <div class="input-box">
        <span>确认新密码</span>
        <el-input class="input-magin" v-model="changeUserObj.aNPassword" placeholder="请再输入新密码"></el-input>
      </div>

      <el-button type="primary" @click="changeUser(changeUserObj)" round>修改</el-button>
    </div>

    <div class="md-sec">
      <div class="input-box">
        <span>用户名</span>
        <el-input class="input-magin" v-model="userObj.username" placeholder="请输入用户名"></el-input>
      </div>

      <div class="input-box">
        <span>原密码</span>
        <el-input class="input-magin" v-model="userObj.password" placeholder="请输入原密码"></el-input>
      </div>

      <div class="input-box">
        <span>邮箱</span>
        <el-input class="input-magin" v-model="userObj.email" placeholder="请输入邮箱"></el-input>
      </div>

      <div class="input-box">
        <span>确认新密码</span>
        <el-input class="input-magin" v-model="userObj.aPassword" placeholder="请再输入新密码"></el-input>
      </div>

      <el-button type="primary" @click="addUser(userObj)" round>新增</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue'

export default {
  setup () {
    const state = reactive({
      changeUserObj: {
        // 用户名
        username: '',
        // 原密码
        password: '',
        // 邮箱
        email: '',
        // 新密码
        nPassword: '',
        // 确认新密码
        aNPassword: ''
      },
      userObj: {
        // 用户名
        username: '',
        // 密码
        password: '',
        // 邮箱
        email: '',
        // 确认密码
        aPassword: ''
      },
      /**
       * @description: 修改用户
       * @param {object} changeUserObj
       * @return {*}
       */
      changeUser: (changeUserObj: object):void => {

      },
      /**
       * @description: 新增用户
       * @param {*}
       * @return {*}
       */
      addUser: (addUserObj: object):void => {

      },
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
