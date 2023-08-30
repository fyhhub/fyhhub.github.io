import{_ as t,o as d,c as e,Q as a}from"./chunks/framework.968e3df4.js";const p=JSON.parse('{"title":"GET 和 POST 区别","description":"","frontmatter":{},"headers":[],"relativePath":"basic/计算机网络/HTTP/GET和POST区别.md","filePath":"basic/计算机网络/HTTP/GET和POST区别.md","lastUpdated":1693361327000}'),r={name:"basic/计算机网络/HTTP/GET和POST区别.md"},o=a('<h1 id="get-和-post-区别" tabindex="-1">GET 和 POST 区别 <a class="header-anchor" href="#get-和-post-区别" aria-label="Permalink to &quot;GET 和 POST 区别&quot;">​</a></h1><table><thead><tr><th>特性</th><th>GET</th><th>POST</th><th>备注</th></tr></thead><tbody><tr><td>是否可以缓存</td><td>:heavy_check_mark:</td><td>:x:</td><td></td></tr><tr><td>TCP 包</td><td>一个，header 和 data 会一起发送</td><td>两个，header 和 data 先后发送，会先返回 100 状态码，后返回 200</td><td>注意：Firefox 的 post 请求只发送一次</td></tr><tr><td>长度限制</td><td>数值取决于浏览器和服务器的限制，最长 2048 字节</td><td>post 无限制</td><td></td></tr><tr><td>数据位置</td><td>数据拼接在 url 参数上</td><td>请求体</td><td></td></tr><tr><td>浏览器回退</td><td>不会重新请求</td><td>重新请求</td><td></td></tr><tr><td>安全</td><td>数据携带在参数上不安全</td><td>安全</td><td></td></tr></tbody></table>',2),_=[o];function s(T,c,h,i,n,l){return d(),e("div",null,_)}const S=t(r,[["render",s]]);export{p as __pageData,S as default};
