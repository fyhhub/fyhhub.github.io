const STATUS = {
  PENDING: "PENDING",
  REJECTED: "REJECTED",
  FULFILLED: "FULFILLED",
};

function resolvePromise(promise, x, resolve, reject) {
  if (x === promise) {
    return reject(new TypeError("循环引用报错"));
  }

  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    const then = x.then;
    try {
      if (typeof then === "function") {
        then.call(
          x,
          (success) => {
            resolvePromise(promise, success, resolve, reject);
          },
          (err) => {
            reject(err);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      reject(e);
    }
  } else {
    resolve(x);
  }
}

class SelfPromise {
  status = STATUS.PENDING;
  value = null;
  reason = null;
  onRejectedCallbacks = [];
  onFulfilledCallbacks = [];

  constructor(executor) {
    const resolve = (value) => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach((cb) => cb());
      }
    };

    const reject = (reason) => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((cb) => cb());
      }
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function" ? onRejected : (reason) => reason;

    const promise = new SelfPromise((resolve, reject) => {
      const fulfilledAsync = () => {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };

      const rejectedAsync = () => {
        setTimeout(() => {
          try {
            const x = onRejected(this.value);
            resolvePromise(promise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };

      if (this.status === STATUS.FULFILLED) {
        fulfilledAsync();
      }

      if (this.status === STATUS.REJECTED) {
        rejectedAsync();
      }

      if (this.status === STATUS.PENDING) {
        this.onFulfilledCallbacks.push(fulfilledAsync);
        this.onRejectedCallbacks.push(rejectedAsync);
      }
    });
    return promise;
  }

  catch(fn) {
    return this.then(null, fn);
  }

  finally(fn) {
    return this.then(
      (value) => {
        fn();
        return value;
      },
      (e) => {
        fn();
        throw e;
      }
    );
  }
}

SelfPromise.reject = function () {
  return new SelfPromise((resolve, reject) => {
    reject();
  });
};

SelfPromise.resolve = function () {
  return new SelfPromise((resolve, reject) => {
    resolve();
  });
};

SelfPromise.race = function (promises) {
  return new SelfPromise((resolve, reject) => {
    promises.forEach((p) => {
      p.then(resolve, reject);
    });
  });
};

SelfPromise.all = function (promises) {
  return new SelfPromise((resolve) => {
    const res = [];
    for (let i = 0; i < promises.length; i++) {
      promises.then((result) => {
        res.push(result);
      }, this.reject);
    }
    resolve(res);
  });
};

SelfPromise.deferred = function () {
  const dfd = {};
  new SelfPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

SelfPromise.allSettled = function (promises) {
  return new SelfPromise((resolve, reject) => {
    const data = [];
    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then(
          (res) => {
            data[i] = {
              status: "fulfilled",
              value: res,
            };
          },
          (error) => {
            data[i] = {
              status: "rejected",
              value: error,
            };
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
