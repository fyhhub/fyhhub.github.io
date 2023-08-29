import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.353e5930.js";const F=JSON.parse('{"title":"Scope CSS","description":"","frontmatter":{},"headers":[],"relativePath":"frontend-advanced/微前端/Scope CSS.md","filePath":"frontend-advanced/微前端/Scope CSS.md"}'),p={name:"frontend-advanced/微前端/Scope CSS.md"},o=l(`<h1 id="scope-css" tabindex="-1">Scope CSS <a class="header-anchor" href="#scope-css" aria-label="Permalink to &quot;Scope CSS&quot;">​</a></h1><p>在 qiankun 中有如下配置可以设置子应用的样式隔离</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 启动应用</span></span>
<span class="line"><span style="color:#B392F0;">start</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  sandbox: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    strictStyleIsolation: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">    experimentalStyleIsolation: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 启动应用</span></span>
<span class="line"><span style="color:#6F42C1;">start</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  sandbox: {</span></span>
<span class="line"><span style="color:#24292E;">    strictStyleIsolation: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">    experimentalStyleIsolation: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><ul><li><strong>strictStyleIsolation：</strong> 这种模式下 qiankun 会为每个微应用的容器包裹上一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_shadow_DOM" target="_blank" rel="noreferrer">shadow dom</a> 节点，从而确保微应用的样式不会对全局造成影响。</li><li><strong>experimentalStyleIsolation：</strong> 当 experimentalStyleIsolation 被设置为 true 时，qiankun 会改写子应用所添加的样式为所有样式规则增加一个特殊的选择器规则来限定其影响范围</li></ul><h2 id="shadowdom" tabindex="-1">ShadowDOM <a class="header-anchor" href="#shadowdom" aria-label="Permalink to &quot;ShadowDOM&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createElement</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">appContent</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">strictStyleIsolation</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boolean</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">scopedCSS</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boolean</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">appName</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HTMLElement</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">containerElement</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">createElement</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;div&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  containerElement.innerHTML </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> appContent;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// appContent always wrapped with a singular div</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">appElement</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> containerElement.firstChild </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HTMLElement</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (strictStyleIsolation) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">supportShadowDOM) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">warn</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&#39;[qiankun]: As current browser not support shadow dom, your strictStyleIsolation configuration will be ignored!&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      );</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">innerHTML</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> appElement;</span></span>
<span class="line"><span style="color:#E1E4E8;">      appElement.innerHTML </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> shadow</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ShadowRoot</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (appElement.attachShadow) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        shadow </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> appElement.</span><span style="color:#B392F0;">attachShadow</span><span style="color:#E1E4E8;">({ mode: </span><span style="color:#9ECBFF;">&#39;open&#39;</span><span style="color:#E1E4E8;"> });</span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// createShadowRoot was proposed in initial spec, which has then been deprecated</span></span>
<span class="line"><span style="color:#E1E4E8;">        shadow </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (appElement </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">createShadowRoot</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      shadow.innerHTML </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> innerHTML;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> appElement;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createElement</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">appContent</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">strictStyleIsolation</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boolean</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">scopedCSS</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boolean</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">appName</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">)</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HTMLElement</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">containerElement</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">createElement</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;div&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  containerElement.innerHTML </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> appContent;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// appContent always wrapped with a singular div</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">appElement</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> containerElement.firstChild </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HTMLElement</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (strictStyleIsolation) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">supportShadowDOM) {</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">warn</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&#39;[qiankun]: As current browser not support shadow dom, your strictStyleIsolation configuration will be ignored!&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      );</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">innerHTML</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> appElement;</span></span>
<span class="line"><span style="color:#24292E;">      appElement.innerHTML </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> shadow</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ShadowRoot</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (appElement.attachShadow) {</span></span>
<span class="line"><span style="color:#24292E;">        shadow </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> appElement.</span><span style="color:#6F42C1;">attachShadow</span><span style="color:#24292E;">({ mode: </span><span style="color:#032F62;">&#39;open&#39;</span><span style="color:#24292E;"> });</span></span>
<span class="line"><span style="color:#24292E;">      } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// createShadowRoot was proposed in initial spec, which has then been deprecated</span></span>
<span class="line"><span style="color:#24292E;">        shadow </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (appElement </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">any</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">createShadowRoot</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      shadow.innerHTML </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> innerHTML;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> appElement;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><code>qiankun</code>在这方面的实现就比较简单了，当为子应用创建根结点时（配置 strictStyleIsolation）, 就会为这个节点创建<code>ShadowDOM</code>。 我们可以发现，有两种创建<code>ShadowDOM</code>的方式，<code>attachShadow</code>和<code>createShadowRoot</code>，<code>createShadowRoot</code>已经被废弃，可以作为降级的方案。</p><p><code>attachShadow</code>有两种模式分别为：</p><ul><li>open: 可以用 js 获取 dom 节点</li><li>closed：不能用 js 获取 dom 节点</li></ul><h2 id="实验性的功能" tabindex="-1">实验性的功能 <a class="header-anchor" href="#实验性的功能" aria-label="Permalink to &quot;实验性的功能&quot;">​</a></h2><ol><li>替换 html, body 为 div[data-qiankun=&quot;appName&quot;]</li><li>所有选择器前面加上 div[data-qiankun=&quot;appName&quot;]</li><li>@media 和@support 里面的选择器前面也全部加上 div[data-qiankun=&quot;appName&quot;]</li></ol>`,11),e=[o];function t(c,r,E,y,i,d){return n(),a("div",null,e)}const m=s(p,[["render",t]]);export{F as __pageData,m as default};
