import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.3d945e71.js";const d=JSON.parse('{"title":"第 4 章-响应式系统的作用与实现","description":"","frontmatter":{"order":4},"headers":[],"relativePath":"informal/读书笔记/Vuejs设计与实现/第4章-响应式系统的作用与实现.md","filePath":"informal/读书笔记/Vuejs设计与实现/第4章-响应式系统的作用与实现.md","lastUpdated":1699325106000}'),p={name:"informal/读书笔记/Vuejs设计与实现/第4章-响应式系统的作用与实现.md"},o=l(`<h1 id="第-4-章-响应式系统的作用与实现" tabindex="-1">第 4 章-响应式系统的作用与实现 <a class="header-anchor" href="#第-4-章-响应式系统的作用与实现" aria-label="Permalink to &quot;第 4 章-响应式系统的作用与实现&quot;">​</a></h1><h2 id="_4-1-响应式数据与副作用函数" tabindex="-1">4.1 响应式数据与副作用函数 <a class="header-anchor" href="#_4-1-响应式数据与副作用函数" aria-label="Permalink to &quot;4.1 响应式数据与副作用函数&quot;">​</a></h2><p>副作用函数指的是会产生副作用的函数，如下面的代码所示：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  document.body.innerText </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;hello vue3&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  document.body.innerText </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;hello vue3&#39;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这段代码修改了body的innerText, 但是其他的effect依然可能修改或获取这个<code>innerText</code>, 所以这个<code>effect</code>的函数影响了其他函数的执行，它就是有副作用的。</p><p>同样的，例如下面的val, 被effect函数修改，但它是全局变量，其他函数也可能会用到，同样存在副作用。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> val </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  val </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> val </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  val </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><strong>那么什么是响应式数据呢？</strong></p><p>我们希望有如下功能， 执行<code>obj.text</code>赋值，自动执行effect函数</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {text: </span><span style="color:#9ECBFF;">&#39;123&#39;</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  document.body.innerText </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> obj.text</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">obj.text </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;hello&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 我们希望，执行这一行之后，自动执行effect函数</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {text: </span><span style="color:#032F62;">&#39;123&#39;</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  document.body.innerText </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> obj.text</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">obj.text </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;hello&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 我们希望，执行这一行之后，自动执行effect函数</span></span></code></pre></div><p>下面我们来探讨如何实现吧。</p><h2 id="_4-2-响应式数据的基本实现" tabindex="-1">4.2 响应式数据的基本实现 <a class="header-anchor" href="#_4-2-响应式数据的基本实现" aria-label="Permalink to &quot;4.2 响应式数据的基本实现&quot;">​</a></h2><p>如何实现响应式数据呢，有以下两点</p><ul><li>当副作用函数<code>effect</code>执行时，会触发字段 <code>obj.text</code>的读取操作</li><li>当修改<code>obj.text</code>时，会触发<code>obj.text</code>的设置操作</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c29989e49784305961a48cc99a4df21~tplv-k3u1fbpfcp-zoom-1.image" alt="image.png"></p><p>我们可以想象出一个<code>bucket（桶）</code>，当触发<code>读取</code>操作时，就把<code>副作用effect</code>放入到这个<code>桶</code>中。 当触发<code>设置</code>操作时，就把桶中的<code>effect</code>拿出来执行，可以有如下代码</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 存储副作用函数的桶</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">bucket</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Set</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 原始数据</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { text: </span><span style="color:#9ECBFF;">&#39;hello world&#39;</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#6A737D;">// 对原始数据的代理</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">(data, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 拦截读取操作</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">target</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 将副作用函数 effect 添加到存储副作用函数的桶中</span></span>
<span class="line"><span style="color:#E1E4E8;">    bucket.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(effect)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 返回属性值</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> target[key]</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 拦截设置操作</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">target</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">newVal</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 设置属性值</span></span>
<span class="line"><span style="color:#E1E4E8;">    target[key] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> newVal</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 把副作用函数从桶里取出并执行</span></span>
<span class="line"><span style="color:#E1E4E8;">    bucket.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">fn</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fn</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  document.body.innerText </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> obj.text</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 存储副作用函数的桶</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">bucket</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Set</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 原始数据</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { text: </span><span style="color:#032F62;">&#39;hello world&#39;</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#6A737D;">// 对原始数据的代理</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Proxy</span><span style="color:#24292E;">(data, {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 拦截读取操作</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#E36209;">target</span><span style="color:#24292E;">, </span><span style="color:#E36209;">key</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 将副作用函数 effect 添加到存储副作用函数的桶中</span></span>
<span class="line"><span style="color:#24292E;">    bucket.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(effect)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 返回属性值</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> target[key]</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 拦截设置操作</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(</span><span style="color:#E36209;">target</span><span style="color:#24292E;">, </span><span style="color:#E36209;">key</span><span style="color:#24292E;">, </span><span style="color:#E36209;">newVal</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 设置属性值</span></span>
<span class="line"><span style="color:#24292E;">    target[key] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> newVal</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 把副作用函数从桶里取出并执行</span></span>
<span class="line"><span style="color:#24292E;">    bucket.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(</span><span style="color:#E36209;">fn</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fn</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  document.body.innerText </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> obj.text</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">()</span></span></code></pre></div><h2 id="_4-3-设计一个完善的响应式系统" tabindex="-1">4.3 设计一个完善的响应式系统 <a class="header-anchor" href="#_4-3-设计一个完善的响应式系统" aria-label="Permalink to &quot;4.3 设计一个完善的响应式系统&quot;">​</a></h2><p>不难看出，响应式系统的工作流程如下：</p><ul><li>当副作用函数<code>effect</code>执行时，会触发字段 <code>obj.text</code>的读取操作</li><li>当修改<code>obj.text</code>时，会触发<code>obj.text</code>的设置操作</li></ul><p>看上去简单，但是还有点问题，我们把<code>effect</code>名字写死了，我们希望是一个匿名函数。</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// 存储副作用函数的桶</span></span>
<span class="line"><span style="color:#E1E4E8;">const bucket = new Set()</span></span>
<span class="line"><span style="color:#E1E4E8;">let activeEffect</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// 原始数据</span></span>
<span class="line"><span style="color:#E1E4E8;">const data = { text: &#39;hello world&#39; }</span></span>
<span class="line"><span style="color:#E1E4E8;">// 对原始数据的代理</span></span>
<span class="line"><span style="color:#E1E4E8;">const obj = new Proxy(data, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  // 拦截读取操作</span></span>
<span class="line"><span style="color:#E1E4E8;">  get(target, key) {</span></span>
<span class="line"><span style="color:#85E89D;">+    if (activeEffect) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        // 将副作用函数 activeEffect 添加到存储副作用函数的桶中</span></span>
<span class="line"><span style="color:#E1E4E8;">        bucket.add(activeEffect)</span></span>
<span class="line"><span style="color:#85E89D;">+    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 返回属性值</span></span>
<span class="line"><span style="color:#E1E4E8;">    return target[key]</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  // 拦截设置操作</span></span>
<span class="line"><span style="color:#E1E4E8;">  set(target, key, newVal) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 设置属性值</span></span>
<span class="line"><span style="color:#E1E4E8;">    target[key] = newVal</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 把副作用函数从桶里取出并执行</span></span>
<span class="line"><span style="color:#E1E4E8;">    bucket.forEach(fn =&gt; fn())</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// 用一个全局变量存储当前激活的 effect 函数</span></span>
<span class="line"><span style="color:#85E89D;">+ function effect(fn) {</span></span>
<span class="line"><span style="color:#85E89D;">+  // 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect</span></span>
<span class="line"><span style="color:#85E89D;">+  activeEffect = fn</span></span>
<span class="line"><span style="color:#E1E4E8;">  // 执行副作用函数</span></span>
<span class="line"><span style="color:#85E89D;">+  fn()</span></span>
<span class="line"><span style="color:#85E89D;">+}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// 存储副作用函数的桶</span></span>
<span class="line"><span style="color:#24292E;">const bucket = new Set()</span></span>
<span class="line"><span style="color:#24292E;">let activeEffect</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// 原始数据</span></span>
<span class="line"><span style="color:#24292E;">const data = { text: &#39;hello world&#39; }</span></span>
<span class="line"><span style="color:#24292E;">// 对原始数据的代理</span></span>
<span class="line"><span style="color:#24292E;">const obj = new Proxy(data, {</span></span>
<span class="line"><span style="color:#24292E;">  // 拦截读取操作</span></span>
<span class="line"><span style="color:#24292E;">  get(target, key) {</span></span>
<span class="line"><span style="color:#22863A;">+    if (activeEffect) {</span></span>
<span class="line"><span style="color:#24292E;">        // 将副作用函数 activeEffect 添加到存储副作用函数的桶中</span></span>
<span class="line"><span style="color:#24292E;">        bucket.add(activeEffect)</span></span>
<span class="line"><span style="color:#22863A;">+    }</span></span>
<span class="line"><span style="color:#24292E;">    // 返回属性值</span></span>
<span class="line"><span style="color:#24292E;">    return target[key]</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  // 拦截设置操作</span></span>
<span class="line"><span style="color:#24292E;">  set(target, key, newVal) {</span></span>
<span class="line"><span style="color:#24292E;">    // 设置属性值</span></span>
<span class="line"><span style="color:#24292E;">    target[key] = newVal</span></span>
<span class="line"><span style="color:#24292E;">    // 把副作用函数从桶里取出并执行</span></span>
<span class="line"><span style="color:#24292E;">    bucket.forEach(fn =&gt; fn())</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// 用一个全局变量存储当前激活的 effect 函数</span></span>
<span class="line"><span style="color:#22863A;">+ function effect(fn) {</span></span>
<span class="line"><span style="color:#22863A;">+  // 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect</span></span>
<span class="line"><span style="color:#22863A;">+  activeEffect = fn</span></span>
<span class="line"><span style="color:#24292E;">  // 执行副作用函数</span></span>
<span class="line"><span style="color:#22863A;">+  fn()</span></span>
<span class="line"><span style="color:#22863A;">+}</span></span></code></pre></div><p>上述代码中，我们修改了<code>effect</code>函数。支持我们传入一个匿名函数</p><p>测试代码：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;effect run&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  document.body.innerText </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> obj.text</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  obj.text2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;hello vue3&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">}, </span><span style="color:#79B8FF;">1000</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;effect run&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  document.body.innerText </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> obj.text</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  obj.text2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;hello vue3&#39;</span></span>
<span class="line"><span style="color:#24292E;">}, </span><span style="color:#005CC5;">1000</span><span style="color:#24292E;">)</span></span></code></pre></div><p>上面的代码所示，由于副作用函数已经存储到了 activeEffect 中，所以在 get 拦截函数内应该把 activeEffect 收集到“桶”中，这样响应系统就不依赖副作用函数的名字了。</p><p>但如果我们再对这个系统稍加测试，例如在响应式数据 obj 上设置一个不存在的属性时：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;effect run&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  document.body.innerText </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> obj.text</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  obj.notExist </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;hello&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">}, </span><span style="color:#79B8FF;">1000</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;effect run&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  document.body.innerText </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> obj.text</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  obj.notExist </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;hello&#39;</span></span>
<span class="line"><span style="color:#24292E;">}, </span><span style="color:#005CC5;">1000</span><span style="color:#24292E;">)</span></span></code></pre></div><p>上面的代码中，肯定是不可能触发effect函数的，因为新的字段<code>notExist</code>并没有跟副作用函数产生联系。</p><p><strong>那么如何将想要操作的属性，自动与effect函数产生联系呢？</strong></p><p>之前的Set结构肯定不可以了，我们可以使用下面这种数据结构:</p><pre><code>WeakMap({
    target: Map({
       key1: Set(effect1, effect2),
       key2: Set(effect1, effect2)
    }),
    target2: Map({
       key1: Set(effect1, effect2),
       key2: Set(effect1, effect2)
    }),
})
</code></pre><p>所以修改一下之前的代码:</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// 存储副作用函数的桶</span></span>
<span class="line"><span style="color:#85E89D;">+ const bucket = new WeakMap()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// 原始数据</span></span>
<span class="line"><span style="color:#E1E4E8;">const data = { text: &#39;hello world&#39; }</span></span>
<span class="line"><span style="color:#E1E4E8;">// 对原始数据的代理</span></span>
<span class="line"><span style="color:#E1E4E8;">const obj = new Proxy(data, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  // 拦截读取操作</span></span>
<span class="line"><span style="color:#E1E4E8;">  get(target, key) {</span></span>
<span class="line"><span style="color:#85E89D;">+    if (!activeEffect) return target[key]</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 将副作用函数 activeEffect 添加到存储副作用函数的桶中</span></span>
<span class="line"><span style="color:#85E89D;">+    let depsMap = bucket.get(target)</span></span>
<span class="line"><span style="color:#85E89D;">+    if (!depsMap) {</span></span>
<span class="line"><span style="color:#85E89D;">+      bucket.set(target, (depsMap = new Map()))</span></span>
<span class="line"><span style="color:#85E89D;">+    }</span></span>
<span class="line"><span style="color:#85E89D;">+    let deps = depsMap.get(key)</span></span>
<span class="line"><span style="color:#85E89D;">+    if (!deps) {</span></span>
<span class="line"><span style="color:#85E89D;">+      depsMap.set(key, (deps = new Set()))</span></span>
<span class="line"><span style="color:#85E89D;">+    }</span></span>
<span class="line"><span style="color:#85E89D;">+    deps.add(activeEffect)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 返回属性值</span></span>
<span class="line"><span style="color:#E1E4E8;">    return target[key]</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  // 拦截设置操作</span></span>
<span class="line"><span style="color:#E1E4E8;">  set(target, key, newVal) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 设置属性值</span></span>
<span class="line"><span style="color:#E1E4E8;">    target[key] = newVal</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 把副作用函数从桶里取出并执行</span></span>
<span class="line"><span style="color:#85E89D;">+    const depsMap = bucket.get(target)</span></span>
<span class="line"><span style="color:#85E89D;">+    if (!depsMap) return</span></span>
<span class="line"><span style="color:#85E89D;">+    const effects = depsMap.get(key)</span></span>
<span class="line"><span style="color:#E1E4E8;">    effects &amp;&amp; effects.forEach(fn =&gt; fn())</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// 用一个全局变量存储当前激活的 effect 函数</span></span>
<span class="line"><span style="color:#E1E4E8;">let activeEffect</span></span>
<span class="line"><span style="color:#E1E4E8;">function effect(fn) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  // 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect</span></span>
<span class="line"><span style="color:#E1E4E8;">  activeEffect = fn</span></span>
<span class="line"><span style="color:#E1E4E8;">  // 执行副作用函数</span></span>
<span class="line"><span style="color:#E1E4E8;">  fn()</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// 存储副作用函数的桶</span></span>
<span class="line"><span style="color:#22863A;">+ const bucket = new WeakMap()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// 原始数据</span></span>
<span class="line"><span style="color:#24292E;">const data = { text: &#39;hello world&#39; }</span></span>
<span class="line"><span style="color:#24292E;">// 对原始数据的代理</span></span>
<span class="line"><span style="color:#24292E;">const obj = new Proxy(data, {</span></span>
<span class="line"><span style="color:#24292E;">  // 拦截读取操作</span></span>
<span class="line"><span style="color:#24292E;">  get(target, key) {</span></span>
<span class="line"><span style="color:#22863A;">+    if (!activeEffect) return target[key]</span></span>
<span class="line"><span style="color:#24292E;">    // 将副作用函数 activeEffect 添加到存储副作用函数的桶中</span></span>
<span class="line"><span style="color:#22863A;">+    let depsMap = bucket.get(target)</span></span>
<span class="line"><span style="color:#22863A;">+    if (!depsMap) {</span></span>
<span class="line"><span style="color:#22863A;">+      bucket.set(target, (depsMap = new Map()))</span></span>
<span class="line"><span style="color:#22863A;">+    }</span></span>
<span class="line"><span style="color:#22863A;">+    let deps = depsMap.get(key)</span></span>
<span class="line"><span style="color:#22863A;">+    if (!deps) {</span></span>
<span class="line"><span style="color:#22863A;">+      depsMap.set(key, (deps = new Set()))</span></span>
<span class="line"><span style="color:#22863A;">+    }</span></span>
<span class="line"><span style="color:#22863A;">+    deps.add(activeEffect)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 返回属性值</span></span>
<span class="line"><span style="color:#24292E;">    return target[key]</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  // 拦截设置操作</span></span>
<span class="line"><span style="color:#24292E;">  set(target, key, newVal) {</span></span>
<span class="line"><span style="color:#24292E;">    // 设置属性值</span></span>
<span class="line"><span style="color:#24292E;">    target[key] = newVal</span></span>
<span class="line"><span style="color:#24292E;">    // 把副作用函数从桶里取出并执行</span></span>
<span class="line"><span style="color:#22863A;">+    const depsMap = bucket.get(target)</span></span>
<span class="line"><span style="color:#22863A;">+    if (!depsMap) return</span></span>
<span class="line"><span style="color:#22863A;">+    const effects = depsMap.get(key)</span></span>
<span class="line"><span style="color:#24292E;">    effects &amp;&amp; effects.forEach(fn =&gt; fn())</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// 用一个全局变量存储当前激活的 effect 函数</span></span>
<span class="line"><span style="color:#24292E;">let activeEffect</span></span>
<span class="line"><span style="color:#24292E;">function effect(fn) {</span></span>
<span class="line"><span style="color:#24292E;">  // 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect</span></span>
<span class="line"><span style="color:#24292E;">  activeEffect = fn</span></span>
<span class="line"><span style="color:#24292E;">  // 执行副作用函数</span></span>
<span class="line"><span style="color:#24292E;">  fn()</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看到，我们不再单纯的从<code>桶</code>中，获取effects函数。而是借助<code>WeakMap</code>取出target对象下<code>key</code>所对应的effects。</p><p>如下图：</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65a12662c2ac474fa7e527f243e899a3~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>在目前的实现中，当读取属性值时，我们直接在 get 拦截函数里编写把副作用函数收集 到“桶”里的这部分逻辑，但更好的做法是将这部分逻辑单独封装到一个 <code>track 函数</code>中，函数的名字叫 track 是为了表达追踪的含义。同样，我们也可以把触发副作用函数重新执行的逻辑封装到 <code>trigger 函数</code>中：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 存储副作用函数的桶</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">bucket</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">WeakMap</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 原始数据</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { text: </span><span style="color:#9ECBFF;">&#39;hello world&#39;</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#6A737D;">// 对原始数据的代理</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">(data, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 拦截读取操作</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">target</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 将副作用函数 activeEffect 添加到存储副作用函数的桶中</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">track</span><span style="color:#E1E4E8;">(target, key)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 返回属性值</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> target[key]</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 拦截设置操作</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">target</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">newVal</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 设置属性值</span></span>
<span class="line"><span style="color:#E1E4E8;">    target[key] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> newVal</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 把副作用函数从桶里取出并执行</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">trigger</span><span style="color:#E1E4E8;">(target, key)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">track</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">target</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> depsMap </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> bucket.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(target)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">depsMap) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    bucket.</span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(target, (depsMap </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Map</span><span style="color:#E1E4E8;">()))</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> deps </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> depsMap.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(key)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">deps) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    depsMap.</span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(key, (deps </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Set</span><span style="color:#E1E4E8;">()))</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  deps.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(activeEffect)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">trigger</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">target</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">depsMap</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> bucket.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(target)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">depsMap) </span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">effects</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> depsMap.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(key)</span></span>
<span class="line"><span style="color:#E1E4E8;">  effects </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> effects.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">fn</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fn</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 用一个全局变量存储当前激活的 effect 函数</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> activeEffect</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">fn</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect</span></span>
<span class="line"><span style="color:#E1E4E8;">  activeEffect </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> fn</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 执行副作用函数</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">fn</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 测试代码</span></span>
<span class="line"><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;effect run&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  document.body.innerText </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> obj.text</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">trigger</span><span style="color:#E1E4E8;">(data, </span><span style="color:#9ECBFF;">&#39;text&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}, </span><span style="color:#79B8FF;">1000</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 存储副作用函数的桶</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">bucket</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">WeakMap</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 原始数据</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { text: </span><span style="color:#032F62;">&#39;hello world&#39;</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#6A737D;">// 对原始数据的代理</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Proxy</span><span style="color:#24292E;">(data, {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 拦截读取操作</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#E36209;">target</span><span style="color:#24292E;">, </span><span style="color:#E36209;">key</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 将副作用函数 activeEffect 添加到存储副作用函数的桶中</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">track</span><span style="color:#24292E;">(target, key)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 返回属性值</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> target[key]</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 拦截设置操作</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(</span><span style="color:#E36209;">target</span><span style="color:#24292E;">, </span><span style="color:#E36209;">key</span><span style="color:#24292E;">, </span><span style="color:#E36209;">newVal</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 设置属性值</span></span>
<span class="line"><span style="color:#24292E;">    target[key] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> newVal</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 把副作用函数从桶里取出并执行</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">trigger</span><span style="color:#24292E;">(target, key)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">track</span><span style="color:#24292E;">(</span><span style="color:#E36209;">target</span><span style="color:#24292E;">, </span><span style="color:#E36209;">key</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> depsMap </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> bucket.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(target)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">depsMap) {</span></span>
<span class="line"><span style="color:#24292E;">    bucket.</span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(target, (depsMap </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Map</span><span style="color:#24292E;">()))</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> deps </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> depsMap.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(key)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">deps) {</span></span>
<span class="line"><span style="color:#24292E;">    depsMap.</span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(key, (deps </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Set</span><span style="color:#24292E;">()))</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  deps.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(activeEffect)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">trigger</span><span style="color:#24292E;">(</span><span style="color:#E36209;">target</span><span style="color:#24292E;">, </span><span style="color:#E36209;">key</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">depsMap</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> bucket.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(target)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">depsMap) </span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">effects</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> depsMap.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(key)</span></span>
<span class="line"><span style="color:#24292E;">  effects </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> effects.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(</span><span style="color:#E36209;">fn</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fn</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 用一个全局变量存储当前激活的 effect 函数</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> activeEffect</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">(</span><span style="color:#E36209;">fn</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect</span></span>
<span class="line"><span style="color:#24292E;">  activeEffect </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> fn</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 执行副作用函数</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">fn</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 测试代码</span></span>
<span class="line"><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;effect run&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  document.body.innerText </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> obj.text</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">trigger</span><span style="color:#24292E;">(data, </span><span style="color:#032F62;">&#39;text&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}, </span><span style="color:#005CC5;">1000</span><span style="color:#24292E;">)</span></span></code></pre></div><h2 id="_4-4-分支切换与-cleanup" tabindex="-1">4.4 分支切换与 cleanup <a class="header-anchor" href="#_4-4-分支切换与-cleanup" aria-label="Permalink to &quot;4.4 分支切换与 cleanup&quot;">​</a></h2><p>分支切换可能会产生遗留的副作用函数， 以这段代码为例:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { ok: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, text: </span><span style="color:#9ECBFF;">&#39;hello world&#39;</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">(data, { </span><span style="color:#6A737D;">/* ... */</span><span style="color:#E1E4E8;"> })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">effectFn</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  document.body.innerText </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> obj.ok </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> obj.text </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;not&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { ok: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, text: </span><span style="color:#032F62;">&#39;hello world&#39;</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Proxy</span><span style="color:#24292E;">(data, { </span><span style="color:#6A737D;">/* ... */</span><span style="color:#24292E;"> })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">effectFn</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  document.body.innerText </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> obj.ok </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> obj.text </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;not&#39;</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>假设<code>obj.ok</code> 默认为true, 依赖树如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">Map</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">   obj: </span><span style="color:#B392F0;">Map</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">     ok: </span><span style="color:#B392F0;">Set</span><span style="color:#E1E4E8;">(effectFn),</span></span>
<span class="line"><span style="color:#E1E4E8;">     text: </span><span style="color:#B392F0;">Set</span><span style="color:#E1E4E8;">(effectFn)</span></span>
<span class="line"><span style="color:#E1E4E8;">   })</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">Map</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">   obj: </span><span style="color:#6F42C1;">Map</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">     ok: </span><span style="color:#6F42C1;">Set</span><span style="color:#24292E;">(effectFn),</span></span>
<span class="line"><span style="color:#24292E;">     text: </span><span style="color:#6F42C1;">Set</span><span style="color:#24292E;">(effectFn)</span></span>
<span class="line"><span style="color:#24292E;">   })</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>不难看出，副作用函数分别被<code>ok</code>和<code>text</code>依赖收集。</p><p>但是如果<code>obj.ok</code>被修改成<code>false</code>, 我们<strong>期望的</strong>依赖结构为：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">Map</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">   obj: </span><span style="color:#B392F0;">Map</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">     ok: </span><span style="color:#B392F0;">Set</span><span style="color:#E1E4E8;">(effectFn),</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;">// text: Set(effectFn)</span></span>
<span class="line"><span style="color:#E1E4E8;">   })</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">Map</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">   obj: </span><span style="color:#6F42C1;">Map</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">     ok: </span><span style="color:#6F42C1;">Set</span><span style="color:#24292E;">(effectFn),</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;">// text: Set(effectFn)</span></span>
<span class="line"><span style="color:#24292E;">   })</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>但是，实际上text的依赖仍然存在，我们并没有使用到<code>obj.text</code>, 如果修改<code>obj.text</code>，还是会重新执行effect。所以这样是有问题的！ 我们并不希望切换为false的时候，text的依赖还存在。</p><p><strong>解决这个问题的思路很简单，每次副作用函数执行时，我们可以 先把它从所有与之关联的依赖集合中删除</strong></p><p>用一张图来解释：</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3580b850b0a44a259e0bf0017f516ddb~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>简单来讲，就是<code>effect</code>和<code>effect Set</code>之间建立了联系。每次收集依赖之前，<strong>获取<code>effectFn</code>对应的依赖集合，然后把自己删除了，相当于解除了关联</strong>。</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// 存储副作用函数的桶</span></span>
<span class="line"><span style="color:#E1E4E8;">const bucket = new WeakMap()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// 原始数据</span></span>
<span class="line"><span style="color:#E1E4E8;">const data = { ok: true, text: &#39;hello world&#39; }</span></span>
<span class="line"><span style="color:#E1E4E8;">// 对原始数据的代理</span></span>
<span class="line"><span style="color:#E1E4E8;">const obj = new Proxy(data, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  // 拦截读取操作</span></span>
<span class="line"><span style="color:#E1E4E8;">  get(target, key) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 将副作用函数 activeEffect 添加到存储副作用函数的桶中</span></span>
<span class="line"><span style="color:#E1E4E8;">    track(target, key)</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 返回属性值</span></span>
<span class="line"><span style="color:#E1E4E8;">    return target[key]</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  // 拦截设置操作</span></span>
<span class="line"><span style="color:#E1E4E8;">  set(target, key, newVal) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 设置属性值</span></span>
<span class="line"><span style="color:#E1E4E8;">    target[key] = newVal</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 把副作用函数从桶里取出并执行</span></span>
<span class="line"><span style="color:#E1E4E8;">    trigger(target, key)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">function track(target, key) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  let depsMap = bucket.get(target)</span></span>
<span class="line"><span style="color:#E1E4E8;">  if (!depsMap) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    bucket.set(target, (depsMap = new Map()))</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  let deps = depsMap.get(key)</span></span>
<span class="line"><span style="color:#E1E4E8;">  if (!deps) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    depsMap.set(key, (deps = new Set()))</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  deps.add(activeEffect)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  // effect 关联属性对应的 Set(effects)</span></span>
<span class="line"><span style="color:#85E89D;">+  activeEffect.deps.push(deps)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">function trigger(target, key) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  const depsMap = bucket.get(target)</span></span>
<span class="line"><span style="color:#E1E4E8;">  if (!depsMap) return</span></span>
<span class="line"><span style="color:#E1E4E8;">  const effects = depsMap.get(key)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  effects &amp;&amp; effects.forEach(effectFn =&gt; effectFn())</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// 用一个全局变量存储当前激活的 effect 函数</span></span>
<span class="line"><span style="color:#E1E4E8;">let activeEffect</span></span>
<span class="line"><span style="color:#E1E4E8;">function effect(fn) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  const effectFn = () =&gt; {</span></span>
<span class="line"><span style="color:#85E89D;">+   cleanup(effectFn)</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect</span></span>
<span class="line"><span style="color:#E1E4E8;">    activeEffect = effectFn</span></span>
<span class="line"><span style="color:#E1E4E8;">    fn()</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  // activeEffect.deps 用来存储所有与该副作用函数相关的依赖集合</span></span>
<span class="line"><span style="color:#85E89D;">+  effectFn.deps = []</span></span>
<span class="line"><span style="color:#E1E4E8;">  // 执行副作用函数</span></span>
<span class="line"><span style="color:#E1E4E8;">  effectFn()</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">+ function cleanup(effectFn) {</span></span>
<span class="line"><span style="color:#85E89D;">+   for (let i = 0; i &lt; effectFn.deps.length; i++) {</span></span>
<span class="line"><span style="color:#85E89D;">+     const deps = effectFn.deps[i]</span></span>
<span class="line"><span style="color:#85E89D;">+     deps.delete(effectFn)</span></span>
<span class="line"><span style="color:#85E89D;">+   }</span></span>
<span class="line"><span style="color:#85E89D;">+  effectFn.deps.length = 0</span></span>
<span class="line"><span style="color:#85E89D;">+ }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// 存储副作用函数的桶</span></span>
<span class="line"><span style="color:#24292E;">const bucket = new WeakMap()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// 原始数据</span></span>
<span class="line"><span style="color:#24292E;">const data = { ok: true, text: &#39;hello world&#39; }</span></span>
<span class="line"><span style="color:#24292E;">// 对原始数据的代理</span></span>
<span class="line"><span style="color:#24292E;">const obj = new Proxy(data, {</span></span>
<span class="line"><span style="color:#24292E;">  // 拦截读取操作</span></span>
<span class="line"><span style="color:#24292E;">  get(target, key) {</span></span>
<span class="line"><span style="color:#24292E;">    // 将副作用函数 activeEffect 添加到存储副作用函数的桶中</span></span>
<span class="line"><span style="color:#24292E;">    track(target, key)</span></span>
<span class="line"><span style="color:#24292E;">    // 返回属性值</span></span>
<span class="line"><span style="color:#24292E;">    return target[key]</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  // 拦截设置操作</span></span>
<span class="line"><span style="color:#24292E;">  set(target, key, newVal) {</span></span>
<span class="line"><span style="color:#24292E;">    // 设置属性值</span></span>
<span class="line"><span style="color:#24292E;">    target[key] = newVal</span></span>
<span class="line"><span style="color:#24292E;">    // 把副作用函数从桶里取出并执行</span></span>
<span class="line"><span style="color:#24292E;">    trigger(target, key)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">function track(target, key) {</span></span>
<span class="line"><span style="color:#24292E;">  let depsMap = bucket.get(target)</span></span>
<span class="line"><span style="color:#24292E;">  if (!depsMap) {</span></span>
<span class="line"><span style="color:#24292E;">    bucket.set(target, (depsMap = new Map()))</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  let deps = depsMap.get(key)</span></span>
<span class="line"><span style="color:#24292E;">  if (!deps) {</span></span>
<span class="line"><span style="color:#24292E;">    depsMap.set(key, (deps = new Set()))</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  deps.add(activeEffect)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  // effect 关联属性对应的 Set(effects)</span></span>
<span class="line"><span style="color:#22863A;">+  activeEffect.deps.push(deps)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">function trigger(target, key) {</span></span>
<span class="line"><span style="color:#24292E;">  const depsMap = bucket.get(target)</span></span>
<span class="line"><span style="color:#24292E;">  if (!depsMap) return</span></span>
<span class="line"><span style="color:#24292E;">  const effects = depsMap.get(key)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  effects &amp;&amp; effects.forEach(effectFn =&gt; effectFn())</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// 用一个全局变量存储当前激活的 effect 函数</span></span>
<span class="line"><span style="color:#24292E;">let activeEffect</span></span>
<span class="line"><span style="color:#24292E;">function effect(fn) {</span></span>
<span class="line"><span style="color:#24292E;">  const effectFn = () =&gt; {</span></span>
<span class="line"><span style="color:#22863A;">+   cleanup(effectFn)</span></span>
<span class="line"><span style="color:#24292E;">    // 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect</span></span>
<span class="line"><span style="color:#24292E;">    activeEffect = effectFn</span></span>
<span class="line"><span style="color:#24292E;">    fn()</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  // activeEffect.deps 用来存储所有与该副作用函数相关的依赖集合</span></span>
<span class="line"><span style="color:#22863A;">+  effectFn.deps = []</span></span>
<span class="line"><span style="color:#24292E;">  // 执行副作用函数</span></span>
<span class="line"><span style="color:#24292E;">  effectFn()</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">+ function cleanup(effectFn) {</span></span>
<span class="line"><span style="color:#22863A;">+   for (let i = 0; i &lt; effectFn.deps.length; i++) {</span></span>
<span class="line"><span style="color:#22863A;">+     const deps = effectFn.deps[i]</span></span>
<span class="line"><span style="color:#22863A;">+     deps.delete(effectFn)</span></span>
<span class="line"><span style="color:#22863A;">+   }</span></span>
<span class="line"><span style="color:#22863A;">+  effectFn.deps.length = 0</span></span>
<span class="line"><span style="color:#22863A;">+ }</span></span></code></pre></div><p>我们的响应系统已经可以避免副作用函数产生遗留了。但如果你尝试运行代码，会发现目前的实现会导致无限循环执行，问题 出在 trigger 函数中</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">effects </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> effects.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">effectFn</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">effectFn</span><span style="color:#E1E4E8;">())</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">effects </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> effects.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(</span><span style="color:#E36209;">effectFn</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">effectFn</span><span style="color:#24292E;">())</span></span></code></pre></div><p>如果你在一个循环中，添加和删除Set，会导致无限遍历:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">newSet.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">item</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  set.</span><span style="color:#B392F0;">delete</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">// 相当于cleanup</span></span>
<span class="line"><span style="color:#E1E4E8;">  set.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">// 相当于track收集依赖</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">newSet.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(</span><span style="color:#E36209;">item</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  set.</span><span style="color:#6F42C1;">delete</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) </span><span style="color:#6A737D;">// 相当于cleanup</span></span>
<span class="line"><span style="color:#24292E;">  set.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) </span><span style="color:#6A737D;">// 相当于track收集依赖</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>我们修改一下<code>trigger</code>函数</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function trigger(target, key) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  const depsMap = bucket.get(target)</span></span>
<span class="line"><span style="color:#E1E4E8;">  if (!depsMap) return</span></span>
<span class="line"><span style="color:#E1E4E8;">  const effects = depsMap.get(key)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  const effectsToRun = new Set()</span></span>
<span class="line"><span style="color:#85E89D;">+  effects &amp;&amp; effects.forEach(effectFn =&gt; effectsToRun.add(effectFn))</span></span>
<span class="line"><span style="color:#85E89D;">+  effectsToRun.forEach(effectFn =&gt; effectFn())</span></span>
<span class="line"><span style="color:#FDAEB7;">-  effects &amp;&amp; effects.forEach(effectFn =&gt; effectFn())</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function trigger(target, key) {</span></span>
<span class="line"><span style="color:#24292E;">  const depsMap = bucket.get(target)</span></span>
<span class="line"><span style="color:#24292E;">  if (!depsMap) return</span></span>
<span class="line"><span style="color:#24292E;">  const effects = depsMap.get(key)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  const effectsToRun = new Set()</span></span>
<span class="line"><span style="color:#22863A;">+  effects &amp;&amp; effects.forEach(effectFn =&gt; effectsToRun.add(effectFn))</span></span>
<span class="line"><span style="color:#22863A;">+  effectsToRun.forEach(effectFn =&gt; effectFn())</span></span>
<span class="line"><span style="color:#B31D28;">-  effects &amp;&amp; effects.forEach(effectFn =&gt; effectFn())</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>我们新构造了 effectsToRun 集合并遍历它， 代替直接遍历 effects 集合，从而避免了无限执行。</p><h2 id="_4-5-嵌套的effect-与-effect栈" tabindex="-1">4.5 嵌套的effect 与 effect栈 <a class="header-anchor" href="#_4-5-嵌套的effect-与-effect栈" aria-label="Permalink to &quot;4.5 嵌套的effect 与 effect栈&quot;">​</a></h2><p>我们思考一下下面的代码。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">effectFn1</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;effectFn1 执行&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">effectFn2</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;effectFn2 执行&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    temp2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> obj.bar</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">  temp1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> obj.foo</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">effectFn1</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;effectFn1 执行&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">effectFn2</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;effectFn2 执行&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    temp2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> obj.bar</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">  temp1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> obj.foo</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>在初始执行的时候，自然会触发<code>effectFn1</code>和<code>effectFn2</code>，但是当你修改<code>obj.foo</code>的时候，却只会执行<code>effectFn2</code>。为什么呢？</p><p>在前面，我们是用过这样的方式获取<code>effect</code>的：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">activeEffect </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> effectFn</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">activeEffect </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> effectFn</span></span></code></pre></div><p>初次执行完后，最后一次执行后，<code>activeEffect === effectFn2</code>, 此时<code>obj.foo</code>收集的其实是<code>effectFn2</code>。</p><p>那怎么解决呢？我们可以维护一个栈的结构, 代码如下：</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// 用一个全局变量存储当前激活的 effect 函数</span></span>
<span class="line"><span style="color:#E1E4E8;">let activeEffect</span></span>
<span class="line"><span style="color:#E1E4E8;">// effect 栈</span></span>
<span class="line"><span style="color:#E1E4E8;">const effectStack = []</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">function effect(fn) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  const effectFn = () =&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    cleanup(effectFn)</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect</span></span>
<span class="line"><span style="color:#E1E4E8;">    activeEffect = effectFn</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 在调用副作用函数之前将当前副作用函数压栈</span></span>
<span class="line"><span style="color:#85E89D;">+    effectStack.push(effectFn)</span></span>
<span class="line"><span style="color:#E1E4E8;">    fn()</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 在当前副作用函数执行完毕后，将当前副作用函数弹出栈，并还原 activeEffect 为之前的值</span></span>
<span class="line"><span style="color:#85E89D;">+    effectStack.pop()</span></span>
<span class="line"><span style="color:#85E89D;">+    activeEffect = effectStack[effectStack.length - 1]</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  // activeEffect.deps 用来存储所有与该副作用函数相关的依赖集合</span></span>
<span class="line"><span style="color:#E1E4E8;">  effectFn.deps = []</span></span>
<span class="line"><span style="color:#E1E4E8;">  // 执行副作用函数</span></span>
<span class="line"><span style="color:#E1E4E8;">  effectFn()</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// 用一个全局变量存储当前激活的 effect 函数</span></span>
<span class="line"><span style="color:#24292E;">let activeEffect</span></span>
<span class="line"><span style="color:#24292E;">// effect 栈</span></span>
<span class="line"><span style="color:#24292E;">const effectStack = []</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">function effect(fn) {</span></span>
<span class="line"><span style="color:#24292E;">  const effectFn = () =&gt; {</span></span>
<span class="line"><span style="color:#24292E;">    cleanup(effectFn)</span></span>
<span class="line"><span style="color:#24292E;">    // 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect</span></span>
<span class="line"><span style="color:#24292E;">    activeEffect = effectFn</span></span>
<span class="line"><span style="color:#24292E;">    // 在调用副作用函数之前将当前副作用函数压栈</span></span>
<span class="line"><span style="color:#22863A;">+    effectStack.push(effectFn)</span></span>
<span class="line"><span style="color:#24292E;">    fn()</span></span>
<span class="line"><span style="color:#24292E;">    // 在当前副作用函数执行完毕后，将当前副作用函数弹出栈，并还原 activeEffect 为之前的值</span></span>
<span class="line"><span style="color:#22863A;">+    effectStack.pop()</span></span>
<span class="line"><span style="color:#22863A;">+    activeEffect = effectStack[effectStack.length - 1]</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  // activeEffect.deps 用来存储所有与该副作用函数相关的依赖集合</span></span>
<span class="line"><span style="color:#24292E;">  effectFn.deps = []</span></span>
<span class="line"><span style="color:#24292E;">  // 执行副作用函数</span></span>
<span class="line"><span style="color:#24292E;">  effectFn()</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_4-6-避免无限递归循环" tabindex="-1">4.6 避免无限递归循环 <a class="header-anchor" href="#_4-6-避免无限递归循环" aria-label="Permalink to &quot;4.6 避免无限递归循环&quot;">​</a></h2><p>思考如下代码：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  obj.foo </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> obj.foo </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  obj.foo </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> obj.foo </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>最后会导致无限递归。</p><p>在这个语句中，既会读取 obj.foo 的值，又会设置 obj.foo 的 值，而这就是导致问题的根本原因。</p><p>基于此，我们可以在 trigger 动作发生时增加守卫条件：<strong>如果 trigger 触发执行的副作用函数与当前正在执行的副 作用函数相同，则不触发执行</strong></p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function trigger(target, key) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  const depsMap = bucket.get(target)</span></span>
<span class="line"><span style="color:#E1E4E8;">  if (!depsMap) return</span></span>
<span class="line"><span style="color:#E1E4E8;">  const effects = depsMap.get(key)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  const effectsToRun = new Set()</span></span>
<span class="line"><span style="color:#E1E4E8;">  effects &amp;&amp; effects.forEach(effectFn =&gt; {</span></span>
<span class="line"><span style="color:#85E89D;">+    if (effectFn !== activeEffect) {</span></span>
<span class="line"><span style="color:#85E89D;">+      effectsToRun.add(effectFn)</span></span>
<span class="line"><span style="color:#85E89D;">+    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">  effectsToRun.forEach(effectFn =&gt; effectFn())</span></span>
<span class="line"><span style="color:#E1E4E8;">  // effects &amp;&amp; effects.forEach(effectFn =&gt; effectFn())</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function trigger(target, key) {</span></span>
<span class="line"><span style="color:#24292E;">  const depsMap = bucket.get(target)</span></span>
<span class="line"><span style="color:#24292E;">  if (!depsMap) return</span></span>
<span class="line"><span style="color:#24292E;">  const effects = depsMap.get(key)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  const effectsToRun = new Set()</span></span>
<span class="line"><span style="color:#24292E;">  effects &amp;&amp; effects.forEach(effectFn =&gt; {</span></span>
<span class="line"><span style="color:#22863A;">+    if (effectFn !== activeEffect) {</span></span>
<span class="line"><span style="color:#22863A;">+      effectsToRun.add(effectFn)</span></span>
<span class="line"><span style="color:#22863A;">+    }</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">  effectsToRun.forEach(effectFn =&gt; effectFn())</span></span>
<span class="line"><span style="color:#24292E;">  // effects &amp;&amp; effects.forEach(effectFn =&gt; effectFn())</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_4-7-调度执行" tabindex="-1">4.7 调度执行 <a class="header-anchor" href="#_4-7-调度执行" aria-label="Permalink to &quot;4.7 调度执行&quot;">​</a></h2><p>思考下面的代码：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {foo: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">(data, {</span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(obj.foo)</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">obj.foo</span><span style="color:#F97583;">++</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;结束了&#39;</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {foo: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Proxy</span><span style="color:#24292E;">(data, {</span><span style="color:#D73A49;">...</span><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(obj.foo)</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">obj.foo</span><span style="color:#D73A49;">++</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;结束了&#39;</span><span style="color:#24292E;">)</span></span></code></pre></div><p>正常来讲，会打印如下内容：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#E1E4E8;">结束了</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#24292E;">结束了</span></span></code></pre></div><p>如果我们想实现，这样的输出呢？</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">结束了</span></span>
<span class="line"><span style="color:#79B8FF;">2</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">结束了</span></span>
<span class="line"><span style="color:#005CC5;">2</span></span></code></pre></div><p>你可能会想到把<code>console.log</code>放到上面。但有没有更好的办法呢？</p><p>其实我们可以设计一个选项参数，允许指定调度器</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(obj.foo)</span></span>
<span class="line"><span style="color:#E1E4E8;">}, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">scheduler</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">fn</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(obj.foo)</span></span>
<span class="line"><span style="color:#24292E;">}, {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">scheduler</span><span style="color:#24292E;">(</span><span style="color:#E36209;">fn</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>我们修改一下<code>effect</code>函数的实现：</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function effect(fn, options = {}) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  const effectFn = () =&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    cleanup(effectFn)</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect</span></span>
<span class="line"><span style="color:#E1E4E8;">    activeEffect = effectFn</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 在调用副作用函数之前将当前副作用函数压栈</span></span>
<span class="line"><span style="color:#E1E4E8;">    effectStack.push(effectFn)</span></span>
<span class="line"><span style="color:#E1E4E8;">    fn()</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 在当前副作用函数执行完毕后，将当前副作用函数弹出栈，并还原 activeEffect 为之前的值</span></span>
<span class="line"><span style="color:#E1E4E8;">    effectStack.pop()</span></span>
<span class="line"><span style="color:#E1E4E8;">    activeEffect = effectStack[effectStack.length - 1]</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  // 将 options 挂在到 effectFn 上</span></span>
<span class="line"><span style="color:#85E89D;">+  effectFn.options = options</span></span>
<span class="line"><span style="color:#E1E4E8;">  // activeEffect.deps 用来存储所有与该副作用函数相关的依赖集合</span></span>
<span class="line"><span style="color:#E1E4E8;">  effectFn.deps = []</span></span>
<span class="line"><span style="color:#E1E4E8;">  // 执行副作用函数</span></span>
<span class="line"><span style="color:#E1E4E8;">  effectFn()</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function effect(fn, options = {}) {</span></span>
<span class="line"><span style="color:#24292E;">  const effectFn = () =&gt; {</span></span>
<span class="line"><span style="color:#24292E;">    cleanup(effectFn)</span></span>
<span class="line"><span style="color:#24292E;">    // 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect</span></span>
<span class="line"><span style="color:#24292E;">    activeEffect = effectFn</span></span>
<span class="line"><span style="color:#24292E;">    // 在调用副作用函数之前将当前副作用函数压栈</span></span>
<span class="line"><span style="color:#24292E;">    effectStack.push(effectFn)</span></span>
<span class="line"><span style="color:#24292E;">    fn()</span></span>
<span class="line"><span style="color:#24292E;">    // 在当前副作用函数执行完毕后，将当前副作用函数弹出栈，并还原 activeEffect 为之前的值</span></span>
<span class="line"><span style="color:#24292E;">    effectStack.pop()</span></span>
<span class="line"><span style="color:#24292E;">    activeEffect = effectStack[effectStack.length - 1]</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  // 将 options 挂在到 effectFn 上</span></span>
<span class="line"><span style="color:#22863A;">+  effectFn.options = options</span></span>
<span class="line"><span style="color:#24292E;">  // activeEffect.deps 用来存储所有与该副作用函数相关的依赖集合</span></span>
<span class="line"><span style="color:#24292E;">  effectFn.deps = []</span></span>
<span class="line"><span style="color:#24292E;">  // 执行副作用函数</span></span>
<span class="line"><span style="color:#24292E;">  effectFn()</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>修改一下<code>trigger</code>函数:</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function trigger(target, key) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  const depsMap = bucket.get(target)</span></span>
<span class="line"><span style="color:#E1E4E8;">  if (!depsMap) return</span></span>
<span class="line"><span style="color:#E1E4E8;">  const effects = depsMap.get(key)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  const effectsToRun = new Set()</span></span>
<span class="line"><span style="color:#E1E4E8;">  effects &amp;&amp; effects.forEach(effectFn =&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (effectFn !== activeEffect) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      effectsToRun.add(effectFn)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">  effectsToRun.forEach(effectFn =&gt; {</span></span>
<span class="line"><span style="color:#85E89D;">+    if (effectFn.options.scheduler) {</span></span>
<span class="line"><span style="color:#85E89D;">+      effectFn.options.scheduler(effectFn)</span></span>
<span class="line"><span style="color:#85E89D;">+    } else {</span></span>
<span class="line"><span style="color:#85E89D;">+      effectFn()</span></span>
<span class="line"><span style="color:#85E89D;">+    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function trigger(target, key) {</span></span>
<span class="line"><span style="color:#24292E;">  const depsMap = bucket.get(target)</span></span>
<span class="line"><span style="color:#24292E;">  if (!depsMap) return</span></span>
<span class="line"><span style="color:#24292E;">  const effects = depsMap.get(key)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  const effectsToRun = new Set()</span></span>
<span class="line"><span style="color:#24292E;">  effects &amp;&amp; effects.forEach(effectFn =&gt; {</span></span>
<span class="line"><span style="color:#24292E;">    if (effectFn !== activeEffect) {</span></span>
<span class="line"><span style="color:#24292E;">      effectsToRun.add(effectFn)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">  effectsToRun.forEach(effectFn =&gt; {</span></span>
<span class="line"><span style="color:#22863A;">+    if (effectFn.options.scheduler) {</span></span>
<span class="line"><span style="color:#22863A;">+      effectFn.options.scheduler(effectFn)</span></span>
<span class="line"><span style="color:#22863A;">+    } else {</span></span>
<span class="line"><span style="color:#22863A;">+      effectFn()</span></span>
<span class="line"><span style="color:#22863A;">+    }</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>有了上面的代码实现。我们修改一下之前的例子</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {foo: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">(data, {</span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(obj.foo)</span></span>
<span class="line"><span style="color:#E1E4E8;">}, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">scheduler</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">effect</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(effect)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">obj.foo</span><span style="color:#F97583;">++</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;结束了&#39;</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {foo: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Proxy</span><span style="color:#24292E;">(data, {</span><span style="color:#D73A49;">...</span><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(obj.foo)</span></span>
<span class="line"><span style="color:#24292E;">}, {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">scheduler</span><span style="color:#24292E;">(</span><span style="color:#E36209;">effect</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(effect)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">obj.foo</span><span style="color:#D73A49;">++</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;结束了&#39;</span><span style="color:#24292E;">)</span></span></code></pre></div><p>最后就能打印出我们想要的效果：</p><pre><code>1
结束了
2
</code></pre><hr><p>分割一下====</p><p>大家再来思考一个问题：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {foo: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">(data, {</span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(obj.foo)</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">obj.foo</span><span style="color:#F97583;">++</span></span>
<span class="line"><span style="color:#E1E4E8;">obj.foo</span><span style="color:#F97583;">++</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {foo: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Proxy</span><span style="color:#24292E;">(data, {</span><span style="color:#D73A49;">...</span><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(obj.foo)</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">obj.foo</span><span style="color:#D73A49;">++</span></span>
<span class="line"><span style="color:#24292E;">obj.foo</span><span style="color:#D73A49;">++</span></span></code></pre></div><p>上面的代码会打印三次:</p><pre><code>1
2
3
</code></pre><p>如果我不想关心中间的状态，只需要最开始和最后的状态，如果用调度器实现呢？</p><p>我们可以这么做：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// =====================</span></span>
<span class="line"><span style="color:#6A737D;">// 代码实现</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">jobQueue</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Set</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#6A737D;">// 一个标志代表是否正在刷新队列</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> isFlushing </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">flushJob</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 如果队列正在刷新，则什么都不做</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (isFlushing) </span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 设置为 true，代表正在刷新</span></span>
<span class="line"><span style="color:#E1E4E8;">  isFlushing </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 在微任务队列中刷新 jobQueue 队列</span></span>
<span class="line"><span style="color:#E1E4E8;">  p.</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    jobQueue.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">job</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">job</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">  }).</span><span style="color:#B392F0;">finally</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    isFlushing </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">// =====================</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 示例代码</span></span>
<span class="line"><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(obj.foo)</span></span>
<span class="line"><span style="color:#E1E4E8;">}, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">scheduler</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">fn</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    jobQueue.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(fn)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">flushJob</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">obj.foo</span><span style="color:#F97583;">++</span></span>
<span class="line"><span style="color:#E1E4E8;">obj.foo</span><span style="color:#F97583;">++</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// =====================</span></span>
<span class="line"><span style="color:#6A737D;">// 代码实现</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">jobQueue</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Set</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">p</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#6A737D;">// 一个标志代表是否正在刷新队列</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> isFlushing </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">flushJob</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 如果队列正在刷新，则什么都不做</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (isFlushing) </span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 设置为 true，代表正在刷新</span></span>
<span class="line"><span style="color:#24292E;">  isFlushing </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 在微任务队列中刷新 jobQueue 队列</span></span>
<span class="line"><span style="color:#24292E;">  p.</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    jobQueue.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(</span><span style="color:#E36209;">job</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">job</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">  }).</span><span style="color:#6F42C1;">finally</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    isFlushing </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">// =====================</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 示例代码</span></span>
<span class="line"><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(obj.foo)</span></span>
<span class="line"><span style="color:#24292E;">}, {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">scheduler</span><span style="color:#24292E;">(</span><span style="color:#E36209;">fn</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    jobQueue.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(fn)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">flushJob</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">obj.foo</span><span style="color:#D73A49;">++</span></span>
<span class="line"><span style="color:#24292E;">obj.foo</span><span style="color:#D73A49;">++</span></span></code></pre></div><h2 id="_4-8-计算属性-computed-与-lazy" tabindex="-1">4.8 计算属性 computed 与 lazy <a class="header-anchor" href="#_4-8-计算属性-computed-与-lazy" aria-label="Permalink to &quot;4.8 计算属性 computed 与 lazy&quot;">​</a></h2><p>computed的核心在于这几点:</p><ul><li><strong>lazy 可通过options设置，当它为true时，不会立即执行副作用函数</strong></li><li><strong>副作用函数可以手动调用，getter可以返回值</strong></li><li><strong>对于计算属性的effect函数来说，它内部的响应式数据收集的会是计算属性的effect</strong></li><li><strong>计算属性的get和set没有track和trigger，需要手动调用</strong></li><li><strong>当响应式数据变化时，dirty设置为true</strong></li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">computed</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">getter</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> value</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> dirty </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">effectFn</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">(getter, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    lazy: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">scheduler</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">dirty) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        dirty </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">trigger</span><span style="color:#E1E4E8;">(obj, </span><span style="color:#9ECBFF;">&#39;value&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">get</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">value</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (dirty) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">effectFn</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        dirty </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">track</span><span style="color:#E1E4E8;">(obj, </span><span style="color:#9ECBFF;">&#39;value&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> value</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> obj</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">computed</span><span style="color:#24292E;">(</span><span style="color:#E36209;">getter</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> value</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> dirty </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">effectFn</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">(getter, {</span></span>
<span class="line"><span style="color:#24292E;">    lazy: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">scheduler</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">dirty) {</span></span>
<span class="line"><span style="color:#24292E;">        dirty </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">trigger</span><span style="color:#24292E;">(obj, </span><span style="color:#032F62;">&#39;value&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">get</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">value</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (dirty) {</span></span>
<span class="line"><span style="color:#24292E;">        value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">effectFn</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        dirty </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">track</span><span style="color:#24292E;">(obj, </span><span style="color:#032F62;">&#39;value&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> value</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> obj</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function effect(fn, options = {}) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  const effectFn = () =&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    cleanup(effectFn)</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect</span></span>
<span class="line"><span style="color:#E1E4E8;">    activeEffect = effectFn</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 在调用副作用函数之前将当前副作用函数压栈</span></span>
<span class="line"><span style="color:#E1E4E8;">    effectStack.push(effectFn)</span></span>
<span class="line"><span style="color:#85E89D;">+    const res = fn()</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 在当前副作用函数执行完毕后，将当前副作用函数弹出栈，并还原 activeEffect 为之前的值</span></span>
<span class="line"><span style="color:#E1E4E8;">    effectStack.pop()</span></span>
<span class="line"><span style="color:#E1E4E8;">    activeEffect = effectStack[effectStack.length - 1]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">+    return res</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  // 将 options 挂在到 effectFn 上</span></span>
<span class="line"><span style="color:#E1E4E8;">  effectFn.options = options</span></span>
<span class="line"><span style="color:#E1E4E8;">  // activeEffect.deps 用来存储所有与该副作用函数相关的依赖集合</span></span>
<span class="line"><span style="color:#E1E4E8;">  effectFn.deps = []</span></span>
<span class="line"><span style="color:#E1E4E8;">  // 执行副作用函数</span></span>
<span class="line"><span style="color:#85E89D;">+  if (!options.lazy) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    effectFn()</span></span>
<span class="line"><span style="color:#85E89D;">+  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">+  return effectFn</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function effect(fn, options = {}) {</span></span>
<span class="line"><span style="color:#24292E;">  const effectFn = () =&gt; {</span></span>
<span class="line"><span style="color:#24292E;">    cleanup(effectFn)</span></span>
<span class="line"><span style="color:#24292E;">    // 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect</span></span>
<span class="line"><span style="color:#24292E;">    activeEffect = effectFn</span></span>
<span class="line"><span style="color:#24292E;">    // 在调用副作用函数之前将当前副作用函数压栈</span></span>
<span class="line"><span style="color:#24292E;">    effectStack.push(effectFn)</span></span>
<span class="line"><span style="color:#22863A;">+    const res = fn()</span></span>
<span class="line"><span style="color:#24292E;">    // 在当前副作用函数执行完毕后，将当前副作用函数弹出栈，并还原 activeEffect 为之前的值</span></span>
<span class="line"><span style="color:#24292E;">    effectStack.pop()</span></span>
<span class="line"><span style="color:#24292E;">    activeEffect = effectStack[effectStack.length - 1]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">+    return res</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  // 将 options 挂在到 effectFn 上</span></span>
<span class="line"><span style="color:#24292E;">  effectFn.options = options</span></span>
<span class="line"><span style="color:#24292E;">  // activeEffect.deps 用来存储所有与该副作用函数相关的依赖集合</span></span>
<span class="line"><span style="color:#24292E;">  effectFn.deps = []</span></span>
<span class="line"><span style="color:#24292E;">  // 执行副作用函数</span></span>
<span class="line"><span style="color:#22863A;">+  if (!options.lazy) {</span></span>
<span class="line"><span style="color:#24292E;">    effectFn()</span></span>
<span class="line"><span style="color:#22863A;">+  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">+  return effectFn</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>我们来大致走一下流程：</p><ul><li><p>创建计算属性</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">sumRes</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">computed</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> obj.foo </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> obj.bar)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">sumRes</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">computed</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> obj.foo </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> obj.bar)</span></span></code></pre></div><p>计算属性<code>effect</code>函数会被创建，并且lazy 不会立刻执行</p></li><li><p>访问计算属性</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(sumRes.value)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(sumRes.value)</span></span></code></pre></div><ol><li>刚开始dirty为true, 会调用计算属性的effect函数，计算sumRes，dirty为false.</li><li>在计算过程中，会触发<code>obj.foo</code>和<code>obj.bar</code>的依赖收集，它们会收集计算属性的effect函数</li><li>计算完成后，手动调用<code>track</code>，让计算属性收集一下自己getter的effect函数</li></ol></li><li><p>修改响应式变量</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">obj.foo </span><span style="color:#F97583;">++</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">obj.foo </span><span style="color:#D73A49;">++</span></span></code></pre></div><p>触发get方法，会执行<code>scheduler</code>方法，判断<code>dirty === false</code>, 设置<code>dirty = true</code>, 然后执行之前计算属性自己收集的getter副作用函数, 最后重新计算新值。</p><pre><code>scheduler() {
    if (!dirty) {
      dirty = true
      trigger(obj, &#39;value&#39;)
    }
}
</code></pre></li></ul><h2 id="_4-9-watch的实现原理" tabindex="-1">4.9 watch的实现原理 <a class="header-anchor" href="#_4-9-watch的实现原理" aria-label="Permalink to &quot;4.9 watch的实现原理&quot;">​</a></h2><p><strong>watch 的实现本质上就是利用了 effect 以及 options.scheduler 选项</strong></p><p>我们先来实现一个最简单的watch</p><p>例子：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">watch</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> obj.foo, (</span><span style="color:#FFAB70;">newVal</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">oldVal</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(newVal, oldVal)</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">watch</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> obj.foo, (</span><span style="color:#E36209;">newVal</span><span style="color:#24292E;">, </span><span style="color:#E36209;">oldVal</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(newVal, oldVal)</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>实现代码</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">watch</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">source</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">cb</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">options</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {}) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> getter</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> source </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;function&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    getter </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> source</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> oldValue, newValue</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">job</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    newValue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">effectFn</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">cb</span><span style="color:#E1E4E8;">(oldValue, newValue)</span></span>
<span class="line"><span style="color:#E1E4E8;">    oldValue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> newValue</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">effectFn</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getter</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      lazy: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">scheduler</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">job</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  )</span></span>
<span class="line"><span style="color:#E1E4E8;">  oldValue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">effectFn</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">watch</span><span style="color:#24292E;">(</span><span style="color:#E36209;">source</span><span style="color:#24292E;">, </span><span style="color:#E36209;">cb</span><span style="color:#24292E;">, </span><span style="color:#E36209;">options</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {}) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> getter</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> source </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;function&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    getter </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> source</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> oldValue, newValue</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">job</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    newValue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">effectFn</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">cb</span><span style="color:#24292E;">(oldValue, newValue)</span></span>
<span class="line"><span style="color:#24292E;">    oldValue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> newValue</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">effectFn</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getter</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      lazy: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">scheduler</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">job</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  )</span></span>
<span class="line"><span style="color:#24292E;">  oldValue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">effectFn</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看到，代码难度不大：</p><ol><li><p>会将我们传入的getter,作为effect函数的getter</p></li><li><p>我们设置了<code>lazy</code>为true, 不会立即执行。</p><p>然后实现了<code>scheduler</code>调度器，会执行我们的回调函数。</p></li><li><p>在初始化时，会先调用getter缓存一下最新的值，这样我们在初次修改数据时，就能拿到旧的值了。</p></li></ol><hr><p>上面只实现了最基础的功能，其实<code>watch</code>还支持立即执行，就像下面这样：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">watch</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> obj.foo, (</span><span style="color:#FFAB70;">newVal</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">oldVal</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(newVal, oldVal)</span></span>
<span class="line"><span style="color:#E1E4E8;">}, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  immediate: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 立即执行</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">watch</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> obj.foo, (</span><span style="color:#E36209;">newVal</span><span style="color:#24292E;">, </span><span style="color:#E36209;">oldVal</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(newVal, oldVal)</span></span>
<span class="line"><span style="color:#24292E;">}, {</span></span>
<span class="line"><span style="color:#24292E;">  immediate: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 立即执行</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>我们修改一下实现代码：</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function watch(source, cb, options = {}) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  let getter</span></span>
<span class="line"><span style="color:#E1E4E8;">  if (typeof source === &#39;function&#39;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    getter = source</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  let oldValue, newValue</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  const job = () =&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    newValue = effectFn()</span></span>
<span class="line"><span style="color:#E1E4E8;">    cb(oldValue, newValue)</span></span>
<span class="line"><span style="color:#E1E4E8;">    oldValue = newValue</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  const effectFn = effect(</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 执行 getter</span></span>
<span class="line"><span style="color:#E1E4E8;">    () =&gt; getter(),</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      lazy: true,</span></span>
<span class="line"><span style="color:#E1E4E8;">      scheduler: () =&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">        job()</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  )</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#85E89D;">+  if (options.immediate) {</span></span>
<span class="line"><span style="color:#85E89D;">+    job()</span></span>
<span class="line"><span style="color:#85E89D;">+  } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">    oldValue = effectFn()</span></span>
<span class="line"><span style="color:#85E89D;">+  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function watch(source, cb, options = {}) {</span></span>
<span class="line"><span style="color:#24292E;">  let getter</span></span>
<span class="line"><span style="color:#24292E;">  if (typeof source === &#39;function&#39;) {</span></span>
<span class="line"><span style="color:#24292E;">    getter = source</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  let oldValue, newValue</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  const job = () =&gt; {</span></span>
<span class="line"><span style="color:#24292E;">    newValue = effectFn()</span></span>
<span class="line"><span style="color:#24292E;">    cb(oldValue, newValue)</span></span>
<span class="line"><span style="color:#24292E;">    oldValue = newValue</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  const effectFn = effect(</span></span>
<span class="line"><span style="color:#24292E;">    // 执行 getter</span></span>
<span class="line"><span style="color:#24292E;">    () =&gt; getter(),</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      lazy: true,</span></span>
<span class="line"><span style="color:#24292E;">      scheduler: () =&gt; {</span></span>
<span class="line"><span style="color:#24292E;">        job()</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  )</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#22863A;">+  if (options.immediate) {</span></span>
<span class="line"><span style="color:#22863A;">+    job()</span></span>
<span class="line"><span style="color:#22863A;">+  } else {</span></span>
<span class="line"><span style="color:#24292E;">    oldValue = effectFn()</span></span>
<span class="line"><span style="color:#22863A;">+  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这样就可以在watch初始化时执行一遍回调了。</p><hr><p>除此之外，<code>watch</code>还支持异步执行回调函数，如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">watch</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> obj.foo, (</span><span style="color:#FFAB70;">newVal</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">oldVal</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(newVal, oldVal)</span></span>
<span class="line"><span style="color:#E1E4E8;">}, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  immediate: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  flush: </span><span style="color:#9ECBFF;">&#39;post&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">watch</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> obj.foo, (</span><span style="color:#E36209;">newVal</span><span style="color:#24292E;">, </span><span style="color:#E36209;">oldVal</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(newVal, oldVal)</span></span>
<span class="line"><span style="color:#24292E;">}, {</span></span>
<span class="line"><span style="color:#24292E;">  immediate: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  flush: </span><span style="color:#032F62;">&#39;post&#39;</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>实现起来同样简单：</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function watch(source, cb, options = {}) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  let getter</span></span>
<span class="line"><span style="color:#E1E4E8;">  if (typeof source === &#39;function&#39;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    getter = source</span></span>
<span class="line"><span style="color:#E1E4E8;">  } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">    getter = () =&gt; traverse(source)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  let oldValue, newValue</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  const job = () =&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    newValue = effectFn()</span></span>
<span class="line"><span style="color:#E1E4E8;">    cb(oldValue, newValue)</span></span>
<span class="line"><span style="color:#E1E4E8;">    oldValue = newValue</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  const effectFn = effect(</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 执行 getter</span></span>
<span class="line"><span style="color:#E1E4E8;">    () =&gt; getter(),</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      lazy: true,</span></span>
<span class="line"><span style="color:#E1E4E8;">      scheduler: () =&gt; {</span></span>
<span class="line"><span style="color:#85E89D;">+        if (options.flush === &#39;post&#39;) {</span></span>
<span class="line"><span style="color:#85E89D;">+          const p = Promise.resolve()</span></span>
<span class="line"><span style="color:#85E89D;">+          p.then(job)</span></span>
<span class="line"><span style="color:#85E89D;">+        } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">          job()</span></span>
<span class="line"><span style="color:#85E89D;">+        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  )</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  if (options.immediate) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    job()</span></span>
<span class="line"><span style="color:#E1E4E8;">  } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">    oldValue = effectFn()</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function watch(source, cb, options = {}) {</span></span>
<span class="line"><span style="color:#24292E;">  let getter</span></span>
<span class="line"><span style="color:#24292E;">  if (typeof source === &#39;function&#39;) {</span></span>
<span class="line"><span style="color:#24292E;">    getter = source</span></span>
<span class="line"><span style="color:#24292E;">  } else {</span></span>
<span class="line"><span style="color:#24292E;">    getter = () =&gt; traverse(source)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  let oldValue, newValue</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  const job = () =&gt; {</span></span>
<span class="line"><span style="color:#24292E;">    newValue = effectFn()</span></span>
<span class="line"><span style="color:#24292E;">    cb(oldValue, newValue)</span></span>
<span class="line"><span style="color:#24292E;">    oldValue = newValue</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  const effectFn = effect(</span></span>
<span class="line"><span style="color:#24292E;">    // 执行 getter</span></span>
<span class="line"><span style="color:#24292E;">    () =&gt; getter(),</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      lazy: true,</span></span>
<span class="line"><span style="color:#24292E;">      scheduler: () =&gt; {</span></span>
<span class="line"><span style="color:#22863A;">+        if (options.flush === &#39;post&#39;) {</span></span>
<span class="line"><span style="color:#22863A;">+          const p = Promise.resolve()</span></span>
<span class="line"><span style="color:#22863A;">+          p.then(job)</span></span>
<span class="line"><span style="color:#22863A;">+        } else {</span></span>
<span class="line"><span style="color:#24292E;">          job()</span></span>
<span class="line"><span style="color:#22863A;">+        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  )</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  if (options.immediate) {</span></span>
<span class="line"><span style="color:#24292E;">    job()</span></span>
<span class="line"><span style="color:#24292E;">  } else {</span></span>
<span class="line"><span style="color:#24292E;">    oldValue = effectFn()</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><hr><p>大家可能发现，getter的写法都是函数的写法，<code>watch</code>应该也支持直接观察对象的变化</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">watch</span><span style="color:#E1E4E8;">(obj </span><span style="color:#6A737D;">/*此处*/</span><span style="color:#E1E4E8;">, (</span><span style="color:#FFAB70;">newVal</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">oldVal</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(newVal, oldVal)</span></span>
<span class="line"><span style="color:#E1E4E8;">}, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  immediate: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  flush: </span><span style="color:#9ECBFF;">&#39;post&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">watch</span><span style="color:#24292E;">(obj </span><span style="color:#6A737D;">/*此处*/</span><span style="color:#24292E;">, (</span><span style="color:#E36209;">newVal</span><span style="color:#24292E;">, </span><span style="color:#E36209;">oldVal</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(newVal, oldVal)</span></span>
<span class="line"><span style="color:#24292E;">}, {</span></span>
<span class="line"><span style="color:#24292E;">  immediate: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  flush: </span><span style="color:#032F62;">&#39;post&#39;</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>我们来修改一下获取<code>getter</code>的地方：</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">+function traverse(value, seen = new Set()) {</span></span>
<span class="line"><span style="color:#85E89D;">+  if (typeof value !== &#39;object&#39; || value === null || seen.has(value)) return</span></span>
<span class="line"><span style="color:#85E89D;">+  seen.add(value)</span></span>
<span class="line"><span style="color:#85E89D;">+  for (const k in value) {</span></span>
<span class="line"><span style="color:#85E89D;">+    traverse(value[k], seen)</span></span>
<span class="line"><span style="color:#85E89D;">+  }</span></span>
<span class="line"><span style="color:#85E89D;">+  return value</span></span>
<span class="line"><span style="color:#85E89D;">+}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">function watch(source, cb, options = {}) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  let getter</span></span>
<span class="line"><span style="color:#E1E4E8;">  if (typeof source === &#39;function&#39;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    getter = source</span></span>
<span class="line"><span style="color:#85E89D;">+  } else {</span></span>
<span class="line"><span style="color:#85E89D;">+    getter = () =&gt; traverse(source)</span></span>
<span class="line"><span style="color:#85E89D;">+  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  let oldValue, newValue</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  const job = () =&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    newValue = effectFn()</span></span>
<span class="line"><span style="color:#E1E4E8;">    cb(oldValue, newValue)</span></span>
<span class="line"><span style="color:#E1E4E8;">    oldValue = newValue</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  const effectFn = effect(</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 执行 getter</span></span>
<span class="line"><span style="color:#E1E4E8;">    () =&gt; getter(),</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      lazy: true,</span></span>
<span class="line"><span style="color:#E1E4E8;">      scheduler: () =&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (options.flush === &#39;post&#39;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          const p = Promise.resolve()</span></span>
<span class="line"><span style="color:#E1E4E8;">          p.then(job)</span></span>
<span class="line"><span style="color:#E1E4E8;">        } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">          job()</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  )</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  if (options.immediate) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    job()</span></span>
<span class="line"><span style="color:#E1E4E8;">  } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">    oldValue = effectFn()</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">+function traverse(value, seen = new Set()) {</span></span>
<span class="line"><span style="color:#22863A;">+  if (typeof value !== &#39;object&#39; || value === null || seen.has(value)) return</span></span>
<span class="line"><span style="color:#22863A;">+  seen.add(value)</span></span>
<span class="line"><span style="color:#22863A;">+  for (const k in value) {</span></span>
<span class="line"><span style="color:#22863A;">+    traverse(value[k], seen)</span></span>
<span class="line"><span style="color:#22863A;">+  }</span></span>
<span class="line"><span style="color:#22863A;">+  return value</span></span>
<span class="line"><span style="color:#22863A;">+}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">function watch(source, cb, options = {}) {</span></span>
<span class="line"><span style="color:#24292E;">  let getter</span></span>
<span class="line"><span style="color:#24292E;">  if (typeof source === &#39;function&#39;) {</span></span>
<span class="line"><span style="color:#24292E;">    getter = source</span></span>
<span class="line"><span style="color:#22863A;">+  } else {</span></span>
<span class="line"><span style="color:#22863A;">+    getter = () =&gt; traverse(source)</span></span>
<span class="line"><span style="color:#22863A;">+  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  let oldValue, newValue</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  const job = () =&gt; {</span></span>
<span class="line"><span style="color:#24292E;">    newValue = effectFn()</span></span>
<span class="line"><span style="color:#24292E;">    cb(oldValue, newValue)</span></span>
<span class="line"><span style="color:#24292E;">    oldValue = newValue</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  const effectFn = effect(</span></span>
<span class="line"><span style="color:#24292E;">    // 执行 getter</span></span>
<span class="line"><span style="color:#24292E;">    () =&gt; getter(),</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      lazy: true,</span></span>
<span class="line"><span style="color:#24292E;">      scheduler: () =&gt; {</span></span>
<span class="line"><span style="color:#24292E;">        if (options.flush === &#39;post&#39;) {</span></span>
<span class="line"><span style="color:#24292E;">          const p = Promise.resolve()</span></span>
<span class="line"><span style="color:#24292E;">          p.then(job)</span></span>
<span class="line"><span style="color:#24292E;">        } else {</span></span>
<span class="line"><span style="color:#24292E;">          job()</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  )</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  if (options.immediate) {</span></span>
<span class="line"><span style="color:#24292E;">    job()</span></span>
<span class="line"><span style="color:#24292E;">  } else {</span></span>
<span class="line"><span style="color:#24292E;">    oldValue = effectFn()</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>不难看出，<code>traverse</code>会递归遍历对象下所有的属性。</p><p><strong>所以推荐大家使用<code>watch</code>的时候，getter使用函数的写法，可以精确到具体的属性！</strong></p><h2 id="_4-10-过期的副作用" tabindex="-1">4.10 过期的副作用 <a class="header-anchor" href="#_4-10-过期的副作用" aria-label="Permalink to &quot;4.10 过期的副作用&quot;">​</a></h2><p>我们有时会遇到如下场景，同样的接口先后调用了两次</p><ul><li>发送请求A</li><li>发送请求B</li></ul><p>我们期望的是最终获取到的是B, 但是如果B接口比较慢，会导致A的结果覆盖B。</p><p>其实这种问题，我们可以使用<code>watch</code>的<code>onInvalidate</code>来解决。</p><p><code>onInvalidate</code>是干嘛的呢？</p><p>我们先来看一段代码，当数据变化时，会重新请求接口：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">watch</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> obj.foo, </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">newVal</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">oldVal</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">onInvalidate</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">res</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fetch</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  finallyData </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> res</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(finallyData)</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">watch</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> obj.foo, </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">newVal</span><span style="color:#24292E;">, </span><span style="color:#E36209;">oldVal</span><span style="color:#24292E;">, </span><span style="color:#E36209;">onInvalidate</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">res</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fetch</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  finallyData </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> res</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(finallyData)</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>很明显，会导致出现上面的问题。我们修改一下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">watch</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> obj.foo, </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">newVal</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">oldVal</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">onInvalidate</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> expired </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">onInvalidate</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    expired </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">res</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fetch</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">expired) </span><span style="color:#F97583;">return</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  finallyData </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> res</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(finallyData)</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">watch</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> obj.foo, </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">newVal</span><span style="color:#24292E;">, </span><span style="color:#E36209;">oldVal</span><span style="color:#24292E;">, </span><span style="color:#E36209;">onInvalidate</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> expired </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">onInvalidate</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    expired </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">res</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fetch</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">expired) </span><span style="color:#D73A49;">return</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  finallyData </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> res</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(finallyData)</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>如上面的代码所示，在发送请求之前，我们定义了 expired 标志 变量，用来标识当前副作用函数的执行是否过期；接着调用 onInvalidate 函数注册了一个过期回调，当该副作用函数的执行过 期时将 expired 标志变量设置为 true；最后只有当没有过期时才采用请求结果，这样就可以有效地避免上述问题了。</p><p>onInvalidate 的原理 是什么呢？其实很简单，在 watch 内部每次检测到变更后，在副作用 函数重新执行之前，会先调用我们通过 onInvalidate 函数注册的过 期回调，仅此而已</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function watch(source, cb, options = {}) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  let getter</span></span>
<span class="line"><span style="color:#E1E4E8;">  if (typeof source === &#39;function&#39;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    getter = source</span></span>
<span class="line"><span style="color:#E1E4E8;">  } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">    getter = () =&gt; traverse(source)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  let oldValue, newValue</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">+  let cleanup</span></span>
<span class="line"><span style="color:#85E89D;">+  function onInvalidate(fn) {</span></span>
<span class="line"><span style="color:#85E89D;">+    cleanup = fn</span></span>
<span class="line"><span style="color:#85E89D;">+  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  const job = () =&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    newValue = effectFn()</span></span>
<span class="line"><span style="color:#85E89D;">+    if (cleanup) {</span></span>
<span class="line"><span style="color:#85E89D;">+      cleanup()</span></span>
<span class="line"><span style="color:#85E89D;">+    }</span></span>
<span class="line"><span style="color:#FDAEB7;">-    cb(oldValue, newValue)</span></span>
<span class="line"><span style="color:#85E89D;">+    cb(oldValue, newValue, onInvalidate)</span></span>
<span class="line"><span style="color:#E1E4E8;">    oldValue = newValue</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  const effectFn = effect(</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 执行 getter</span></span>
<span class="line"><span style="color:#E1E4E8;">    () =&gt; getter(),</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      lazy: true,</span></span>
<span class="line"><span style="color:#E1E4E8;">      scheduler: () =&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (options.flush === &#39;post&#39;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          const p = Promise.resolve()</span></span>
<span class="line"><span style="color:#E1E4E8;">          p.then(job)</span></span>
<span class="line"><span style="color:#E1E4E8;">        } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">          job()</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  )</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  if (options.immediate) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    job()</span></span>
<span class="line"><span style="color:#E1E4E8;">  } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">    oldValue = effectFn()</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function watch(source, cb, options = {}) {</span></span>
<span class="line"><span style="color:#24292E;">  let getter</span></span>
<span class="line"><span style="color:#24292E;">  if (typeof source === &#39;function&#39;) {</span></span>
<span class="line"><span style="color:#24292E;">    getter = source</span></span>
<span class="line"><span style="color:#24292E;">  } else {</span></span>
<span class="line"><span style="color:#24292E;">    getter = () =&gt; traverse(source)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  let oldValue, newValue</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">+  let cleanup</span></span>
<span class="line"><span style="color:#22863A;">+  function onInvalidate(fn) {</span></span>
<span class="line"><span style="color:#22863A;">+    cleanup = fn</span></span>
<span class="line"><span style="color:#22863A;">+  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  const job = () =&gt; {</span></span>
<span class="line"><span style="color:#24292E;">    newValue = effectFn()</span></span>
<span class="line"><span style="color:#22863A;">+    if (cleanup) {</span></span>
<span class="line"><span style="color:#22863A;">+      cleanup()</span></span>
<span class="line"><span style="color:#22863A;">+    }</span></span>
<span class="line"><span style="color:#B31D28;">-    cb(oldValue, newValue)</span></span>
<span class="line"><span style="color:#22863A;">+    cb(oldValue, newValue, onInvalidate)</span></span>
<span class="line"><span style="color:#24292E;">    oldValue = newValue</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  const effectFn = effect(</span></span>
<span class="line"><span style="color:#24292E;">    // 执行 getter</span></span>
<span class="line"><span style="color:#24292E;">    () =&gt; getter(),</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      lazy: true,</span></span>
<span class="line"><span style="color:#24292E;">      scheduler: () =&gt; {</span></span>
<span class="line"><span style="color:#24292E;">        if (options.flush === &#39;post&#39;) {</span></span>
<span class="line"><span style="color:#24292E;">          const p = Promise.resolve()</span></span>
<span class="line"><span style="color:#24292E;">          p.then(job)</span></span>
<span class="line"><span style="color:#24292E;">        } else {</span></span>
<span class="line"><span style="color:#24292E;">          job()</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  )</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  if (options.immediate) {</span></span>
<span class="line"><span style="color:#24292E;">    job()</span></span>
<span class="line"><span style="color:#24292E;">  } else {</span></span>
<span class="line"><span style="color:#24292E;">    oldValue = effectFn()</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="本章完整代码" tabindex="-1">本章完整代码 <a class="header-anchor" href="#本章完整代码" aria-label="Permalink to &quot;本章完整代码&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 存储副作用函数的桶</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">bucket</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">WeakMap</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 原始数据</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { foo: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, bar: </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#6A737D;">// 对原始数据的代理</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">(data, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 拦截读取操作</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">target</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 将副作用函数 activeEffect 添加到存储副作用函数的桶中</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">track</span><span style="color:#E1E4E8;">(target, key)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 返回属性值</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> target[key]</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 拦截设置操作</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">target</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">newVal</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 设置属性值</span></span>
<span class="line"><span style="color:#E1E4E8;">    target[key] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> newVal</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 把副作用函数从桶里取出并执行</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">trigger</span><span style="color:#E1E4E8;">(target, key)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">track</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">target</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">activeEffect) </span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> depsMap </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> bucket.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(target)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">depsMap) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    bucket.</span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(target, (depsMap </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Map</span><span style="color:#E1E4E8;">()))</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> deps </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> depsMap.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(key)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">deps) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    depsMap.</span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(key, (deps </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Set</span><span style="color:#E1E4E8;">()))</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  deps.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(activeEffect)</span></span>
<span class="line"><span style="color:#E1E4E8;">  activeEffect.deps.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(deps)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">trigger</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">target</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">depsMap</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> bucket.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(target)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">depsMap) </span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">effects</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> depsMap.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(key)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">effectsToRun</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Set</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  effects </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> effects.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">effectFn</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (effectFn </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> activeEffect) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      effectsToRun.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(effectFn)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">  effectsToRun.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">effectFn</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (effectFn.options.scheduler) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      effectFn.options.</span><span style="color:#B392F0;">scheduler</span><span style="color:#E1E4E8;">(effectFn)</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">effectFn</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// effects &amp;&amp; effects.forEach(effectFn =&gt; effectFn())</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 用一个全局变量存储当前激活的 effect 函数</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> activeEffect</span></span>
<span class="line"><span style="color:#6A737D;">// effect 栈</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">effectStack</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> []</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">fn</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">options</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {}) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">effectFn</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">cleanup</span><span style="color:#E1E4E8;">(effectFn)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect</span></span>
<span class="line"><span style="color:#E1E4E8;">    activeEffect </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> effectFn</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 在调用副作用函数之前将当前副作用函数压栈</span></span>
<span class="line"><span style="color:#E1E4E8;">    effectStack.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(effectFn)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">res</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fn</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 在当前副作用函数执行完毕后，将当前副作用函数弹出栈，并还原 activeEffect 为之前的值</span></span>
<span class="line"><span style="color:#E1E4E8;">    effectStack.</span><span style="color:#B392F0;">pop</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    activeEffect </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> effectStack[effectStack.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> res</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 将 options 挂在到 effectFn 上</span></span>
<span class="line"><span style="color:#E1E4E8;">  effectFn.options </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> options</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// activeEffect.deps 用来存储所有与该副作用函数相关的依赖集合</span></span>
<span class="line"><span style="color:#E1E4E8;">  effectFn.deps </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> []</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 执行副作用函数</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">options.lazy) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">effectFn</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> effectFn</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cleanup</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">effectFn</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> effectFn.deps.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">deps</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> effectFn.deps[i]</span></span>
<span class="line"><span style="color:#E1E4E8;">    deps.</span><span style="color:#B392F0;">delete</span><span style="color:#E1E4E8;">(effectFn)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  effectFn.deps.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// =========================</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">computed</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">getter</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> value</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> dirty </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">effectFn</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">(getter, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    lazy: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">scheduler</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">dirty) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        dirty </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">trigger</span><span style="color:#E1E4E8;">(obj, </span><span style="color:#9ECBFF;">&#39;value&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">get</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">value</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (dirty) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">effectFn</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        dirty </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">track</span><span style="color:#E1E4E8;">(obj, </span><span style="color:#9ECBFF;">&#39;value&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> value</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> obj</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// =========================</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">traverse</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">seen</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Set</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> value </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;object&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> value </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> seen.</span><span style="color:#B392F0;">has</span><span style="color:#E1E4E8;">(value)) </span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">  seen.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(value)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">k</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> value) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">traverse</span><span style="color:#E1E4E8;">(value[k], seen)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> value</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">watch</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">source</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">cb</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">options</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {}) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> getter</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> source </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;function&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    getter </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> source</span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">getter</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">traverse</span><span style="color:#E1E4E8;">(source)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> oldValue, newValue</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> cleanup</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onInvalidate</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">fn</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    cleanup </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> fn</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">job</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    newValue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">effectFn</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (cleanup) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">cleanup</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">cb</span><span style="color:#E1E4E8;">(oldValue, newValue, onInvalidate)</span></span>
<span class="line"><span style="color:#E1E4E8;">    oldValue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> newValue</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">effectFn</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 执行 getter</span></span>
<span class="line"><span style="color:#E1E4E8;">    () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getter</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      lazy: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">scheduler</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (options.flush </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;post&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">          p.</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(job)</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">job</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  )</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (options.immediate) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">job</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    oldValue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">effectFn</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 存储副作用函数的桶</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">bucket</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">WeakMap</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 原始数据</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { foo: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, bar: </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#6A737D;">// 对原始数据的代理</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Proxy</span><span style="color:#24292E;">(data, {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 拦截读取操作</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#E36209;">target</span><span style="color:#24292E;">, </span><span style="color:#E36209;">key</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 将副作用函数 activeEffect 添加到存储副作用函数的桶中</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">track</span><span style="color:#24292E;">(target, key)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 返回属性值</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> target[key]</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 拦截设置操作</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(</span><span style="color:#E36209;">target</span><span style="color:#24292E;">, </span><span style="color:#E36209;">key</span><span style="color:#24292E;">, </span><span style="color:#E36209;">newVal</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 设置属性值</span></span>
<span class="line"><span style="color:#24292E;">    target[key] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> newVal</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 把副作用函数从桶里取出并执行</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">trigger</span><span style="color:#24292E;">(target, key)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">track</span><span style="color:#24292E;">(</span><span style="color:#E36209;">target</span><span style="color:#24292E;">, </span><span style="color:#E36209;">key</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">activeEffect) </span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> depsMap </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> bucket.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(target)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">depsMap) {</span></span>
<span class="line"><span style="color:#24292E;">    bucket.</span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(target, (depsMap </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Map</span><span style="color:#24292E;">()))</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> deps </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> depsMap.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(key)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">deps) {</span></span>
<span class="line"><span style="color:#24292E;">    depsMap.</span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(key, (deps </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Set</span><span style="color:#24292E;">()))</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  deps.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(activeEffect)</span></span>
<span class="line"><span style="color:#24292E;">  activeEffect.deps.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(deps)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">trigger</span><span style="color:#24292E;">(</span><span style="color:#E36209;">target</span><span style="color:#24292E;">, </span><span style="color:#E36209;">key</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">depsMap</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> bucket.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(target)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">depsMap) </span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">effects</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> depsMap.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(key)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">effectsToRun</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Set</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  effects </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> effects.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(</span><span style="color:#E36209;">effectFn</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (effectFn </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> activeEffect) {</span></span>
<span class="line"><span style="color:#24292E;">      effectsToRun.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(effectFn)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">  effectsToRun.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(</span><span style="color:#E36209;">effectFn</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (effectFn.options.scheduler) {</span></span>
<span class="line"><span style="color:#24292E;">      effectFn.options.</span><span style="color:#6F42C1;">scheduler</span><span style="color:#24292E;">(effectFn)</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">effectFn</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// effects &amp;&amp; effects.forEach(effectFn =&gt; effectFn())</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 用一个全局变量存储当前激活的 effect 函数</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> activeEffect</span></span>
<span class="line"><span style="color:#6A737D;">// effect 栈</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">effectStack</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> []</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">(</span><span style="color:#E36209;">fn</span><span style="color:#24292E;">, </span><span style="color:#E36209;">options</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {}) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">effectFn</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">cleanup</span><span style="color:#24292E;">(effectFn)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect</span></span>
<span class="line"><span style="color:#24292E;">    activeEffect </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> effectFn</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 在调用副作用函数之前将当前副作用函数压栈</span></span>
<span class="line"><span style="color:#24292E;">    effectStack.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(effectFn)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">res</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fn</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 在当前副作用函数执行完毕后，将当前副作用函数弹出栈，并还原 activeEffect 为之前的值</span></span>
<span class="line"><span style="color:#24292E;">    effectStack.</span><span style="color:#6F42C1;">pop</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    activeEffect </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> effectStack[effectStack.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> res</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 将 options 挂在到 effectFn 上</span></span>
<span class="line"><span style="color:#24292E;">  effectFn.options </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> options</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// activeEffect.deps 用来存储所有与该副作用函数相关的依赖集合</span></span>
<span class="line"><span style="color:#24292E;">  effectFn.deps </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> []</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 执行副作用函数</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">options.lazy) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">effectFn</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> effectFn</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">cleanup</span><span style="color:#24292E;">(</span><span style="color:#E36209;">effectFn</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> effectFn.deps.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">deps</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> effectFn.deps[i]</span></span>
<span class="line"><span style="color:#24292E;">    deps.</span><span style="color:#6F42C1;">delete</span><span style="color:#24292E;">(effectFn)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  effectFn.deps.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// =========================</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">computed</span><span style="color:#24292E;">(</span><span style="color:#E36209;">getter</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> value</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> dirty </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">effectFn</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">(getter, {</span></span>
<span class="line"><span style="color:#24292E;">    lazy: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">scheduler</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">dirty) {</span></span>
<span class="line"><span style="color:#24292E;">        dirty </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">trigger</span><span style="color:#24292E;">(obj, </span><span style="color:#032F62;">&#39;value&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">get</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">value</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (dirty) {</span></span>
<span class="line"><span style="color:#24292E;">        value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">effectFn</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        dirty </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">track</span><span style="color:#24292E;">(obj, </span><span style="color:#032F62;">&#39;value&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> value</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> obj</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// =========================</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">traverse</span><span style="color:#24292E;">(</span><span style="color:#E36209;">value</span><span style="color:#24292E;">, </span><span style="color:#E36209;">seen</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Set</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> value </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;object&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> value </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> seen.</span><span style="color:#6F42C1;">has</span><span style="color:#24292E;">(value)) </span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">  seen.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(value)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">k</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> value) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">traverse</span><span style="color:#24292E;">(value[k], seen)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> value</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">watch</span><span style="color:#24292E;">(</span><span style="color:#E36209;">source</span><span style="color:#24292E;">, </span><span style="color:#E36209;">cb</span><span style="color:#24292E;">, </span><span style="color:#E36209;">options</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {}) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> getter</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> source </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;function&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    getter </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> source</span></span>
<span class="line"><span style="color:#24292E;">  } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">getter</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">traverse</span><span style="color:#24292E;">(source)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> oldValue, newValue</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> cleanup</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onInvalidate</span><span style="color:#24292E;">(</span><span style="color:#E36209;">fn</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    cleanup </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> fn</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">job</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    newValue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">effectFn</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (cleanup) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">cleanup</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">cb</span><span style="color:#24292E;">(oldValue, newValue, onInvalidate)</span></span>
<span class="line"><span style="color:#24292E;">    oldValue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> newValue</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">effectFn</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 执行 getter</span></span>
<span class="line"><span style="color:#24292E;">    () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getter</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      lazy: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">scheduler</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (options.flush </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;post&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">p</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">          p.</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">(job)</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">job</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  )</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (options.immediate) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">job</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    oldValue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">effectFn</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,152),e=[o];function c(t,E,r,y,i,f){return n(),a("div",null,e)}const u=s(p,[["render",c]]);export{d as __pageData,u as default};
