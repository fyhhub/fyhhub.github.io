# Webpack 插件开发技巧汇总

## 一、AST 操作

```js
compiler.hooks.normalModuleFactory.tap("demo", (normalModuleFactory) => {
  const handler = (parser) => {
    parser.hooks.xxx.tap("demo", (statement, source) => {
    });
  }

  // 监听 `parser` 钩子
  normalModuleFactory.hooks.parser
    .for("javascript/auto")
    .tap("demo", handler);
  normalModuleFactory.hooks.parser
    .for("javascript/dynamic")
    .tap("demo", handler);
  normalModuleFactory.hooks.parser
    .for("javascript/esm")
    .tap("demo", handler);
})


```

### 1. 获取 import 或 require 依赖

```js
compiler.hooks.normalModuleFactory.tap("demo", (normalModuleFactory) => {
  normalModuleFactory.hooks.parser
    .for("javascript/auto")
    .tap("demo", (parser) => {
      parser.hooks.import.tap("demo", (statement, source) => {
        // statement: ImportDeclaration节点
        // source 引用的模块
      });
      parser.hooks.call.for("require").tap("demo", (statement) => {
        // statement: CallExpression 调用表达式节点
      });
    });
});
```

### 2. 表达式等
```js
compiler.hooks.normalModuleFactory.tap("demo", (normalModuleFactory) => {
  normalModuleFactory.hooks.parser
    .for("javascript/auto")
    .tap("demo", (parser) => {
      // 处理表达式ast
      parser.hooks.expression.for(key).tap("demo", (expr) => {
        /*...*/
      });

      // 处理typeof xxx
      parser.hooks.typeof.for(key).tap("demo", (expr) => {
        /*...*/
      });
    });
});
```

## 二、模块

### 1. 自定义模块工厂

注意：**factorize 钩子是 webpack5 新增的**

```js
normalModuleFactory.hooks.factorize.tapAsync(
  "AutoExternalPlugin",
  (resolveData, callback) => {
    const { request } = resolveData;
    // 当请求的模块是jquery  使用ExternalModule 创建模块
    if (request === "jquery") {
      callback(null, new ExternalModule("$", "window", "jquery"));
    } else {
      callback(null);
    }
  }
);
```

最后生成如下代码

```js
{
"jquery": ((module) => {
    "use strict";
    module.exports = window["$"];
  })
}

```

### 2. 获取三方模块的 package.json 内容

```js
compiler.hooks.compilation.tap(
  "demo",
  (compilation, { normalModuleFactory }) => {
    normalModuleFactory.hooks.module.tap("demo", (module, data) => {
      const resolveData = data.resourceResolveData;
      if (resolveData && resolveData.descriptionFileData) {
        const pkg = resolveData.descriptionFileData;
        // 获取到package.json内容
      }
      return module;
    });
  }
);
```


### 3. 单个模块编译完成后
```js
compilation.hooks.succeedModule.tap('demo', ({ resource }) => {
  // TODO
});
```

### 4. 获取多个模块编译完成后

```js
compilation.hooks.finishModules.tap('demo', () => {
  // TODO
});
```

## 三、index.html 操作

### 1. 插入标签

`htmlData`包含`assetTags`可自定义最终要生成的脚本或 css 文件

```js
compiler.hooks.compilation.tap("demo", (compilation) => {
  HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tap(
    "demo",
    (htmlData) => {
      // assetTags: { scripts: [], styles: [], meta: [] }
      const assetTags = htmlData.assetTags;
      return htmlData;
    }
  );
});
```

`assetTags`结构如下

```js
assetTags: {
  scripts: [
    {
      tagName: 'script',
      voidTag: false,
      meta: { plugin: 'html-webpack-plugin' },
      attributes: { defer: true, type: undefined, src: 'main.js' }
    }
  ],
  styles: [],
  meta: []
}
```

### 2. 生成资源标签前的回调

```js
compiler.hooks.compilation.tap("PreloadWebpackPlugin", (compilation) => {
  // 在准备生成资源标签之前执行
  HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
    "demo",
    (htmlData, callback) => {
      // 正常callback就好
      callback();
    }
  );
});
```

四、资源操作

### 1. 修改资源列表
```js
map(compilation.assets, (asset, filename) => {
  // 读取产物内容
  const assetSource = asset.source()
  // 之后，使用优化版本替换原始文件
  compilation.assets[filename] = new RawSource(新代码内容)
})
```


五、日志系统

### 1. 添加日志

push Error对象

```js
compilation.warnings.push(warnings);

compilation.errors.push(errors);
```