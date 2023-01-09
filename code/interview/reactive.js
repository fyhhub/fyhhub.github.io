/*
 * @Author: fanyihui
 * @Date: 2022-02-21 11:12:41
 * @LastEditors: VSCode
 * @LastEditTime: 2022-02-21 21:25:16
 * @FilePath: /fyh-blog/code/interview/reactive.js
 * @Description:
 *
 * Copyright (c) 2022 by fanyihui/tuhu, All Rights Reserved.
 */

const ITERATE_KEY = "ITERATE_KEY";

function reactive(target) {
  return createReactive(target);
}
function shallowReactive() {
  return createReactive(target, true);
}
function createReactive(target, isShallow = false) {
  return new Proxy(target, {
    get(target, key, receiver) {
      if (key === "raw") {
        return target;
      }
      const res = Reflect.get(target, key, receiver);
      track(target, key);
      if (isShallow) {
        return res;
      }
      if (typeof res === "object" && res !== null) {
        return reactive(res);
      }
      return res;
    },
    has(target, key, receiver) {
      track(target, key);
      return Reflect.has(target, key, receiver);
    },
    set(target, key, newVal, receiver) {
      const oldValue = target[key];

      // 判断当前设置的属性 是否存在，如果存在说明是SET， 否则就是ADD新增属性
      const type = Object.prototype.hasOwnProperty.call(target, key)
        ? "SET"
        : "ADD";
      const res = Reflect.set(target, key, val, receiver);
      // target是receiver的原始对象
      // 例如有 reactive(child) reactive(parent) child的原型指向了parent
      // 会导致一个问题，child和parent的target是不一样的  而 receiver都是child的代理对象
      if (target === receiver.raw) {
        // 判断新旧值是否不同 并且两个值不是NaN
        if (
          newVal !== oldValue &&
          (oldValue === oldValue || newVal === newVal)
        ) {
          trigger(target, key, type);
        }
      }

      return res;
    },
    // 删除属性
    deleteProperty(target, key) {
      const hadKey = Object.prototype.hasOwnProperty.call(target, key);
      const res = Reflect.deleteProperty(target, key);
      if (res && hadKey) {
        trigger(target, key, "DELETE");
      }
      return res;
    },
    ownKeys(target) {
      // 处理以下情况
      // effect(() => {
      //   for (const key in obj) {
      //     console.log(key)
      //   }
      // })
      track(target, ITERATE_KEY);
      return Reflect.ownKeys(target);
    },
  });
}
