/*
 * @Author: zxy
 * @Date: 2021-04-18 00:15:31
 * @LastEditTime: 2021-06-26 15:03:55
 * @FilePath: /my-blog/src/router/index.ts
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import adminRouter from './adminRouter'
import homePageRouter from './homePageRouter'

let routes: Array<RouteRecordRaw> = []

routes = routes.concat(homePageRouter, adminRouter)

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
