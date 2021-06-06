import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
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
    path: '/nihongo',
    name: 'nihongo',
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
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/adminPage/adminHome.vue'),
    meta: {
      title: '用户管理',
      requiresAuth: true
    },
    children: [
      {
        path: '/testPage',
        name: 'test',
        component: () => import('../views/adminPage/testPage.vue'),
        meta: {
          title: '文章增/修',
          requiresAuth: true
        }
      },
      {
        path: '/add',
        name: 'add',
        component: () => import('../components/adminPage/kanriPage/addPage.vue'),
        meta: {
          title: '文章增/修',
          requiresAuth: true
        }
      },
      {
        path: '/kanri',
        name: 'kanri',
        component: () => import('../components/adminPage/kanriPage/artKanriPage.vue'),
        meta: {
          title: '文章管理',
          requiresAuth: true
        }
      },
      {
        path: '/appKanri',
        name: 'appKanri',
        component: () => import('../components/adminPage/kanriPage/appKanriPage.vue'),
        meta: {
          title: 'app管理',
          requiresAuth: true
        }
      },
      {
        path: '/homePageKanri',
        name: 'homePageKanri',
        component: () => import('../components/adminPage/kanriPage/homePageKanriPage.vue'),
        meta: {
          title: '首页图片管理',
          requiresAuth: true
        }
      },
      {
        path: '/UserKanri',
        name: 'UserKanri',
        component: () => import('../components/adminPage/kanriPage/userSetPage.vue'),
        meta: {
          title: '用户管理',
          requiresAuth: true
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
