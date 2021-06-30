/*
 * @Author: zxy
 * @Date: 2021-04-25 17:45:52
 * @LastEditTime: 2021-06-30 20:43:10
 * @FilePath: /my-blog/src/assets/ts/common.ts
 */
import router from "../../router"
import Base64 from './base64'
import { VueCookieNext } from 'vue-cookie-next'
import jwt_decode from "jwt-decode";

// 判断上滑还是下滑
let checkScroll = 0
/**
 * 判断页面滚动方向
 */
const handleScroll = ():number => {
  let scrollTop:number = document.documentElement.scrollTop
  let scroll:number = scrollTop - checkScroll
  checkScroll = scrollTop

  if (scroll < 0) {
    return 1
  } else {
    return 0
  }
}

/**
 * 跳转到文章页面，点击时触发
 *
 * @event
 * @param {string} routerUrl
 * @param {number} id
 */
const goToPage = ((routerUrl:string, id?:string, type?:string) => {
  if (id) {
    router.push({
      path: `/${routerUrl}`,
      query: {
        id: Base64.encode(id!),
        type: Base64.encode(type!)
      }
    })
  } else {
    router.push({
      path: `/${routerUrl}`
    })
  }
})

/**
 * 获取随机数
 *
 * @param {number} min
 * @param {number} max
 *
 * @returns {number}
 */
const getRan = (min:number, max:number):number => {
  return Math.round(Math.random() * (max - min) + min)
}

/**
 * @description: 登出
 * @param {string} keyName
 * @return {*}
 */
const loginOut = (keyName:string):void => {
  VueCookieNext.removeCookie(keyName)

  goToPage('program')
}

/**
 * @description: 进入时看有没有头像，如果有直接换上
 * @param {*}
 * @return {sting}
 */
const getIcon = ():string => {
  let token = VueCookieNext.getCookie("login_SKU_cookies")

  if (token) {
    const decoded:any = jwt_decode(token)

    return decoded.avatar
  } else {
    return ''
  }
}

/**
 * @description: 节流
 * @param {function} fn
 * @param {numebr} gapTime
 * @return {function}
 */
const throttle = (fn:any, gapTime:number):any => {
  let _lastTime:any = null;

  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn();
      _lastTime = _nowTime
    }
  }
}

/**
 * @description: 处理服务器时间戳
 * @param {string} time
 * @return {string}
 */
const timeChange = (time:string):string => {
  let date = time.slice(0, 10)

  return date
}

export {
  handleScroll,
  goToPage,
  getRan,
  loginOut,
  getIcon,
  throttle,
  timeChange
}
