/*
 * @Author: zxy
 * @Date: 2021-04-18 00:15:31
 * @LastEditTime: 2021-06-16 14:48:39
 * @FilePath: /my-blog/src/main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { VueCookieNext } from 'vue-cookie-next'
import API from './assets/ts/API'
// css resets
import 'normalize.css'
import installElementPlus from './plugins/element'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const app = createApp(App)
installElementPlus(app)
app.use(VueCookieNext)
app.use(store).use(router).mount('#app')

app.config.globalProperties.$http = axios
app.config.globalProperties.$cookie = VueCookieNext
app.config.globalProperties.$API = API

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title as string

    // 判断是否需要登录
    if(to.meta.requiresAuth) {
      // 判断是否有cookie
      if(VueCookieNext.getCookie("login_cookies")) {
        next()
      } else {
        next({
          path: '/program'
        })
      }
    } else {
      next()
    }
  }

  //页面加载进度条
  NProgress.start();
})

router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
})

NProgress.configure({
  easing: 'ease',  // 动画方式
  speed: 500,  // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})
