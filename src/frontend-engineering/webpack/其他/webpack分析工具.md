# webpack 分析工具

## stats

```js
// webpack.config.js
module.exports = {
  // ...
  profile: true,
};
```

```js
npx webpack --json=stats.json
```

或通过事件done来生成
```js
function(compiler) {
  compiler.hooks.done.tap('json', (stats) => {
    require('fs').writeFileSync('./stats.json', JSON.stringify(stats.toJson(), null, 2))
  })
}
```

最终生成`stats.json`文件，可以在[webpack analyse](https://webpack.github.io/analyse/) 查看

## statoscope

[https://statoscope.tech/](https://statoscope.tech/)

```js
yarn add -D @statoscope/webpack-plugin
```

```js
const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default;

module.exports = {
  ...
  plugins: [new StatoscopeWebpackPlugin()],
};
```

## Webpack Bundle Analyzer

```js
yarn add -D webpack-bundle-analyzer
```

```js
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  ...
  plugins: [new BundleAnalyzerPlugin()],
};
```

## Webpack Dashboard

webpack-dashboard 是一个命令行可视化工具，能够在编译过程中实时展示编译进度、模块分布、产物信息等，用法：

```js
yarn add -D webpack-dashboard
```

```js
const DashboardPlugin = require("webpack-dashboard/plugin");

module.exports = {
  // ...
  plugins: [new DashboardPlugin()],
};
```

```shell
# 打包
npx webpack-dashboard -- webpack
# Dev Server
npx webpack-dashboard -- webpack-dev-server
# 运行 Node 程序
npx webpack-dashboard -- node index.js
```

## UnusedWebpackPlugin

查找未使用的文件

```js
const UnusedWebpackPlugin = require("unused-webpack-plugin");

module.exports = {
  // ...
  plugins: [
    new UnusedWebpackPlugin({
      directories: [path.join(__dirname, "src")],
      root: path.join(__dirname, "../"),
    }),
  ],
};
```
