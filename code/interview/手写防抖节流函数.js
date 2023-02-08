function debounce(fn, wait) {
  let timer;
  return function () {
    if (timer) clearTimeout(fn);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, wait);
  };
}

function throttle(fn, wait) {
  let pre = Date.now();
  return function () {
    const now = Date.now();
    if (now - pre > wait) {
      fn.apply(this, arguments);
      pre = now;
    }
  };
}