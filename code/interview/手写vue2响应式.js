// 数组变异方法

const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
var methodsToPatch = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse",
];

methodsToPatch.forEach(function (method) {
  const original = arrayProto[method];
  arrayMethods[method] = function () {
    const args = [].slice.call(arguments);
    const result = original.apply(this, args);
    const ob = this.__ob__;
    let inserted;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
        break;
    }
    if (inserted) {
      ob.observeArray(inserted);
    }
    ob.dep.notify();
    return result;
  };
});

Dep.target = null;

class Watcher {
  addDep(dep) {
    dep.subs.push(this);
  }

  update() {
    // 执行更新逻辑
  }
}
class Dep {
  subs = [];
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
  notify() {
    var subs = this.subs.slice();
    for (var i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
}

function defineReactive(obj, key) {
  let val = obj[key];
  const dep = new Dep();

  observe(val);

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      if (Dep.target) {
        dep.depend();
      }
      return val;
    },
    set(newVal) {
      val = newVal;
      dep.notify();
    },
  });
}

class Observer {
  constructor(value) {
    this.value = value;
    this.__ob__ = this;

    if (Array.isArray(value)) {
      value.__proto__ = arrayMethods;
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }

  observeArray(items) {
    items.forEach((item) => {
      observe(item);
    });
  }

  walk(obj) {
    Object.keys(obj).forEach((key) => {});
  }
}

function isObject(data) {
  return obj !== null && typeof obj === "object";
}

function observe(data) {
  if (!isObject(data)) return;

  if (data.__ob__ && data.__ob__ instanceof Observer) {
    return data.__ob__;
  }

  const ob = new Observer(data);
  return ob;
}
