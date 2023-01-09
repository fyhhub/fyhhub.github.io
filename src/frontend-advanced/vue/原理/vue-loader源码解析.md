# vue-loader 源码解析

## VuePlugin

1. 通过`compilation.hooks.normalModuleLoader`钩子获取到`loaderContext`，并在`loaderContext`设置`vue-loder`为 true
2. 获取已存在的`module.rules`规则
3. 找到能处理`.vue`文件的`rule`, 以及`其他rule`
4. 注入`pitcher loader`到`compiler.options.module.rules`中

```js
compiler.options.module.rules = [pitcher, ...clonedRules, ...rules];
```

## vue-loader

1. 调用`@vue/component-compiler-utils`中的`parse`方法解析`vue`文件, 并获取`descriptor`
   - descriptor 包含 script, style, template 的内容和上面的属性等信息
2. 如果存在`template`, 生成一段代码如下

```js
import {
  render,
  staticRenderFns,
} from "./App.vue?vue&type=template&id=adv23123aad&scoped=true&xxx";
```

3. 如果存在`script`, 生成一段代码如下

```js
import script from "./App.vue?vue&type=script&lang=js&其他参数=xxx";
export * from "./App.vue?vue&type=script&lang=js&其他参数=xxx";
```

4. 如果存在`style`, 生成一段代码如下

```js
import style0 from "./app.vue?vue&type=style&index=0&id=5ef48958&scoped=true&lang=scss&";
```

5.最后会拼接一些其他代码，生成代码如下

```js
import {
  render,
  staticRenderFns,
} from "./app.vue?vue&type=template&id=5ef48958&scoped=true&";
import script from "./app.vue?vue&type=script&lang=ts&";
export * from "./app.vue?vue&type=script&lang=ts&";
import style0 from "./app.vue?vue&type=style&index=0&id=5ef48958&scoped=true&lang=scss&";

/* normalize component */
import normalizer from "!../node_modules/vue-loader/lib/runtime/componentNormalizer.js";
var component = normalizer(
  script,
  render,
  staticRenderFns,
  false,
  null,
  "5ef48958",
  null
);

/* hot reload */
if (module.hot) {
  var api = require("/Users/ocj1/doc/h5/study/webpack/webpack-vue-demo/node_modules/vue-hot-reload-api/dist/index.js");
  api.install(require("vue"));
  if (api.compatible) {
    module.hot.accept();
    if (!api.isRecorded("5ef48958")) {
      api.createRecord("5ef48958", component.options);
    } else {
      api.reload("5ef48958", component.options);
    }
    module.hot.accept(
      "./app.vue?vue&type=template&id=5ef48958&scoped=true&",
      function () {
        api.rerender("5ef48958", {
          render: render,
          staticRenderFns: staticRenderFns,
        });
      }
    );
  }
}
component.options.__file = "src/app.vue";
export default component.exports;
```

## componentNormalizer

在上面生成的代码中有这样一段，目的是为了规范组件对象。

```js
/* normalize component */
import normalizer from "!../node_modules/vue-loader/lib/runtime/componentNormalizer.js";
var component = normalizer(
  script,
  render,
  staticRenderFns,
  false,
  null,
  "5ef48958",
  null
);
```

**实现如下**

::: details 点击查看源码

```js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

export default function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === "function" ? scriptExports.options : scriptExports;

  // render functions
  if (render) {
    options.render = render;
    options.staticRenderFns = staticRenderFns;
    options._compiled = true;
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true;
  }

  // scopedId
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }

  var hook;
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          );
        }
      : injectStyles;
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook;
      // register for functional component in vue file
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return {
    exports: scriptExports,
    options: options,
  };
}
```

:::

其实最终只是把`template`, `script`, `style`进行规范化，并最终返回我们能使用的组件，经历了如下过程

1. 设置组件的渲染函数
2. 设置组件`functional`
3. 设置组件`_scopeId`, 后续会为每个模板节点，添加`data-v-_scopeId`
4. 最后导出组件对象

## pitcher

前面提到过，`pitcher loader`被注入到最前面，并且`pitcher`会比 loader 先执行

也就是说我们有这样一行代码

```js
import {
  render,
  staticRenderFns,
} from "./App.vue?vue&type=template&id=adv23123aad&scoped=true&xxx";
```

经过`pitcher`处理过后会是什么样呢

```js
export * from "-!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib/index.js??vue-loader-options!./app.vue?vue&type=template&id=5ef48958&scoped=true&";
```

这一步又是直接导出`app.vue`，会继续去加载`app.vue`，但是要注意这里是`pitcher`,
也就是说它不会经过其他任何 loader，所以需要拼接在前面指定它需要哪些 loader 处理

1. …/node_modules/vue-loader/lib/index.js
2. …/node_modules/vue-loader/lib/loaders/templateLoader.js

会先后经过这些 loader 处理，这里又要说一下 webpack loader 的相关知识点`inline loader`

可以在 import 语句或任何 与 "import" 方法同等的引用方式 中指定 loader。使用 ! 将资源中的 loader 分开。每个部分都会相对于当前目录解析。

```js
import Styles from "style-loader!css-loader?modules!./styles.css";
```

通过为内联 import 语句添加前缀，可以覆盖 配置 中的所有 loader, preLoader 和 postLoader：

- 使用 ! 前缀，将禁用所有已配置的 normal loader(普通 loader)

```js
import Styles from "!style-loader!css-loader?modules!./styles.css";
```

- 使用 !! 前缀，将禁用所有已配置的 loader（preLoader, loader, postLoader）

```js
import Styles from "!!style-loader!css-loader?modules!./styles.css";
```

- 使用 -! 前缀，将禁用所有已配置的 preLoader 和 loader，但是不禁用 postLoaders

```js
import Styles from "-!style-loader!css-loader?modules!./styles.css";
```

选项可以传递查询参数，例如 ?key=value&foo=bar，或者一个 JSON 对象，例如 ?{"key":"value","foo":"bar"}。

**这次我们看一下 vue-loader 会把我们的 app.vue 转成什么样子呢**

```js
// node_modules/vue-loader/lib/index.js
module.exports = function (source) {
...
if (incomingQuery.type) {
  return selectBlock(
    descriptor,
    loaderContext,
    incomingQuery,
    !!options.appendExtension
  )
}
```

可以看到，这一次我们的 loader 是带有 type=template 参数的，所以进了 vue-loader 的 selectBlock 方法

::: details 点击查看源码

```js
// node_modules/vue-loader/lib/select.js
module.exports = function selectBlock(
  descriptor,
  loaderContext,
  query,
  appendExtension
) {
  // template
  if (query.type === `template`) {
    if (appendExtension) {
      loaderContext.resourcePath += "." + (descriptor.template.lang || "html");
    }
    loaderContext.callback(
      null,
      descriptor.template.content,
      descriptor.template.map
    );
    return;
  }

  // script
  if (query.type === `script`) {
    if (appendExtension) {
      loaderContext.resourcePath += "." + (descriptor.script.lang || "js");
    }
    loaderContext.callback(
      null,
      descriptor.script.content,
      descriptor.script.map
    );
    return;
  }

  // styles
  if (query.type === `style` && query.index != null) {
    const style = descriptor.styles[query.index];
    if (appendExtension) {
      loaderContext.resourcePath += "." + (style.lang || "css");
    }
    loaderContext.callback(null, style.content, style.map);
    return;
  }

  // custom
  if (query.type === "custom" && query.index != null) {
    const block = descriptor.customBlocks[query.index];
    loaderContext.callback(null, block.content, block.map);
    return;
  }
};
```

:::

经过上面的处理，最后 loader 会返回

```html
<div class="app-container">{{ msg }}</div>
```

## templateLoader

经过`vue-loader`再次处理后，就需要交给`templateLoader`进行编译了

::: details 点击查看源码

```js
module.exports = function (source) {
  const loaderContext = this;
  const query = qs.parse(this.resourceQuery.slice(1));

  // although this is not the main vue-loader, we can get access to the same
  // vue-loader options because we've set an ident in the plugin and used that
  // ident to create the request for this loader in the pitcher.
  const options = loaderUtils.getOptions(loaderContext) || {};
  const { id } = query;
  const isServer = loaderContext.target === "node";
  const isProduction =
    options.productionMode ||
    loaderContext.minimize ||
    process.env.NODE_ENV === "production";
  const isFunctional = query.functional;

  // allow using custom compiler via options
  const compiler = options.compiler || require("vue-template-compiler");

  const compilerOptions = Object.assign(
    {
      outputSourceRange: true,
    },
    options.compilerOptions,
    {
      scopeId: query.scoped ? `data-v-${id}` : null,
      comments: query.comments,
    }
  );

  // for vue-component-compiler
  const finalOptions = {
    source,
    filename: this.resourcePath,
    compiler,
    compilerOptions,
    // allow customizing behavior of vue-template-es2015-compiler
    transpileOptions: options.transpileOptions,
    transformAssetUrls: options.transformAssetUrls || true,
    isProduction,
    isFunctional,
    optimizeSSR: isServer && options.optimizeSSR !== false,
    prettify: options.prettify,
  };

  const compiled = compileTemplate(finalOptions);

  // tips
  if (compiled.tips && compiled.tips.length) {
    compiled.tips.forEach((tip) => {
      loaderContext.emitWarning(typeof tip === "object" ? tip.msg : tip);
    });
  }

  // errors
  if (compiled.errors && compiled.errors.length) {
    // 2.6 compiler outputs errors as objects with range
    if (
      compiler.generateCodeFrame &&
      finalOptions.compilerOptions.outputSourceRange
    ) {
      // TODO account for line offset in case template isn't placed at top
      // of the file
      loaderContext.emitError(
        `\n\n  Errors compiling template:\n\n` +
          compiled.errors
            .map(({ msg, start, end }) => {
              const frame = compiler.generateCodeFrame(source, start, end);
              return `  ${msg}\n\n${pad(frame)}`;
            })
            .join(`\n\n`) +
          "\n"
      );
    } else {
      loaderContext.emitError(
        `\n  Error compiling template:\n${pad(compiled.source)}\n` +
          compiled.errors.map((e) => `  - ${e}`).join("\n") +
          "\n"
      );
    }
  }

  const { code } = compiled;

  // finish with ESM exports
  return code + `\nexport { render, staticRenderFns }`;
};
```

:::

最后编译后的代码如下

```js
var render = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "app-container" }, [_vm._v(_vm._s(_vm.msg))]);
};
var staticRenderFns = [];
render._withStripped = true;
export { render, staticRenderFns };
```

## 参考

[手把手带你撸一遍 vue-loader 源码](https://blog.csdn.net/vv_bug/article/details/107722103)
