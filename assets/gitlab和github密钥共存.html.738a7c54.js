import{_ as s}from"./plugin-vueexport-helper.2444895f.js";import{o as a,c as e,e as n}from"./app.2f3a3b13.js";const i={},l=n(`<h1 id="gitlab\u548Cgithub\u5BC6\u94A5\u5171\u5B58" tabindex="-1"><a class="header-anchor" href="#gitlab\u548Cgithub\u5BC6\u94A5\u5171\u5B58" aria-hidden="true">#</a> gitlab\u548Cgithub\u5BC6\u94A5\u5171\u5B58</h1><h2 id="\u521B\u5EFA\u5BC6\u94A5" tabindex="-1"><a class="header-anchor" href="#\u521B\u5EFA\u5BC6\u94A5" aria-hidden="true">#</a> \u521B\u5EFA\u5BC6\u94A5</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ ssh-keygen <span class="token parameter variable">-t</span> rsa <span class="token parameter variable">-C</span> <span class="token string">&quot;\u6CE8\u518C\u7684gitlab\u90AE\u7BB1&quot;</span>  // \u8BBE\u7F6E \u4E3Aid_rsa_gitlab
$ ssh-keygen <span class="token parameter variable">-t</span> rsa <span class="token parameter variable">-C</span> <span class="token string">&quot;\u6CE8\u518C\u7684github\u90AE\u7BB1&quot;</span> // \u8BBE\u7F6Ekey  \u4E3Aid_rsa_github
\`\`<span class="token variable"><span class="token variable">\`</span>-*

<span class="token comment">## \u521B\u5EFAconfig</span>

<span class="token variable">\`</span></span>\`\`shell
<span class="token builtin class-name">cd</span> ~/.ssh
<span class="token function">touch</span> config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># gitlab</span>
Host gitlab.com
HostName gitlab.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_gitlab

<span class="token comment"># github</span>
Host github.com  // \u94FE\u63A5\u7684\u670D\u52A1\u5668\u5730\u5740
Hostname ssh.github.com //\u670D\u52A1\u5668\u5730\u5740
User *******  //\u7528\u6237
PreferredAuthentications publickey //\u9A8C\u8BC1\u65B9\u5F0F
IdentityFile ~/.ssh/id_rsa_github   //\u6307\u5B9A\u8FDE\u63A5\u4F7F\u7528\u7684\u5BC6\u94A5\u6587\u4EF6
Port <span class="token number">443</span>  //\u7AEF\u53E3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u9A8C\u8BC1\u662F\u5426\u914D\u7F6E\u6210\u529F" tabindex="-1"><a class="header-anchor" href="#\u9A8C\u8BC1\u662F\u5426\u914D\u7F6E\u6210\u529F" aria-hidden="true">#</a> \u9A8C\u8BC1\u662F\u5426\u914D\u7F6E\u6210\u529F</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">ssh</span> <span class="token parameter variable">-T</span> git@github.com
<span class="token function">ssh</span> <span class="token parameter variable">-T</span> git@gitlab.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,6),t=[l];function r(d,c){return a(),e("div",null,t)}const u=s(i,[["render",r],["__file","gitlab\u548Cgithub\u5BC6\u94A5\u5171\u5B58.html.vue"]]);export{u as default};
