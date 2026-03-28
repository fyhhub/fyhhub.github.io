# vue3 响应式源码极简实现

:::: tabs
@tab JS

```js
const proxyMap = new Map();
const targetMap = new WeakMap();
const activeEffect = [];
const effectStack = [];

function createReactiveEffect(fn) {
  return function effect() {
    if (!effectStack.includes(effect)) {
      try {
        // 先设置好依赖，执行副作用函数后，进行依赖收集
        effectStack.push(effect);
        activeEffect = effect;
        return fn();
      } finally {
        effectStack.pop();
        activeEffect = effectStack[effectStack.length - 1];
      }
    }
  };
}

// 创建副作用函数
function effect(fn) {
  const effect = createReactiveEffect(fn);
  effect();
  return effect;
}

function track(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  // 收集渲染函数
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
  }
}

function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (depsMap) {
    const deps = depsMap.get(key);
    for (let dep of deps) {
      // 执行渲染函数
      dep && dep();
    }
  }
}

function reactive(target) {
  const proxy = proxyMap.get(target);
  if (proxy) {
    return proxy;
  }
  return new Proxy(target, {
    get(target, key, receiver) {
      // 依赖收集
      track(target, key);
      const res = Reflect.get(target, key, receiver);
      return typeof res === "object" ? reactive(res) : res;
    },
    set(target, key, val, receiver) {
      const res = Reflect.set(target, key, val, receiver);
      // 触发依赖
      trigger(target, key, val);
      return res;
    },
  });
}
```

@tab HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="btn">+1</button>
    <script src="./index.js"></script>
    <script>
      const state = reactive({
        a: 1,
      });
      const btn = document.querySelector("#btn");
      effect(() => {
        btn.innerHTML = state.a;
      });
      btn.addEventListener("click", () => {
        state.a++;
      });
    </script>
  </body>
</html>
```

::::
