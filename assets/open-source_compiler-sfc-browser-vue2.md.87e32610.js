import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.3d945e71.js";const d=JSON.parse('{"title":"compiler-sfc-browser-vue2","description":"","frontmatter":{},"headers":[],"relativePath":"open-source/compiler-sfc-browser-vue2.md","filePath":"open-source/compiler-sfc-browser-vue2.md","lastUpdated":1712558335000}'),p={name:"open-source/compiler-sfc-browser-vue2.md"},o=l(`<h1 id="compiler-sfc-browser-vue2" tabindex="-1"><a href="https://www.npmjs.com/package/compiler-sfc-browser-vue2" target="_blank" rel="noreferrer">compiler-sfc-browser-vue2</a> <a class="header-anchor" href="#compiler-sfc-browser-vue2" aria-label="Permalink to &quot;[compiler-sfc-browser-vue2](https://www.npmjs.com/package/compiler-sfc-browser-vue2)&quot;">​</a></h1><p>支持 <code>Vue2.6</code> 和 <code>Vue2.7</code> 在运行时的编译, 阉割了部分功能，但能满足绝大部分需求</p><p>暂时缺少以下功能：</p><ul><li>style lang 不支持 scss、stylus， 仅支持less(可提issue)</li><li>不支持其他模板语法渲染</li></ul><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><pre><code>npm i compiler-sfc-browser-vue2
</code></pre><h2 id="cdn" tabindex="-1">CDN <a class="header-anchor" href="#cdn" aria-label="Permalink to &quot;CDN&quot;">​</a></h2><pre><code>https://cdn.jsdelivr.net/npm/compiler-sfc-browser-vue2@0.0.2/dist/index.esm.js // esm-browser

https://cdn.jsdelivr.net/npm/compiler-sfc-browser-vue2@0.0.2/dist/index.umd.js // umd
</code></pre><h2 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-label="Permalink to &quot;使用&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { parse, compileStyle, compileScript, compileTemplate } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;compiler-sfc-browser-vue2&#39;</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">desc</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">parse</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  source: </span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">  &lt;template&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    &lt;cascader</span></span>
<span class="line"><span style="color:#9ECBFF;">      :options=&quot;options&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      default-value=&quot;datunli&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      :style=&quot;{ width: &#39;320px&#39; }&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      placeholder=&quot;Please select ...&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      :format-label=&quot;format&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">    /&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">  &lt;/template&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">  &lt;script setup lang=&quot;ts&quot;&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">  const options = [</span></span>
<span class="line"><span style="color:#9ECBFF;">    {</span></span>
<span class="line"><span style="color:#9ECBFF;">      value: &#39;beijing&#39;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      label: &#39;Beijing&#39;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      children: [</span></span>
<span class="line"><span style="color:#9ECBFF;">        {</span></span>
<span class="line"><span style="color:#9ECBFF;">          value: &#39;chaoyang&#39;,</span></span>
<span class="line"><span style="color:#9ECBFF;">          label: &#39;ChaoYang&#39;,</span></span>
<span class="line"><span style="color:#9ECBFF;">          children: [</span></span>
<span class="line"><span style="color:#9ECBFF;">            {</span></span>
<span class="line"><span style="color:#9ECBFF;">              value: &#39;datunli&#39;,</span></span>
<span class="line"><span style="color:#9ECBFF;">              label: &#39;Datunli&#39;,</span></span>
<span class="line"><span style="color:#9ECBFF;">            },</span></span>
<span class="line"><span style="color:#9ECBFF;">          ],</span></span>
<span class="line"><span style="color:#9ECBFF;">        },</span></span>
<span class="line"><span style="color:#9ECBFF;">      }</span></span>
<span class="line"><span style="color:#9ECBFF;">    }</span></span>
<span class="line"><span style="color:#9ECBFF;">  ];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">  const format = (options) =&gt; {</span></span>
<span class="line"><span style="color:#9ECBFF;">    const labels = options.map((option) =&gt; option.label);</span></span>
<span class="line"><span style="color:#9ECBFF;">    return labels.join(&#39;-&#39;);</span></span>
<span class="line"><span style="color:#9ECBFF;">  };</span></span>
<span class="line"><span style="color:#9ECBFF;">  &lt;</span><span style="color:#79B8FF;">\\/</span><span style="color:#9ECBFF;">script&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">  &lt;style lang=&quot;less&quot; scoped&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    @color: red;</span></span>
<span class="line"><span style="color:#9ECBFF;">    div {</span></span>
<span class="line"><span style="color:#9ECBFF;">      a {</span></span>
<span class="line"><span style="color:#9ECBFF;">        color: @color;</span></span>
<span class="line"><span style="color:#9ECBFF;">      }</span></span>
<span class="line"><span style="color:#9ECBFF;">    }</span></span>
<span class="line"><span style="color:#9ECBFF;">  &lt;</span><span style="color:#79B8FF;">\\/</span><span style="color:#9ECBFF;">style&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">  \`</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">style</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">compileStyle</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  source: desc.styles[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">].content,</span></span>
<span class="line"><span style="color:#E1E4E8;">  id: </span><span style="color:#9ECBFF;">&#39;123&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  preprocessLang: </span><span style="color:#9ECBFF;">&#39;less&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;style&quot;</span><span style="color:#E1E4E8;">, style);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">compileScript</span><span style="color:#E1E4E8;">(desc, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  id: </span><span style="color:#9ECBFF;">&#39;123&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;script&quot;</span><span style="color:#E1E4E8;">, script);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">template</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">compileTemplate</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  source: desc.template.content</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;template&quot;</span><span style="color:#E1E4E8;">, template);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { parse, compileStyle, compileScript, compileTemplate } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;compiler-sfc-browser-vue2&#39;</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">desc</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">parse</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  source: </span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">  &lt;template&gt;</span></span>
<span class="line"><span style="color:#032F62;">    &lt;cascader</span></span>
<span class="line"><span style="color:#032F62;">      :options=&quot;options&quot;</span></span>
<span class="line"><span style="color:#032F62;">      default-value=&quot;datunli&quot;</span></span>
<span class="line"><span style="color:#032F62;">      :style=&quot;{ width: &#39;320px&#39; }&quot;</span></span>
<span class="line"><span style="color:#032F62;">      placeholder=&quot;Please select ...&quot;</span></span>
<span class="line"><span style="color:#032F62;">      :format-label=&quot;format&quot;</span></span>
<span class="line"><span style="color:#032F62;">    /&gt;</span></span>
<span class="line"><span style="color:#032F62;">  &lt;/template&gt;</span></span>
<span class="line"><span style="color:#032F62;">  &lt;script setup lang=&quot;ts&quot;&gt;</span></span>
<span class="line"><span style="color:#032F62;">  const options = [</span></span>
<span class="line"><span style="color:#032F62;">    {</span></span>
<span class="line"><span style="color:#032F62;">      value: &#39;beijing&#39;,</span></span>
<span class="line"><span style="color:#032F62;">      label: &#39;Beijing&#39;,</span></span>
<span class="line"><span style="color:#032F62;">      children: [</span></span>
<span class="line"><span style="color:#032F62;">        {</span></span>
<span class="line"><span style="color:#032F62;">          value: &#39;chaoyang&#39;,</span></span>
<span class="line"><span style="color:#032F62;">          label: &#39;ChaoYang&#39;,</span></span>
<span class="line"><span style="color:#032F62;">          children: [</span></span>
<span class="line"><span style="color:#032F62;">            {</span></span>
<span class="line"><span style="color:#032F62;">              value: &#39;datunli&#39;,</span></span>
<span class="line"><span style="color:#032F62;">              label: &#39;Datunli&#39;,</span></span>
<span class="line"><span style="color:#032F62;">            },</span></span>
<span class="line"><span style="color:#032F62;">          ],</span></span>
<span class="line"><span style="color:#032F62;">        },</span></span>
<span class="line"><span style="color:#032F62;">      }</span></span>
<span class="line"><span style="color:#032F62;">    }</span></span>
<span class="line"><span style="color:#032F62;">  ];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">  const format = (options) =&gt; {</span></span>
<span class="line"><span style="color:#032F62;">    const labels = options.map((option) =&gt; option.label);</span></span>
<span class="line"><span style="color:#032F62;">    return labels.join(&#39;-&#39;);</span></span>
<span class="line"><span style="color:#032F62;">  };</span></span>
<span class="line"><span style="color:#032F62;">  &lt;</span><span style="color:#005CC5;">\\/</span><span style="color:#032F62;">script&gt;</span></span>
<span class="line"><span style="color:#032F62;">  &lt;style lang=&quot;less&quot; scoped&gt;</span></span>
<span class="line"><span style="color:#032F62;">    @color: red;</span></span>
<span class="line"><span style="color:#032F62;">    div {</span></span>
<span class="line"><span style="color:#032F62;">      a {</span></span>
<span class="line"><span style="color:#032F62;">        color: @color;</span></span>
<span class="line"><span style="color:#032F62;">      }</span></span>
<span class="line"><span style="color:#032F62;">    }</span></span>
<span class="line"><span style="color:#032F62;">  &lt;</span><span style="color:#005CC5;">\\/</span><span style="color:#032F62;">style&gt;</span></span>
<span class="line"><span style="color:#032F62;">  \`</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">style</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">compileStyle</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  source: desc.styles[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">].content,</span></span>
<span class="line"><span style="color:#24292E;">  id: </span><span style="color:#032F62;">&#39;123&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  preprocessLang: </span><span style="color:#032F62;">&#39;less&#39;</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;style&quot;</span><span style="color:#24292E;">, style);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">script</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">compileScript</span><span style="color:#24292E;">(desc, {</span></span>
<span class="line"><span style="color:#24292E;">  id: </span><span style="color:#032F62;">&#39;123&#39;</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;script&quot;</span><span style="color:#24292E;">, script);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">template</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">compileTemplate</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  source: desc.template.content</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;template&quot;</span><span style="color:#24292E;">, template);</span></span></code></pre></div>`,10),e=[o];function c(t,r,i,y,E,F){return n(),a("div",null,e)}const m=s(p,[["render",c]]);export{d as __pageData,m as default};
