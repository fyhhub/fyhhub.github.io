# 听说Umi的 MFSU 比 Vite 都要快？翻源码品一下！
# 一、前言

大家好，由于最近在研究如何提高项目启动速度，项目是基于webpack的，也找了很多方法。
最后试下来，有这么几种方式可以明显提升构建速度：

+ 使用 webpack5
+ 开启 webpack5 的持久化缓存（真的是相当快）
+ 开启webpack5 的实验特性 lazyCompilation （有点像vite， 访问页面的时候再去编译）

最后发现确实提升非常大， 项目从原本的`80s`直接降低到`20s`左右。但是，直到我看到了umi的mfsu，我就不淡定了：

[文档地址](https://umijs.org/blog/mfsu-faster-than-vite)

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d1865d0e50449e0a4a57a76cdfe2a12~tplv-k3u1fbpfcp-watermark.image?" alt="" width="70%" />

先说我自己试过后得出的结论（仅供参考）
+ 由于我们的项目比较大，感觉提升并不明显，与开启`cache`和`lazyCompilation` 感觉是差不多的，没有专业的计算过时间，但是基本都在`20s`左右构建完成。

+ 从官方提供的demo来看，mfsu确实非常快，而且不像`lazyCompilation`那样，进了页面还要编译一下。大家可以下载demo试试。
+ 比Vite快？说实话没感觉出来。


言归正传，MFSU的设计思想还是挺新鲜的。借助了模块联邦，将三方模块提前打包。其实这一点与Vite的预编译挺像的。

好了，下面介绍下webpack5项目如何接入`mfsu` 以及 `mfsu`的原理。


# 二、MFSU接入

如何在没有使用umi的项目中接入呢？首先你的构建工具必须是`webpack5`。下面跟我一块配置吧：

### 1. 安装
```
npm i @umijs/mfsu -D
```

### 2. 初始化实例
```js
const { MFSU } = require('@umijs/mfsu')
const webpack = require('webpack')

const mfsu = new MFSU({
  implementor: webpack,
  buildDepWithESBuild: false, // 如果你项目装了esbuild, 可以开启，设置为true
});
```

### 3. 添加中间件

```
module.exports = {
  devServer: {
    // [mfsu] 2. add mfsu middleware
    setupMiddlewares(middlewares, devServer) {
      middlewares.unshift(
        ...mfsu.getMiddlewares()
      )
      return middlewares
    },
  }
}
```

### 4. 配置babel插件
```js
// webpack.config.js
 
module.exports = {
  module: {
    rules: [
      // handle javascript source loader
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              // [mfsu] 3. add mfsu babel plugins
              ...mfsu.getBabelPlugins()
            ]
          }
        }
      }
    ]
  }
}
```

### 5. 设置Webpack配置
注意：下面需要传入两个config, 一个是你的webpack配置，一个是depConfig 用来打包依赖的配置。
```js
const depConfig = {
  output: {},
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
    ],
  },
  plugins: [],
};

const getConfig = async () => {
  await mfsu.setWebpackConfig({
    config, // 你的webpack配置
    depConfig
  });
  return config
}
 
module.exports = getConfig()
```

OK，这样就配置好了，你以为可以运行了？然后各种坑就接踵而来，一个错仿佛连着下一个错。

下面列一下我在接入后踩得各种坑


# 三、MFSU踩坑


### cannot found './xxx' module
提示找不到模块，这是因为入口不能是相对路径，有人也提了[issue](https://github.com/umijs/umi/issues/9799)

### Loading Script failed


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec38513fdfb8414e8cb62c8b2885552d~tplv-k3u1fbpfcp-watermark.image?)

这个情况基本无解，你会发现用webpack打包依赖，没有生成 `MFSU_CACHE.json` 和 `mf-va_remoteEntry.js`，所以必须用esbuild打包依赖。

```js
new MFSU({
  implementor: webpack,
  buildDepWithESBuild: true, // 使用esbuild打包依赖
})
```

### 排除external
如果你的项目用到了`vue`, `vuex`, `vue-router`， 并且它们是CDN的方式引入，那肯定会报错的，为什么呢？因为模块联邦远程代码的加载是异步的，而CDN的代码在加载完成后，代码执行是同步的。你的远程模块还没加载过来，就执行过去了。

所以需要用`MFSU`的配置排除一下：
```js
new MFSU({
    implementor: webpack,
    buildDepWithESBuild: true,
    unMatchLibs: [ // 排除一下 lib
      /vue/,
      /vuex/,
      /vue-router/
    ],
  })
```



# 四、MFSU的执行过程

MFSU的执行过程，可以分为两部分：

+ 本地应用构建（其实就是你的项目）
+ 远程应用构建（你的项目所依赖的lib, 会被当做远程应用）


## 本地应用

### 1. 初始化阶段

#### （1）初始化MFSU配置
首先会创建`new MFSU`实例，在构造函数中会做这些事：

 + 从静态缓存文件`MFSU_CACHE.json` 中获取模块依赖配置
 + 遍历`MFSU_CACHE.json` 直接生成模块树，这一步是为了跳过在你项目编译中的依赖收集的过程。


#### （2）设置babel插件
设置了babel插件，简单来讲，就是用来`收集三方模块依赖` 和 `替换模块资源路径`， 这一块我们下面讲。
#### （3）设置中间件
设置中间件，中间的作用是为了为了响应远程应用的资源，因为我们知道mfsu打包后会生成`mf-va_remoteEntry.js`

#### （4）设置webpack配置
这一步就很关键了，主要分为以下几点：

+ **创建虚拟入口模块**
   
  用`import('src/index.ts')`作一个重新导入，这里为什么要把你的入口变成动态导入呢？原因也很简单：**模块联邦的加载是异步的，而入口文件的执行是同步的**。MFSU相当于创建了一个虚拟入口，然后动态导入了你的入口。
  
  可以看到它使用`WebpackVirtualModules`这个插件来实现的。
  
    ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0f2d8387d48847fbb17d0dff53732b32~tplv-k3u1fbpfcp-watermark.image?)
    
    
+ **创建本地模块联邦应用**
  
  在这里，musu给你的webpack配置注入了模块联邦插件，并且直接`把你的项目启动Server作为了远程应用的Server`.
  
    <img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9a66afb085b842bd80c50843c15794b3~tplv-k3u1fbpfcp-watermark.image?" alt="" width="70%" />
    
  它的远程路径为 `mf@/mf-va_remoteEntry.js`, `/`其实就是代表当前项目启动的`Server`


+ **监听done事件**
    
  下面mfsu继续注入了`BuildDepPlugin`, 目的是监听`done`事件，等你的项目编译完成后，就开始正式打包远程应用。
    
    ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51ecd0ad939e46449fc35a70add2b681~tplv-k3u1fbpfcp-watermark.image?)


### 2. 构建阶段

在上面，mfsu做了一系列的初始化操作，过程也非常简单。那么在项目构建过程中，又发生了什么呢？

#### （1）替换依赖的source

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68c1b7edad9f4989a7e89e3da8e24440~tplv-k3u1fbpfcp-watermark.image?)

可以看到，babel在分析`Program`这个节点时，先获取到body上的ast节点，然后去修改了source

```js
node.source.value = replaceValue;
```

举个例子：
```js
import Vue from 'vue'
```
如果匹配到vue是一个三方模块，那么它的路径会被修改为
```js
import Vue from 'mf/vue'
```
 最后访问页面时，实际会去请求`远程应用`的模块。

#### （2）babel插件收集依赖

在编译完成后的插件post方法中，将所有的依赖给收集起来。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa3d0afa3766446f92555ad4e3f2a34c~tplv-k3u1fbpfcp-watermark.image?)



## 远程应用


### 1. 触发依赖构建
前面说到，在`BuildDepPlugin`插件中，监听了`done`事件，项目编译完成后，会触发依赖`build`。

但在构建前，需要判断`shouldBuild`， 如果依赖和缓存中的依赖对比，没有发生变化，可以直接`跳过依赖构建`

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d316eabcc2434973afc1459dd81e8302~tplv-k3u1fbpfcp-watermark.image?)

没有命中缓存，就重新构建依赖。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b799aa84902407781bb7640c944cb6d~tplv-k3u1fbpfcp-watermark.image?" alt="" width="60%" />

可以看到，我们可以选择用`webpack`还是`esbuild`打包
```js
if (this.opts.mfsu.opts.buildDepWithESBuild) {
    await this.buildWithESBuild(buildOpts);
} else {
    await this.buildWithWebpack(buildOpts);
}
```

### 2. webpack是如何打包依赖的
说到用webpack打包依赖，大家应该想起前面的`depConfigs`，它是用来打包依赖的webpack配置。


在`getWebpackConfig`方法中，mfsu 对配置做了一些修改。
```js
 getWebpackConfig(opts: { deps: Dep[] }) {
    const mfName = this.opts.mfsu.opts.mfName!;
    const depConfig = lodash.cloneDeep(this.opts.mfsu.depConfig!);

    // 。。。其他
    depConfig.entry = join(this.opts.mfsu.opts.tmpBase!, MF_ENTRY);

    // ... 其他
    const exposes = opts.deps.reduce<Record<string, string>>((memo, dep) => {
      memo[`./${dep.file}`] = join(this.opts.mfsu.opts.tmpBase!, dep.filePath);
      return memo;
    }, {});
    depConfig.plugins.push(
      new this.opts.mfsu.opts.implementor.container.ModuleFederationPlugin({
        library: {
          type: 'global',
          name: mfName,
        },
        name: mfName,
        filename: REMOTE_FILE_FULL,
        exposes,
        shared: this.opts.mfsu.opts.shared || {},
      }),
    );
    return depConfig;
  }
```

可以看到，核心主要有两块
+ 设置了依赖构建的入口，也就是`.mfsu/mf_index.js`，这个文件其实没有任何作用，只是为了让webpack不报错。

+ 注入了`ModuleFederationPlugin`, 并把依赖通过`exposes`暴露出来
  
  可以看到，下面的代码中，遍历了所有三方依赖，并且生成了最终的`exposes`
  ```js
  const exposes = opts.deps.reduce<Record<string, string>>((memo, dep) => {
      memo[`./${dep.file}`] = join(this.opts.mfsu.opts.tmpBase!, dep.filePath);
      return memo;
    }, {});
  ```

打包完成后可以看到下面的文件：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8085d991580847fd8f13470a701a7d9f~tplv-k3u1fbpfcp-watermark.image?)

随便打开一个：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/75e601270a9f4c62926a593849a0f9b1~tplv-k3u1fbpfcp-watermark.image?)

发现仅仅是把模块导出来了。为什么会这样呢？

你可以把`.mfsu目录`想象成一个远程应用，如果你想暴露出模块，是不是必须这样写：
```js
new ModuleFederationPlugin({
   exposes: {
      "./button": "./src/button"
   }
})
```
你得保证这个文件存在呀！那么打包后的代码在哪里呢？

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fcb155fda4f2475a9dbf7087c337a89e~tplv-k3u1fbpfcp-watermark.image?)

其实全都在`mf-va_remoteEntry.js`这个文件里面。


### 3. esbuild是如何打包依赖的
我们先来思考一个问题，esbuild 我们知道，是没有模块联邦插件的。也不可能实现这些功能，那么有没有可能模块联邦其实就是一堆代码模板。

没错~模块联邦的运行时代码，其实非常固定，我们能直接套过来。


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/85a884d61d2948f4a24d61dc47d2951e~tplv-k3u1fbpfcp-watermark.image?)


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a87e316c9f24342be8c6ecee781d0b0~tplv-k3u1fbpfcp-watermark.image?)


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb787aad3afe43539088487ab1725bac~tplv-k3u1fbpfcp-watermark.image?)
可以看到mfsu模拟实现了webpack打包模块联邦后的代码，esbuild只提供生成依赖模块的代码。

其详细实现，大家可以自行研究。


# 五、MFSU概览和总结

![image2022-11-25_13-59-40.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cef4446379ae44a7a8f60a0e0ae7b03b~tplv-k3u1fbpfcp-watermark.image?)

我们来总结一下过程

+ 本地应用
   
   - 首先加载缓存依赖树
   - 注入babel插件
   - 注入中间件
   - 注入模块联邦插件（本地）
   - 分析依赖（替换资源、收集依赖）
   - 生成新的依赖树

+ 远程应用
   
   - 监听构建完成
   - 判断是否命中缓存，可以跳过依赖构建
   - 注入模块联邦插件（远程），根据依赖生成exposes。
   - 写入缓存`MFSU_CACHE.json`, 打包生成`mf-va_remoteEntry.js`





# 六、结语
在看了mfsu源码后，发现模块联邦竟然还能这么玩。

**但是坑感觉比较多。另外对项目的优化，目前没有感觉提升明显，或许是哪里配置有问题 或许使用姿势不正确 ?**

欢迎大家讨论和指正~ 