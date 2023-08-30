
# 通关前端工程化（二）如何发布一个现代化的NPM包

大家好，继上次发出的ESLint解析文章, 有一段时间了，本次主要想分享一下如何发布一个现代化的npm包，让我们在开发lib库时有更好的`开发体验`和`规范化的流程`。

以Vite源码为例，你知道下面`scripts`中，每个命令的作用吗？一个npm库为何做的如此复杂？我们要了解哪些知识？

|||
|---|---|
|<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af8975940869443493edb9dce4e154ac~tplv-k3u1fbpfcp-watermark.image?" alt="" width="70%" />|<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b3dac342ceb47f9b41bb0a079a94155~tplv-k3u1fbpfcp-watermark.image?" alt="" width="50%" />|



下面跟着我一起来学习吧~




历史文章：

+ [通关前端工程化（一）ESLint全方位解析，让你不再面向搜索引擎配置](https://juejin.cn/post/7131934363679195144)

## 1. 包管理器的选择
作为工程化必备工具，我们经常跟包管理器打交道，最常用的当然是`npm`了，也是前端领域使用量最多的包管理器工具。当然，还有其他非常优秀的包管理器工具，如：

+ yarn
+ pnpm
+ cnpm
+ ...

作为一个前端er，当然紧随潮流，`pnpm`是目前非常🔥的一款包管理工具，个人觉得它最大的优势是这么几点：
+ 节省磁盘空间：pnpm使用硬链接和符号链接将依赖项安装到项目中
+ 更好的内存管理
+ 更快的安装速度
+ ...

这也是我推荐它的原因。当然如果公司不支持pnpm, 下位替代也可以使用`npm`或者`yarn`。

说完这些，跟我一起初始化一个项目，一步步发布npm包吧。

```bash
mkdir modern-npm
cd modern-npm
pnpm init
```

先来初始化一下项目

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/57b94ec9588d402a9259060459930d72~tplv-k3u1fbpfcp-watermark.image?)

再来初始下.git目录
```bash
git init .
```

## 2. 你应该知道的package.json属性
表面上看，`package.json`似乎要改的东西不多。

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6fce3e4fefa04f4496bf20ba9f56a652~tplv-k3u1fbpfcp-watermark.image?" alt="" width="70%" />

不难发现，要用的无非这么几个属性：`name`, `version`, `description`, `scripts`，`bin`, `module`, `main`。其他东西对于一个lib库来讲真的重要吗？

no, 其实`package.json`被我们忽略的东西可太多了。

#### 1.1 module、main、browser
`module`、`main` 想必大家并不陌生, 作为一个Lib库的必备属性，绝大部分npm库都会有。

简单说明下用法：

+ **module:** 通过`import`导入npm包时（即esm模块导入），该从哪个文件导入代码。
  
  ```js
  {
      "module": "dist/vue.esm.js"
  }
  
  import Vue from 'vue'
  // 编译后，实际导入
  import Vue from 'node_modules/vue/dist/vue.esm.js'
  ```
+ **main:** 通过`require`导入npm包时（即commonjs模块导入），该从哪个文件导入代码。
  
  ```js
  {
      "main": "dist/vue.cjs.js"
  }
  
  import Vue from 'vue'
  // 编译后，实际导入
  import Vue from 'node_modules/vue/dist/vue.cjs.js'
  ```

+ **browser:** 通过配置 `browser` 为一个单一的字符串时它会替换 `main` 字段作为浏览器环境下的包入口文件。
    
  - 在浏览器环境下（`target: web`），默认取值是这样的：`mainFields: ['browser', 'module', 'main']`。这是一段webpack配置，可以指定优先使用哪种入口。
  
  - 还有一种用法是路径映射，例如:
  
      ```js
      {
          "browser": {
              "./server.js": "./client.js"
          }
      }
      ```
      当我导入`server.js`时，实际引入的是`client.js`.
      
   - 另外我们还可以通过如下方式来避免打包服务端代码：
     
     ```js
      {
          "browser": {
              // 打包时，浏览器环境下不会将该包的 /src/server.js 模块内容打包进去
              "./server.js": false
          }
      }
     ```


#### 1.2 types 和 typings
通过`types`和`typings`属性，可以指定我们的npm包的类型声明文件的入口, 一般一起写就可以了：

```js
{
    "types": "./dist/types",
    "typings": "./dist/types"
}
```

#### 1.3 exports
在 `Node.js 12.16.0` 及更高版本中，可以使用`exports`字段来定义模块的导出方式。

`exports`字段的作用是让模块的作者可以更精确地控制模块的导出方式，从而提高代码的可维护性和可读性。下面是`exports`字段的一些用途：

+ **路径写法**
 
  可以使用`exports`字段来指定模块的默认导出, 例如：
  ```js
  {
    "name": "my-package",
    "exports": "./lib/index.js"
  }

  // 等价于
  {
    "name": "my-package",
    "exports": {
        ".": "./lib/index.js"
    }
  }
  ```
  
  还可以这么写：
  
  ```js
  {
    "name": "my-package",
    "exports": {
        ".": "./lib/index.js",
        "./sub": "./lib/sub.js"
    }
  }
  
  import sub from 'my-package/sub'
  ```
  
+ **条件导出**
  
  在 `exports` 字段中同时为我们提供了条件判断：
  
  ```js
  {
      "exports": {
        // ESM 引入时的入口文件
        "import": "./my-module.js",
        // CJS 方式引入时寻找的路径
        "require": "./my-require.cjs"
      },
  }
  // 等价于
  {
      "exports": {
        "import": {
            ".":  "./my-module.js"
        },
        "require": {
            ".": "./my-require.cjs"
        }
      },
  }
  ```
  以上等价于`module`和`main`字段。
  
  还有一种写法：
  
  ```js
  {
    "name": "my-package",
    "exports": {
        ".": {
            "import": "xxx",
            "require": "xxx"
        },
        "./sub": {
            "import": "xxx",
            "require": "xxx"
        }
    }
   }
  
  import sub from 'my-package/sub'
  ```

+ **嵌套条件**

    同样 `exports` 还支持多层嵌套，**支持在运行环境中嵌套不同的引入方式从而进行有条件的导出。**
    
    ```js
    {
      "exports": {
        "node": {
          "import": "./feature-node.mjs",
          "require": "./feature-node.cjs"
        },
        "default": "./feature.mjs"
      }
    }
    ```
    
+ **exports key**

  当然，除了上述 Node 中支持的 `exports` key 的条件。比如上述我们提到的 `import`、`require`、`node`、`default` 等。

    同样，`exports` 的 Key 也支持许多社区中的成熟关键字条件，比如：

    -   `"types"`- typescipt 可以使用它来解析给定导出的类型定义文件
    -   `"deno"`- 表示 Deno 平台的关键 key。
    -   `"browser"`- 任何 Web 浏览器环境。
    -   `"development"`- 可用于定义仅开发环境入口点，例如提供额外的调试上下文。
    -   `"production"`- 可用于定义生产环境入口点。*必须始终与 互斥`"development"`。*

看了上面的讲解，我们还是来找个实际的例子更好。

下面是Vue3 源码中`package.json`的`exports`配置：

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7c4078c55d74b0d9a8ba6decec27c78~tplv-k3u1fbpfcp-watermark.image?" alt="" width="50%" />

怎么样是不是很熟悉呢~



#### 1.4 license
如果你想开源你的代码，并且你的代码带来的影响比较大，建议一定要选择好自己的开源协议。

- `"MIT"`：MIT 开源协议，允许代码的商业使用、修改、复制、分发和私人使用，只需要在代码中包含版权声明和许可声明即可。
- `"ISC"`：ISC 开源协议，与 MIT 协议类似，但简化了许可证文本，因此更容易理解。
- `"Apache-2.0"`：Apache 开源协议 2.0 版本，允许商业使用、修改、复制、分发和私人使用，但需要在修改后的代码中包含原版权声明、许可声明和贡献声明，同时需要附带 Apache 2.0 许可证文本。
- `"BSD-2-Clause"`：BSD 开源协议 2 条款，允许商业使用、修改、复制和分发，但需要在代码中包含版权声明和许可声明。
- `"BSD-3-Clause"`：BSD 开源协议 3 条款，与 BSD 2 条款类似，但包含更多限制和规定，比如需要在修改后的代码中包含原版权声明、许可声明和贡献声明等。
- `"GPL-2.0"`：GPL 开源协议 2.0 版本，允许商业使用、修改和分发，但需要在修改后的代码中包含原版权声明、许可声明和贡献声明，并且必须以相同的 GPL 2.0 许可证分发代码。
- `"GPL-3.0"`：GPL 开源协议 3.0 版本，与 GPL 2.0 类似，但包含更多限制和规定，比如需要在修改后的代码中包含原版权声明、许可声明和贡献声明等，同时可以选择使用更宽松的 LGPL 许可证分发代码。
- `"UNLICENSED"`：未授权许可，表示代码未经许可，不能被复制、分发或商业使用。


比较常用的就是 `MIT` 和 `ISC`协 议了。


#### 1.5 version

版本号一般有三个部分，以`.`隔开，就像`X.Y.Z`，其中

-   X(major)：主版本号，不兼容的大改动
-   Y(minor)：次版本号，功能性的改动
-   Z(patch)：修订版本号，问题修复

另外，还存在几种先行版本：

+ `1.1.1-alpha.1` 1.1.1版本内测的第一个版本
+ `1.1.1-beta.1` 1.1.1版本灰度测试的第一个版本
+ `1.1.1-rc.1` 1.1.1版本生产候选的第一个版本

`1.1.1-alpha.1` < `1.1.1-beta.1` < `1.1.1-rc.1` < `1.1.1`

使用`npm version release`可以帮助我们自增版本。


#### 1.6 bin
这个相信写过脚手架的同学比较清楚，可以定义我们脚手架的命令行。

```
{
    "name": "my-pkg",
    "bin": {
        "my-pkg": "./bin.js"
    }
}
```
当我们执行`npm link`后，`my-pkg`就会作为一个全局命令，注册到全局环境变量中。

当然，可以通过`npm unlink`来解除关联。

#### 1.7 files
这个字段可以指定哪些文件夹或文件会被发布到npm, 比如常见的`dist`等，一些打包后的产物。


#### 1.8 sideEffects
这是一个不怎么常用，但是往往使用起来会有奇效的属性。它可以指定，我们的代码中哪些文件不存在副作用，例如：

指定所有的代码都没有副作用：
```
{
    "sideEffcts": false
}
```

指定有副作用的代码：
```
{
    "sideEffcts": ["*.css"]
}
```

这在webpack项目中，如果处于esm模块下去导入npm代码，可以天然实现按需引入。

## 3. 构建工具选型
常见的构建工具太多了， `webpack`, `rollup`, `vite`, `typescript`, `tsup`等等。可选择的太多，反而会造成代码的可维护性降低。

下面，我会根据自己的使用体验，来推荐不同场景下该使用哪些构件工具。

#### 3.1 为什么不用webpack打包库代码
为什么呢？难道webpack速度不快？配置繁琐?
其实并不是，webpack的产物相信大家也见过，存在很多自己的的运行时代码。而且对代码的`treeshaking`远没有`rollup`强悍，故不考虑在内。再者配置相比rollup等工具还是繁琐一点。

**以下默认都是TS代码开发，不考虑JS**

#### 3.2 尽量选择更纯粹的构建工具
我们先来看，如果你是纯粹的 `Node代码` 或 `前端逻辑`，那么其实不必用`rollup`, `webpack`等，推荐方案：
+ 可以直接用`tsc`编译，只需要tsconfig即可，比如工具库，因为它是纯粹的ts代码，`typescript`完全可以cover所有场景。

+ 想提升一下开发体验，增强编译速度，推荐`tsup（基于esbuild）`，当然还有最近很火的`unbuild`。



#### 3.3 选择合适的构建工具
那么再来看，如果代码中存在`vue`， `css`, `tsx`等这些代码，且浏览器支持ES6+，推荐使用`vite`编译，毕竟目前vite在库模式构建方面，还是完美支持的。但是有个点要注意： **Vite不支持ES6+语法转ES5的编译，并且没有降级插件（@vitejs/plugin-legacy不对库模式起效）这是由于esbuild限制。**
所以这又要看你的需求是否需要，再做考虑。



如果代码中存在`vue`， `css`, `tsx`等这些代码，且想支持到es5，那么我还是推荐老老实实用`rollup` + `babel`来编译你的库代码。当然，如果想提升开发体验，可以使用`swc`增强编译js的速度。

#### 3.4 通用npm构建工具如何选型
目前有些二次封装的工具可以支持打包各种场景下的代码，例如[father](https://www.npmjs.com/package/father)， 可以通过简单配置就能打包`react`, `node`, `vue`等代码，最后生成esm, cjs产物。使用起来挺方便。

不难发现，`father`是基于 `webpack + babel/swc`来进行编译的。针对不同场景，可以随意切换，但是如果自己要开发一个通用构建工具，其实rollup + babel/swc 完全够用了。

## 4. ESLint规范代码
如果你还在为eslint的头疼，其实大可不必。因为`eslint`已经支持命令行自动配置了，你只需要执行如下命令：

```bash
eslint --init
```

然后就可以跟着引导一步步来：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1970f3845aa24a59a57d0940df1f448c~tplv-k3u1fbpfcp-watermark.image?)

最后会帮你自动安装和生成配置。


那么如何搭配`prettier`的格式化功能来使用呢？ 你只需按我这样配置即可：

先安装
```bash
pnpm i prettier eslint-config-prettier eslint-plugin-prettier -D
```
配置`eslintrc.js`
```js
{
  // 添加extends
  extends: ['plugin:prettier/recommended']
}
```
创建`.prettierrc`

```js
{
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "none",
  "singleQuote": true,
  "arrowParens": "avoid"
}
```


## 5. 规范提交记录
规范`commit message`可以借助`git hook`来实现，现有的工具中, 使用`husky`是最简单的，跟着步骤来操作即可：

#### 5.1 初始化husky

```
// package.json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

```
pnpm i husky -D
pnpm prepare
```
以上安装和初始化了husky

#### 5.2 注册 pre-commit 钩子

注册这个钩子是为了，在提交你的代码前，对代码进行检查和格式化。避免手动更改浪费时间。
```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

```js
{
    // package.json
    "lint-staged": {
      "*.{js,jsx,ts,tsx}": [
        "prettier --write ./src",
        "eslint  --fix"
      ],
      "*.md": [
        "prettier --write"
      ]
    },
}
```
#### 5.3 注册 commit-msg 钩子
这一步是为了检查commit message是否符合规范，常见的commit message规范如下：
```
# 主要type
feat:     增加新功能
fix:      修复bug

# 特殊type
docs:     只改动了文档相关的内容
style:    不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
build:    构造工具的或者外部依赖的改动，例如webpack，npm
refactor: 代码重构时使用
revert:   执行git revert打印的message

# 暂不使用type
test:     添加测试或者修改现有测试
perf:     提高性能的改动
ci:       与CI（持续集成服务）有关的改动
chore:    不修改src或者test的其余修改，例如构建过程或辅助工具的变动
```

然后我们来安装初始化一下：
```
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

```
pnpm i commitlint @commitlint/config-conventional -D
```

这里要创建一下`commitlint.config.js`
```js
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional']
};
```


#### 5.4 更优雅的提交方式
借助一些工具，我们能实现这样的效果：

![image.png](https://user-images.githubusercontent.com/40693636/188255006-b9df9837-4678-4085-9395-e2905d7ec7de.gif)
我们先来安装一下：

```
npm install -D cz-git
npm i -g commitizen
```

修改`package.json`
```js
{
  "scripts": {
    "commit": "git-cz"
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  }
}
```
修改`commitlint.config.js`
```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  prompt: {
    alias: { fd: 'docs: fix typos' },
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixsSelect: '选择关联issue前缀（可选）:',
      customFooterPrefixs: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?'
    },
    types: [
      { value: 'feat', name: 'feat:     新增功能 | A new feature' },
      { value: 'fix', name: 'fix:      修复缺陷 | A bug fix' },
      {
        value: 'docs',
        name: 'docs:     文档更新 | Documentation only changes'
      },
      {
        value: 'style',
        name: 'style:    代码格式 | Changes that do not affect the meaning of the code'
      },
      {
        value: 'refactor',
        name: 'refactor: 代码重构 | A code change that neither fixes a bug nor adds a feature'
      },
      {
        value: 'perf',
        name: 'perf:     性能提升 | A code change that improves performance'
      },
      {
        value: 'test',
        name: 'test:     测试相关 | Adding missing tests or correcting existing tests'
      },
      {
        value: 'build',
        name: 'build:    构建相关 | Changes that affect the build system or external dependencies'
      },
      {
        value: 'ci',
        name: 'ci:       持续集成 | Changes to our CI configuration files and scripts'
      },
      { value: 'revert', name: 'revert:   回退代码 | Revert to a commit' },
      {
        value: 'chore',
        name: 'chore:    其他修改 | Other changes that do not modify src or test files'
      }
    ],
    useEmoji: false,
    emojiAlign: 'center',
    themeColorCode: '',
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: 'bottom',
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    upperCaseSubject: false,
    markBreakingChangeMode: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    skipQuestions: [],
    issuePrefixs: [
      // 如果使用 gitee 作为开发管理
      { value: 'link', name: 'link:     链接 ISSUES 进行中' },
      { value: 'closed', name: 'closed:   标记 ISSUES 已完成' }
    ],
    customIssuePrefixsAlign: 'top',
    emptyIssuePrefixsAlias: 'skip',
    customIssuePrefixsAlias: 'custom',
    allowCustomIssuePrefixs: true,
    allowEmptyIssuePrefixs: true,
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: ''
  }
};
```
## 6. 自动维护changelog
维护一个changelog想必是一个头疼的事情，少一点还好，当参与开源的人多起来，手动书写的成本就比较高了。

我们同样可以借助工具帮我们生成，只需一行命令：

```bash
"scripts": {
  "changelog": "npx conventional-changelog -p angular -i CHANGELOG.md -s -r 0 && git add CHANGELOG.md"
},
```

```
pnpm changelog
```

## 7. 单元测试
Vitest 是目前比较火的单元测试框架，基于Vite的速度极大提高了单元测试的开发效率。我们将其作为项目的单元测试方案：
```
pnpm i vitest -D
```
创建 `vitest.config.ts`

```js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    passWithNoTests: true,
    exclude: ['**/node_modules/**', '**/dist/**'],
    threads: true
  }
});
```

新建测试文件 `src/__test__/index.test.ts`。然后写一个简单的测试例子：
```js
import { expect, test } from 'vitest';

test('add', () => {
  expect(1 + 1).toBe(2);
  expect('map'.slice(1)).toMatchSnapshot('"ap"');
  expect('map'.slice(1)).toMatchInlineSnapshot('"ap"');
});
```

添加测试脚本：
```
{
  "scripts": {
      "test": "vitest run"
  }
}
```
另外你也可以用ui界面来查看测试结果：
```
pnpm i @vitest/ui -D
```

```
{
  "scripts": {
      "test:ui": "vitest --ui"
  }
}
```
<img src="https://user-images.githubusercontent.com/11247099/171992267-5cae2fa0-b927-400a-8eb1-da776974cb61.png" alt="" />

详情见[Vitest 文档](https://vitest.dev/guide/ui.html)

## 8. 自动发布 npm
我们知道，正常发布个npm包，需要我们手动执行`npm login`, `npm publish`等命令，有时在发布前还要执行测试命令，确保整体测试通过后再发布npm。那么有没有办法自动执行测试命令，然后发布呢？

答案是有的，[release-it](https://www.npmjs.com/package/release-it)可以帮你解决。

<img src="https://raw.githubusercontent.com/release-it/release-it/HEAD/docs/assets/release-it.svg?raw=true" alt="" width="100%" />

一键帮你执行如下操作：
+ lint
+ test
+ git commit
+ git tag
+ git push
+ ..


我们先来安装一下：
```
pnpm i release-it -D
```
执行命令，根据步骤操作即可
```
npx release-it
```

更多用法，大家可以参考文档：[release-it](https://www.npmjs.com/package/release-it)

## 参考资料
+ [从 package.json 来聊聊如何管理一款优秀的 Npm 包](https://juejin.cn/post/7126394898445500423)
