import{_ as e,o as a,c as n,Q as t}from"./chunks/framework.3d945e71.js";const m=JSON.parse('{"title":"上报埋点或数据的方式","description":"","frontmatter":{},"headers":[],"relativePath":"frontend-engineering/前端性能优化/前端监控/上报埋点或数据的方式.md","filePath":"frontend-engineering/前端性能优化/前端监控/上报埋点或数据的方式.md","lastUpdated":1697421979000}'),i={name:"frontend-engineering/前端性能优化/前端监控/上报埋点或数据的方式.md"},r=t('<h1 id="上报埋点或数据的方式" tabindex="-1">上报埋点或数据的方式 <a class="header-anchor" href="#上报埋点或数据的方式" aria-label="Permalink to &quot;上报埋点或数据的方式&quot;">​</a></h1><h2 id="_1-使用img的src做请求发送" tabindex="-1">1. 使用img的src做请求发送 <a class="header-anchor" href="#_1-使用img的src做请求发送" aria-label="Permalink to &quot;1. 使用img的src做请求发送&quot;">​</a></h2><p>优点：不用做特殊处理，没有跨域的限制，script标签，img标签都可以直接发送跨域的GET请求，兼容性比较好，有些页面可能禁用了脚本，这时script标签久不能使用了。img就没有这个限制。</p><p>当我们使用img的src标签访问的时候，就会触发访问这个get请求。这个时候服务端就会接收到前端发送的请求。</p><h2 id="_2-navigator-sendbeacon" tabindex="-1">2. navigator.sendBeacon() <a class="header-anchor" href="#_2-navigator-sendbeacon" aria-label="Permalink to &quot;2. navigator.sendBeacon()&quot;">​</a></h2><p>sendBeacon的优点：</p><ul><li>使用sendBeacon()方法会使用户代理在浏览器空闲时异步的向服务器发送数据,不会和主要业务代码抢占资源，</li><li>在页面卸载的时也能保证请求成功发送，同时不会延迟页面的卸载或影响下一页面的载入性能。</li></ul><p>缺点：</p><ul><li>sendBeacon是有浏览器兼容问题的，所以我们使用的时候为了完善，还是要用img这种方式来进行兜底。</li></ul>',9),o=[r];function s(_,c,d,l,p,h){return a(),n("div",null,o)}const u=e(i,[["render",s]]);export{m as __pageData,u as default};
