# 深入浅出 Vite 阅读笔记

## 声明

::: tip

本文基于 [深入浅出 Vite](https://juejin.cn/book/7050063811973218341) 做了关键点总结。
:::

## 1. Vite 的优势

1. 模块化方面：不需要考虑各种模块规范，都统一转成 ESM
2. 模块编译方面：webpack 冷启动需要递归打包依赖树，vite 基于浏览器 esm，能做到按需加载和编译。
3. 基于 ESBuild：提前将三方模块打包编译，并且天然支持 TSX/JSX 的编译
4. 基于 Rollup 的插件机制：vite 基于 rollup 的插件机制，扩展性更强，能直接复用 rollup 的各种插件

**利用浏览器原生 ES 模块的支持，实现开发阶段的 Dev Server，进行模块的按需加载，而不是先整体打包再进行加载。相比 Webpack 这种必须打包再加载的传统构建模式，Vite 在开发阶段省略了繁琐且耗时的打包过程，这也是它为什么快的一个重要原因。**

**一个 import 对应一个请求**

## 2. 为什么 Vite 打包前要执行 tsc

**这里的作用主要是用来做类型检查**

```json
{
  "compilerOptions": {
    // 省略其他配置
    // 1. noEmit 表示只做类型检查，而不会输出产物文件
    // 2. 这行配置与 tsc --noEmit 命令等效
    "noEmit": true
  }
}
```

## 3. Vite 配置

### 3.1 配置预处理器

```js
pnpm i sass -D
```

```js
// vite.config.ts
import { normalizePath } from 'vite';
// 如果类型报错，需要安装 @types/node: pnpm i @types/node -D
import path from 'path';

// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(path.resolve('./src/variable.scss'));


export default defineConfig({
  // css 相关的配置
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`
      }
    }
  }
```

### 3.2 CSS 配置

#### 3.2.1 配置 CSS Module

```js
// vite.config.ts
export default {
  css: {
    modules: {
      // 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义
      // 其中，name 表示当前文件名，local 表示类名
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
    preprocessorOptions: {
      // 省略预处理器配置
    },
  },
};
```

#### 3.2.2 配置 postcss

```js
pnpm i autoprefixer -D
```

```js
// vite.config.ts 增加如下的配置
import autoprefixer from "autoprefixer";

export default {
  css: {
    // 进行 PostCSS 配置
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ["Chrome > 40", "ff > 31", "ie 11"],
        }),
      ],
    },
  },
};
```

#### 3.2.3 CSS 原子化框架

#### 3.2.4 Windi CSS 接入

```
pnpm i windicss vite-plugin-windicss -D
```

```js
// vite.config.ts
import windi from "vite-plugin-windicss";

export default {
  plugins: [
    // 省略其它插件
    windi(),
  ],
};

// main.tsx
// 用来注入 Windi CSS 所需的样式，一定要加上！
import "virtual:windi.css";
```

#### 3.2.5 Tailwind CSS

```js
pnpm install -D tailwindcss postcss autoprefixer
```

```js
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

// postcss.config.js
// 从中你可以看到，Tailwind CSS 的编译能力是通过 PostCSS 插件实现的
// 而 Vite 本身内置了 PostCSS，因此可以通过 PostCSS 配置接入 Tailwind CSS
// 注意: Vite 配置文件中如果有 PostCSS 配置的情况下会覆盖掉 post.config.js 的内容!
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

接着在项目的入口 CSS 中引入必要的样板代码:

```less
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3.3 静态资源配置

```js
// vite.config.ts
import path from 'path';

{
  resolve: {
    // 别名配置
    alias: {
      '@assets': path.join(__dirname, 'src/assets')
    }
  }
}
```

#### 3.3.1 SVG 组件方式加载

- Vue2 项目中可以使用 vite-plugin-vue2-svg 插件。
- Vue3 项目中可以引入 vite-svg-loader。
- React 项目使用 vite-plugin-svgr 插件。

```js
pnpm i vite-plugin-svgr -D
```

```js
// vite.config.ts
import svgr from "vite-plugin-svgr";

{
  plugins: [
    // 其它插件省略
    svgr(),
  ];
}
```

随后注意要在 tsconfig.json 添加如下配置，否则会有类型错误:

```json
{
  "compilerOptions": {
    // 省略其它配置
    "types": ["vite-plugin-svgr/client"]
  }
}
```

#### 3.3.2 静态资源公共域名配置

```json
// .env 文件
VITE_IMG_BASE_URL=https://my-image-cdn.com
```

```js
// src/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // 自定义的环境变量
  readonly VITE_IMG_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

```html
<img src={new URL('./logo.png', import.meta.env.VITE_IMG_BASE_URL).href} />
```

#### 3.3.3 图片压缩

```js
pnpm i vite-plugin-imagemin -D
```

```js
//vite.config.ts
import viteImagemin from "vite-plugin-imagemin";

{
  plugins: [
    // 忽略前面的插件
    viteImagemin({
      // 无损压缩配置，无损压缩下图片质量不会变差
      optipng: {
        optimizationLevel: 7,
      },
      // 有损压缩配置，有损压缩下图片质量可能会变差
      pngquant: {
        quality: [0.8, 0.9],
      },
      // svg 优化
      svgo: {
        plugins: [
          {
            name: "removeViewBox",
          },
          {
            name: "removeEmptyAttrs",
            active: false,
          },
        ],
      },
    }),
  ];
}
```

#### 3.3.4 雪碧图优化

在实际的项目中我们还会经常用到各种各样的 svg 图标，虽然 svg 文件一般体积不大，但 Vite 中对于 svg 文件会始终打包成单文件，大量的图标引入之后会导致网络请求增加，大量的 HTTP 请求会导致网络解析耗时变长，页面加载性能直接受到影响。这个问题怎么解决呢？

Vite 中提供了 import.meta.glob 的语法糖来解决这种批量导入的问题，如上述的 import 语句可以写成下面这样:

```js
const icons = import.meta.glob("../../assets/icons/logo-*.svg");
```

在这里我们只需要同步加载即可，可以使用 import.meta.globEager 来完成:

```js
const icons = import.meta.globEager("../../assets/icons/logo-*.svg");
```

合并图标的方案也叫雪碧图，我们可以通过 vite-plugin-svg-icons 来实现这个方案，首先安装一下这个插件:

```js
pnpm i vite-plugin-svg-icons -D
```

```js
// vite.config.ts
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

{
  plugins: [
    // 省略其它插件
    createSvgIconsPlugin({
      iconDirs: [path.join(__dirname, "src/assets/icons")],
    }),
  ];
}
```

## 4. Vite 预构建

### 4.1 配置 include 的场景

```js
// vite.config.ts
optimizeDeps: {
  // 配置为一个字符串数组，将 `lodash-es` 和 `vue`两个包强制进行预构建
  include: ["lodash-es", "vue"];
}
```

#### 4.1.1 场景一: 动态 import

在某些动态 import 的场景下，由于 Vite 天然按需加载的特性，经常会导致某些依赖只能在运行时被识别出来。导致`二次预构建`

```js
// src/locales/zh_CN.js
import objectAssign from "object-assign";
console.log(objectAssign);

// main.tsx
const importModule = (m) => import(`./locales/${m}.ts`);
importModule("zh_CN");
```

二次预构建的成本也比较大。我们不仅需要把预构建的流程重新运行一遍，还得重新刷新页面，并且需要重新请求所有的模块。

可以通过 include 参数提前声明需要按需加载的依赖:

```js
// vite.config.ts
{
  optimizeDeps: {
    include: [
      // 按需加载的依赖都可以声明到这个数组里
      "object-assign",
    ];
  }
}
```

#### 4.1.2 场景二: 某些包被手动 exclude

在预构建中排除某个包的情况，需要注意它所依赖的包是否具有 ESM 格式

```js
// vite.config.ts
{
  optimizeDeps: {
    exclude: ["@loadable/component"];
  }
}
```

可以看到浏览器控制台会出现如下的报错:

![1](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e72fecff62ec477686aeb539ee66aa4e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp?)

这是为什么呢? 我们刚刚手动 exclude 的包@loadable/component 本身具有 ESM 格式的产物，但它的某个依赖 hoist-non-react-statics 的产物并没有提供 ESM 格式，导致运行时加载失败。

强制对`hoist-non-react-statics`这个间接依赖进行预构建:

```js
// vite.config.ts
{
  optimizeDeps: {
    include: [
      // 间接依赖的声明语法，通过`>`分开, 如`a > b`表示 a 中依赖的 b
      "@loadable/component > hoist-non-react-statics",
    ];
  }
}
```

### 4.2 第三方包出现问题

#### 4.2.1 patch-package

```js
pnpm i @milahu/patch-package -D
```

::: tip
注意: 要改动的包在 package.json 中必须声明确定的版本，不能有~或者^的前缀。
:::

接着，我们进入第三方库的代码中进行修改，先删掉无用的 import 语句，再在命令行输入

```js
npx patch-package react-virtualized
```

现在根目录会多出 patches 目录记录第三方包内容的更改，随后我们在 package.json 的 scripts 中增加如下内容：

```js
{
  "scripts": {
    // 省略其它 script
    "postinstall": "patch-package"
  }
}
```

#### 4.2.2 Esbuild 插件

```js
// vite.config.ts
const esbuildPatchPlugin = {
  name: "react-virtualized-patch",
  setup(build) {
    build.onLoad(
      {
        filter:
          /react-virtualized\/dist\/es\/WindowScroller\/utils\/onScroll.js$/,
      },
      async (args) => {
        const text = await fs.promises.readFile(args.path, "utf8");

        return {
          contents: text.replace(
            'import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";',
            ""
          ),
        };
      }
    );
  },
};

// 插件加入 Vite 预构建配置
{
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildPatchPlugin];
    }
  }
}
```

## 5. ESBuild 和 rollup

### 5.1 esbuild

Esbuild 作为打包工具也有一些缺点:

- 不支持`降级到 ES5` 的代码。这意味着在低端浏览器代码会跑不起来
- 不支持 `const enum` 等语法。这意味着单独使用这些语法在 esbuild 中会直接抛错。
- 不提供操作打包产物的接口，像 Rollup 中灵活`处理打包产物`的能力(如 renderChunk 钩子)在 Esbuild 当中完全没有。
- 不支持自定义 `Code Splitting` 策略。传统的 Webpack 和 Rollup 都提供了自定义拆包策略的 API，而 Esbuild 并未提供，从而降级了拆包优化的灵活性。
- Esbuild 并没有实现 TS 的类型系统，在编译 TS(或者 TSX) 文件时仅仅抹掉了类型相关的代码，暂时没有能力实现类型检查

Esbuild `转译 TS 或者 JSX` 的能力通过 Vite 插件提供, Vite 已经将 Esbuild 的 Transformer 能力用到了`生产环境`。

### 5.2 rollup

#### 5.2.1 生产环境 Bundle

```html
<head>
  <!-- 省略其它内容 -->
  <!-- 入口 chunk -->
  <script type="module" crossorigin src="/assets/index.250e0340.js"></script>
  <!--  自动预加载入口 chunk 所依赖的 chunk-->
  <link rel="modulepreload" href="/assets/vendor.293dca09.js" />
</head>
```

一般情况下，Rollup 打包之后，会先请求 A，然后浏览器在加载 A 的过程中才决定请求和加载 C，但 Vite 进行优化之后，请求 A 的同时会自动预加载 C，通过优化 Rollup 产物依赖加载方式节省了不必要的网络开销。

#### 5.2.2 兼容插件机制

无论是开发阶段还是生产环境，Vite 都根植于 Rollup 的插件机制和生态

## 6. 插件开发

### 6.1 虚拟模块

我们来尝试一下如何通过虚拟模块来读取内存中的变量

```js
import { Plugin, ResolvedConfig } from 'vite';

const virtualEnvModuleId = 'virtual:env';
const resolvedEnvVirtualModuleId = '\0' + virtualEnvModuleId;

export default function virtualFibModulePlugin(): Plugin {
  let config: ResolvedConfig | null = null;
  return {
    name: 'vite-plugin-virtual-fib-module',
    configResolved(c: ResolvedConfig) {
      config = c;
    },
    resolveId(id) {
      if (id === virtualEnvModuleId) {
        return resolvedEnvVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedEnvVirtualModuleId) {
        return `export default ${JSON.stringify(config!.env)}`;
      }
    }
  }
}
```

```js
// main.tsx
import env from "virtual:env";
console.log(env);
```

```js
// types/shim.d.ts
declare module 'virtual:*' {
  export default any;
}
```

### 6.2 调试技巧

另外，在开发调试插件的过程，我推荐大家在本地装上 vite-plugin-inspect 插件，并在 Vite 中使用它:

```js
// vite.config.ts
import inspect from "vite-plugin-inspect";

// 返回的配置
{
  plugins: [
    // 省略其它插件
    inspect(),
  ];
}
```
