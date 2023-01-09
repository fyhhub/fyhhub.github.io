# 实现ajax请求

## 1. 创建 Ajax 核心对象 XMLHttpRequest

```js
const xhr = new XMLHttpRequest();
```

## 2. 向服务器发送请求

```js
xhr.open(method, url, true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.send('{ "a": 1 }'); // post请求才带参数
```

## 3. 监听响应状态

```js
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const text = xhr.responseText; // 获取响应内容
  }
};
```

readyState 是 XMLHttpRequest 对象的一个属性，用来标识当前 XMLHttpRequest 对象处于什么状态。
readyState 总共有 5 个状态值，分别为 0~4，每个值代表了不同的含义

- 0：未初始化 -- 尚未调用.open()方法；
- 1：启动 -- 已经调用.open()方法，但尚未调用.send()方法；
- 2：发送 -- 已经调用.send()方法，但尚未接收到响应；
- 3：接收 -- 已经接收到部分响应数据；
- 4：完成 -- 已经接收到全部响应数据，而且已经可以在客户端使用了；
