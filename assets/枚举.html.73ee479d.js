import{_ as n}from"./plugin-vueexport-helper.2444895f.js";import{o as s,c as a,e}from"./app.6039c471.js";const p={},t=e(`<h1 id="_1-3-\u679A\u4E3E" tabindex="-1"><a class="header-anchor" href="#_1-3-\u679A\u4E3E" aria-hidden="true">#</a> 1.3 \u679A\u4E3E</h1><h2 id="\u57FA\u7840\u7528\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u57FA\u7840\u7528\u6CD5" aria-hidden="true">#</a> \u57FA\u7840\u7528\u6CD5</h2><div class="language-rust ext-rs line-numbers-mode"><pre class="language-rust"><code><span class="token keyword">enum</span> <span class="token type-definition class-name">PokerSuit</span> <span class="token punctuation">{</span>
  <span class="token class-name">Clubs</span><span class="token punctuation">,</span>
  <span class="token class-name">Spades</span><span class="token punctuation">,</span>
  <span class="token class-name">Diamonds</span><span class="token punctuation">,</span>
  <span class="token class-name">Hearts</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-rust ext-rs line-numbers-mode"><pre class="language-rust"><code><span class="token keyword">fn</span> <span class="token function-definition function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> heart <span class="token operator">=</span> <span class="token class-name">PokerSuit</span><span class="token punctuation">::</span><span class="token class-name">Hearts</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> diamond <span class="token operator">=</span> <span class="token class-name">PokerSuit</span><span class="token punctuation">::</span><span class="token class-name">Diamonds</span><span class="token punctuation">;</span>

    <span class="token function">print_suit</span><span class="token punctuation">(</span>heart<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">print_suit</span><span class="token punctuation">(</span>diamond<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">fn</span> <span class="token function-definition function">print_suit</span><span class="token punctuation">(</span>card<span class="token punctuation">:</span> <span class="token class-name">PokerSuit</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;{:?}&quot;</span><span class="token punctuation">,</span>card<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5E26\u7C7B\u578B\u7684\u679A\u4E3E" tabindex="-1"><a class="header-anchor" href="#\u5E26\u7C7B\u578B\u7684\u679A\u4E3E" aria-hidden="true">#</a> \u5E26\u7C7B\u578B\u7684\u679A\u4E3E</h2><ol><li>\u57FA\u7840\u7C7B\u578B</li></ol><div class="language-rust ext-rs line-numbers-mode"><pre class="language-rust"><code><span class="token keyword">enum</span> <span class="token type-definition class-name">PokerCard</span> <span class="token punctuation">{</span>
    <span class="token class-name">Clubs</span><span class="token punctuation">(</span><span class="token keyword">u8</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token class-name">Spades</span><span class="token punctuation">(</span><span class="token keyword">u8</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token class-name">Diamonds</span><span class="token punctuation">(</span><span class="token keyword">u8</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token class-name">Hearts</span><span class="token punctuation">(</span><span class="token keyword">u8</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token keyword">fn</span> <span class="token function-definition function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">let</span> c1 <span class="token operator">=</span> <span class="token class-name">PokerCard</span><span class="token punctuation">::</span><span class="token class-name">Spades</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">let</span> c2 <span class="token operator">=</span> <span class="token class-name">PokerCard</span><span class="token punctuation">::</span><span class="token class-name">Diamonds</span><span class="token punctuation">(</span><span class="token number">13</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>\u590D\u6742\u7C7B\u578B</li></ol><div class="language-rust ext-rs line-numbers-mode"><pre class="language-rust"><code><span class="token keyword">struct</span> <span class="token type-definition class-name">Ipv4Addr</span> <span class="token punctuation">{</span>
    <span class="token comment">// --snip--</span>
<span class="token punctuation">}</span>

<span class="token keyword">struct</span> <span class="token type-definition class-name">Ipv6Addr</span> <span class="token punctuation">{</span>
    <span class="token comment">// --snip--</span>
<span class="token punctuation">}</span>

<span class="token keyword">enum</span> <span class="token type-definition class-name">IpAddr</span> <span class="token punctuation">{</span>
    <span class="token constant">V4</span><span class="token punctuation">(</span><span class="token class-name">Ipv4Addr</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token constant">V6</span><span class="token punctuation">(</span><span class="token class-name">Ipv6Addr</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>\u5176\u4ED6\u7C7B\u578B</li></ol><div class="language-rust ext-rs line-numbers-mode"><pre class="language-rust"><code><span class="token keyword">enum</span> <span class="token type-definition class-name">Message</span> <span class="token punctuation">{</span>
    <span class="token class-name">Quit</span><span class="token punctuation">,</span>
    <span class="token class-name">Move</span> <span class="token punctuation">{</span> x<span class="token punctuation">:</span> <span class="token keyword">i32</span><span class="token punctuation">,</span> y<span class="token punctuation">:</span> <span class="token keyword">i32</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token class-name">Write</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token class-name">ChangeColor</span><span class="token punctuation">(</span><span class="token keyword">i32</span><span class="token punctuation">,</span> <span class="token keyword">i32</span><span class="token punctuation">,</span> <span class="token keyword">i32</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="option\u679A\u4E3E" tabindex="-1"><a class="header-anchor" href="#option\u679A\u4E3E" aria-hidden="true">#</a> Option\u679A\u4E3E</h2><div class="language-rust ext-rs line-numbers-mode"><pre class="language-rust"><code><span class="token keyword">enum</span> <span class="token type-definition class-name">Option</span><span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token class-name">Some</span><span class="token punctuation">(</span><span class="token class-name">T</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token class-name">None</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Option\u679A\u4E3E\u5B9A\u4E49\u4E86\uFF0C\u4E24\u79CD\u679A\u4E3E\u503C\u3002\u6240\u4EE5\u5B83\u53EF\u80FD\u662FSome\uFF0C\u4E5F\u53EF\u80FD\u662FNone\u3002</p><p>\u5BF9\u4E8EOption\u7C7B\u578B\u7684\u6570\u636E\uFF0C\u53EF\u4EE5\u63A5\u6536<code>Some</code>\u548C<code>None</code>\u7684\u503C\uFF0C\u4F8B\u5982:</p><div class="language-rust ext-rs line-numbers-mode"><pre class="language-rust"><code><span class="token keyword">let</span> num<span class="token punctuation">:</span> <span class="token class-name">Option</span><span class="token operator">&lt;</span><span class="token keyword">u8</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token class-name">Some</span><span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// \u6216</span>
<span class="token keyword">let</span> num<span class="token punctuation">:</span> <span class="token class-name">Option</span><span class="token operator">&lt;</span><span class="token keyword">u8</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token class-name">None</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u4EE3\u8868\uFF0Cnum\u5B83\u7684\u503C\u53EF\u80FD\u662F\u7A7A\u7684\uFF0C\u4E5F\u53EF\u80FD\u6709\u6570\u5B57\u7684\u503C\u3002</p><h3 id="\u4F7F\u7528match\u5BF9\u4E0D\u540C\u60C5\u51B5\u505A\u5904\u7406" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528match\u5BF9\u4E0D\u540C\u60C5\u51B5\u505A\u5904\u7406" aria-hidden="true">#</a> \u4F7F\u7528match\u5BF9\u4E0D\u540C\u60C5\u51B5\u505A\u5904\u7406</h3><div class="language-rust ext-rs line-numbers-mode"><pre class="language-rust"><code><span class="token keyword">fn</span> <span class="token function-definition function">plus_one</span><span class="token punctuation">(</span>x<span class="token punctuation">:</span> <span class="token class-name">Option</span><span class="token operator">&lt;</span><span class="token keyword">i32</span><span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token punctuation">-&gt;</span> <span class="token class-name">Option</span><span class="token operator">&lt;</span><span class="token keyword">i32</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">match</span> x <span class="token punctuation">{</span>
        <span class="token class-name">None</span> <span class="token operator">=&gt;</span> <span class="token class-name">None</span><span class="token punctuation">,</span>
        <span class="token class-name">Some</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token class-name">Some</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u83B7\u53D6some\u7684\u539F\u59CB\u503C" tabindex="-1"><a class="header-anchor" href="#\u83B7\u53D6some\u7684\u539F\u59CB\u503C" aria-hidden="true">#</a> \u83B7\u53D6Some\u7684\u539F\u59CB\u503C</h3><div class="language-rust ext-rs line-numbers-mode"><pre class="language-rust"><code><span class="token keyword">let</span> five <span class="token operator">=</span> <span class="token class-name">Some</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;{:?}&quot;</span><span class="token punctuation">,</span> five<span class="token punctuation">.</span><span class="token function">unwrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u6253\u5370 5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21),c=[t];function o(l,i){return s(),a("div",null,c)}const r=n(p,[["render",o],["__file","\u679A\u4E3E.html.vue"]]);export{r as default};
