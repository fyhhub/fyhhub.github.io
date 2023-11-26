# tsup

## 快速创建一个node打包配置
```js
{
  "tsup": {
    "entry": "./src/index.ts",
    "target": "node14",
    "outDir": "dist",
    "format": ["cjs", "esm"],
    "dts": true,
    "clean": true,
    "platform": "node",
    "cjsInterop": true
  },
}
```