import{_ as a,o as e,c as t,Q as d}from"./chunks/framework.3d945e71.js";const f=JSON.parse('{"title":"10.data 为什么必须是函数","description":"","frontmatter":{"order":10},"headers":[],"relativePath":"frontend-advanced/vue/Vue2/10.data为什么必须是函数.md","filePath":"frontend-advanced/vue/Vue2/10.data为什么必须是函数.md","lastUpdated":1694138420000}'),r={name:"frontend-advanced/vue/Vue2/10.data为什么必须是函数.md"},_=d('<h1 id="_10-data-为什么必须是函数" tabindex="-1">10.data 为什么必须是函数 <a class="header-anchor" href="#_10-data-为什么必须是函数" aria-label="Permalink to &quot;10.data 为什么必须是函数&quot;">​</a></h1><h2 id="核心答案" tabindex="-1">核心答案 <a class="header-anchor" href="#核心答案" aria-label="Permalink to &quot;核心答案&quot;">​</a></h2><p>有多个组件复用时，如果仍然使用对象，那么每个组件初始化时，使用的 data 都是相同的引用，会相互影响。如果是个函数，那么调用后返回的都是新的对象。</p><h2 id="补充回答" tabindex="-1">补充回答 <a class="header-anchor" href="#补充回答" aria-label="Permalink to &quot;补充回答&quot;">​</a></h2><p>为什么在 vue 组件中的 data 必须使一个函数，而在 vue 的根实例中 data 就不是这样呢？ 创建根实例的时候使用 new 的方式只能创建一个，是一个单例，不会像 vue 组件实例可以创建很多个，就不会发生 vue 组件实例中的数据污染，相互干扰。</p>',5),o=[_];function n(c,s,i,l,h,u){return e(),t("div",null,o)}const m=a(r,[["render",n]]);export{f as __pageData,m as default};
