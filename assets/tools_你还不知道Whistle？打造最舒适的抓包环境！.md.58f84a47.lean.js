import{_ as t,o,c as p,Q as s,k as e,a}from"./chunks/framework.968e3df4.js";const W=JSON.parse('{"title":"你还不知道Whistle？打造最舒适的抓包环境！","description":"","frontmatter":{},"headers":[],"relativePath":"tools/你还不知道Whistle？打造最舒适的抓包环境！.md","filePath":"tools/你还不知道Whistle？打造最舒适的抓包环境！.md","lastUpdated":1693361456000}'),n={name:"tools/你还不知道Whistle？打造最舒适的抓包环境！.md"},l=s("",120),c=e("pre",{class:"language-text","copy-code-registered":""},[e("code",{class:"hljs language-bash"},"# 这一步为js文件插入了sourceMappingURL\n/app\\.990d7bb3\\.js/ jsAppend://`{sourcemap}` \n\n```sourcemap\n//# sourceMappingURL=${url}.map\n```\n\n/app\\.990d7bb3\\.js\\.map/ file://{sourcemapfile}\n")],-1),i=s("",7),r=e("pre",{class:"language-text","copy-code-registered":""},[e("code",{class:"hljs language-bash"},"/e66b202\\.js/ jsBody://{source}\n\n```source\n// 这里填写拷贝过来的线上代码， 然后可以直接修改\n```\n")],-1),d=e("h3",{id:"_4-修改、替换css",tabindex:"-1"},[a("4. 修改、替换CSS "),e("a",{class:"header-anchor",href:"#_4-修改、替换css","aria-label":'Permalink to "4. 修改、替换CSS"'},"​")],-1),h=e("h4",{id:"场景1-替换css文件",tabindex:"-1"},[a("场景1：替换CSS文件 "),e("a",{class:"header-anchor",href:"#场景1-替换css文件","aria-label":'Permalink to "场景1：替换CSS文件"'},"​")],-1),u=e("p",null,[a("例如"),e("code",null,"xxx.css"),a("的内容替换为"),e("code",null,"cssContent"),a("中的内容")],-1),m=e("pre",{class:"language-text","copy-code-registered":""},[e("code",{class:"hljs language-bash"},`
/xxx.css/ cssBody://{cssContent}

\`\`\`cssContent
div {
  color: red
}
\`\`\`
`)],-1),b=e("h4",{id:"场景2-添加css内容",tabindex:"-1"},[a("场景2：添加CSS内容 "),e("a",{class:"header-anchor",href:"#场景2-添加css内容","aria-label":'Permalink to "场景2：添加CSS内容"'},"​")],-1),g=e("p",null,[a("使用"),e("code",null,"cssAppend"),a("和"),e("code",null,"cssPrepend"),a("就可以在css代码的后面和前面插入代码。")],-1),f=e("pre",{class:"language-text","copy-code-registered":""},[e("code",{class:"hljs language-bash"},`/xxx.css/ cssAppend://{cssContent}

\`\`\`cssContent
div {
  color: red
}
\`\`\`
`)],-1),k=e("h3",{id:"_5-修改、替换html",tabindex:"-1"},[a("5. 修改、替换HTML "),e("a",{class:"header-anchor",href:"#_5-修改、替换html","aria-label":'Permalink to "5. 修改、替换HTML"'},"​")],-1),w=e("h4",{id:"场景1-注入vconsole",tabindex:"-1"},[a("场景1：注入vConsole "),e("a",{class:"header-anchor",href:"#场景1-注入vconsole","aria-label":'Permalink to "场景1：注入vConsole"'},"​")],-1),y=e("p",null,[a("这里使用了"),e("code",null,"htmlAppend")],-1),_=e("pre",{class:"language-text","copy-code-registered":""},[e("code",{class:"hljs language-bash"},`www.baidu.com htmlAppend://{injectConsole}

\`\`\`injectConsole
<script src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"><\/script>
<script>
  var vConsole = new window.VConsole();
<\/script>
\`\`\`
`)],-1),j=e("img",{src:"https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb174c0a1b9249d9a00e44daa41ef1d6~tplv-k3u1fbpfcp-watermark.image?",alt:"",width:"100%"},null,-1),v=e("h4",{id:"场景2-注入神策或其他需要尽早执行的sdk",tabindex:"-1"},[a("场景2：注入神策或其他需要尽早执行的SDK "),e("a",{class:"header-anchor",href:"#场景2-注入神策或其他需要尽早执行的sdk","aria-label":'Permalink to "场景2：注入神策或其他需要尽早执行的SDK"'},"​")],-1),x=e("p",null,[a("这里使用了"),e("code",null,"htmlPrepend")],-1),E=e("pre",{class:"language-text","copy-code-registered":""},[e("code",{class:"hljs language-bash"},`juejin.cn htmlPrepend://{injectConsole}

\`\`\`injectConsole
<script src="https://cdn.bootcdn.net/ajax/libs/vConsole/3.14.7/vconsole.min.js"><\/script>
<script>
  var vConsole = new window.VConsole();
<\/script>
\`\`\`
`)],-1),q=e("h3",{id:"_7-请求转发",tabindex:"-1"},[a("7. 请求转发 "),e("a",{class:"header-anchor",href:"#_7-请求转发","aria-label":'Permalink to "7. 请求转发"'},"​")],-1),P=e("h4",{id:"场景1-测试环境代理到本地",tabindex:"-1"},[a("场景1：测试环境代理到本地 "),e("a",{class:"header-anchor",href:"#场景1-测试环境代理到本地","aria-label":'Permalink to "场景1：测试环境代理到本地"'},"​")],-1),C=e("pre",{class:"language-text","copy-code-registered":""},[e("code",{class:"hljs language-bash"},`# 先把请求转到test环境
xxx.dev.cn xxx.test.cn

# 替换dev环境请求中的token
xxx.dev.cn reqHeaders://{testTodev}
\`\`\`testTodev
authorization: 这里可以填写test环境的token
\`\`\`
`)],-1),A=s("",42),D=[l,c,i,r,d,h,u,m,b,g,f,k,w,y,_,j,v,x,E,q,P,C,A];function T(R,I,S,U,V,F){return o(),p("div",null,D)}const $=t(n,[["render",T]]);export{W as __pageData,$ as default};
