/*
 * @Author: zxy
 * @Date: 2021-06-06 15:19:36
 * @LastEditTime: 2021-06-28 17:57:22
 * @FilePath: /my-blog/src/assets/ts/base64.ts
 */
const Base64 = {
  //加密
  encode(str: string): string {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode(+('0x' + p1))
      }))
  },
  //解密
  decode(str: string): string {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }
}
export default Base64
