import{_ as a,o as e,c as r,Q as t}from"./chunks/framework.353e5930.js";const b=JSON.parse('{"title":"adb 使用","description":"","frontmatter":{},"headers":[],"relativePath":"informal/其他/adb使用.md","filePath":"informal/其他/adb使用.md"}'),d={name:"informal/其他/adb使用.md"},o=t(`<h1 id="adb-使用" tabindex="-1">adb 使用 <a class="header-anchor" href="#adb-使用" aria-label="Permalink to &quot;adb 使用&quot;">​</a></h1><h2 id="手机截图并保存到电脑" tabindex="-1">手机截图并保存到电脑 <a class="header-anchor" href="#手机截图并保存到电脑" aria-label="Permalink to &quot;手机截图并保存到电脑&quot;">​</a></h2><pre><code>adb exec-out screencap -p &gt; ~/xxx.png
</code></pre><h2 id="屏幕录制保存到电脑" tabindex="-1">屏幕录制保存到电脑 <a class="header-anchor" href="#屏幕录制保存到电脑" aria-label="Permalink to &quot;屏幕录制保存到电脑&quot;">​</a></h2><pre><code># 保存到手机
adb shell screenrecord /sdcard/filename.mp4

# 保存到电脑
adb pull /sdcard/filename.mp4
</code></pre>`,5),n=[o];function c(s,i,l,_,h,p){return e(),r("div",null,n)}const f=a(d,[["render",c]]);export{b as __pageData,f as default};
