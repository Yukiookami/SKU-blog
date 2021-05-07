import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import installElementPlus from './plugins/element'

const app = createApp(App)
installElementPlus(app)
app.use(store).use(router).mount('#app')

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  next()
})
