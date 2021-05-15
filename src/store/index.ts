import { createStore } from 'vuex'

export default createStore({
  state: {
    // 目录数组
    meunList: [
      {
        router: '/program',
        title: '编程基础',
        pageTitle: 'Programming Basics',
        icon: 'el-icon-cpu'
      },
      {
        router: '/nihongo',
        title: '日语学习',
        pageTitle: 'Japanese learning',
        icon: 'el-icon-tableware'
      },
      {
        router: '/component',
        title: '组件实现',
        pageTitle: 'Component Implementation',
        icon: 'el-icon-bangzhu'
      },
      {
        router: '/application',
        title: '个人应用',
        pageTitle: 'Personal application',
        icon: 'el-icon-star-off'
      }
    ],
    // 当前语言
    // 0中文 1日语
    langFlag: 0 as number
  },
  mutations: {
    setLangFlag: (state, lang) => {
      state.langFlag = lang
    }
  },
  actions: {
  },
  modules: {
  }
})
