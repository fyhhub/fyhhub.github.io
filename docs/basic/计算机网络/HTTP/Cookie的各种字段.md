# Cookie 的各种字段

后端通过响应头`set-cookie`返回 cookie, 前端请求时携带 cookie 请求头字段

`set-cookie`长这样

```
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
```

有以下属性

- **Max-Age**: 用于设置在 Cookie 失效之前需要经过的秒数
- **Domain**: Domain 指定了 Cookie 可以送达的主机名, 像淘宝首页设置的 Domain 就是 .taobao.com，这样无论是 a.taobao.com 还是 b.taobao.com 都可以使用 Cookie。
- **Path**: Path 指定了一个 URL 路径，这个路径必须出现在要请求的资源的路径中才可以发送 Cookie 首部。比如设置 Path=/docs，/docs/Web/ 下的资源会带 Cookie 首部，/test 则不会携带 Cookie 首部。
- **Secure**: 标记为 Secure 的 Cookie 只应通过被 HTTPS 协议加密过的请求发送给服务端。使用 HTTPS 安全协议，可以保护 Cookie 在浏览器和 Web 服务器间的传输过程中不被窃取和篡改。
- **HTTPOnly**: 设置 HTTPOnly 属性可以防止客户端脚本通过 document.cookie 等方式访问 Cookie，有助于避免 XSS 攻击。
- **SameSite**: 可以让 Cookie 在跨站请求时不会被发送，从而可以阻止跨站请求伪造攻击（CSRF）

  ```
  Strict 仅允许一方请求携带 Cookie，即浏览器将只发送相同站点请求的 Cookie，即当前网页 URL 与请求目标 URL 完全一致。
  Lax 允许部分第三方请求携带 Cookie
  None 无论是否跨站都会发送 Cookie

  之前默认是 None 的，Chrome80 后默认是 Lax。

  同站：有效顶级域名+二级域名 如果一致 就算同站
  同源：域名+协议+端口都一致 就算同源
  ```
