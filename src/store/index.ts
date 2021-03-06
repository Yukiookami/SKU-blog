/*
 * @Author: zxy
 * @Date: 2021-04-18 00:15:31
 * @LastEditTime: 2021-07-14 00:57:51
 * @FilePath: /my-blog/src/store/index.ts
 */
import { createStore } from 'vuex'

export default createStore({
  state: {
    // 目录数组
    meunList: [
      {
        router: '/program',
        title: '编程基础',
        jpTitle: 'プログラミング',
        pageTitle: 'Programming Basics',
        icon: 'el-icon-cpu'
      },
      {
        router: '/japanese',
        title: '日语学习',
        jpTitle: '日本語の勉強',
        pageTitle: 'Japanese learning',
        icon: 'el-icon-tableware'
      },
      {
        router: '/component',
        title: '组件实现',
        jpTitle: 'コンポーネント',
        pageTitle: 'Component Implementation',
        icon: 'el-icon-bangzhu'
      },
      {
        router: '/application',
        title: '个人应用',
        jpTitle: '面白いアプリ',
        pageTitle: 'Personal application',
        icon: 'el-icon-star-off'
      }
    ],
    // 管理端数组
    adminList: [
      {
        router: '/add',
        title: '文章增/修'
      },
      {
        router: '/kanri',
        title: '文章删/查'
      },
      {
        router: '/appKanri',
        title: 'app管理'
      },
      {
        router: '/homePageKanri',
        title: '首页图片管理'
      },
      {
        router: '/UserKanri',
        title: '用户管理'
      }
    ],
    // 当前语言
    // 0中文 1日语
    langFlag: 0 as number,
    // 当前系统是否为PC
    nowOs: false
  },
  mutations: {
    setLangFlag: (state, lang) => {
      state.langFlag = +lang
    },
    setNowOs: (state, os) => {
      state.nowOs = os
    }
  },
  actions: {
  },
  modules: {
  }
})
