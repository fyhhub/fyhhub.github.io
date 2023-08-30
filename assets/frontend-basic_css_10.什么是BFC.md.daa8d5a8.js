import{_ as t,o as e,c as l,Q as i}from"./chunks/framework.968e3df4.js";const f=JSON.parse('{"title":"10. 什么是BFC","description":"","frontmatter":{"order":10},"headers":[],"relativePath":"frontend-basic/css/10.什么是BFC.md","filePath":"frontend-basic/css/10.什么是BFC.md","lastUpdated":1693361327000}'),o={name:"frontend-basic/css/10.什么是BFC.md"},a=i('<h1 id="_10-什么是bfc" tabindex="-1">10. 什么是BFC <a class="header-anchor" href="#_10-什么是bfc" aria-label="Permalink to &quot;10. 什么是BFC&quot;">​</a></h1><p>块格式化上下文（Block Formatting Context，BFC）是Web页面的可视化CSS渲染的一部分，是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的交互限定区域。</p><p>通俗来讲：<strong>BFC是一个独立的布局环境，可以理解为一个容器，在这个容器中按照一定规则进行物品摆放，并且不会影响其它环境中的物品。如果一个元素符合触发BFC的条件，则BFC中的元素布局不受外部影响。</strong></p><p><strong>创建BFC的条件：</strong></p><ul><li>根元素：body；</li><li>元素设置浮动：float 除 none 以外的值；</li><li>元素设置绝对定位：position (absolute、fixed)；</li><li>display 值为：inline-block、table-cell、table-caption、flex等；</li><li>overflow 值为：hidden、auto、scroll；</li></ul><p><strong>BFC的特点：</strong></p><ul><li>垂直方向上，自上而下排列，和文档流的排列方式一致。</li><li>在BFC中上下相邻的两个容器的margin会重叠</li><li>计算BFC的高度时，需要计算浮动元素的高度</li><li>BFC区域不会与浮动的容器发生重叠</li><li>BFC是独立的容器，容器内部元素不会影响外部元素</li><li>每个元素的左margin值和容器的左border相接触</li></ul>',7),n=[a];function s(r,c,_,d,p,C){return e(),l("div",null,n)}const F=t(o,[["render",s]]);export{f as __pageData,F as default};
