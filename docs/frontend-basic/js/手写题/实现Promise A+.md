# 实现Promise A+

```js
const STATUS = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

class SelfPromise {
  state = STATUS.PENDING; // 状态
  value = undefined; // 成功的值
  reason = undefined; // 失败原因
  onResolvedCallbacks = []; // 存储成功回调函数
  onRejectedCallback = []; // 存储失败回调函数
  /**
   * new Promise(({resolve, reject}) => {})
   * 构造函数接受一个函数，并立即执行
   * executor(resolve, reject) resolve成功时调用 reject失败时调用
   */
  constructor(executor) {
    /**
   *  Promise存在三个状态（state）pending、fulfilled、rejected
      pending（等待态）为初始态，并可以转化为fulfilled（成功态）和rejected（失败态）
      成功时，不可转为其他状态，且必须有一个不可改变的值（value）
      失败时，不可转为其他状态，且必须有一个不可改变的原因（reason）
      new Promise((resolve, reject)=>{resolve(value)}) resolve为成功，接收参数value，状态改变为fulfilled，不可再次改变。
      new Promise((resolve, reject)=>{reject(reason)}) reject为失败，接收参数reason，状态改变为rejected，不可再次改变。
      若是executor函数报错 直接执行reject();
   */
    const resolve = (value) => {
      //如果状态是pending转化为fulfilled
      if (this.state === STATUS.PENDING) {
        // 修改状态
        this.state = STATUS.FULFILLED;
        // 存储成功的值
        this.value = value;

        // resolve执行，调用成功数组函数
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };
    const reject = (reason) => {
      if (this.state === STATUS.PENDING) {
        // 修改状态
        this.state = STATUS.REJECTED;
        // 存储失败的原因
        this.reason = reason;

        // reject执行，调用失败数组函数
        this.onRejectedCallback.forEach((fn) => fn());
      }
    };
    // 如果执行executor报错，直接执行reject
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  /**
   * then方法有二个参数，onFulfilled, onRejected
   * 当状态state为fulfilled，则执行onFulfilled，传入this.value。
   * 当状态state为rejected，则执行onRejected，传入this.reason
   * onFulfilled,onRejected如果他们是函数，则必须分别在fulfilled，rejected后被调用，value或reason依次作为他们的第一个参数
   */
  then(onFulfilled, onRejected) {
    // onFulfilled如果不是函数，就忽略onFulfilled, 直接返回value
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    // onRejected如果不是函数，就忽略onRejected, 直接抛出错误
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    const promise2 = new SelfPromise((resolve, reject) => {
      const fulfilledAsync = () => {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      };

      const rejectedAsync = () => {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      };

      // 状态为fulfilled, 执行onFulfilled 传入成功的值
      if (this.state === STATUS.FULFILLED) {
        // 异步
        fulfilledAsync();
      }
      // 状态为rejected, 执行onRejected, 传入失败的原因
      if (this.state === STATUS.REJECTED) {
        // 异步
        rejectedAsync();
      }

      if (this.state === STATUS.PENDING) {
        // onFulfilled传入到成功数组
        this.onResolvedCallbacks.push(fulfilledAsync);
        // onRejected传入到失败数组
        this.onRejectedCallback.push(rejectedAsync);
      }
    });
    // 返回promise 完成链式
    return promise2;
  }
  // catch方法
  catch(fn) {
    return this.then(null, fn);
  }
  // finally方法用于无论是resolve还是reject，finally的参数函数都会被执行。
  finally(fn) {
    return this.then(
      (value) => {
        fn();
        return value;
      },
      (reason) => {
        fn();
        throw reason;
      }
    );
  }
}

/**
    x 不能是null
    x 是普通值 直接resolve(x)
    x 是对象或者函数（包括promise），let then = x.then
    当x是对象或者函数（默认promise）

    声明了then
    如果取then报错，则走reject()
    如果then是个函数，则用call执行then，第一个参数是this，后面是成功的回调和失败的回调

    如果成功的回调还是pormise，就递归继续解析
    成功和失败只能调用一个 所以设定一个called来防止多次调用
 */
function resolvePromise(promise2, x, resolve, reject) {
  // 循环引用报错
  if (x === promise2) {
    return reject(
      new TypeError("The promise and the return value are the same")
    );
  }
  // 防止多次调用
  let called;
  // x 不是null,且x是对象或者函数
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      // 声明then = x 的then方法
      let then = x.then;
      // 如果then是函数，默认就是promise
      if (typeof then === "function") {
        // 让then执行，第一个参数是this, 后面的参数是成功回调，和失败回调
        then.call(
          x,
          (success) => {
            // 成功和失败的回调只能调用一个
            if (called) return;
            called = true;
            // 如果resolve的值依旧是promise，就继续解析
            resolvePromise(promise2, success, resolve, reject);
          },
          (err) => {
            if (called) return;
            called = true;
            reject(err); // 失败
          }
        );
      } else {
        resolve(x); // 直接成功即可
      }
    } catch (e) {
      // 失败
      if (called) return;
      called = true;
      // 出错了，then不在执行
      reject(e);
    }
  } else {
    resolve(x);
  }
}

module.exports = SelfPromise;
```

## Promise.resolve

```js
SelfPromise.resolve = function (value) {
  return new SelfPromise((resolve) => {
    resolve(value);
  });
};
```

## Promise.reject

```js
SelfPromise.reject = function (reason) {
  return new SelfPromise((resolve, reject) => {
    reject(reason);
  });
};
```

## Promise.race

```js
SelfPromise.race = function (promises) {
  return new SelfPromise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject);
    }
  });
};
```

## Promise.all

```js
/**
 * Promise.all 方法接受一个数组作为参数, 将多个 Promise 实例，包装成一个新的 Promise 实例。
 */
SelfPromise.all = (promises) => {
  let arr = [];
  let count = 0;
  return new SelfPromise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then((data) => {
        arr[i] = data;
        count++;
        if (count === promises.length) {
          resolve(arr);
        }
      }, reject);
    }
  });
};
```

## Promise.deferred

```js
SelfPromise.deferred = function () {
  let dfd = {};
  dfd.promise = new SelfPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};
```

## Promise.allSettled

```js
SelfPromise.allSettled = function (promises) {
  return new SelfPromise((resolve) => {
    const data = [];
    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i];
      promise
        .then(
          (res) => {
            data[i] = { status: "fulfilled", value: res };
          },
          (error) => {
            data[i] = { status: "rejected", reason: error };
          }
        )
        .finally(() => {
          if (i === promises.length - 1) {
            resolve(data);
          }
        });
    }
  });
};
```
