# 实现Promise的串行

```js
async function serial(...args) {
  return args.reduce((task, now) => task.then(res => now), Promise.resolve())
}
```

```js
serial(promise1, promise2, ...)
```