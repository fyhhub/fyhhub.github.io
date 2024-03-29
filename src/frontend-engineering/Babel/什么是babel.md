# 什么是babel?

babel是一个转译器。

@babel/preset-env 可以将高版本语法转为低版本语法

@babel/preset-env的作用是提供了代码的runtime, 包含三种类型：helper、corejs、regenerator。corejs是直接导入的，它会直接实现polyfill, 会造成全局污染。

@babel/preset-env 还支持配置targets，来按需注入运行时。因为如果用户的客户端版本普遍较高，则有些api和语法其实是没必要去加入runtime的。

@babel/preset-env 有个缺点是它的helper是直接注入到代码里的，没有通过模块化导入，会导致相同的代码重复打包。


@babel/plugin-transform-runtime解决了上面的一些问题，它也提供了helper、corejs、regenerator。

@babel/plugin-transform-runtime 如果没有配置corejs，会默认使用 @babel/runtime。不会处理api polyfill

@babel/plugin-transform-runtime 如果配置了corejs， 会使用@babel/runtime-corejs(3/2)， 所以你必须安装这个包。

@babel/runtime-corejs(2/3) 里面包含了 helper、corejs、regenerator.

@babel/plugin-transform-runtime 劫持了helper的生成逻辑，可以做到模块化加载 helper。 并且corejs的导入不会污染全局。

@babel/plugin-transform-runtime 没有targets配置，并且优先preset-env转换，所以如果你的浏览器已经支持的api和语法仍然可能会被打包进去，推荐开发lib库再使用它吧
