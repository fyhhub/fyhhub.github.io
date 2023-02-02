import{_ as n}from"./plugin-vueexport-helper.2444895f.js";import{o as s,c as a,d as t}from"./app.b38ad9b2.js";const o={},p=t(`<h1 id="vscode\u8C03\u8BD5\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#vscode\u8C03\u8BD5\u914D\u7F6E" aria-hidden="true">#</a> vscode\u8C03\u8BD5\u914D\u7F6E</h1><p>.vscode/launch.json</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token comment">// \u4F7F\u7528 IntelliSense \u4E86\u89E3\u76F8\u5173\u5C5E\u6027\u3002 </span>
  <span class="token comment">// \u60AC\u505C\u4EE5\u67E5\u770B\u73B0\u6709\u5C5E\u6027\u7684\u63CF\u8FF0\u3002</span>
  <span class="token comment">// \u6B32\u4E86\u89E3\u66F4\u591A\u4FE1\u606F\uFF0C\u8BF7\u8BBF\u95EE: https://go.microsoft.com/fwlink/?linkid=830387</span>
  <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;0.2.0&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;configurations&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;lldb&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;request&quot;</span><span class="token operator">:</span> <span class="token string">&quot;launch&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;C++ debug&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;program&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\${fileDirname}/\${fileBasenameNoExtension}&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;args&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token property">&quot;cwd&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\${workspaceFolder}&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;preLaunchTask&quot;</span><span class="token operator">:</span> <span class="token string">&quot;C/C++: g++ \u751F\u6210\u6D3B\u52A8\u6587\u4EF6&quot;</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>.vscode/tasks.json</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;tasks&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;cppbuild&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;label&quot;</span><span class="token operator">:</span> <span class="token string">&quot;C/C++: g++ \u751F\u6210\u6D3B\u52A8\u6587\u4EF6&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;command&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/usr/bin/g++&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;args&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
              <span class="token string">&quot;-std=c++17&quot;</span><span class="token punctuation">,</span>
              <span class="token string">&quot;-stdlib=libc++&quot;</span><span class="token punctuation">,</span>
              <span class="token string">&quot;-fdiagnostics-color=always&quot;</span><span class="token punctuation">,</span>
              <span class="token string">&quot;-g&quot;</span><span class="token punctuation">,</span>
              <span class="token string">&quot;-Wall&quot;</span><span class="token punctuation">,</span>
              <span class="token string">&quot;\${file}&quot;</span><span class="token punctuation">,</span>
              <span class="token string">&quot;-o&quot;</span><span class="token punctuation">,</span>
              <span class="token string">&quot;\${fileDirname}/\${fileBasenameNoExtension}&quot;</span>
          <span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token property">&quot;options&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">&quot;cwd&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\${fileDirname}&quot;</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token property">&quot;problemMatcher&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
              <span class="token string">&quot;$gcc&quot;</span>
          <span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token property">&quot;group&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">&quot;kind&quot;</span><span class="token operator">:</span> <span class="token string">&quot;build&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;isDefault&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token property">&quot;detail&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u8C03\u8BD5\u5668\u751F\u6210\u7684\u4EFB\u52A1\u3002&quot;</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2.0.0&quot;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),e=[p];function i(c,l){return s(),a("div",null,e)}const d=n(o,[["render",i],["__file","vscode\u8C03\u8BD5\u914D\u7F6E.html.vue"]]);export{d as default};
