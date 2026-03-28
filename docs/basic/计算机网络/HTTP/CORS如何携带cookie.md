# CORS 如何携带 cookie

1. 后端响应头携带以下字段

```
Access-Control-Allow-Credentials: true
```

2. 前端设置

```js
xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.open("GET", url);
xhr.send();
```
