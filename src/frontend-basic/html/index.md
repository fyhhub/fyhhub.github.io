# HTML

## 1. Doctype 作用

DOCTYPE 是用来声明文档类型和 DTD 规范的。 `<!DOCTYPE html>`声明位于 HTML 文档中的第一行，不是一个 HTML 标签，处于 html 标签之前。告知浏览器的解析器用什么文档标准解析这个文档。DOCTYPE 不存在或格式不正确会导致文档以兼容模式呈现。

## 2. 对 HTML 语义化的理解

语义化的优点如下：

- 有利于 SEO
- 增强了可读性，便于团队的开发与维护
- 无障碍阅读

## 3. script 标签中 defer 和 async 的区别

默认会下载资源，等资源下载完成后再执行代码

**defer:** 遇到 script 标签，直接下载，等待 HTML 解析完成之后，再执行脚本
**async:** 遇到 script 标签，直接下载，不阻塞 HTML 解析，当下载完成后，直接执行，可能会阻塞部分 HTML 解析