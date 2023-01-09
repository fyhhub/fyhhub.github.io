# babel polyfill

```js
npm i @babel/plugin-transform-runtime @babel/runtime-corejs3 @babel/preset-env


{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-typescript"
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
}
```
