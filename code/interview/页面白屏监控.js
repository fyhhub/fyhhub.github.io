function existContent(dom) {
  // 获取当前节点的宽高
  const { width, height } = dom.getBoundingClientRect();
  // 存在宽高代表存在内容，直接返回true
  if (width > 0 && height > 0) return true;

  const children = dom.children || [];
  for (let i = 0; i < children.length; i++) {
    // 如果子节点存在内容，也直接返回true
    if (existContent(children[i])) {
      return true;
    }
  }
  return false;
}

window.addEventListener("load", () => {
  setTimeout(() => {
    const dom = document.querySelector("#app");
    existContent(dom);
  }, 3000); // 3s后开始检测
});
