# node环境下debug模式设置

```js
const prefix = 'devflow';

const debugIndex = process.argv.findIndex(arg => /^(?:-d|--debug)$/.test(arg));
// 判断是否存在 --debug
if (debugIndex > 0) {
  let value = process.argv[debugIndex + 1];
  if (!value || value.startsWith('-')) {
    value = `${prefix}:*`;
  } else {
    // support debugging multiple flags with comma-separated list
    value = value
      .split(',')
      .map(v => `${prefix}:${v}`)
      .join(',');
  }
  process.env.DEBUG = `${
    process.env.DEBUG ? process.env.DEBUG + ',' : ''
  }${value}`;
}
```