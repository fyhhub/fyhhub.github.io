import{_ as s}from"./plugin-vueexport-helper.2444895f.js";import{o as a,c as n,d as e}from"./app.6296002a.js";const t={},i=e(`<h1 id="git\u8BBE\u7F6E\u4EE3\u7406" tabindex="-1"><a class="header-anchor" href="#git\u8BBE\u7F6E\u4EE3\u7406" aria-hidden="true">#</a> git\u8BBE\u7F6E\u4EE3\u7406</h1><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>//\u8BBE\u7F6E\u5168\u5C40\u4EE3\u7406
//http
<span class="token function">git</span> config <span class="token parameter variable">--global</span> https.proxy http://127.0.0.1:1080
//https
<span class="token function">git</span> config <span class="token parameter variable">--global</span> https.proxy https://127.0.0.1:1080
//\u4F7F\u7528socks5\u4EE3\u7406\u7684 \u4F8B\u5982ss\uFF0Cssr <span class="token number">1080</span>\u662Fwindows\u4E0Bss\u7684\u9ED8\u8BA4\u4EE3\u7406\u7AEF\u53E3,mac\u4E0B\u4E0D\u540C\uFF0C\u6216\u8005\u6709\u81EA\u5B9A\u4E49\u7684\uFF0C\u6839\u636E\u81EA\u5DF1\u7684\u6539
<span class="token function">git</span> config <span class="token parameter variable">--global</span> http.proxy socks5://127.0.0.1:1080
<span class="token function">git</span> config <span class="token parameter variable">--global</span> https.proxy socks5://127.0.0.1:1080

//\u53EA\u5BF9github.com\u4F7F\u7528\u4EE3\u7406\uFF0C\u5176\u4ED6\u4ED3\u5E93\u4E0D\u8D70\u4EE3\u7406
<span class="token function">git</span> config <span class="token parameter variable">--global</span> http.https://github.com.proxy socks5://127.0.0.1:1080
<span class="token function">git</span> config <span class="token parameter variable">--global</span> https.https://github.com.proxy socks5://127.0.0.1:1080
//\u53D6\u6D88github\u4EE3\u7406
<span class="token function">git</span> config <span class="token parameter variable">--global</span> <span class="token parameter variable">--unset</span> http.https://github.com.proxy
<span class="token function">git</span> config <span class="token parameter variable">--global</span> <span class="token parameter variable">--unset</span> https.https://github.com.proxy

//\u53D6\u6D88\u5168\u5C40\u4EE3\u7406
<span class="token function">git</span> config <span class="token parameter variable">--global</span> <span class="token parameter variable">--unset</span> http.proxy
<span class="token function">git</span> config <span class="token parameter variable">--global</span> <span class="token parameter variable">--unset</span> https.proxy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),l=[i];function c(p,o){return a(),n("div",null,l)}const v=s(t,[["render",c],["__file","git\u8BBE\u7F6E\u4EE3\u7406.html.vue"]]);export{v as default};
