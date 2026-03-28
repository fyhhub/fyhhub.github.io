# Vite 生产环境 _plugin-vue_export-helper 文件 404 问题

若在vue中使用了异步组件`（defineAsyncComponent）`，则最终构建产物中可能会出现名为`_plugin-vue_export-helper.hash.js`的文件。
但部分web服务器无法处理以_开头的文件（如golang中的http.FileServer或Github Pages），这将导致响应404。


## 解决方案

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g;
const DRIVE_LETTER_REGEX = /^[a-z]:/i;

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        // https://github.com/rollup/rollup/blob/master/src/utils/sanitizeFileName.ts
        sanitizeFileName(fileName) {
          const match = DRIVE_LETTER_REGEX.exec(fileName);
          const driveLetter = match ? match[0] : "";
          return (
            driveLetter +
            fileName.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "")
          );
        },
      },
    },
  },
});
```