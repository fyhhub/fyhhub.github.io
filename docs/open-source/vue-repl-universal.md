# vue-repl-universal

一个能同时支持Vue2/3的Vue Repl组件,**组件自身是Vue3**

## 安装
```
npm i vue-repl-universal
```

![图片](https://raw.githubusercontent.com/fyhhub/imgs/main/image.png)
## 基本使用


```js
import { createApp, h } from 'vue'
import Playground from 'vue-repl-universal'
import { utoa } from 'vue-repl-universal'
repl-universal'
createApp({
  render() {
    return h(Playground, {
      // 这里可以传入你的初始代码
      code: utoa(JSON.stringify({
        'src/App.vue': `
      <script setup>
import { ref, version } from 'vue'
const msg = ref('Vue Version')
</script>
<template>
<div>
<h1>{{ msg }} {{version}}</h1>
<input v-model="msg"/>
</div>
</template>
      `.trim()
      })),

      // 传入repl编辑器选项
      replOptions: {
        layout: 'vertical'
      },

      // Store的选项配置
      storeOptions: {

      },
      vueVersion: 'xx' // 例如 2.7.14
    })
  }
}).mount('#app')
```


## 配置

### code
参考上方例子

### StoreOptions

```ts
interface StoreOptions {
  serializedState?: string;
  showOutput?: boolean;
  outputMode?: OutputModes | string;
  defaultVueRuntimeURL?: string;
  defaultVueServerRendererURL?: string;
  defaultVueVersion?: string;
}
```

### ReplProps
```ts
export interface Props {
  theme?: 'dark' | 'light'
  editor: EditorComponentType
  store?: Store
  autoResize?: boolean
  showCompileOutput?: boolean
  showImportMap?: boolean
  showTsConfig?: boolean
  clearConsole?: boolean
  sfcOptions?: SFCOptions
  layout?: 'horizontal' | 'vertical'
  layoutReverse?: boolean
  ssr?: boolean
  previewOptions?: {
    headHTML?: string
    bodyHTML?: string
    placeholderHTML?: string
    customCode?: {
      importCode?: string
      useCode?: string
    }
  }
}
```

### vueVersion
指定vue版本
