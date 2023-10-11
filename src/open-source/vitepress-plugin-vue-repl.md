# [vitepress-plugin-vue-repl](https://www.npmjs.com/package/vitepress-plugin-vue-repl)


## Preview

:::playground CodeMirror
```vue
<template>
  <div>playground  test</div>
  <button @click="count += 1">{{count}}</button>
</template>
<script setup>
import { ref } from 'vue';
const count = ref(1)
</script>
<style scoped>
div {
  color: red;
}
</style>
```
:::
## install

```shell
npm i vitepress-plugin-vue-repl -D
```



## config

```js
// config.ts
import { VueReplMdPlugin } from 'vitepress-plugin-vue-repl';

export default defineConfig({
  markdown: {
    config: (md) => {
      md.use(VueReplMdPlugin)
    }
  },
})
```


```js
// theme/index.ts
import Playground from 'vitepress-plugin-vue-repl/components/index.vue'
import DefaultTheme from 'vitepress/theme';

export default {
    ...DefaultTheme,
    enhanceApp(ctx) {
      ctx.app.component('VuePlayground', Playground);
    },
};
```


## Usage

```markdown
:::playground
```vue
<template>
  <div>playground  test</div>
  <button @click="count += 1">{{count}}</button>
</template>
<script setup>
import { ref } from 'vue';
const count = ref(1)
</script>
<style scoped>
div {
  color: red;
}
</style>

\``` # remove slash
:::
```

注意去掉斜线


## Code Editor Config

```markdown{1}
:::playground Monaco
```vue
<template>
  <div>playground  test</div>
  <button @click="count += 1">{{count}}</button>
</template>
<script setup>
import { ref } from 'vue';
const count = ref(1)
</script>
<style scoped>
div {
  color: red;
}
</style>

\``` # remove slash
:::
```

+ Monaco
+ CodeMirror



## Vue Repl Config & imports



```markdown{18-27}
:::playground
```vue
<template>
  <a-button type="primary">Primary</a-button>
</template>

<script lang="ts" setup>
</script>
\``` # remove slash
```json
{
  "imports": {
    "ant-design-vue": "xxx"
  },
  "editorConfig": {
    "layout": "vertical"
  }
}
\``` # remove slash
:::
```


editorConfig:

```ts
interface Props {
  theme?: 'dark' | 'light'
  autoResize?: boolean
  showCompileOutput?: boolean
  showImportMap?: boolean
  showTsConfig?: boolean
  clearConsole?: boolean
  sfcOptions?: SFCOptions
  layout?: 'horizontal' | 'vertical'
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