# 实现生成一个长度为 n 的不重复随机数组

```js
const getRandomArr2 = function (arr, n) {
  const result = [];
  const map = new Map();
  while (result.length < n) {
    // 生成随机数
    const randomNum = arr[Math.floor(Math.random() * arr.length)];
    if (!map.has(randomNum)) {
      map.set(randomNum, randomNum);
      result.push(randomNum);
    }
  }
  return result;
}
```