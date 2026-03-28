# overflow auto 超出后底部自动被加上 padding

## 原因

超出后出现滚动条，这个 padding 实际上是滚动条的高度

## 解决方案

```css
div::-webkit-scrollbar {
  display: none;
  width: 0;
  background: transparent;
}
```
