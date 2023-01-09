const bucket = new WeakMap(); // 存储副作用
const effectStack = [];
let activeEffect;
const TRIGGER_TYPE = {
  SET: "SET",
  ADD: "ADD",
  DELETE: "DELETE",
};

function track(target, key) {
  if (!activeEffect) return;
  let depsMap = bucket.get(target);
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()));
  }
  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }
  deps.add(activeEffect);
  // 这里是为了方便删除遗留的effect
  activeEffect.deps.push(deps);
}

function trigger(target, key, type) {
  const depsMap = bucket.get(target);
  if (!depsMap) return;
  const effects = depsMap.get(key);
  //为了防止无限递归 如果直接 add effect到effects中，再次收集依赖后，那么会导致Set长度不变
  const effectsToRun = new Set();
  effects &&
    effects.forEach((effectFn) => {
      // 为了避免无限递归更新 如果发现当前即将执行的effect 和 收集的effect相同 就跳过执行
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn);
      }
    });

  // 只有新增和删除属性时，才会触发与ITERATE_KEY相关联的副作用函数执行
  if (type === TRIGGER_TYPE.ADD || type === TRIGGER_TYPE.DELETE) {
    const iterateEffects = depsMap.get(ITERATE_KEY);
    // 处理effect函数中 for xx in xxx的情况 会触发 ownKeys 的track
    iterateEffects &&
      iterateEffects.forEach((effectFn) => {
        // 为了避免无限递归更新 如果发现当前即将执行的effect 和 收集的effect相同 就跳过执行
        if (effectFn !== activeEffect) {
          effectsToRun.add(effectFn);
        }
      });
  }

  effectsToRun.forEach((effectFn) => {
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn);
    } else {
      effectFn();
    }
  });
}

/*
 * 清除当前effect。避免不必要的依赖收集
 */
function cleanup(effectFn) {
  // 遍历所有属性的effect Set集合，删除掉当前的effect
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i];
    deps.delete(effectFn);
  }
  effectFn.deps.length = 0;
}

function effect(fn, options = {}) {
  const effectFn = () => {
    // 执行副作用函数前 先清除之前遗留的effect
    // effect(() => {
    //   // 当修改obj.ok 为false时 不会触发obj.text的get  但是上次遗留的effect还存在，所以需要清除
    //   document.body.innerText = obj.ok ? obj.text : 'not'
    // })
    cleanup(effectFn);

    // 为了处理嵌套effect的情况 需要一个栈来维护activeEffect
    effectStack.push(effectFn);
    activeEffect = effectFn;
    const res = fn();
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
    return res;
  };
  effectFn.options = options;
  effectFn.deps = [];

  if (!options.lazy) {
    effectFn();
  }
  return effectFn;
}
