# D2C设计方案调研：FigmaToCode 设计稿转代码 布局方案剖析！

大家好，很久没发文章了，这次我又来卷D2C这一块了\~\~ 由于最近组内决定去做D2C, 所以或多或少得研究一下业内的一些实现方案，然而真实情况是，我们也是摸着石头过河，前期要花费很多时间去调研，研究实现方案。其中就包括 [FigmaToCode](https://github.com/bernaferrari/FigmaToCode) 这个开源项目。

本文不会贴很多代码，不利于理解。FigmaToCode 的实现其实并不复杂，但是用它生成的结果来看，还是偏差比较多的，这也是我们可以进一步优化的地方。

## FigmaToCode演示

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba98b3b678a64e5392d63d468c7c6f9d~tplv-k3u1fbpfcp-watermark.image?)

FigmaToCode支持将设计稿转成 `HTML` 和 `TailWind`等

## Figma的自动布局

其实Figma自带 flex布局的一些特性， 甚至是grid布局，如果你开发过Figma设计稿，可以看到这里：

| flex布局                                                                                                                            | grid布局                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98e7af21310748318a337e508f366f68~tplv-k3u1fbpfcp-watermark.image?) | ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5392acec2064077befe78c60e13a381~tplv-k3u1fbpfcp-watermark.image?) |

可以看到左边flex布局，可以实现各种对齐方式，这就意味着，如果设计人员可以规范设计，能使用自动布局就尽量用，对于我们来说就可以减少很多无用的判断和处理。

目前`FigmaToCode`只处理flex布局，如果设计人员没有使用`Auto Layout`这个模式，会自己计算内部节点的位置，来断定使用了什么布局，并且强制将该节点是`Auto Layout`。

## Figma中的节点类型

在Figma中存在很多种类型的节点，就像下面这样，当然这里并没有展示出全部的节点类型

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b6a8ff79e0b4d0285ef05b2b2890757~tplv-k3u1fbpfcp-watermark.image?)

列举下常用的节点类型：

*   **RECTANGLE 矩形**
*   **ELLIPSE 椭圆**
*   **LINE 线形**
*   **FRAME 框架：** 相当于一个容器，子节点的x, y 位置都是相对于 Frame 来定位, 有布局功能
*   **INSTANCE组件实例：** Figma中也存在组件的概念，相当于new Component()
*   **COMPONENT 组件**
*   **GROUP 组**： 本身没有自己的大小和位置, 你可以理解为它内部的子节点是捆绑在这个组的。也可能子节点在Group的外面。
*   **TEXT 文本**
*   **VECTOR 矢量图**：可以用于创建各种形状，例如线条、多边形、圆形、椭圆形等等。可以理解为前端里的 SVG, 放大不会失真。
*   **SECTION 容器**：和Frame类似，但是没有布局功能（Auto Layout）

## Figma节点属性的作用

Figma 节点的属性可以分为以下几类：

1.  基本属性：节点的 ID、名称、类型、可见性等等。
2.  几何属性：节点的位置、大小、旋转、缩放等等。
3.  样式属性：节点的填充、边框、阴影、透明度等等。
4.  文本属性：文本节点的字体、字号、颜色、对齐方式等等。
5.  布局属性：容器节点的布局方式、间距、对齐方式等等。
6.  组件属性：组件节点的主组件、实例、覆盖等等。

但是当你打印出figma node属性，可以发现属性太多了。。

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cae0709d435b47b7af3a85137457c79e~tplv-k3u1fbpfcp-watermark.image?" alt="" width="20%" />

我们要处理每个属性吗？其实大可不必，真正需要的属性其实只有一部分，我们要做的就是要清洗数据，并构建新的节点树。

以下是 Figma 节点的常见属性及其作用：

1.  `id`：节点的唯一标识符。
2.  `name`：节点的名称。
3.  `type`：节点的类型，例如 `RECTANGLE`、`TEXT`、`GROUP` 等等。
4.  `visible`：节点的可见性，控制节点是否在设计中可见。
5.  `locked`：节点的锁定状态，控制节点是否可以编辑。
6.  `opacity`：节点的不透明度，控制节点的透明度。
7.  `blendMode`：节点的混合模式，控制节点与其下方节点的混合方式。
8.  `constraints`：节点的约束，控制节点在其父容器中的位置和大小。
9.  `layoutAlign`：容器节点的对齐方式，控制容器中的子节点如何对齐。
10. `layoutMode`：容器节点的布局方式，控制容器中的子节点如何排列。
11. `padding`：容器节点的内边距，控制容器中的子节点与容器边缘的距离。
12. `fills`：节点的填充，控制节点的填充颜色和样式。
13. `strokes`：节点的边框，控制节点的边框颜色和样式。
14. `strokeWeight`：节点的边框宽度，控制节点的边框粗细。
15. `cornerRadius`：节点的圆角半径，控制节点的圆角大小。
16. `characters`：文本节点的文本内容。
17. `fontName`：文本节点的字体名称。
18. `fontSize`：文本节点的字体大小。
19. `textAlignHorizontal`：文本节点的水平对齐方式。
20. `textAlignVertical`：文本节点的垂直对齐方式。
21. `textCase`：文本节点的大小写转换方式。
22. `textDecoration`：文本节点的文本修饰方式。
23. `textStyleId`：文本节点的文本样式 ID。
24. `componentId`：组件节点的主组件 ID。
25. `instanceId`：组件实例节点的实例 ID。
26. `overrides`：组件实例节点的覆盖，控制组件实例与主组件的差异。
27. ...


当然这并不是全部，如果要处理的情况太多，我们就需要借助其他属性进一步分析。

## 布局树生成
上面说了那么多，`FigmaToCode`是如何处理没有`AutoLayout`的节点呢？
我们先从一个例子开始：


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0231ef7a54e34680a46e3ebe3c3d9cf9~tplv-k3u1fbpfcp-watermark.image?)


在Figma中，可以认为整个是一个树的结构，FigmaToCode首先会清洗其中的数据，组成新的Node节点。在上面的例子中，我们可以得到如下的树结构：

![未命名文件 (8).png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11fe0181efca46f3b8bacc36f84d1a0e~tplv-k3u1fbpfcp-watermark.image?)

首先声明一点：**在没有使用自动布局的情况下，才会计算布局**

下面我们来看看`FigmaToCode`是如何实现自动布局的


1.在遇到`Frame`节点时：

+ 创建一个 Frame 节点，并拷贝 `Frame`上的属性，包含 name、id、布局位置、大小等信息

![未命名文件 (14).png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/acd8c2e33801486cb03ba2cc559c7f1e~tplv-k3u1fbpfcp-watermark.image?)


**我们可以把创建的新节点叫做 `alternate`节点** 

如果大家有看过`React源码`，相信大家对这个名字不会陌生。


2. 继续递归子节点`Frame` 和 `Rectangle`、`Text`等，在这个过程中，依然会创建新节点，并拷贝其中必要的属性。


![未命名文件 (13).png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e30997742fef4fd4aaaac44cc340487a~tplv-k3u1fbpfcp-watermark.image?)


3. 回溯时开始自动布局


![未命名文件 (12).png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9281bc593deb4ebca57f90260398d551~tplv-k3u1fbpfcp-watermark.image?)

我们知道递归是深度遍历，在递归完`蓝色框`部分时，会回溯到`Frame`这个节点，此时对于`Frame`来说，我们需要计算出，`Frame`内部节点的具体排布。

然后为`Frame`的`Alternate`节点，也就是`rectangle`节点，设置`layoutMode` 布局方式，以及其他布局信息。


## 布局分析
![未命名文件 (11).png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01ed7f7e06ef4635b01f9c8a2173e2aa~tplv-k3u1fbpfcp-watermark.image?)

在这一步中，我们将分析`Text`节点和`Rectangle`的位置，来确定布局方式。


### 1. 碰撞检测


不管什么需求，必定存在元素重叠的情况，这种情况如何处理呢？

以下图为例，一个矩形中包含 `一个文本节点` 和 `一个椭圆节点`


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1b4d0b3a0d546aa9066158ecc1dde2f~tplv-k3u1fbpfcp-watermark.image?)

首先建立每个元素和重叠节点 之间映射管理，例如
```
{
  n3: [n1, n2] 
}
```
如果 n3 包含 (n1 和 n2) , 然后再做进一步转换

+ `n3`是`rectangle`节点，需要将其强制转为`Frame`节点
+ 修改n1 和 n2的 x, y， 因为之前是相对于上一层的`frame`， 要修改为相对于刚才转换的`frame`中。同时parent同样指向刚才转换的`frame`


### 2. 计算布局方向


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c64955d5dfa4f0e95e9e6f723c79b82~tplv-k3u1fbpfcp-watermark.image?)

怎么知道子元素是 `水平` 还是 `垂直` 方向的排布呢？
+ 从小到大排序 `y1 .. y2` ，计算 `y1 .. y2` 的间距, 同理，如果有 `y1 .. y4`, 就从小到大排序，并计算`y1..y2` `y2..y3`  `y3..y4`的间隔，最后算出间隔平均值

+ 从小到大排序 `x1 .. x2` ，计算 `x1 .. x2` 的间距, 同理，如果有 `x1 .. x4`, 就从小到大排序，并计算`x1..x2` `x2..x3`  `x3..x4`的间隔，最后算出间隔平均值
+ 如果子元素在垂直方向上没有对齐，则检查它们是否在水平方向上对齐。如果子元素在垂直和水平方向上都没有对齐，则返回 "NONE"。最后返回对齐方向 和 平均间隔。代码逻辑如下：
  ```js
  if (!intervalY.every((d) => d >= threshold)) {
    if (!intervalX.every((d) => d >= threshold)) {
      if (avgY <= threshold) {
        if (avgX <= threshold) {
          return ["NONE", 0];
        }
        return ["HORIZONTAL", avgX];
      }
      return ["VERTICAL", avgY];
    }
    return ["HORIZONTAL", avgX];
  }
  ```
+ 如果是水平对齐，则使用子节点的 x 值重新排序
+ 如果是垂直对齐，则使用子节点的 y 值重新排序


### 3. 计算容器padding

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0392d627827c41a3a4a8ed9e102cf0dc~tplv-k3u1fbpfcp-watermark.image?)

这一步开始计算容器的padding值
+ 容器width - 最右侧元素x === paddingRight
+ 容器width - 最左侧元素x === paddingLeft
+ 容器height - 最下面元素 y === paddingBottom
+ 容器height - 最上面元素 y === paddingTop


### 4. 单独计算子节点的 align-items 布局对齐
学过flex布局的同学，应该知道有`align-items: stretch` 这个值，如果元素的宽度或高度与容器一致，我们需要单独设置。


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac3381918c4f46ce8f006900212866aa~tplv-k3u1fbpfcp-watermark.image?)

判断也很简单，元素的宽度或高度与容器一致，单独设置子元素的`layoutAlign`为`STRETCH`

### 5. 确定子节点 主轴 或 交叉轴

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b7ea640fb52d4a74b7192c56a3857edd~tplv-k3u1fbpfcp-watermark.image?)

前面我们已经计算出了元素整体的方向，`水平` 或 `垂直`。

但是并没有精确到每个元素，我们必须明确标注元素的`direction`、`justify-content`, `align-items`。

确定它们在轴线上是 `start`, `end`, `center`三个哪种情况


在下面的函数中，接收一个子节点 和 容器父节点。我们只需要根据节点的`x`, `y`, 就可以知道在`主轴` 和 `交叉轴`中，处于什么位置。
```ts
const primaryAxisDirection = (
  node: AltSceneNode,
  parentNode: AltFrameNode
): { primary: "MIN" | "CENTER" | "MAX"; counter: "MIN" | "CENTER" | "MAX" } => {
  const nodeCenteredPosX = node.x + node.width / 2;
  const parentCenteredPosX = parentNode.width / 2;

  const centerXPosition = nodeCenteredPosX - parentCenteredPosX;

  const nodeCenteredPosY = node.y + node.height / 2;
  const parentCenteredPosY = parentNode.height / 2;

  const centerYPosition = nodeCenteredPosY - parentCenteredPosY;

  if (parentNode.layoutMode === "VERTICAL") {
    return {
      primary: getPaddingDirection(centerYPosition),
      counter: getPaddingDirection(centerXPosition),
    };
  } else {
    return {
      primary: getPaddingDirection(centerXPosition),
      counter: getPaddingDirection(centerYPosition),
    };
  }
};
```

但是这样还不足以确定`justify-content`和`align-items`的值什么，我们还要知道每个子节点，在主轴/ 交叉轴 出现最多次的对齐方式。例如，有四个节点，在主轴上，有一个是`center`, 而另外三个是`start`, 统计处出现次数最多的，基本可以认定，在主轴方向上 `justify-content: flex-start`


## 结语
本文分析的比较简单，因为太难表达了。。涉及的细节很多，有不少没有列举出来，并且主要针对自动布局做了分析。

整体来看，实现并不复杂，搞懂了这些还不够，后续再结合业内其他方案，做进一步调研。

