import{_ as e,o as a,c as t,Q as l}from"./chunks/framework.968e3df4.js";const k=JSON.parse('{"title":"什么是事件循环","description":"","frontmatter":{},"headers":[],"relativePath":"frontend-basic/js/什么是事件循环.md","filePath":"frontend-basic/js/什么是事件循环.md","lastUpdated":1693361327000}'),o={name:"frontend-basic/js/什么是事件循环.md"},i=l('<h1 id="什么是事件循环" tabindex="-1">什么是事件循环 <a class="header-anchor" href="#什么是事件循环" aria-label="Permalink to &quot;什么是事件循环&quot;">​</a></h1><h2 id="宏任务和微任务" tabindex="-1">宏任务和微任务 <a class="header-anchor" href="#宏任务和微任务" aria-label="Permalink to &quot;宏任务和微任务&quot;">​</a></h2><p><strong>宏任务</strong></p><ul><li>script(整体代码)</li><li>setTimeout</li><li>setInterval</li><li>setImmediate</li><li>MessageChannel</li><li>I/O</li></ul><p><strong>微任务</strong></p><ul><li>process.nextTick</li><li>Promise</li><li>Async/Await(实际就是 promise)</li><li>MutationObserver （回调函数会进入微任务队列）</li></ul><h2 id="浏览器事件循环" tabindex="-1">浏览器事件循环 <a class="header-anchor" href="#浏览器事件循环" aria-label="Permalink to &quot;浏览器事件循环&quot;">​</a></h2><p>总的结论就是，执行宏任务，然后执行该宏任务产生的微任务，若微任务在执行过程中产生了新的微任务，则继续执行微任务，微任务执行完毕后，再回到宏任务中进行下一轮循环。</p><h2 id="node-事件循环" tabindex="-1">Node 事件循环 <a class="header-anchor" href="#node-事件循环" aria-label="Permalink to &quot;Node 事件循环&quot;">​</a></h2><p>node 的事件循环的阶段顺序为： 输入数据阶段(incoming data)-&gt;轮询阶段(poll)-&gt;检查阶段(check)-&gt;关闭事件回调阶段(close callback)-&gt;定时器检测阶段(timers)-&gt;I/O 事件回调阶段(I/O callbacks)-&gt;闲置阶段(idle, prepare)-&gt;轮询阶段...</p><p>阶段概述</p><ul><li>定时器检测阶段(timers)：本阶段执行 timer 的回调，即 setTimeout、setInterval 里面的回调函数。</li><li>I/O 事件回调阶段(I/O callbacks)：执行延迟到下一个循环迭代的 I/O 回调，即上一轮循环中未被执行的一些 I/O 回调。</li><li>闲置阶段(idle, prepare)：仅系统内部使用。</li><li>轮询阶段(poll)：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞。</li><li>检查阶段(check)：setImmediate() 回调函数在这里执行</li><li>关闭事件回调阶段(close callback)：一些关闭的回调函数，如：socket.on(&#39;close&#39;, ...)。</li></ul><h3 id="poll-阶段" tabindex="-1">poll 阶段 <a class="header-anchor" href="#poll-阶段" aria-label="Permalink to &quot;poll 阶段&quot;">​</a></h3><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/2/1709951e65ffe00e~tplv-t2oaga2asx-watermark.awebp" alt="poll阶段"></p><ul><li><p>如果当前<code>已经存在定时器</code>，而且有<code>定时器到时间了</code>，拿出来执行，eventLoop 将回到 <code>timers 阶段</code>。</p></li><li><p>如果<code>没有定时器</code>, 会去看<code>回调函数队列</code>。</p><ul><li><p>如果 poll 队列不为空，会遍历回调队列并同步执行，直到队列为空或者达到系统限制</p></li><li><p>如果 poll 队列为空时，会有两件事发生</p><ul><li>如果有 <code>setImmediate</code> 回调需要执行，poll 阶段会停止并且进入到 <code>check 阶段</code>执行回调</li><li>如果没有 <code>setImmediate</code> 回调需要执行，会<code>等待回调被加入到队列中</code>并立即执行回调，这里同样会有个超时时间设置防止一直等待下去,<code>一段时间后自动进入 check 阶段</code>。</li></ul></li></ul></li></ul><h3 id="check" tabindex="-1">check <a class="header-anchor" href="#check" aria-label="Permalink to &quot;check&quot;">​</a></h3><p>check 阶段。这是一个比较简单的阶段，直接执行 setImmdiate 的回调。</p><h3 id="process-nexttick" tabindex="-1">process.nextTick <a class="header-anchor" href="#process-nexttick" aria-label="Permalink to &quot;process.nextTick&quot;">​</a></h3><p>process.nextTick 是一个独立于 eventLoop 的任务队列。 在每一个 eventLoop 阶段完成后会去检查 nextTick 队列，如果里面有任务，会让这部分任务优先于微任务执行。</p><ul><li><p>在 node11 之前，因为每一个 eventLoop 阶段完成后会去检查 nextTick 队列，如果里面有任务，会让这部分任务优先于微任务执行</p></li><li><p>在 node11 之后，process.nextTick 是微任务的一种,是先进入 check 阶段，执行一个 setImmediate 宏任务，然后执行其微任务队列，再执行下一个宏任务及其微任务</p></li></ul><p><strong>node11 之后一些特性已经向浏览器看齐了，总的变化一句话来说就是，如果是 node11 版本一旦执行一个阶段里的一个宏任务(setTimeout,setInterval 和 setImmediate)就立刻执行对应的微任务队列</strong></p><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h2><p><a href="https://juejin.cn/post/6844904079353708557#heading-0" target="_blank" rel="noreferrer">面试题：说说事件循环机制(满分答案来了)</a></p>',23),c=[i];function s(r,n,d,p,h,m){return a(),t("div",null,c)}const _=e(o,[["render",s]]);export{k as __pageData,_ as default};
