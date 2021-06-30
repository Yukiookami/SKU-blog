/*
 * @Author: zxy
 * @Date: 2021-04-18 00:18:58
 * @LastEditTime: 2021-06-30 13:10:47
 * @FilePath: /my-blog/vue.config.js
 */
// vue.config.js
module.exports = {
  lintOnSave: false, // 关闭eslint检查
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 50000 }))
  }
}
