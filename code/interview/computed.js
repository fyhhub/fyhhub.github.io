function computed(getter) {
  let value;
  let dirty = true;
  let obj;
  const effectFn = effect(getter, {
    lazy: true,
    scheduler() {
      if (!dirty) {
        dirty = true;
        // 如果effect中使用了computed 需要手动触发
        trigger(obj, "value");
      }
    },
  });

  obj = {
    get value() {
      if (dirty) {
        value = effectFn();
        dirty = false;
        // 如果effect中使用了computed 需要收集
      }
      track(obj, "value");
      return value;
    },
  };
  return obj;
}
