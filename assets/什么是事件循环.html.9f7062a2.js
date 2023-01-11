import{_ as i}from"./plugin-vueexport-helper.2444895f.js";import{o as l,c as t,a as e,b as o,e as c,d as r,r as s}from"./app.6bdc584a.js";const d={},n=r('<h1 id="\u4EC0\u4E48\u662F\u4E8B\u4EF6\u5FAA\u73AF" tabindex="-1"><a class="header-anchor" href="#\u4EC0\u4E48\u662F\u4E8B\u4EF6\u5FAA\u73AF" aria-hidden="true">#</a> \u4EC0\u4E48\u662F\u4E8B\u4EF6\u5FAA\u73AF</h1><h2 id="\u5B8F\u4EFB\u52A1\u548C\u5FAE\u4EFB\u52A1" tabindex="-1"><a class="header-anchor" href="#\u5B8F\u4EFB\u52A1\u548C\u5FAE\u4EFB\u52A1" aria-hidden="true">#</a> \u5B8F\u4EFB\u52A1\u548C\u5FAE\u4EFB\u52A1</h2><p><strong>\u5B8F\u4EFB\u52A1</strong></p><ul><li>script(\u6574\u4F53\u4EE3\u7801)</li><li>setTimeout</li><li>setInterval</li><li>setImmediate</li><li>MessageChannel</li><li>I/O</li></ul><p><strong>\u5FAE\u4EFB\u52A1</strong></p><ul><li>process.nextTick</li><li>Promise</li><li>Async/Await(\u5B9E\u9645\u5C31\u662F promise)</li><li>MutationObserver \uFF08\u56DE\u8C03\u51FD\u6570\u4F1A\u8FDB\u5165\u5FAE\u4EFB\u52A1\u961F\u5217\uFF09</li></ul><h2 id="\u6D4F\u89C8\u5668\u4E8B\u4EF6\u5FAA\u73AF" tabindex="-1"><a class="header-anchor" href="#\u6D4F\u89C8\u5668\u4E8B\u4EF6\u5FAA\u73AF" aria-hidden="true">#</a> \u6D4F\u89C8\u5668\u4E8B\u4EF6\u5FAA\u73AF</h2><p>\u603B\u7684\u7ED3\u8BBA\u5C31\u662F\uFF0C\u6267\u884C\u5B8F\u4EFB\u52A1\uFF0C\u7136\u540E\u6267\u884C\u8BE5\u5B8F\u4EFB\u52A1\u4EA7\u751F\u7684\u5FAE\u4EFB\u52A1\uFF0C\u82E5\u5FAE\u4EFB\u52A1\u5728\u6267\u884C\u8FC7\u7A0B\u4E2D\u4EA7\u751F\u4E86\u65B0\u7684\u5FAE\u4EFB\u52A1\uFF0C\u5219\u7EE7\u7EED\u6267\u884C\u5FAE\u4EFB\u52A1\uFF0C\u5FAE\u4EFB\u52A1\u6267\u884C\u5B8C\u6BD5\u540E\uFF0C\u518D\u56DE\u5230\u5B8F\u4EFB\u52A1\u4E2D\u8FDB\u884C\u4E0B\u4E00\u8F6E\u5FAA\u73AF\u3002</p><h2 id="node-\u4E8B\u4EF6\u5FAA\u73AF" tabindex="-1"><a class="header-anchor" href="#node-\u4E8B\u4EF6\u5FAA\u73AF" aria-hidden="true">#</a> Node \u4E8B\u4EF6\u5FAA\u73AF</h2><p>node \u7684\u4E8B\u4EF6\u5FAA\u73AF\u7684\u9636\u6BB5\u987A\u5E8F\u4E3A\uFF1A \u8F93\u5165\u6570\u636E\u9636\u6BB5(incoming data)-&gt;\u8F6E\u8BE2\u9636\u6BB5(poll)-&gt;\u68C0\u67E5\u9636\u6BB5(check)-&gt;\u5173\u95ED\u4E8B\u4EF6\u56DE\u8C03\u9636\u6BB5(close callback)-&gt;\u5B9A\u65F6\u5668\u68C0\u6D4B\u9636\u6BB5(timers)-&gt;I/O \u4E8B\u4EF6\u56DE\u8C03\u9636\u6BB5(I/O callbacks)-&gt;\u95F2\u7F6E\u9636\u6BB5(idle, prepare)-&gt;\u8F6E\u8BE2\u9636\u6BB5...</p><p>\u9636\u6BB5\u6982\u8FF0</p><ul><li>\u5B9A\u65F6\u5668\u68C0\u6D4B\u9636\u6BB5(timers)\uFF1A\u672C\u9636\u6BB5\u6267\u884C timer \u7684\u56DE\u8C03\uFF0C\u5373 setTimeout\u3001setInterval \u91CC\u9762\u7684\u56DE\u8C03\u51FD\u6570\u3002</li><li>I/O \u4E8B\u4EF6\u56DE\u8C03\u9636\u6BB5(I/O callbacks)\uFF1A\u6267\u884C\u5EF6\u8FDF\u5230\u4E0B\u4E00\u4E2A\u5FAA\u73AF\u8FED\u4EE3\u7684 I/O \u56DE\u8C03\uFF0C\u5373\u4E0A\u4E00\u8F6E\u5FAA\u73AF\u4E2D\u672A\u88AB\u6267\u884C\u7684\u4E00\u4E9B I/O \u56DE\u8C03\u3002</li><li>\u95F2\u7F6E\u9636\u6BB5(idle, prepare)\uFF1A\u4EC5\u7CFB\u7EDF\u5185\u90E8\u4F7F\u7528\u3002</li><li>\u8F6E\u8BE2\u9636\u6BB5(poll)\uFF1A\u68C0\u7D22\u65B0\u7684 I/O \u4E8B\u4EF6;\u6267\u884C\u4E0E I/O \u76F8\u5173\u7684\u56DE\u8C03\uFF08\u51E0\u4E4E\u6240\u6709\u60C5\u51B5\u4E0B\uFF0C\u9664\u4E86\u5173\u95ED\u7684\u56DE\u8C03\u51FD\u6570\uFF0C\u90A3\u4E9B\u7531\u8BA1\u65F6\u5668\u548C setImmediate() \u8C03\u5EA6\u7684\u4E4B\u5916\uFF09\uFF0C\u5176\u4F59\u60C5\u51B5 node \u5C06\u5728\u9002\u5F53\u7684\u65F6\u5019\u5728\u6B64\u963B\u585E\u3002</li><li>\u68C0\u67E5\u9636\u6BB5(check)\uFF1AsetImmediate() \u56DE\u8C03\u51FD\u6570\u5728\u8FD9\u91CC\u6267\u884C</li><li>\u5173\u95ED\u4E8B\u4EF6\u56DE\u8C03\u9636\u6BB5(close callback)\uFF1A\u4E00\u4E9B\u5173\u95ED\u7684\u56DE\u8C03\u51FD\u6570\uFF0C\u5982\uFF1Asocket.on(&#39;close&#39;, ...)\u3002</li></ul><h3 id="poll-\u9636\u6BB5" tabindex="-1"><a class="header-anchor" href="#poll-\u9636\u6BB5" aria-hidden="true">#</a> poll \u9636\u6BB5</h3><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/2/1709951e65ffe00e~tplv-t2oaga2asx-watermark.awebp" alt="poll\u9636\u6BB5" loading="lazy"></p><ul><li><p>\u5982\u679C\u5F53\u524D<code>\u5DF2\u7ECF\u5B58\u5728\u5B9A\u65F6\u5668</code>\uFF0C\u800C\u4E14\u6709<code>\u5B9A\u65F6\u5668\u5230\u65F6\u95F4\u4E86</code>\uFF0C\u62FF\u51FA\u6765\u6267\u884C\uFF0CeventLoop \u5C06\u56DE\u5230 <code>timers \u9636\u6BB5</code>\u3002</p></li><li><p>\u5982\u679C<code>\u6CA1\u6709\u5B9A\u65F6\u5668</code>, \u4F1A\u53BB\u770B<code>\u56DE\u8C03\u51FD\u6570\u961F\u5217</code>\u3002</p><ul><li><p>\u5982\u679C poll \u961F\u5217\u4E0D\u4E3A\u7A7A\uFF0C\u4F1A\u904D\u5386\u56DE\u8C03\u961F\u5217\u5E76\u540C\u6B65\u6267\u884C\uFF0C\u76F4\u5230\u961F\u5217\u4E3A\u7A7A\u6216\u8005\u8FBE\u5230\u7CFB\u7EDF\u9650\u5236</p></li><li><p>\u5982\u679C poll \u961F\u5217\u4E3A\u7A7A\u65F6\uFF0C\u4F1A\u6709\u4E24\u4EF6\u4E8B\u53D1\u751F</p><ul><li>\u5982\u679C\u6709 <code>setImmediate</code> \u56DE\u8C03\u9700\u8981\u6267\u884C\uFF0Cpoll \u9636\u6BB5\u4F1A\u505C\u6B62\u5E76\u4E14\u8FDB\u5165\u5230 <code>check \u9636\u6BB5</code>\u6267\u884C\u56DE\u8C03</li><li>\u5982\u679C\u6CA1\u6709 <code>setImmediate</code> \u56DE\u8C03\u9700\u8981\u6267\u884C\uFF0C\u4F1A<code>\u7B49\u5F85\u56DE\u8C03\u88AB\u52A0\u5165\u5230\u961F\u5217\u4E2D</code>\u5E76\u7ACB\u5373\u6267\u884C\u56DE\u8C03\uFF0C\u8FD9\u91CC\u540C\u6837\u4F1A\u6709\u4E2A\u8D85\u65F6\u65F6\u95F4\u8BBE\u7F6E\u9632\u6B62\u4E00\u76F4\u7B49\u5F85\u4E0B\u53BB,<code>\u4E00\u6BB5\u65F6\u95F4\u540E\u81EA\u52A8\u8FDB\u5165 check \u9636\u6BB5</code>\u3002</li></ul></li></ul></li></ul><h3 id="check" tabindex="-1"><a class="header-anchor" href="#check" aria-hidden="true">#</a> check</h3><p>check \u9636\u6BB5\u3002\u8FD9\u662F\u4E00\u4E2A\u6BD4\u8F83\u7B80\u5355\u7684\u9636\u6BB5\uFF0C\u76F4\u63A5\u6267\u884C setImmdiate \u7684\u56DE\u8C03\u3002</p><h3 id="process-nexttick" tabindex="-1"><a class="header-anchor" href="#process-nexttick" aria-hidden="true">#</a> process.nextTick</h3><p>process.nextTick \u662F\u4E00\u4E2A\u72EC\u7ACB\u4E8E eventLoop \u7684\u4EFB\u52A1\u961F\u5217\u3002 \u5728\u6BCF\u4E00\u4E2A eventLoop \u9636\u6BB5\u5B8C\u6210\u540E\u4F1A\u53BB\u68C0\u67E5 nextTick \u961F\u5217\uFF0C\u5982\u679C\u91CC\u9762\u6709\u4EFB\u52A1\uFF0C\u4F1A\u8BA9\u8FD9\u90E8\u5206\u4EFB\u52A1\u4F18\u5148\u4E8E\u5FAE\u4EFB\u52A1\u6267\u884C\u3002</p><ul><li><p>\u5728 node11 \u4E4B\u524D\uFF0C\u56E0\u4E3A\u6BCF\u4E00\u4E2A eventLoop \u9636\u6BB5\u5B8C\u6210\u540E\u4F1A\u53BB\u68C0\u67E5 nextTick \u961F\u5217\uFF0C\u5982\u679C\u91CC\u9762\u6709\u4EFB\u52A1\uFF0C\u4F1A\u8BA9\u8FD9\u90E8\u5206\u4EFB\u52A1\u4F18\u5148\u4E8E\u5FAE\u4EFB\u52A1\u6267\u884C</p></li><li><p>\u5728 node11 \u4E4B\u540E\uFF0Cprocess.nextTick \u662F\u5FAE\u4EFB\u52A1\u7684\u4E00\u79CD,\u662F\u5148\u8FDB\u5165 check \u9636\u6BB5\uFF0C\u6267\u884C\u4E00\u4E2A setImmediate \u5B8F\u4EFB\u52A1\uFF0C\u7136\u540E\u6267\u884C\u5176\u5FAE\u4EFB\u52A1\u961F\u5217\uFF0C\u518D\u6267\u884C\u4E0B\u4E00\u4E2A\u5B8F\u4EFB\u52A1\u53CA\u5176\u5FAE\u4EFB\u52A1</p></li></ul><p><strong>node11 \u4E4B\u540E\u4E00\u4E9B\u7279\u6027\u5DF2\u7ECF\u5411\u6D4F\u89C8\u5668\u770B\u9F50\u4E86\uFF0C\u603B\u7684\u53D8\u5316\u4E00\u53E5\u8BDD\u6765\u8BF4\u5C31\u662F\uFF0C\u5982\u679C\u662F node11 \u7248\u672C\u4E00\u65E6\u6267\u884C\u4E00\u4E2A\u9636\u6BB5\u91CC\u7684\u4E00\u4E2A\u5B8F\u4EFB\u52A1(setTimeout,setInterval \u548C setImmediate)\u5C31\u7ACB\u523B\u6267\u884C\u5BF9\u5E94\u7684\u5FAE\u4EFB\u52A1\u961F\u5217</strong></p><h2 id="\u53C2\u8003" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003" aria-hidden="true">#</a> \u53C2\u8003</h2>',22),p={href:"https://juejin.cn/post/6844904079353708557#heading-0",target:"_blank",rel:"noopener noreferrer"};function h(m,u){const a=s("ExternalLinkIcon");return l(),t("div",null,[n,e("p",null,[e("a",p,[o("\u9762\u8BD5\u9898\uFF1A\u8BF4\u8BF4\u4E8B\u4EF6\u5FAA\u73AF\u673A\u5236(\u6EE1\u5206\u7B54\u6848\u6765\u4E86)"),c(a)])])])}const x=i(d,[["render",h],["__file","\u4EC0\u4E48\u662F\u4E8B\u4EF6\u5FAA\u73AF.html.vue"]]);export{x as default};
