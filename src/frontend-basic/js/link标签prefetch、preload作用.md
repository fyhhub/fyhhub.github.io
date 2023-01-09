# link 标签 prefetch、preload 作用

preload 是告诉浏览器页面必定需要的资源，浏览器一定会加载这些资源；
prefetch 是告诉浏览器页面可能需要的资源，浏览器不一定会加载这些资源。
preload 优先级更高
使用 preload 和 prefetch 的逻辑可能不是写到一起，但一旦发生对用一资源 preload 或 prefetch 的话，会带来双倍的网络请求
