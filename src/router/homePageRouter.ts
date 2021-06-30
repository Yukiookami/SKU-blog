/*
 * @Author: zxy
 * @Date: 2021-06-26 15:01:05
 * @LastEditTime: 2021-06-30 22:10:40
 * @FilePath: /my-blog/src/router/homePageRouter.ts
 */
import Home from '../views/Home.vue'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'welcome to SKU blog'
    }
  },
  {
    path: '/program',
    name: 'program',
    component: () => import('../views/contentPage.vue'),
    meta: {
      title: '编程基础'
    }
  },
  {
    path: '/japanese',
    name: 'japanese',
    component: () => import('../views/contentPage.vue'),
    meta: {
      title: '日语学习'
    }
  },
  {
    path: '/component',
    name: 'component',
    component: () => import('../views/contentPage.vue'),
    meta: {
      title: '组件应用'
    }
  },
  {
    path: '/application',
    name: 'application',
    component: () => import('../views/application.vue'),
    meta: {
      title: '个人应用'
    }
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('../views/senPage.vue'),
    meta: {
      title: '文章页面'
    }
  },
  {
    path: '/class',
    name: 'class',
    component: () => import('../views/classPage.vue'),
    meta: {
      title: '分类'
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/searchPage.vue'),
    meta: {
      title: '搜索'
    }
  }
]
