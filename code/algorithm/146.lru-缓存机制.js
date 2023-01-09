/*
 * @lc app=leetcode.cn id=146 lang=javascript
 *
 * [146] LRU 缓存机制
 */

// @lc code=start
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.map = new Map();
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (this.map.has(key)) {
    // 先获取值
    let temp = this.map.get(key);

    // 删除key
    this.map.delete(key);

    // 添加key
    this.map.set(key, temp);
    return temp;
  } else {
    return -1;
  }
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  // 不管有没有 先删掉这个key
  if (this.map.has(key)) {
    this.map.delete(key);
  }

  // 设置key-value
  this.map.set(key, value);

  // 超过了最大容量
  if (this.map.size > this.capacity) {
    // 删除最早的key
    this.map.delete(this.map.keys().next().value);
  }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end
