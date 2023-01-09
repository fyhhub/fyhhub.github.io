# DllPlugin 实现原理

DllPlugin 手写实现
[源码实现地址](https://github.com/fyhhub/dll-plugin)

## 什么是 DLL

- DllPlugin 和 DllReferencePlugin 提供了拆分包的方法，可以极大地提高构建时性能。术语 DLL 代表动态链接库，它最初是由 Microsoft 引入的。
- .dll 为后缀的文件称为动态链接库，在一个动态链接库中可以包含给其他模块调用的函数和数据
- 把基础模块独立出来打包到单独的动态连接库里
- 当需要导入的模块在动态连接库里的时候，模块不能再次被打包，而是去动态连接库里获取

## 基础类

![WebpackClassDiagram6.jpg](http://tva1.sinaimg.cn/large/006vSZ9Ugy1gxa4nlyldjj319l0oytib.jpg)

## DllPlugin

### 流程图

![InkedDllPlugin5_LI.jpg](http://tva1.sinaimg.cn/large/006vSZ9Ugy1gxa4nw42t9j317o16fwk4.jpg)

### 实现步骤

1. 监听`entryOption`钩子，根据配置的入口模块，创建`DllEntryPlugin`

```js
compiler.hooks.entryOption.tap("DllPlugin", (context, entry) => {
  Object.keys(entry).forEach((name) => {
    new DllEntryPlugin(context, entry[name], name).apply(compiler);
  });
  return true;
});
```

2. `DllEntryPlugin`插件监听`compilation`钩子

   - 当出现`DllEntryDependency`依赖时，使用`dllModuleFactory`创建模块
   - 当出现`SingleEntryDependency`依赖时（入口模块依赖）, 使用`normalModuleFactory`创建模块

   ```js
   compiler.hooks.compilation.tap(
     "DllEntryPlugin",
     (compilation, { normalModuleFactory }) => {
       const dllModuleFactory = new DllModuleFactory();
       compilation.dependencyFactories.set(
         DllEntryDependency,
         dllModuleFactory
       );
       compilation.dependencyFactories.set(
         SingleEntryDependency,
         normalModuleFactory
       );
     }
   );
   ```

3. `DllEntryPlugin`插件监听`make`钩子，增加入口依赖，并从这里开始作为入口编译。

   ```js
   compiler.hooks.make.tapAsync("DllEntryPlugin", (compilation, callback) => {
     // 开始一次新的入口编译
     compilation.addEntry(
       this.context,
       new DllEntryDependency(
         this.entries.map((entry) => new SingleEntryDependency(entry)),
         this.name
       ),
       this.name,
       callback
     );
   });
   ```

4. `LibManifestPlugin`插件，监听`emit`钩子，遍历每个 chunk, 也就是我们配置的那些库模块，最后生成 manifest.json 配置

   ```js
   compiler.hooks.emit.tapAsync(
     "LibManifestPlugin",
     (compilation, callback) => {
       // 所有chunks执行这个函数， 当所有任务都done  才会执行callback
       const content = {};
       async.forEach(
         compilation.chunks,
         (chunk, done) => {
           const targetPath = this.options.path;
           const name = this.options.name;
           for (let module of chunk.modulesIterable) {
             if (module.libIdent) {
               const ident = module.libIdent({
                 context: compiler.options.context,
               });
               content[ident] = {
                 id: module.id,
               };
             }
           }
           const manifest = {
             name,
             content,
           };

           compiler.outputFileSystem.mkdirp(path.dirname(targetPath), (err) => {
             compiler.outputFileSystem.writeFile(
               targetPath,
               JSON.stringify(manifest),
               done
             );
           });
         },
         callback
       );
     }
   );
   ```

## DllReferencePlugin

## 流程图

![InkedDllReferencePlugin5_LI.jpg](http://tva1.sinaimg.cn/large/006vSZ9Ugy1gxa4o3919jj31he15k7b5.jpg)

## 实现步骤

1. `DllReferencePlugin`监听`compilation`和`compile`钩子

   - 当出现`DelegatedSourceDependency`依赖时，使用`normalModuleFactory`创建模块

   ```js
   compiler.hooks.compilation.tap(
     "DllReferencePlugin",
     (compilation, { normalModuleFactory }) => {
       compilation.dependencyFactories.set(
         DelegatedSourceDependency,
         normalModuleFactory
       );
     }
   );
   ```

   - 在即将开始编译时触发`compile`, 读取`manifest.json`内容，将我们配置的`library`的值作为外部依赖模块，创建`ExternalModuleFactoryPlugin`。

   ```js
   compiler.hooks.compile.tap(
     "DllReferencePlugin",
     ({ normalModuleFactory }) => {
       const manifest = this.options.manifest;
       const name = manifest.name;
       const content = manifest.content;
       const source = `dll-reference ${name}`;
       const external = {};
       external[source] = name;
       new ExternalModuleFactoryPlugin("var", external).apply(
         normalModuleFactory
       );

       new DelegatedModuleFactoryPlugin({
         source,
         context: compiler.options.context,
         content,
       }).apply(normalModuleFactory);
     }
   );
   ```

   然后初始化`DelegatedModuleFactoryPlugin`插件，用来修改我们使用的库，例如

   ```js
   const isarray = require('isarray')

   // 经过 DelegatedModuleFactoryPlugin 处理后

   module.exports = (
     __webpack_require__('dll-reference _dll_utils')("./node_modules/.pnpm/isarray@2.0.5/node_modules/isarray/index.js"))"
   ```

2. `ExternalModuleFactoryPlugin`监听`normalModuleFactory`的`factory`钩子
   如果发现 require 的是`dll-reference xxx`，就会创建一个`ExternalModule`替换掉原本的`NormalModule`

   ```js
   normalModuleFactory.hooks.factory.tap(
     "ExternalModuleFactoryPlugin",
     (factory) => (data, callback) => {
       const dependency = data.dependencies[0]; //DelegatedSourceDependency
       let request = dependency.request; // "dll-reference _dll_utils"
       let value = this.externals[request]; //_dll_utils
       if (value) {
         //如果是一个外部模块
         callback(
           null,
           new ExternalModule(value, "var", dependency.request) //_dll_utils
         );
       } else {
         //否则 是个普通模块 走老的普通模块工厂的生产模块的逻辑
         factory(data, callback);
       }
     }
   );
   ```

3. DelegatedModuleFactoryPlugin 插件, 监听`module`钩子，如果路径命中了 manifest 的 contents 中的路径，就创建`DelegatedModule`

```js
normalModuleFactory.hooks.module.tap(
  "DelegatedModuleFactoryPlugin",
  (module) => {
    if (module.libIdent) {
      const request = module.libIdent(this.options);
      // 匹配到了manifest里的content文件
      if (request && request in this.options.content) {
        const resolved = this.options.content[request];
        return new DelegatedModule(
          this.options.source, //dll-reference _dll_utils
          resolved, //{"id":"./node_modules/_is-promise@4.0.0@is-promise/index.js"}
          module //老模块
        );
      }
    }
    return module;
  }
);
```

4. DelegatedModule

```js
class DelegatedModule extends Module {
  // ... 省略

  /**
   * 直接返回源代码  用如下代码
   */
  source() {
    const str = `module.exports = (__webpack_require__('${
      this.sourceRequest
    }')(${JSON.stringify(this.request)}))`;
    return new RawSource(str);
  }
  /**
   * 1. 当代理模块被创建的时
   * 2. 不走原本的Build逻辑，例如ast解析，创建各种依赖
   * 3. 直接创建依赖，后面会递归解析这个DelegatedSourceDependency依赖
   * @param {*} options
   * @param {*} compilation
   * @param {*} resolver
   * @param {*} fs
   * @param {*} callback
   */
  build(options, compilation, resolver, fs, callback) {
    this.built = true;
    this.buildMeta = {};
    this.buildInfo = {};
    // 不走ast分析创建依赖  直接创建DelegatedSourceDependency依赖
    this.delegatedSourceDependency = new DelegatedSourceDependency(
      this.sourceRequest
    );
    this.addDependency(this.delegatedSourceDependency);
    callback();
  }
}
```
