# TreeShaking

1. 尽量使用export {} 导出代码

使用这样的写法，webpack才能做tree-shaking
```js
export {
  xxx
}
```

2. 不要使用babel将esm转为cjs

若代码是`commonjs`代码，将失去tree-shaking优化，需要设置`baberc`配置中的`modules: false`

3. lib库酌情使用 sideEffects

通过设置`package.json`中的`sideEffects`字段，可以告诉webpack哪些是纯的（无副作用）

4. 使用 unplugin-vue-components 或 babel-plugin-import 按需引入组件


5. 可以使用 /*#__PURE__ */ 标记哪些函数调用没有副作用，进而tree-shaking

6. 异步模块标记哪些导出被使用
```js
import(/* webpackExports: ["foo", "default"] */ "./foo").then((module) => {
  console.log(module.foo);
});
```
