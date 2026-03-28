# npmlog 使用

```js
const log = require("npmlog");

log.level = process.env.LOG_LEVEL || "info"; // 低于level 不会显示
log.heading = "leek"; // 前缀
log.headingStyle = { fg: "white", bg: "red" }; // 修改前缀样式
log.addLevel("success", 2000, { fg: "green", bold: true }); // 自定义命令

module.exports = log;
```
