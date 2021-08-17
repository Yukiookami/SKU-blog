/*
 * @Author: zxy
 * @Date: 2021-04-18 00:15:31
 * @LastEditTime: 2021-08-17 13:21:06
 * @FilePath: /my-blog/src/router/index.ts
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import adminRouter from './adminRouter'
import homePageRouter from './homePageRouter'
import cssUIRouter from './cssUIRouter'

let routes: Array<RouteRecordRaw> = []

routes = routes.concat(homePageRouter, adminRouter, cssUIRouter)

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
