import{_ as e,o as t,c as a,Q as i}from"./chunks/framework.968e3df4.js";const m=JSON.parse('{"title":"4.说一下 nextTick 如何实现的","description":"","frontmatter":{"order":4},"headers":[],"relativePath":"frontend-advanced/vue/Vue2面试题/4.说一下nextTick如何实现的.md","filePath":"frontend-advanced/vue/Vue2面试题/4.说一下nextTick如何实现的.md","lastUpdated":1693361327000}'),n={name:"frontend-advanced/vue/Vue2面试题/4.说一下nextTick如何实现的.md"},c=i('<h1 id="_4-说一下-nexttick-如何实现的" tabindex="-1">4.说一下 nextTick 如何实现的 <a class="header-anchor" href="#_4-说一下-nexttick-如何实现的" aria-label="Permalink to &quot;4.说一下 nextTick 如何实现的&quot;">​</a></h1><h2 id="核心答案" tabindex="-1">核心答案 <a class="header-anchor" href="#核心答案" aria-label="Permalink to &quot;核心答案&quot;">​</a></h2><p>nextTick 利用了浏览器事件循环机制，vue 为了避免频繁的操作 DOM,采用异步的方式更新 DOM。这些异步操作会通过 nextTick 函数将这些操作以 cb 的形式放到任务队列中（以微任务优先），当每次 tick 结束之后就会去执行这些 cb，更新 DOM。</p><p>宏任务 script - 微任务 - dom 渲染 - web Worker - 宏任务</p><p>例如更新 num++ 执行一千次，不可能每次都更新一次 dom,会有非常大的性能损耗，那么可以把更新放到最后一次来做，将更新任务放到异步队列, 做到批量更新</p><p>nextTick 会根据浏览器兼容性，依次降级使用不同方案</p><ul><li>Promise</li><li>MutationObserver</li><li>setImmediate</li><li>setTimeout</li></ul>',7),o=[c];function r(_,d,s,l,p,u){return t(),a("div",null,o)}const x=e(n,[["render",r]]);export{m as __pageData,x as default};
