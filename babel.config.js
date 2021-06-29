/*
 * @Author: zxy
 * @Date: 2021-04-18 00:15:31
 * @LastEditTime: 2021-06-29 16:32:36
 * @FilePath: /my-blog/babel.config.js
 */
const components = require('prismjs/components');
const allLanguages = Object.keys(components.languages).filter((item) => item !== 'meta');

module.exports = {
  // markdown引入语言高亮
  plugins: [
    [
      'prismjs',
      {
        languages: allLanguages,
      },
    ],
  ],
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
