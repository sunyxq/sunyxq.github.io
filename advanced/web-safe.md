# Web安全

## XSS
`XSS`跨站脚本攻击
利用浏览器的信任服务器返回的数据或用户输入的可执行代码，获取敏感信息或用户信息(`Cookie`)，达到攻击的目的
**防护策略**
- httpOnly
- csp:内容安全策略
csp：[内容安全策略(`Content-Secure-Policy`)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)是一个额外的安全层，用于检测并削弱某些特定类型的攻击，如跨站脚本攻击(`XSS`)和数据注入攻击。
- 转义输入内容

## XSRF
`XSRF`跨站请求伪造
利用`http`请求会自动带上`cookie`的特性,在攻击者网站向目标网站发起恶意请求，达到攻击的目的
- token
- Referer/origin设置白名单
- sameSite,存在兼容性问题

## 中间人攻击

## 点击劫持

## 参考
1. [面试：彻底理解Cookie以及Cookie安全](https://juejin.im/post/5e7af557f265da572a0d2443)
2. [csrf_token](https://www.jianshu.com/p/ef700efe18f6)