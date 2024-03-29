# HTTP 状态码

## 状态码分类

| 分类 | 描述                                           |
| ---- | ---------------------------------------------- |
| 1xx  | 信息，服务器收到请求，需要请求者继续执行操作   |
| 2xx  | 成功，操作被成功接收并处理                     |
| 3xx  | 重定向，需要进一步的操作以完成请求             |
| 4xx  | 客户端错误，请求包含语法错误或无法完成请求     |
| 5xx  | 服务器错误，服务器在处理请求的过程中发生了错误 |

## 状态码列表

| 状态码 | 描述                                                                                                                                |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| 100    | 继续。客户端应继续其请求, 一般出现在预检请求（复杂请求）                                                                            |
| 101    | 切换协议。服务器根据客户端的请求切换协议。只能切换到更高级的协议，例如，切换到 HTTP 的新版本协议                                    |
|        |                                                                                                                                     |
| 200    | 请求成功。一般用于 GET 与 POST 请求                                                                                                 |
| 201    | 已创建。成功请求并创建了新的资源                                                                                                    |
| 202    | 已接受。已经接受请求，但未处理完成                                                                                                  |
| 203    | 非授权信息。请求成功。但返回的 meta 信息不在原始的服务器，而是一个副本                                                              |
| 204    | 无内容。服务器成功处理，但未返回内容。在未更新网页的情况下，可确保浏览器继续显示当前文档                                            |
| 205    | 重置内容。服务器处理成功，用户终端（例如：浏览器）应重置文档视图。可通过此返回码清除浏览器的表单域                                  |
| 206    | 部分内容。服务器成功处理了部分 GET 请求                                                                                             |
|        |                                                                                                                                     |
| 300    | 多种选择。请求的资源可包括多个位置，相应可返回一个资源特征与地址的列表用于用户终端（例如：浏览器）选择                              |
| 301    | 永久移动。请求的资源已被永久的移动到新 URI，返回信息会包括新的 URI，浏览器会自动定向到新 URI。今后任何新的请求都应使用新的 URI 代替 |
| 302    | 临时移动。与 301 类似。但资源只是临时被移动。客户端应继续使用原有 URI                                                               |
| 303    | 查看其它地址。与 301 类似。使用 GET 和 POST 请求查看                                                                                |
| 304    | 协商缓存                                                                                                                            |
| 305    | 使用代理。所请求的资源必须通过代理访问                                                                                              |
| 307    | 临时重定向。与 302 类似。使用 GET 请求重定向                                                                                        |
|        |                                                                                                                                     |
| 400    | 客户端请求的语法错误，服务器无法理解                                                                                                |
| 401    | 请求要求用户的身份认证                                                                                                              |
| 403    | 服务器理解请求客户端的请求，但是拒绝执行此请求                                                                                      |
| 404    | 服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面                        |
| 405    | 客户端请求中的方法被禁止                                                                                                            |
|        |                                                                                                                                     |
| 500    | 服务器内部错误，无法完成请求                                                                                                        |
| 501    | 服务器不支持请求的功能，无法完成请求                                                                                                |
| 502    | 作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应                                                      |
| 503    | 由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的 Retry-After 头信息中                               |
| 504    | 充当网关或代理的服务器，未及时从远端服务器获取请求                                                                                  |
| 505    | 服务器不支持请求的 HTTP 协议的版本，无法完成处理                                                                                    |

## 特殊的状态码

### 100

[预检请求](../network/预检请求)

### 300
