# npm设置代理

```js
// 设置代理
npm config set proxy http://127.0.0.1:7890
npm config set https-proxy http://127.0.0.1:7890

// 取消代理
npm config delete proxy
npm config delete https-proxy
```