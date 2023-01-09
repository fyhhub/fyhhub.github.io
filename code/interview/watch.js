function traverse(value, seen = new Set()) {
  if (typeof value !== "object" || value === null || seen.has(value)) return;
  seen.add(source);

  for (const k of source) {
    traverse(source[k], seen);
  }
}

function watch(source, cb, options = {}) {
  let getter;
  if (typeof source === "function") {
    getter = source;
  } else {
    getter = () => traverse(source);
  }

  let oldValue, newValue;
  let cleanup;
  let effectFn;

  function onInvalidate(fn) {
    cleanup = fn;
  }
  const job = () => {
    newValue = effectFn();
    if (cleanup) {
      cleanup();
    }
    cb(oldValue, newValue, onInvalidate);
    oldValue = newValue;
  };

  effectFn = effect(() => getter(), {
    lazy: true,
    scheduler: () => {
      if ((options.flush = "post")) {
        const p = Promise.resolve();
        p.then(job);
      } else {
        job();
      }
    },
  });

  if (options.immediate) {
    job();
  } else {
    oldValue = effectFn();
  }
}
