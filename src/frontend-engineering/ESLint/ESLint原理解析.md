# 通关前端工程化（一）ESLint 全方位解析，让你不再面向搜索引擎配置

## 一、前言
在前端工程化的工具链中，`eslint`在其中扮演了非常重要的角色，包含代码规范的检查和错误提示，还有代码的自动`fix`，让我们不再担心代码的基本质量。但是如果让你从头配置`eslint`，你可能会去百度或google查询。还有面对`plugins`，`extends`的时候，可能会疑惑他俩到底有啥区别？为什么要这么配置？

下面带着疑问，我们一起来解开`eslint`神秘面纱，让你彻底掌握eslint的各种配置以及它的原理。



## 二、ESlint的基本工作原理概览

在详细讲解ESlint之前，我们先了解一下它的基本工作原理。可以先看看下面这张图

<img width="100%" src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/303b789dc5164e2a9146dae398a5aa98~tplv-k3u1fbpfcp-watermark.image?"/>

大致分为几个步骤：

1. 使用`解析器`将代码转为`AST(抽象语法树)`
2. 获取所有插件或用户定义的中的规则，`遍历AST并执行规则`
3. 在遍历完成后, `将收集到的错误抛出` 以及 `自动fix`

说到底, 还是对AST的操作。我们知道，既然要操作AST，那必然少不了对代码的`词法分析`和`语法分析`。

列举一下常见的编译器，如`acron`, `@babel/parser`, `babylon`, `espree`等等。。

下面来具体聊聊eslint的解析器吧~

## 三、ESlint的解析器
`eslint`内部默认使用的是`espree`解析器。我们可以来简单试一下：[astexplorer.net](https://astexplorer.net/)

<img width="100%" src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6c9910fda054c3bbcd664350698bbaf~tplv-k3u1fbpfcp-watermark.image?"/>

当你使用`espree`的时候，就必须遵循它的AST结构，比如`@babel/parser`对于数字`1`, 它的节点类型是`NumericLiteral`, 而`espree`的节点类型是`Literal`。

> 不同解析器编译出来的AST节点类型是不同的


### espree、esprima、acron 之间到底是什么关系？

我们在学习`AST`的时候，经常会看到`esprima`, `espree`等等`parser`。傻傻分不清，下面我们看下它们到底有何区别。



<img width="100%" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb07419b77334c1ea5b535926894330a~tplv-k3u1fbpfcp-watermark.image?"/>

此图摘自 [Babel 插件通关秘籍](https://juejin.cn/book/6946117847848321055)

其实`espree`是基于`acorn`实现的。这一点我们从源码中也可以看出来：

<img width="100%" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/554a8e9487cc4581b1c582cb16ca422a~tplv-k3u1fbpfcp-watermark.image?"/>

下面我们来看看如何配置`eslint`的`parser`。


在下面的代码中我们可以设置`espree`的一些`parserOptions`
```js
{
  parser: 'espree', // 默认值
  parserOptions: {
    ecmaVersion: "latest", // 一般支持最新就可以了
    sourceType: "module", // 指定模块类型
    ecmaFeatures: {
      jsx: true, // 让eslint支持jsx语法
      impliedStrict: true // 启动严格模式
      // ...其他参数
    }
  },
}
```
`parserOptions`的类型定义：
```ts
interface ParserOptions {
    ecmaVersion?: 3 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | "latest" | undefined;
    sourceType?: "script" | "module" | undefined;
    ecmaFeatures?: {
        globalReturn?: boolean | undefined;
        impliedStrict?: boolean | undefined;
        jsx?: boolean | undefined;
        experimentalObjectRestSpread?: boolean | undefined;
        [key: string]: any;
    } | undefined;
    [key: string]: any;
}
```

一般来说，react的项目想要支持`jsx`的语法，就需要开启`ecmaFeatures.jsx`, 其他情况其实只用配置`sourceType`, `ecmaVersion`即可。


### 支持ts文件解析的插件（@typescript/eslint-parser）

那如果我们想支持`typescript`语法解析，那该怎么做呢。我们可以在配置文件中声明：

```js
{
    parser: '@typescript-eslint/parser'
    // or
    parser: '@babel/eslint-parser', // 需要配置babelrc中的 @babel/preset-typescript
}
```

### 支持vue文件解析的插件（vue-eslint-parser）

如果我们想支持`vue`文件的解析，又要支持`ts`，又该怎么配置呢
```js
{
  parser: "vue-eslint-parser",
  parserOptions: {
    "ecmaVersion": "latest",
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },
}
```
`parserOptions`是传给`vue-eslint-parser`的参数，由于我们配置了`parser`，所有文件的解析都会经过`vue-eslint-parser`, 如果遇到了`ts`文件，就会切换到`parserOptions.parser`来编译解析。

其实`vue-eslint-parser`内部实现了`parseForESLint`方法，这个方法在[中文文档](https://cn.eslint.org/docs/developer-guide/working-with-custom-parsers)中，也有所介绍。

<img width="100%" src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f65926f2c8204689aed2c0a6ee2466f1~tplv-k3u1fbpfcp-watermark.image?"/>



### parser的最佳实践

`Vue项目`中的配置（仅展示解析器配置）
```js
const config = {
  parser: "vue-eslint-parser",
  parserOptions: {
    "ecmaVersion": "latest",
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },
  plugins: [
    "vue",
  ],
  // 其他配置。。。
}
```
你还可以这么配置
```js
{
  "parser": "vue-eslint-parser",
  "sourceType": "module",
  "parserOptions": {
      "ecmaVersion": "latest",
      "parser": {
           // js文件使用espree
          "js": "espree",
           // ts使用@typescript-eslint/parser
          "ts": "@typescript-eslint/parser",
           // 模板中的脚本使用espree
          "<template>": "espree",
      }
  }
}
```


`React项目`中的配置
```js
{
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
}
```

### tslint为什么会被淘汰
我们知道`eslint`是规范`js`代码的，而`tslint`是规范`ts`代码的。
既然功能差不多，就可以将两者合并。

前者使用的是`espree`, 后者使用了`typescript`编译，并且`tslint`还实现了自己的一些`rule`。

后来`tslint`的解析器就独立出来，成了`@typescript-eslint/parser`, 而它的规则一块合并到了`eslint`中，现在只需要指定一下代码的解析器，就可以实现`js`和`ts`的兼容。

我们来具体看下两者有何区别，对于这么一行代码：

```js
let a = '1'
```
解析后的AST是有很大不同的：

|解析器|AST|
|---|---|
|espree|<img width="80%" src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b3e0de447aa743e4940f6acd0a8a453d~tplv-k3u1fbpfcp-watermark.image?"/>|
|typescript|<img width="80%" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0eba17e1144e4adea82998c1d96c43c4~tplv-k3u1fbpfcp-watermark.image?"/>|


在`@typescript-eslint/parser`中，其实是通过将节点进行转换，并做一些映射来实现兼容`espree`的ast节点的。大家可以参考光神这篇文章：[TSLint 和 ESLint 是怎么融合在一起的](https://juejin.cn/post/7009657813890760741)


## 四、ESlint注释
在平时的开发中，有时候我们想禁掉某些地方的eslint检查。但又不想修改配置文件，该怎么做呢。

eslint提供了注释的能力来控制检查。例如有如下代码：

<img width="100%" src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d741eb92a924842948277d8b47ff6ae~tplv-k3u1fbpfcp-watermark.image?"/>

在它上面加上一段注释，eslint就不会报错了


同样的类似的功能还有很多。一一列举一下

+ 禁止当前行的检查
  ```js
  let a = 1 // eslint-disable-line
  ```
+ 禁止下一行的检查
  
  ```js
  // eslint-disable-next-line
  let a = 1
  ```
+ 禁用整个文件的检查
  ```js
  /* eslint-disable */
  ```
+ 禁止文件中某些规则
  ```js
  /* eslint-disable no-alert */
  ```
+ 指定当前文件的环境
  ```js
  /* eslint-env node */
  const data = require('xxx') // 可以使用require语法了
  ```
+ 指定全局变量
  
  ```js
  /* global var1 */
  console.log(var1) // 全局变量只读，如果没有上面的注释，会报找不到该全局变量
  
  /* global var1:writable */
  var1 = '123' // 全局变量可读可写
  ```
+ 配置规则
  
  ```js
  /* eslint eqeqeq: "off", curly: "error" */
  ```
 

### eslint注释的实现原理
上面简单介绍了一下`eslint注释`的功能。那么它是如何实现的呢，难道是根据`AST`来判断的？

其实...并不是，而是用了最常见的正则匹配。下面我们来探究下原理。


先来了解下eslint格式化代码的大致过程：
```js
verify(text) {
  // parse 源码
  const ast = parse(text);
  // 获取到lint后的问题
  const lintingProblems = runRules(ast);
  // 获取注释配置
  const commentDirectives = getDirectiveComments(ast);
  // 根据注释配置和配置文件 获取最终的问题集合
  return applyDisableDirectives(lintingProblems, commentDirectives);
}
```
整体流程如下：

1. parse 源码
2. 获取到lint后的问题
3. 获取注释配置
4. 根据注释配置和配置文件 获取最终的问题集合

一起来看下源码实现：

```js
function getDirectiveComments(ast, ruleMapper, warnInlineConfig) {
   // ...
    ast.comments.filter(token => token.type !== "Shebang").forEach(comment => {
        const { directivePart, justificationPart } = extractDirectiveComment(comment.value);
        const match = /^(eslint(?:-env|-enable|-disable(?:(?:-next)?-line)?)?|exported|globals?)(?:\s|$)/u.exec(directivePart);
        if (!match) {
            return;
        }
        const directiveText = match[1];
        const lineCommentSupported = /^eslint-disable-(next-)?line$/u.test(directiveText);
        // ...
        const directiveValue = directivePart.slice(match.index + directiveText.length);

        switch (directiveText) {
            case "eslint-disable":
            case "eslint-enable":
            case "eslint-disable-next-line":
            case "eslint-disable-line": {
                // ...
                break;
            }

            case "exported":
                // ...
                break;

            case "globals":
            case "global":
                // ...
                break;

            case "eslint": {
                // ...
                break;
            }
        }
    });

    return {
        configuredRules,
        enabledGlobals,
        exportedVariables,
        problems,
        disableDirectives
    };
}
```

可以看到，其实就通过正则`match`匹配到`行内配置`, 然后对问题进行过滤。感兴趣可以直接看源码[linter.js#L366](https://github.com/eslint/eslint/blob/7b43ea14a8af5fc3dbac38fa9d5bc71741328c16/lib/linter/linter.js#L366)


好了，相信大家对`eslint注释`已经非常清楚，这在有些特定情况还是可以使用的。当然~还是推荐大家遵循各自的开发规范，尽量少用。

## 五、ESlint核心配置详解

### parser、parserOptions
参见上文

### rules
在`eslint`中，rules有多种写法:

-   "off"或0 -关闭规则
-   "warn" 或1 - 开启规则, 使用警告 程序不会退出
-   "error"或2 - 开启规则, 使用错误 程序退出

下面这两种写法是完全一样的。
```js
{
  "no-debugger": 0,
  // or
  "no-debugger": "off",
}
```

你还可以给规则传递参数，例如：
```js
// 空行最多不能超过2行, 否则会警告
"no-multiple-empty-lines": [1, {"max": 3}]
```
第一个参数是规则问题信息的级别。第二个参数是传递给rule的参数



### plugins
什么是eslint插件？简单一句话：**提供了代码检查和修复的能力**。
我们先看下`plugins`的几种写法。

先来安装一下`eslint-plugin-vue`
```
npm i eslint-plugin-vue -D
```

那么插件该如何配置呢：
```js
{
  plugins: [
    'vue' // 省略了eslint-plugin
  ],
}
```

如果像`@typescript-eslint/eslint-plugin`这种怎么配置？

```js
{
  plugins: [
    '@typescript-eslint' // 省略了eslint-plugin
  ],
}
```
还有一种情况，`@jquery/eslint-plugin-jquery`
```js
{
  plugins: [
    '@jquery/jquery' // 省略了eslint-plugin
  ],
}
```
简单记住插件名是如何转变的：**会替换掉eslint-plugin**。



**但需要注意的是，`plugins`只是提供了检查和修复能力，但并没有将这些规则给应用上，这一点很重要！！**

我们可以用一个例子看一下：

<img width="100%" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e024c1fcabaf4ea4b8c06bc615f61d0b~tplv-k3u1fbpfcp-watermark.image?"/>

在没有配置`extends`的情况下，我们的代码没有任何报错，但是一旦配置上后。eslint就会继承`eslint-plugin-vue`下面的`推荐规则配置`。

下面我们来详细看下`extends`是如何配置的。

### extends
首先，在`eslint`中其实是有一套`默认的规则配置`, 可以这样:
```js
{
  extends: ['eslint:recommended']
}
```

`extends`有三种来源
+ `eslint-plugin-xxx`中的规则配置
  ```js
  extends: ["plugin:xxx/recommended"]
  ```
+ `eslint-config-xxx`中的规则配置, 例如我们常见的`eslint-config-standard`
  ```js
  extends: ["standard"]
  ```
+ `eslint`内置规则配置
  ```js
  extends: ["eslint:all"] // 全量规则启动
  // or
  extends: ["eslint:recommended"] // 推荐规则
  ```

**所以，如果我们不配置任何`extends`, 代码将没有任何检查和修复能力**

说了这么多，`plugin:xxx/recommended`规则是从哪里来的呢？

以`plugin:vue/recommended`为例，我们打开`eslint-plugin-vue`的源码：

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f51007b112240b8a50100bd1150797e~tplv-k3u1fbpfcp-watermark.image?" alt="" width="100%" />

可以看到插件的`configs`中有一行`recommended`的配置。其实它还支持其他的推荐配置例如：

```js
extends: "plugin:vue/vue3-recommended"
```
加上上面这一行，就可以在vue3项目中开启一些推荐规则了。
### env
这个配置就比较好理解了，其实就是设置当前环境，如果环境不匹配，就会报错。

常见配置如下
```ts
interface Env {
   browser?: boolean;
   node?: boolean;
   esxx?: boolean;
}
```

简单看下效果：

<img width="100%" src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c5f655ca18541d68af1dc4aedddca3b~tplv-k3u1fbpfcp-watermark.image?"/>

在上面的配置中，只是使用了`node`和`browser`，另外还支持`es20xx`的写法，可切换不同的ecma版本。



### globals
```ts
globals?: {
    [name: string]: boolean | "readonly" | "readable" | "writable" | "writeable" 
};
```

这个属性是用来配置全局变量的，例如我们设置了`readable`，那么它是只读的，修改就会报错。同理`writable`和`writeable`是可读可写。

<img width="60%" src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e598d9735764c2787655ce7f6d5799f~tplv-k3u1fbpfcp-watermark.image?"/>

如果没有配置全局变量，会提示未声明该变量，一般可以搭配`webpack`的`ProvidePlugin`使用。

<img width="100%" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b853f103e0641dfb3ad57ce90833677~tplv-k3u1fbpfcp-watermark.image?"/>

### root

该配置可以设置配置文件的目录
```js
{
  "root": true
}
```
ESLint 搜索配置文件步骤：

1. 在要检测的文件同一目录里寻找 .eslintrc.* 和 package.json；
2. 紧接着在父级目录里寻找，一直到文件系统的根目录；
3. 如果在前两步发现有 root：true 的配置，停止在父级目录中寻找 .eslintrc；
4. 如果以上步骤都没有找到，则回退到用户主目录 ~/.eslintrc 中自定义的默认配置




## 六、如何自定义ESLint的错误信息
在eslint中，我们可以通过`-f`指定格式化方法
```js
eslint index.vue -f ./formatter.js
```

```js
// formatter.js
module.exports = function (results) {
  return JSON.stringify(results, null, 2)
}
```
它接收一个`results`参数, 结构如下:

```js
[
  {
    "filePath": "/eslint-learn/index.vue",
    "messages": [
      {
        "ruleId": "vue/multi-word-component-names",
        "severity": 2,
        "message": "Component name \"index\" should always be multi-word.",
        "line": 1,
        "column": 1,
        "nodeType": null,
        "messageId": "unexpected"
      },
      {
        "ruleId": "vue/no-multiple-template-root",
        "severity": 2,
        "message": "The template root requires exactly one element.",
        "line": 3,
        "column": 3,
        "nodeType": "VElement",
        "endLine": 3,
        "endColumn": 10
      }
    ],
    "suppressedMessages": [],
    "errorCount": 2,
    "fatalErrorCount": 0,
    "warningCount": 0,
    "fixableErrorCount": 0,
    "fixableWarningCount": 0,
    "source": "<template>\n  <div />\n  <div />\n</template>\n<script>\nexport default {\n  a () {\n  }\n}\n</script>\n",
    "usedDeprecatedRules": []
  }
]
```

其中`messages`包含了报错信息，我们拿到这些信息，就可以将其格式化我们想要的样子

```js
module.exports = function(results) {
    // 记录错误数量 和 警告数量
    var summary = results.reduce(
        function(seq, current) {
            seq.errors += current.errorCount;
            seq.warnings += current.warningCount;
            return seq;
        },
        { errors: 0, warnings: 0 }
    );

    if (summary.errors > 0 || summary.warnings > 0) {
        return (
            "Errors: " +
            summary.errors +
            ", Warnings: " +
            summary.warnings +
            "\n"
        );
    }

    return "";
};
```

执行后，错误结果就变成了这样：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1d8157c8d13e419dbfff25005eb5c104~tplv-k3u1fbpfcp-watermark.image?)

详细用法，大家可以参考文档~

## 七、自定义解析器
前面我们知道，通过配置`parser`就能设置我们当前eslint解析代码的工具。以`eslint-plugin-vue`为例，它是如何实现`vue`文件的解析呢？

在学习之前，我们来自己实现一下：
```js
{
    "parser": "./path/to/awesome-custom-parser.js"
}
```

```js
var espree = require("espree");
exports.parseForESLint = function(code, options) {
    return {
        ast: espree.parse(code, options)
    };
};
```
在上面的例子中，我们实现了一个eslint解析器，不过还是使用了`espree`来解析的。

可以看到我们导出了一个`parseForESLint`方法。接收两个参数
+ `code`: 我们要解析的源代码
+ `options`: 其实就是`parserOptions`

最后返回了AST。

有了这些配置，就很容易基于其他编译工具来实现代码的解析。

下面我们来直接看下`vue`是如何处理的，打开`vue-eslint-parser`源码, 找到`parseForESLint`。

```js
function parseForESLint(code, parserOptions) {
    const options = Object.assign({
        comment: true,
        loc: true,
        range: true,
        tokens: true,
    }, parserOptions || {});
    let result;
    let document;
    let locationCalculator;
    // 如果非vue文件， 就是用parserOtions中指定的解析器
    if (!isVueFile(code, options)) {
        result = parseAsScript(code, options);
        document = null;
        locationCalculator = null;
    }
    // vue文件使用sfc编译
    else {
        ({ result, document, locationCalculator } = parseAsSFC(code, options));
    }
    result.services = Object.assign(result.services || {}, define(code, result.ast, document, locationCalculator, {
        parserOptions: options,
    }));
    return result;
}
```
上面的逻辑也很好理解
+ 如果非vue文件， 就是用parserOtions中指定的解析器（关于如何配置，前面也有说过）
+ vue文件使用sfc编译, 会将代码分成三部分`template`, `script`, `style`, 其中`script`会根据你的配置，使用如`espree`或`@typescript-eslint/parser`来编译。



## 八、ESlint插件开发
在了解规则如何开发插件之前，我们先想明白几件事，`plugin`到底提供了什么功能？

+ 自定义规则
+ processor
+ 自定义配置

主要分为上面三部分，下面我们来详细看看

### eslint插件的基本结构

直接以`eslint-plugin-vue`为例，可以看到它的配置如下

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2c818d8154241ebbfc1d882c34279d4~tplv-k3u1fbpfcp-watermark.image?" alt="" width="70%" />

#### rules

先看下`rules`中有什么
```js
{
  rules: {
    'array-bracket-newline': require('./rules/array-bracket-newline'),
    'array-bracket-spacing': require('./rules/array-bracket-spacing'),
    'arrow-spacing': require('./rules/arrow-spacing'),
    'attribute-hyphenation': require('./rules/attribute-hyphenation'),
    'attributes-order': require('./rules/attributes-order'),
    'block-lang': require('./rules/block-lang'),
    'block-spacing': require('./rules/block-spacing'),
    'block-tag-newline': require('./rules/block-tag-newline'),
    'brace-style': require('./rules/brace-style'),
    // ...其他
  }
  // ...其他
}
```

其中配置了很多`vue`自己定义的`rules`, 这里我们暂且不看它里面如何实现。

#### configs
接着是`configs`。


<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d0a5d043021f4cc79709b595bdfd54e2~tplv-k3u1fbpfcp-watermark.image?" alt="" width="100%" />

相信大家都看到了一个熟悉的名字`recommended`, 也就是说这里的`recommended`其实就是我们配置的`extends: "plugin:vue/recommended"`。

另外`recommended`配置中接着继承了`strongly-recommended`。这里大家要注意一下，并不知只有`extends`功能。还可以指定其他配置，如`env`, `plugins`等等，跟`eslintrc`完全一样的配置。

可以看到上面还有其他的推荐配置，如果你的项目是vue3，你还可以这么写：
```js
{
  "extends": ["plugin:vue/vue3-recommended"]
}
```

#### processors
再接下来就是processor了。
```js
processors: {
    '.vue': require('./processor')
},
```
什么是`processor`呢？通过前面的学习我们知道`eslint`是使用`espree`解析`js`文件的，但是它本身对于`vue`文件是无能为力的，那么就需要特殊的`processor`去处理`vue`文件。

例如像上面的代码中，指定了`.vue`文件交给`./processor`中的方法去处理。

后面会详细讲解一下`processor`。

#### environments
插件可以暴露额外的环境以在 ESLint 中使用。为此，插件必须输出一个 `environments` 对象。`environments` 对象的 key 是不同环境提供的名字，值是不同环境的设置。

例如下面的配置：
```js
  environments: {
    // TODO Remove in the next major version
    /** @deprecated */
    'setup-compiler-macros': {
      globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly'
      }
    }
  }
```
在vue3的`script + setup`中的代码，如果不声明导入，直接使用`defineProps`肯定是会报错的。
需要这么配置来解决：

```js
env: {
  "vue/setup-compiler-macros": true
}
```
这样就可以开启全局变量的配置~ 好了，下面我们正式进入eslint插件的开发。

### 插件的开发环境
工欲善其事必先利其器，先来安装一下插件脚手架
```
npm i -g yo generator-eslint
```
创建规则目录
```
mkdir eslint-plugin-demo
cd eslint-plugin-demo
```
初始化插件模板
```
yo eslint:plugin
```

经过一系列交互初始化, 插件名(ID: demo)为`eslint-plugin-demo`

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/809fb31276d945e4a92e9e6dbcfb8283~tplv-k3u1fbpfcp-watermark.image?" alt="" width="70%" />


### 实现no-var规则
进入到插件根目录下，初始化一个规则
```js
yo eslint:rule
```
<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e7b8f8ec1f0412eb2ddf802d197c4d9~tplv-k3u1fbpfcp-watermark.image?" alt="" width="70%" />


修改一下插件配置`eslint-plugin-demo/index.js`

```js
const requireIndex = require("requireindex");
module.exports = {
  rules: requireIndex(__dirname + "/rules"),
  configs: {
    recommended: {
      rules: {
        "demo/no-var": ["error"]
      }
    }
  }
}
```


然后执行`npm link`将当前插件Link到全局, 再在项目中`link`引入。
```
// 插件项目中执行
npm link

// 测试项目中执行
npm link eslint-plugin-demo
```
在测试项目中，配置上`plugins`和`extends`
```js
module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "demo"
  ],
  "extends": ["plugin:demo/recommended"]
}
```

在测试项目中创建一个`test.js`文件

```js
var a = 1
```

回到插件代码, 我们看下如何实现一个`no-var`规则
```js
// eslint-plugin-demo\lib\rules\no-var.js

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "不允许有var", // 简短的描述
      recommended: false, // eslint:recommended 时开启
      url: null, // 文档地址
    },
    fixable: 'code', // Or `code` or `whitespace` 是否执行fix
    messages: {
      noVar: '不能有 {{ type }}'
    }
  },
  create(context) {
    const sourceCode = context.getSourceCode()

    return {
      VariableDeclaration(node) {
        if (node.kind === 'var') {
          context.report({
            node,
            data: { type: 'var' },
            messageId: 'noVar',
            fix(fixer) {
              // 遍历tokens, 找到var
              const varToken = sourceCode.getFirstToken(node, { filter: t => t.value === 'var' })
              // 替换var为let
              return fixer.replaceText(varToken, 'let')
            }
          })
        }
      }
    };
  },
};

```

代码实现很简单, 解释一下，主要分为两个功能
1. 错误提示：在`create`方法中，当遍历到`VariableDeclaration`节点时，`report`一个错误信息，`messageId`对应了上面`messages`的key, `data`中可以传递一些插槽。
2. 代码修复：通过`getFirstToken`筛选到token等于`var`的，然后`replaceText`替换成`let`

在上面的代码中，我们可以发现其中涉及了三个对象：
+ context
+ fixer
+ sourceCode

它上面有哪些方法呢？这里我推荐直接看下[中文文档](https://cn.eslint.org/docs/developer-guide/working-with-rules)，不过我还是先列举几个，方便大家查看：

`fixer`对象

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc340b3e5e0e4b74839789a92fd34e37~tplv-k3u1fbpfcp-watermark.image?" alt="" width="70%" />


`SourceCode`对象

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d77082c6580c47a5acdc923b9b8e90b4~tplv-k3u1fbpfcp-watermark.image?" alt="" width="70%" />


接着我们测试下效果
```js
./node_modules/.bin/eslint ./test.js
```
<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/919c1a02fae544e3ba7d8431c15c7cf4~tplv-k3u1fbpfcp-watermark.image?" alt="" width="70%" />

再来执行以下`--fix`，可以发现`var`被修改成了`let`

```js
./node_modules/.bin/eslint ./test.js --fix
```


### processor是什么?

```js
processor: {
    preprocess(code){
      return [code]
    },
    postprocess(messages) {
      // 处理message
      return messages
    },
    supportsAutofix: true // 设置为true，才能支持--fix自动修复
}
```

`processor`的作用其实很简单，**就是在校验的前/后，分别对`code`和`messages`做一些处理**

例如`eslint-plugin-vue`的`processor`实现就非常简单, code不需要处理，交给`vue-eslint-parser`去解析，而`postprocess`去单独处理了一下错误信息。
```js
module.exports = {
  /** @param {string} code */
  preprocess(code) {
    return [code]
  },

  /**
   * @param {LintMessage[][]} messages
   * @returns {LintMessage[]}
   */
  postprocess(messages) {
    const state = {
      /** @type {GroupState} */
      block: {
        disableAllKeys: new Set(),
        disableRuleKeys: new Map()
      },
      /** @type {GroupState} */
      line: {
        disableAllKeys: new Set(),
        disableRuleKeys: new Map()
      }
    }
    // ...其他逻辑
    return filteredMessages
  },

  supportsAutofix: true // 设置为true，才能支持--fix自动修复
}
```



## 九、ESLint源码

简单画了一下源码的流程图

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e14b2377f6b46e8934f8b2dd656de4f~tplv-k3u1fbpfcp-watermark.image?" alt="" width="100%" />

大致列一下流程：
1. 创建`ESLint`和`CLIEngine`类
2. 提取配置文件，从当前目录搜索。
3. 是否存在processor，存在就调用`preprocess`
4. 根据传入的parser配置编译代码，生成AST
5. 执行规则

   + 遍历AST，平铺所有节点到`nodeQueue`
   + 遍历rules, 注册节点事件(如 `Literal -> 上报错误、修复代码逻辑`..)
   + 遍历平铺后的`nodeQueue`
   + 触发节点事件，收集`问题和代码修复回调`
6. 调用`postprocess`
7. 执行代码修复
8. 输出文件


## 十、ESLint 与 Prettier 的强强联合
ESLint作为规范你开发的工具，它在代码的静态分析方面是非常全面的。能给你非常良好的错误提示，但是在代码的自动格式化方面稍显不足，不够顺滑。

所以搭配上`Prettier`这个代码自动格式化工具，开发起来将会非常舒适。

下面讲解一下详细的配置。

首先你需要安装一下两个插件
```js
npm i eslint-config-prettier eslint-plugin-prettier -D
```

然后在你的配置中`加入prettier`配置，注意不是替换你的配置
```js
{
  extends: [
    "plugin:prettier/recommended" // 一行代码即可
  ]
}
```

### eslint-plugin-prettier源码
通过前面的学习，相信大家对`eslint插件`已经非常了解了，我们随便来看看`eslint-plugin-prettier`是怎么实现的。

```js
module.exports = {
  configs: {
    recommended: {
      extends: ['prettier'],
      plugins: ['prettier'],
      rules: {
        'prettier/prettier': 'error',
        'arrow-body-style': 'off',
        'prefer-arrow-callback': 'off',
      },
    },
  },
  rules: {
    prettier: {
      meta: {
        docs: {
          url: 'https://github.com/prettier/eslint-plugin-prettier#options',
        },
        type: 'layout',
        fixable: 'code',
        schema: [
          {
            type: 'object',
            properties: {},
            additionalProperties: true,
          },
          {
            type: 'object',
            properties: {
              usePrettierrc: { type: 'boolean' },
              fileInfoOptions: {
                type: 'object',
                properties: {},
                additionalProperties: true,
              },
            },
            additionalProperties: true,
          },
        ],
        messages: {
          [INSERT]: 'Insert `{{ insertText }}`',
          [DELETE]: 'Delete `{{ deleteText }}`',
          [REPLACE]: 'Replace `{{ deleteText }}` with `{{ insertText }}`',
        },
      },
      create(context) {
        // ...其他
        const source = sourceCode.text;

        return {
          Program() {
            if (!prettier) {
              prettier = require('prettier');
            }
            // ...其他逻辑
            try {
              prettierSource = prettier.format(source, prettierOptions);
            } catch (err) {
              if (!(err instanceof SyntaxError)) {
                throw err;
              }
            }
            // ... 其他逻辑
          },
        };
      },
    },
  },
};

```

我们可以看到，有两块代码，非常核心
1. 实现了一个规则`prettier/prettier`, 并且它的`fixable`, 代表它是可以修复代码的。在`create`方法中，调用了`prettier.format`修复代码~
2. 暴露出了`configs.recommended`推荐配置，默认开启`prettier/prettier: "error"`配置， 帮助引入了`eslint-plugin-prettier`插件。

那`eslint-config-prettier`中又有什么呢？

### eslint-config-prettier是配置什么的？

可以看到配置了一大堆的默认规则。
<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f199023073f4a9b8eb26544268a09db~tplv-k3u1fbpfcp-watermark.image?" alt="" width="100%" />

大家可以想象为什么要单独配置一份，然后把部分规则关闭了，其实原因很简单。

**可能会与其他格式化能力冲突，例如`quotes`这个规则，`prettier`强制将它关闭了，格式化的功能交给`prettier`来做**。

## 参考
+ [Babel 插件通关秘籍](https://juejin.cn/book/6946117847848321055)
+ [TSLint 和 ESLint 是怎么融合在一起的](https://juejin.cn/post/7009657813890760741)
+ [Eslint 的 disable、enable 的注释配置是怎么实现的](https://juejin.cn/post/7010354638012547103)
