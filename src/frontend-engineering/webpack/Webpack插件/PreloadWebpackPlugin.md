# PreloadWebpackPlugin 插件实现

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");

class PreloadWebpackPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap("PreloadWebpackPlugin", (compilation) => {
      // 在准备生成资源标签之前执行
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        "PreloadWebpackPlugin",
        (htmlData, callback) => {
          this.generateLinks(compilation, htmlData, callback);
        }
      );
    });

    compiler.hooks.compilation.tap("PreloadWebpackPlugin", (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tap(
        "PreloadWebpackPlugin",
        (htmlData) => {
          const { resourceHints } = this;
          if (resourceHints) {
            // 修改生成的标签
            htmlData.assetTags.styles = [
              ...resourceHints,
              ...htmlData.assetTags.styles,
            ];
          }
          return htmlData;
        }
      );
    });
  }

  generateLinks(compilation, htmlData, callback) {
    const { rel, include } = this.options;
    //本次编译产出的代码块
    let chunks = [...compilation.chunks];
    if (include === undefined || include === "asyncChunks") {
      //如果chunk.canBeInitial()为true,说明这是一个入口代码块
      //过滤一下，只留下异步代码块
      chunks = chunks.filter((chunk) => !chunk.canBeInitial());
    }

    // 筛选异步代码块对应的文件
    let allFiles = chunks.reduce((accumulated, chunk) => {
      return accumulated.add(...chunk.files);
    }, new Set());

    const links = [];
    // 创建Link标签对象数组
    for (const file of allFiles.values()) {
      links.push({
        tagName: "link",
        attributes: {
          rel, //preload prefetch
          href: file,
        },
      });
    }

    this.resourceHints = links;
    callback();
  }
}

module.exports = PreloadWebpackPlugin;
```
