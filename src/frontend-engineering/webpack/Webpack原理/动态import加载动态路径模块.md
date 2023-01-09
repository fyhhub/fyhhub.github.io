# 动态import加载动态路径模块

对于这样一段代码：

```js {4}
const list = ['a', 'b', 'c']

list.forEach(item => {
  import(`./dynamic/${item}.js`).then(res => {
    console.log('%c 🍩 res: ', 'font-size:20px;background-color: #7F2B82;color:#fff;', res);
  })
})
```

我们发现在动态import中，我们拼接了动态的字符串, 那么webpack怎么知道要打包这些文件的呢？

其实webpack会把`${item}`替换成`/.*/`, 如果能在`dynamic`目录下匹配到该文件，就会将其打包。

webpack支持一些配置:
```js
// wepback.config.js
module: {
  parser: {
    javascript: {
      wrappedContextRegExp: /.*/,
      wrappedContextRecursive: true
    }
  }
}
```

+ `wrappedContextRegExp`: 我们可以告诉 webpack 用什么替换表达式的动态部分
+ `wrappedContextRecursive`: 指定是否应该遍历嵌套目录


## webpackMode
动态import存在几种模式，默认为`lazy`模式。在`lazy`模式下，动态模块会单独打包成chunk。

### lazy模式

在如下场景

```js
├── dynamic
│   ├── a.js
│   ├── b.js
│   └── c.js
└── entry-a.js
```

```js
// entry-a.js
const list = ['a', 'b', 'c']

list.forEach(item => {
  import(`./dynamic/${item}.js`).then(res => {
    console.log('%c 🍩 res: ', 'font-size:20px;background-color: #7F2B82;color:#fff;', res);
  })
})
```

**打包成功后：**

在打包的产物中有这么一段映射
```js
var map = {
	"./a.js": [
		2, // 模块id
		1 // chunkid
	],
	// ...
};
```
意思就是先`动态加载执行 chunkid为1` 的文件, 然后执行`1.js`chunk中的`moduleId为2`的代码

![20220826113345](https://raw.githubusercontent.com/fyhhub/imgs/main/imgs20220826113345.png)

![20220826113633](https://raw.githubusercontent.com/fyhhub/imgs/main/imgs20220826113633.png)


::: info 总结
会单独生成各自的chunk
:::


### eager模式

eager模式需要你添加魔法注释`/* webpackChunkName: 'mainFolder', webpackMode: 'eager' */`, 在这种模式下代码将不会生成单独的`chunk`
```js
const list = ['a', 'b', 'c']

list.forEach(item => {
  import(/* webpackChunkName: 'mainFolder', webpackMode: 'eager' */`./dynamic/${item}.js`).then(res => {
    console.log('%c 🍩 res: ', 'font-size:20px;background-color: #7F2B82;color:#fff;', res);
  })
})
```

打包后的产物如下:

![20220826113959](https://raw.githubusercontent.com/fyhhub/imgs/main/imgs20220826113959.png)

![20220826114037](https://raw.githubusercontent.com/fyhhub/imgs/main/imgs20220826114037.png)

::: info 总结
不会生成各自单独的chunk，模块代码被合并到入口文件中
:::

### lazy-once
lazy-once模式需要你添加魔法注释`/* webpackChunkName: 'mainFolder', webpackMode: 'lazy-once' */`, 在这种模式下, 本来的多个`chunk`会被`合并`成一个`chunk`
```js
const list = ['a', 'b', 'c']

list.forEach(item => {
  import(/* webpackChunkName: 'mainFolder', webpackMode: 'eager' */`./dynamic/${item}.js`).then(res => {
    console.log('%c 🍩 res: ', 'font-size:20px;background-color: #7F2B82;color:#fff;', res);
  })
})
```

![20220826114338](https://raw.githubusercontent.com/fyhhub/imgs/main/imgs20220826114338.png)

![20220826114414](https://raw.githubusercontent.com/fyhhub/imgs/main/imgs20220826114414.png)

::: info 总结
会生成单独的chunk，多个chunk被合并成一个
:::
