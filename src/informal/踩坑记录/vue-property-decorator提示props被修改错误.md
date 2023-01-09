# vue-property-decorator 提示 props 被修改错误

## 问题

@Prop 使用正确，使用 default 指定的默认值，但是还是报错误

```js
[Vue warn]: Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders.
```

## 解决方案

tsconfig.json 增加以下参数

`useDefineForClassFields` 是 `TypeScript 3.7.0` 中新增的一个编译选项，启用后的作用是将 class 声明中的字段语义从 [[Set]] 变更到 [[Define]]。

[issues 地址](https://github.com/kaorun343/vue-property-decorator/issues/393)

[useDefineForClassFields](https://zhuanlan.zhihu.com/p/258906525)

```json
{
  "compilerOptions": {
    "useDefineForClassFields": false
  }
}
```
