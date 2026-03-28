# JS 异常监控

## 监听 error

```js
window.addEventListener("error", function (e) {
  reportError(e);
});
```

可以看到函数正常是可以收集到错误字符串信息、发生错误的 js 文件，错误所在的行数、列数、和 Error 对象（里面会有调用堆栈信息等）

需要注意的是，如果有如下两个脚本，其中`a`脚本监听`onerror`事件，`b`脚本抛出了异常，是无法捕获到的

```html
<!-- index.html  -->
<script type="text/javascript" src="http://a.com/a.js"></script>
<script type="text/javascript" src="http://b.com/b.js"></script>
```

会出现这样的情况：

![image.png](http://tva1.sinaimg.cn/large/006vSZ9Ugy1gx66l66js3j310u058whr.jpg)

此时我们需要给`b`脚本 script 标签加上`crossorigin`属性

```html
<!-- index.html  -->
<script type="text/javascript" src="http://a.com/a.js"></script>
<script type="text/javascript" src="http://b.com/b.js" crossorigin></script>
```

**注意：需要后端配合设置该文件的`Access-Control-Allow-Origin: *`**

## 捕获未处理的 promise 异常

### 1. unhandledrejection

监听 unhandledrejection 事件，即可捕获到未处理的 Promise 错误：

```js
window.addEventListener("unhandledrejection", (e) => {
  reportError(e);
});
```

### 2. rejectionhandled

当一个 Promise 错误最初未被处理，但是稍后又得到了处理

```js
function fn() {
  return Promise.reject("Unhandle Promise Error!");
}
var r = foo();
setTimeout(() => {
  r.catch((e) => {});
}, 1000);
```

会触发 rejectionhandled 事件：

```js
window.addEventListener("rejectionhandled", (e) => {
  reportError(e);
});
```

## 捕获 Vue 中的错误

[Vue ErrorHandler](https://cn.vuejs.org/v2/api/#errorHandler)

### 1. 全局捕获

```js
Vue.config.errorHandler = function (e, vm, info) {
  reportError(e);
};
```

### 组件内捕获

```js
export default {
  mounted() {},
  data() {
    return {};
  },
  errorCaptured(e: Error, vm: Component, info: string) {
    reportError(e);
  },
};
```

**错误传播规则**

- 默认情况下，如果全局的 `config.errorHandler` 被定义，所有的错误仍会发送它，因此这些错误仍然会向单一的分析服务的地方进行汇报。

- 如果一个组件的 inheritance chain (继承链)或 parent chain (父链)中存在多个 `errorCaptured` 钩子，则它们将会被相同的错误逐个唤起。

- 如果此 `errorCaptured` 钩子自身抛出了一个错误，则这个新错误和原本被捕获的错误都会发送给全局的 `config.errorHandler`。

- 一个 `errorCaptured` 钩子能够返回 `false` 以阻止错误继续向上传播。本质上是说“这个错误已经被搞定了且应该被忽略”。它会阻止其它任何会被这个错误唤起的 `errorCaptured` 钩子和全局的 `config.errorHandler`。
