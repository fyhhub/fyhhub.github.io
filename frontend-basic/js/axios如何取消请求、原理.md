# axios 如何取消请求、原理

本质上 axios 是对 XMLHttpRequest 的封装，取消请求时，使用 XMLHttpRequest 实例的 abort() 方法即可取消请求。
