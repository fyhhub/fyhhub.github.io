import{_ as e,o as t,c as r,Q as b}from"./chunks/framework.968e3df4.js";const v=JSON.parse('{"title":"HMR 原理","description":"","frontmatter":{},"headers":[],"relativePath":"frontend-engineering/webpack/Webpack原理/HMR原理.md","filePath":"frontend-engineering/webpack/Webpack原理/HMR原理.md","lastUpdated":1693361327000}'),a={name:"frontend-engineering/webpack/Webpack原理/HMR原理.md"},c=b('<h1 id="hmr-原理" tabindex="-1">HMR 原理 <a class="header-anchor" href="#hmr-原理" aria-label="Permalink to &quot;HMR 原理&quot;">​</a></h1><p><img src="https://ae01.alicdn.com/kf/Hdde49d41b1fa4436bdc2e776fa6533b2C.png" alt="1608382424775.png"></p><h2 id="服务器部分" tabindex="-1">服务器部分 <a class="header-anchor" href="#服务器部分" aria-label="Permalink to &quot;服务器部分&quot;">​</a></h2><table><thead><tr><th>步骤</th><th>代码位置</th></tr></thead><tbody><tr><td>1.启动 webpack-dev-server 服务器</td><td><a href="https://github.com/webpack/webpack-dev-server/blob/v3.7.2/bin/webpack-dev-server.js#L83" target="_blank" rel="noreferrer">https://github.com/webpack/webpack-dev-server/blob/v3.7.2/bin/webpack-dev-server.js#L83</a></td></tr><tr><td>2.创建 webpack 实例</td><td><a href="https://github.com/webpack/webpack-dev-server/blob/v3.7.2/bin/webpack-dev-server.js#L89" target="_blank" rel="noreferrer">https://github.com/webpack/webpack-dev-server/blob/v3.7.2/bin/webpack-dev-server.js#L89</a></td></tr><tr><td>3.创建 Server 服务器</td><td><a href="https://github.com/webpack/webpack-dev-server/blob/v3.7.2/bin/webpack-dev-server.js#L107" target="_blank" rel="noreferrer">https://github.com/webpack/webpack-dev-server/blob/v3.7.2/bin/webpack-dev-server.js#L107</a></td></tr><tr><td><strong>4.更改 config 的 entry 属性</strong></td><td><a href="https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/Server.js#L57" target="_blank" rel="noreferrer">https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/Server.js#L57</a></td></tr><tr><td>entry 添加 dev-server/client/index.js</td><td><a href="https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/utils/addEntries.js#L22" target="_blank" rel="noreferrer">https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/utils/addEntries.js#L22</a></td></tr><tr><td>entry 添加 webpack/hot/dev-server.js</td><td><a href="https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/utils/addEntries.js#L30" target="_blank" rel="noreferrer">https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/utils/addEntries.js#L30</a></td></tr><tr><td>5. setupHooks</td><td><a href="https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/Server.js#L122" target="_blank" rel="noreferrer">https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/Server.js#L122</a></td></tr><tr><td><strong>6. 添加 webpack 的 done 事件回调</strong></td><td><a href="https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/Server.js#L183" target="_blank" rel="noreferrer">https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/Server.js#L183</a></td></tr><tr><td>编译完成向 websocket 客户端推送消息，最主要信息还是新模块的 hash 值，后面的步骤根据这一 hash 值来进行模块热替换</td><td><a href="https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/Server.js#L178" target="_blank" rel="noreferrer">https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/Server.js#L178</a></td></tr><tr><td>7.创建 express 应用 app</td><td><a href="https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/Server.js#L169" target="_blank" rel="noreferrer">https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/Server.js#L169</a></td></tr><tr><td>8. 添加 webpack-dev-middleware 中间件</td><td><a href="https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/Server.js#L208" target="_blank" rel="noreferrer">https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/Server.js#L208</a></td></tr><tr><td>以 watch 模式启动 webpack 编译，文件系统中某一个文件发生修改，webpack 监听到文件变化，根据配置文件对模块重新编译打包</td><td><a href="https://github.com/webpack/webpack-dev-middleware/blob/v3.7.2/index.js#L41" target="_blank" rel="noreferrer">https://github.com/webpack/webpack-dev-middleware/blob/v3.7.2/index.js#L41</a></td></tr><tr><td><strong>设置文件系统为内存文件系统</strong></td><td><a href="https://github.com/webpack/webpack-dev-middleware/blob/v3.7.2/index.js#L65" target="_blank" rel="noreferrer">https://github.com/webpack/webpack-dev-middleware/blob/v3.7.2/index.js#L65</a></td></tr><tr><td><strong>返回一个中间件，负责返回生成的文件</strong></td><td><a href="https://github.com/webpack/webpack-dev-middleware/blob/v3.7.2/lib/middleware.js#L20" target="_blank" rel="noreferrer">https://github.com/webpack/webpack-dev-middleware/blob/v3.7.2/lib/middleware.js#L20</a></td></tr><tr><td>app 中使用 webpack-dev-middlerware 返回的中间件</td><td><a href="https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/Server.js#L128" target="_blank" rel="noreferrer">https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/Server.js#L128</a></td></tr><tr><td>9. 创建 http 服务器并启动服务</td><td><a href="https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/Server.js#L135" target="_blank" rel="noreferrer">https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/Server.js#L135</a></td></tr><tr><td><strong>10. 使用 sockjs 在浏览器端和服务端之间建立一个 websocket 长连接</strong></td><td><a href="https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/Server.js#L745" target="_blank" rel="noreferrer">https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/Server.js#L745</a></td></tr><tr><td>创建 socket 服务器并监听 connection 事件</td><td><a href="https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/servers/SockJSServer.js#L33" target="_blank" rel="noreferrer">https://github.com/webpack/webpack-dev-server/blob/v3.7.2/lib/servers/SockJSServer.js#L33</a></td></tr></tbody></table><h2 id="客户端部分" tabindex="-1">客户端部分 <a class="header-anchor" href="#客户端部分" aria-label="Permalink to &quot;客户端部分&quot;">​</a></h2><table><thead><tr><th>步骤</th><th>代码位置</th></tr></thead><tbody><tr><td>1.连接 websocket 服务器</td><td><a href="https://github.com/webpack/webpack-dev-server/blob/v3.7.2/client-src/default/socket.js#L25" target="_blank" rel="noreferrer">https://github.com/webpack/webpack-dev-server/blob/v3.7.2/client-src/default/socket.js#L25</a></td></tr><tr><td>2.websocket 客户端监听事件</td><td><a href="https://github.com/webpack/webpack-dev-server/blob/v3.7.2/client-src/default/socket.js#L53" target="_blank" rel="noreferrer">https://github.com/webpack/webpack-dev-server/blob/v3.7.2/client-src/default/socket.js#L53</a></td></tr><tr><td>监听 hash 事件，保存此 hash 值</td><td><a href="https://github.com/webpack/webpack-dev-server/blob/v3.7.2/client-src/default/index.js#L55" target="_blank" rel="noreferrer">https://github.com/webpack/webpack-dev-server/blob/v3.7.2/client-src/default/index.js#L55</a></td></tr><tr><td>3.监听 ok 事件，执行 reloadApp 方法进行更新</td><td><a href="https://github.com/webpack/webpack-dev-server/blob/v3.7.2/client-src/default/index.js#L93" target="_blank" rel="noreferrer">https://github.com/webpack/webpack-dev-server/blob/v3.7.2/client-src/default/index.js#L93</a></td></tr><tr><td>4. 在 reloadApp 中会进行判断，是否支持热更新，如果支持的话发射 webpackHotUpdate 事件,如果不支持则直接刷新浏览器</td><td><a href="https://github.com/webpack/webpack-dev-server/blob/v3.7.2/client-src/default/utils/reloadApp.js#L7" target="_blank" rel="noreferrer">https://github.com/webpack/webpack-dev-server/blob/v3.7.2/client-src/default/utils/reloadApp.js#L7</a></td></tr><tr><td>5. 在 webpack/hot/dev-server.js 会监听 webpackHotUpdate 事件</td><td><a href="https://github.com/webpack/webpack/blob/v4.39.1/hot/dev-server.js#L55" target="_blank" rel="noreferrer">https://github.com/webpack/webpack/blob/v4.39.1/hot/dev-server.js#L55</a></td></tr><tr><td>6. 在 check 方法里会调用 module.hot.check 方法</td><td><a href="https://github.com/webpack/webpack/blob/v4.39.1/hot/dev-server.js#L13" target="_blank" rel="noreferrer">https://github.com/webpack/webpack/blob/v4.39.1/hot/dev-server.js#L13</a></td></tr><tr><td>7. 调用 hotDownloadManifest，向 server 端发送 Ajax 请求，服务端返回一个 Manifest 文件(lastHash.hot-update.json)，该 Manifest 包含了本次编译 hash 值 和 更新模块的 chunk 名</td><td><a href="https://github.com/webpack/webpack/blob/v4.39.1/lib/HotModuleReplacement.runtime.js#L180" target="_blank" rel="noreferrer">https://github.com/webpack/webpack/blob/v4.39.1/lib/HotModuleReplacement.runtime.js#L180</a></td></tr><tr><td>8. 调用 JsonpMainTemplate.runtime 的 hotDownloadUpdateChunk 方法通过 JSONP 请求获取到最新的模块代码</td><td><a href="https://github.com/webpack/webpack/blob/v4.39.1/lib/web/JsonpMainTemplate.runtime.js#L14" target="_blank" rel="noreferrer">https://github.com/webpack/webpack/blob/v4.39.1/lib/web/JsonpMainTemplate.runtime.js#L14</a></td></tr><tr><td>9. 补丁 JS 取回来后会调用 JsonpMainTemplate.runtime.js 的 webpackHotUpdate 方法</td><td><a href="https://github.com/webpack/webpack/blob/v4.39.1/lib/web/JsonpMainTemplate.runtime.js#L8" target="_blank" rel="noreferrer">https://github.com/webpack/webpack/blob/v4.39.1/lib/web/JsonpMainTemplate.runtime.js#L8</a></td></tr><tr><td>10. 然后会调用 HotModuleReplacement.runtime.js 的 hotAddUpdateChunk 方法动态更新模块代码</td><td><a href="https://github.com/webpack/webpack/blob/v4.39.1/lib/HotModuleReplacement.runtime.js#L222" target="_blank" rel="noreferrer">https://github.com/webpack/webpack/blob/v4.39.1/lib/HotModuleReplacement.runtime.js#L222</a></td></tr><tr><td>11.然后调用 hotApply 方法进行热更新</td><td><a href="https://github.com/webpack/webpack/blob/v4.39.1/lib/HotModuleReplacement.runtime.js#L257" target="_blank" rel="noreferrer">https://github.com/webpack/webpack/blob/v4.39.1/lib/HotModuleReplacement.runtime.js#L257</a> <a href="https://github.com/webpack/webpack/blob/v4.39.1/lib/HotModuleReplacement.runtime.js#L278" target="_blank" rel="noreferrer">https://github.com/webpack/webpack/blob/v4.39.1/lib/HotModuleReplacement.runtime.js#L278</a></td></tr><tr><td>12.从缓存中删除旧模块</td><td><a href="https://github.com/webpack/webpack/blob/v4.39.1/lib/HotModuleReplacement.runtime.js#L510" target="_blank" rel="noreferrer">https://github.com/webpack/webpack/blob/v4.39.1/lib/HotModuleReplacement.runtime.js#L510</a></td></tr><tr><td>13.执行 accept 的回调</td><td><a href="https://github.com/webpack/webpack/blob/v4.39.1/lib/HotModuleReplacement.runtime.js#L569" target="_blank" rel="noreferrer">https://github.com/webpack/webpack/blob/v4.39.1/lib/HotModuleReplacement.runtime.js#L569</a></td></tr></tbody></table>',6),d=[c];function o(p,s,l,h,i,k){return t(),r("div",null,d)}const w=e(a,[["render",o]]);export{v as __pageData,w as default};
