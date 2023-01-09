function asyncToGenerator(fn) {
  return function () {
    const gen = fn.apply(this, arguments);
    return new Promise((resolve, reject) => {
      function step(key, args) {
        let res;
        try {
          res = gen[key](args);
        } catch (e) {
          return reject(e);
        }

        const { value, done } = res;
        if (done) {
          return resolve(value);
        } else {
          return Promise.resolve(value)
            .then((val) => {
              step("next", val);
            })
            .catch((e) => {
              step("throw", e);
            });
        }
      }
      step("next");
    });
  };
}
