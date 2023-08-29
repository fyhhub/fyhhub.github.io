import{_ as e,o as a,c as o,Q as t}from"./chunks/framework.353e5930.js";const f=JSON.parse('{"title":"2.说一下响应式数据的理解","description":"","frontmatter":{"order":2},"headers":[],"relativePath":"frontend-advanced/vue/Vue2面试题/2.说一下响应式数据的理解.md","filePath":"frontend-advanced/vue/Vue2面试题/2.说一下响应式数据的理解.md"}'),r={name:"frontend-advanced/vue/Vue2面试题/2.说一下响应式数据的理解.md"},d=t('<h1 id="_2-说一下响应式数据的理解" tabindex="-1">2.说一下响应式数据的理解 <a class="header-anchor" href="#_2-说一下响应式数据的理解" aria-label="Permalink to &quot;2.说一下响应式数据的理解&quot;">​</a></h1><h2 id="核心答案" tabindex="-1">核心答案 <a class="header-anchor" href="#核心答案" aria-label="Permalink to &quot;核心答案&quot;">​</a></h2><h3 id="_1-object-defineproperty" tabindex="-1">1. Object.defineProperty <a class="header-anchor" href="#_1-object-defineproperty" aria-label="Permalink to &quot;1. Object.defineProperty&quot;">​</a></h3><p>对象通过<code>defineReactive</code>方法，使用<code>Object.defineProperty</code>，将属性进行劫持。 整体流程是这样的：</p><ol><li>创建渲染 Watcher，初始时执行渲染函数</li><li>执行过程中，触发了 getter，开始收集依赖</li><li>修改 data，触发 setter, 通知渲染 Watcher 更新视图</li></ol><h3 id="_2-观察者模式" tabindex="-1">2. 观察者模式 <a class="header-anchor" href="#_2-观察者模式" aria-label="Permalink to &quot;2. 观察者模式&quot;">​</a></h3><p>响应式系统使用了观察者模式，观察者模式主要有两个角色，一是<code>主题</code>, 二是<code>观察者</code>。主题会收集、删除、通知观察者， 而观察者会订阅主题。响应式系统中，<code>Observer和Dep</code>就扮演了<code>主题</code>的角色，<code>Watcher</code>是观察者</p><p>每个对象都有一个<code>Observer</code>对象，每个属性都有一个<code>Dep</code>对象，<code>Dep</code>对象中收集着<code>Watcher</code></p><h2 id="补充答案" tabindex="-1">补充答案： <a class="header-anchor" href="#补充答案" aria-label="Permalink to &quot;补充答案：&quot;">​</a></h2><p>暂无</p><h2 id="扩展回答" tabindex="-1">扩展回答 <a class="header-anchor" href="#扩展回答" aria-label="Permalink to &quot;扩展回答&quot;">​</a></h2><p>在 Vue 2 的实现中，在组件初始化阶段把数据变成响应式时，遇到子属性仍然是对象的情况，会递归执行 Object.defineProperty 定义子对象的响应式；而在 Vue 3 的实现中，只有在对象属性被访问的时候才会判断子属性的类型来决定要不要递归执行 reactive，在性能上会有一定的提升。</p>',12),c=[d];function i(n,_,l,h,s,p){return a(),o("div",null,c)}const b=e(r,[["render",i]]);export{f as __pageData,b as default};
