import router from "../../router"

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
const goToPage = ((routerUrl:string, id:number | string) => {
  router.push({
    path: `/${routerUrl}`,
    query: {
      id: id
    }
  })
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

export {
  handleScroll,
  goToPage,
  getRan
}
