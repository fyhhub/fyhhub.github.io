# webpack配置技巧

### 1. 不压缩混淆代码

```js
optimization: {
  minimize: false
},
```

### 2. 单独抽离运行时代码
```js
optimization: {
  runtimeChunk: true
},
```