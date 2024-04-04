import{_ as a,C as l,o as p,c as o,H as e,w as t,Q as s,a as c}from"./chunks/framework.3d945e71.js";const C=JSON.parse('{"title":"vitepress-plugin-vue-repl","description":"","frontmatter":{},"headers":[],"relativePath":"open-source/vitepress-plugin-vue-repl.md","filePath":"open-source/vitepress-plugin-vue-repl.md","lastUpdated":1712241822000}'),r={name:"open-source/vitepress-plugin-vue-repl.md"},E=s('<h1 id="vitepress-plugin-vue-repl" tabindex="-1"><a href="https://www.npmjs.com/package/vitepress-plugin-vue-repl" target="_blank" rel="noreferrer">vitepress-plugin-vue-repl</a> <a class="header-anchor" href="#vitepress-plugin-vue-repl" aria-label="Permalink to &quot;[vitepress-plugin-vue-repl](https://www.npmjs.com/package/vitepress-plugin-vue-repl)&quot;">​</a></h1><h2 id="preview" tabindex="-1">Preview <a class="header-anchor" href="#preview" aria-label="Permalink to &quot;Preview&quot;">​</a></h2>',2),i=s(`<h2 id="install" tabindex="-1">install <a class="header-anchor" href="#install" aria-label="Permalink to &quot;install&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">i</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">vitepress-plugin-vue-repl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-D</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">i</span><span style="color:#24292E;"> </span><span style="color:#032F62;">vitepress-plugin-vue-repl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-D</span></span></code></pre></div><h2 id="config" tabindex="-1">config <a class="header-anchor" href="#config" aria-label="Permalink to &quot;config&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// config.ts</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { VueReplMdPlugin } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vitepress-plugin-vue-repl&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineConfig</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  markdown: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">config</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">md</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      md.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(VueReplMdPlugin)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// config.ts</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { VueReplMdPlugin } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vitepress-plugin-vue-repl&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineConfig</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  markdown: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">config</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">md</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      md.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(VueReplMdPlugin)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// theme/index.ts</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Playground </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vitepress-plugin-vue-repl/components/index.vue&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> DefaultTheme </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vitepress/theme&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">DefaultTheme,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">enhanceApp</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">ctx</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      ctx.app.</span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;VuePlayground&#39;</span><span style="color:#E1E4E8;">, Playground);</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// theme/index.ts</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Playground </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vitepress-plugin-vue-repl/components/index.vue&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> DefaultTheme </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vitepress/theme&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">DefaultTheme,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">enhanceApp</span><span style="color:#24292E;">(</span><span style="color:#E36209;">ctx</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      ctx.app.</span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;VuePlayground&#39;</span><span style="color:#24292E;">, Playground);</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">:::playground</span></span>
<span class="line"><span style="color:#E1E4E8;">\`\`\`vue</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;div&gt;playground  test&lt;/div&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;button @click=&quot;count += 1&quot;&gt;{{count}}&lt;/button&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">import { ref } from &#39;vue&#39;;</span></span>
<span class="line"><span style="color:#E1E4E8;">const count = ref(1)</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;style scoped&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">div {</span></span>
<span class="line"><span style="color:#E1E4E8;">  color: red;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/style&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">\\\`\`\` # remove slash</span></span>
<span class="line"><span style="color:#E1E4E8;">:::</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">:::playground</span></span>
<span class="line"><span style="color:#24292E;">\`\`\`vue</span></span>
<span class="line"><span style="color:#24292E;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;div&gt;playground  test&lt;/div&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;button @click=&quot;count += 1&quot;&gt;{{count}}&lt;/button&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#24292E;">import { ref } from &#39;vue&#39;;</span></span>
<span class="line"><span style="color:#24292E;">const count = ref(1)</span></span>
<span class="line"><span style="color:#24292E;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;style scoped&gt;</span></span>
<span class="line"><span style="color:#24292E;">div {</span></span>
<span class="line"><span style="color:#24292E;">  color: red;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">&lt;/style&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">\\\`\`\` # remove slash</span></span>
<span class="line"><span style="color:#24292E;">:::</span></span></code></pre></div><p>注意去掉斜线</p><h2 id="code-editor-config" tabindex="-1">Code Editor Config <a class="header-anchor" href="#code-editor-config" aria-label="Permalink to &quot;Code Editor Config&quot;">​</a></h2><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki github-dark has-highlighted-lines vp-code-dark"><code><span class="line highlighted"><span style="color:#E1E4E8;">:::playground Monaco</span></span>
<span class="line"><span style="color:#E1E4E8;">\`\`\`vue</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;div&gt;playground  test&lt;/div&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;button @click=&quot;count += 1&quot;&gt;{{count}}&lt;/button&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">import { ref } from &#39;vue&#39;;</span></span>
<span class="line"><span style="color:#E1E4E8;">const count = ref(1)</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;style scoped&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">div {</span></span>
<span class="line"><span style="color:#E1E4E8;">  color: red;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/style&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">\\\`\`\` # remove slash</span></span>
<span class="line"><span style="color:#E1E4E8;">:::</span></span></code></pre><pre class="shiki github-light has-highlighted-lines vp-code-light"><code><span class="line highlighted"><span style="color:#24292E;">:::playground Monaco</span></span>
<span class="line"><span style="color:#24292E;">\`\`\`vue</span></span>
<span class="line"><span style="color:#24292E;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;div&gt;playground  test&lt;/div&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;button @click=&quot;count += 1&quot;&gt;{{count}}&lt;/button&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#24292E;">import { ref } from &#39;vue&#39;;</span></span>
<span class="line"><span style="color:#24292E;">const count = ref(1)</span></span>
<span class="line"><span style="color:#24292E;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;style scoped&gt;</span></span>
<span class="line"><span style="color:#24292E;">div {</span></span>
<span class="line"><span style="color:#24292E;">  color: red;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">&lt;/style&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">\\\`\`\` # remove slash</span></span>
<span class="line"><span style="color:#24292E;">:::</span></span></code></pre></div><ul><li>Monaco</li><li>CodeMirror</li></ul><h2 id="vue-repl-config-imports" tabindex="-1">Vue Repl Config &amp; imports <a class="header-anchor" href="#vue-repl-config-imports" aria-label="Permalink to &quot;Vue Repl Config &amp; imports&quot;">​</a></h2><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki github-dark has-highlighted-lines vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">:::playground</span></span>
<span class="line"><span style="color:#E1E4E8;">\`\`\`vue</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;a-button type=&quot;primary&quot;&gt;Primary&lt;/a-button&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/template&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;script lang=&quot;ts&quot; setup&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">\\\`\`\` # remove slash</span></span>
<span class="line"><span style="color:#E1E4E8;">\`\`\`json</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  &quot;imports&quot;: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    &quot;ant-design-vue&quot;: &quot;xxx&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  &quot;editorConfig&quot;: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    &quot;layout&quot;: &quot;vertical&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line highlighted"><span style="color:#E1E4E8;">}</span></span>
<span class="line highlighted"><span style="color:#E1E4E8;">\\\`\`\` # remove slash</span></span>
<span class="line highlighted"><span style="color:#E1E4E8;">:::</span></span></code></pre><pre class="shiki github-light has-highlighted-lines vp-code-light"><code><span class="line"><span style="color:#24292E;">:::playground</span></span>
<span class="line"><span style="color:#24292E;">\`\`\`vue</span></span>
<span class="line"><span style="color:#24292E;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;a-button type=&quot;primary&quot;&gt;Primary&lt;/a-button&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/template&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;script lang=&quot;ts&quot; setup&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#24292E;">\\\`\`\` # remove slash</span></span>
<span class="line"><span style="color:#24292E;">\`\`\`json</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  &quot;imports&quot;: {</span></span>
<span class="line"><span style="color:#24292E;">    &quot;ant-design-vue&quot;: &quot;xxx&quot;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  &quot;editorConfig&quot;: {</span></span>
<span class="line"><span style="color:#24292E;">    &quot;layout&quot;: &quot;vertical&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line highlighted"><span style="color:#24292E;">}</span></span>
<span class="line highlighted"><span style="color:#24292E;">\\\`\`\` # remove slash</span></span>
<span class="line highlighted"><span style="color:#24292E;">:::</span></span></code></pre></div><p>editorConfig:</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Props</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">theme</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;dark&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;light&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">autoResize</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boolean</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">showCompileOutput</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boolean</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">showImportMap</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boolean</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">showTsConfig</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boolean</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">clearConsole</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boolean</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">sfcOptions</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SFCOptions</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">layout</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;horizontal&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vertical&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">ssr</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boolean</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">previewOptions</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FFAB70;">headHTML</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FFAB70;">bodyHTML</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FFAB70;">placeholderHTML</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FFAB70;">customCode</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#FFAB70;">importCode</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#FFAB70;">useCode</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Props</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">theme</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;dark&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;light&#39;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">autoResize</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boolean</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">showCompileOutput</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boolean</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">showImportMap</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boolean</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">showTsConfig</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boolean</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">clearConsole</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boolean</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">sfcOptions</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SFCOptions</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">layout</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;horizontal&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vertical&#39;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">ssr</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boolean</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">previewOptions</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">headHTML</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">bodyHTML</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">placeholderHTML</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">customCode</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#E36209;">importCode</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#E36209;">useCode</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,15);function y(u,d,g,h,F,v){const n=l("VuePlayground");return p(),o("div",null,[E,e(n,{editor:"CodeMirror",config:"undefined"},{default:t(()=>[c("%3Ctemplate%3E%0A%20%20%3Cdiv%3Eplayground%20%20test%3C%2Fdiv%3E%0A%20%20%3Cbutton%20%40click%3D%22count%20%2B%3D%201%22%3E%7B%7Bcount%7D%7D%3C%2Fbutton%3E%0A%3C%2Ftemplate%3E%0A%3Cscript%20setup%3E%0Aimport%20%7B%20ref%20%7D%20from%20'vue'%3B%0Aconst%20count%20%3D%20ref(1)%0A%3C%2Fscript%3E%0A%3Cstyle%20scoped%3E%0Adiv%20%7B%0A%20%20color%3A%20red%3B%0A%7D%0A%3C%2Fstyle%3E%0A ")]),_:1}),i])}const f=a(r,[["render",y]]);export{C as __pageData,f as default};
