# Http状态码

## 2xx状态码
`2xx`表示请求成功

## 3xx状态码
- `301`, 永久重定向
- `302`, 临时重定向
- `304`, `Not Modified`, 协商缓存生效

## 4xx状态码
`4xx`表示客户端错误
- `400`, `Bad Request`, 错误(无效)的请求
- `401`, `Unauthorized`, 未授权
- `403`, `Forbidden`, 禁止请求
- `404`, `Not Found`, 请求不存在
- `405`, `Not Allowed`, 请求方法错误

## 5xx状态码
`5xx`表示服务端错误
- `500`, `Interval Server Error`, 服务器内部错误
- `502`, `Bad Gateway`, 网关错误
- `503`, `Server Unavailable`, 服务器不可用
- `504`, `Gateway Timeout`, 服务器充当网关或代理时超时无响应

## 参考
1. [HTTP状态码](https://cloud.tencent.com/developer/chapter/13553)