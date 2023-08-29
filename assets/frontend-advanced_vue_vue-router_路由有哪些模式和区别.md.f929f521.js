import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.353e5930.js";const u=JSON.parse('{"title":"路由有哪些模式和区别","description":"","frontmatter":{},"headers":[],"relativePath":"frontend-advanced/vue/vue-router/路由有哪些模式和区别.md","filePath":"frontend-advanced/vue/vue-router/路由有哪些模式和区别.md"}'),e={name:"frontend-advanced/vue/vue-router/路由有哪些模式和区别.md"},o=l(`<h1 id="路由有哪些模式和区别" tabindex="-1">路由有哪些模式和区别 <a class="header-anchor" href="#路由有哪些模式和区别" aria-label="Permalink to &quot;路由有哪些模式和区别&quot;">​</a></h1><h2 id="hash" tabindex="-1">hash <a class="header-anchor" href="#hash" aria-label="Permalink to &quot;hash&quot;">​</a></h2><ul><li><p>良好的兼容性</p></li><li><p>hash 改变会触发<code>hashchange事件</code></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 监听hash变化，点击浏览器的前进后退会触发</span></span>
<span class="line"><span style="color:#E1E4E8;">window.</span><span style="color:#B392F0;">addEventListener</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;hashchange&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">event</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> newURL </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> event.newURL; </span><span style="color:#6A737D;">// hash 改变后的新 url</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> oldURL </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> event.oldURL; </span><span style="color:#6A737D;">// hash 改变前的旧 url</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 监听hash变化，点击浏览器的前进后退会触发</span></span>
<span class="line"><span style="color:#24292E;">window.</span><span style="color:#6F42C1;">addEventListener</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;hashchange&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">event</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> newURL </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> event.newURL; </span><span style="color:#6A737D;">// hash 改变后的新 url</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> oldURL </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> event.oldURL; </span><span style="color:#6A737D;">// hash 改变前的旧 url</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">);</span></span></code></pre></div></li><li><p>可以通过<code>location.hash</code>获取和修改<code>hash</code></p></li></ul><h2 id="history" tabindex="-1">history <a class="header-anchor" href="#history" aria-label="Permalink to &quot;history&quot;">​</a></h2><ul><li><p>兼容 HTML5 的 history api</p></li><li><p>常用的 api</p><ul><li>history.pushState</li><li>history.replaceState</li></ul></li><li><p>会触发<code>popstate</code>事件</p></li></ul><h2 id="abstract" tabindex="-1">abstract <a class="header-anchor" href="#abstract" aria-label="Permalink to &quot;abstract&quot;">​</a></h2><ul><li>支持 Node 服务端使用，可以用来模拟浏览器的路由栈</li></ul>`,7),p=[o];function t(c,r,i,h,E,d){return a(),n("div",null,p)}const _=s(e,[["render",t]]);export{u as __pageData,_ as default};
