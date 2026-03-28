# figmaToCode 源码分析

### blend 是什么

在 Figma 中，blend 是一个用于设置图层混合模式的属性。图层混合模式决定了图层与下方图层的颜色如何混合。blend 属性可以设置为以下值之一：

"NORMAL"：正常模式，即不进行混合。
"DARKEN"：变暗模式，将图层颜色与下方图层颜色进行比较，选取较暗的颜色作为混合结果。
"MULTIPLY"：正片叠底模式，将图层颜色与下方图层颜色进行相乘，得到混合结果。
"COLOR_BURN"：颜色加深模式，将下方图层颜色除以图层颜色的补色，得到混合结果。
"LIGHTEN"：变亮模式，将图层颜色与下方图层颜色进行比较，选取较亮的颜色作为混合结果。
"SCREEN"：滤色模式，将图层颜色与下方图层颜色进行相反操作，得到混合结果。
"COLOR_DODGE"：颜色减淡模式，将下方图层颜色除以图层颜色，得到混合结果。
"OVERLAY"：叠加模式，将图层颜色与下方图层颜色进行比较，选取较亮的颜色作为混合结果。
"SOFT_LIGHT"：柔光模式，将图层颜色与下方图层颜色进行比较，根据图层颜色的亮度调整下方图层颜色的亮度，得到混合结果。
"HARD_LIGHT"：强光模式，将图层颜色与下方图层颜色进行比较，根据下方图层颜色的亮度调整图层颜色的亮度，得到混合结果。
"DIFFERENCE"：差值模式，将图层颜色与下方图层颜色进行相减，得到混合结果。
"EXCLUSION"：排除模式，将图层颜色与下方图层颜色进行相减并取绝对值，得到混合结果。
"HUE"：色相模式，将图层颜色的色相与下方图层颜色的亮度和饱和度进行混合，得到混合结果。
"SATURATION"：饱和度模式，将图层颜色的饱和度与下方图层颜色的亮度和色相进行混合，得到混合结果。
"COLOR"：颜色模式，将图层颜色的色相和饱和度与下方图层颜色的亮度进行混合，得到混合结果。
"LUMINOSITY"：亮度模式，将图层颜色的亮度与下方图层颜色的色相和饱和度进行混合，得到混合结果。
blend 属性可以通过 Figma 的图层属性面板或代码中进行设置。

### effects 是什么

在 Figma 中，effects 是一种图层样式，用于添加`阴影、发光、模糊等效果`。effects 可以应用于任何图层类型，包括矩形、文本、图像等。每个 effect 都有一个类型和一组属性，用于控制效果的外观和行为。

effects 可以通过 Figma 的图层属性面板或代码中进行设置。在代码中，可以使用 Figma API 中的 setEffectsAsync 方法来设置图层的 effects。例如，以下代码将一个矩形图层的阴影效果设置为黑色、偏移量为 (0, 4)、模糊半径为 4：

```js
const rect = figma.createRectangle();
rect.effects = [
  {
    type: 'DROP_SHADOW',
    color: { r: 0, g: 0, b: 0, a: 0.5 },
    offset: { x: 0, y: 4 },
    radius: 4,
    visible: true,
    blendMode: 'NORMAL'
  }
];
```

### effectStyleId 是什么

effectStyleId 是 Figma 中的一个属性，它表示一个图层的效果样式 ID。效果样式是一组效果的集合，可以应用于多个图层。如果一个图层应用了一个效果样式，那么它的 effectStyleId 属性将指向该效果样式的 ID

### fills 是什么

fills 是一个用于设置节点填充的属性。它是一个数组，每个元素表示节点的一个填充。每个填充都有一个类型和一组属性，用于控制填充的外观和行为。

fills 可以包含多个填充，每个填充可以是以下类型之一：

"SOLID"：纯色填充，使用单一颜色填充节点。
"GRADIENT_LINEAR"：线性渐变填充，使用两种或多种颜色之间的线性渐变填充节点。
"GRADIENT_RADIAL"：径向渐变填充，使用两种或多种颜色之间的径向渐变填充节点。
"GRADIENT_ANGULAR"：角度渐变填充，使用两种或多种颜色之间的角度渐变填充节点。
"GRADIENT_DIAMOND"：菱形渐变填充，使用两种或多种颜色之间的菱形渐变填充节点。
"IMAGE"：图像填充，使用图像填充节点。

### 源码流程

#### 一、拷贝整体结构，并记录和处理节点中的信息

1. 获取选中部分的 figma 节点数据
2. 开始转换节点，遍历每个 figma 节点

   1. 如果节点类型是 RECTANGLE、ELLIPSE
      1. 是 RECTANGLE 就 创建 RECTANGLE Node 节点，并记录 figma 节点中的圆角 radius
      2. 是 ELLIPSE 就创建 ELLIPSE Node 节点
      3. 记录 figma node 的 name 和 id
      4. 记录 figma node 的 parentId
      5. 记录 figma node 的 opacity、blendMode、isMask、effects、effectStyleId、visible
      6. 记录 figma node 的 几何形状，fills、strokes、strokeWeight、strokeMiterLimit、strokeAlign、strokeCap、strokeJoin、dashPattern、fillStyleId、strokeStyleId
      7. 记录 figma node 的 布局位置
         1. 判断 node 是否存在旋转角度，并获取真实的 x, y 值
         2. 记录 x,y,width,height 等
      8. 记录 figma node 的 cornerSmoothing（节点的圆角平滑度），cornerRadius（圆角的大小）
      9. 返回新节点
   2. 如果节点类型是 LINE
      1. 创建 RECTANGLE Node 节点
      2. 重复 2.1.3 ~ 2.1.8 操作
      3. 强制修改 height = 1, strokeAlign = 'CENTER', strokeWeight - 1
      4. 返回新节点
   3. 如果节点类型是 FRAME、INSTANCE、COMPONENT

      1. 将图标转为 RECTANGLE 节点
         1. 遍历所有子节点，判断是否全部都是 VECTOR 类型的节点，则执行以下操作
         2. 重复 2.1.3 ~ 2.1.7 操作
         3. 强制修改节点信息，strokes = [], strokeWeight = 0, strokeMiterLimit = 0, strokeAlign = "CENTER", strokeCap = "NONE", strokeJoin = "BEVEL", dashPattern = [], fillStyleId = "", strokeStyleId = ""。填充为 IMAGE 类型
         4. 返回 RECTANGLE Node
      2. 如果不是图标节点，则开始 Frame 下的子节点
         1. 如果没有子节点，直接返回一个新的 RECTANGLE Node， 操作同 2.1
         2. 创建 Frame Node
         3. 重复 2.1.3 ~ 2.1.8 操作
         4. 记录 figma node 的 radius 信息
      3. 递归回到 2 步骤
      4. 递归完成后，重复 2.4.6 步骤
      5. 递归完成后，开始为当前节点实现自动布局
         1. 如果当前节点 layoutMode 存在有效的值，说明 UI 已经实现了自动布局，不需要自己计算了，则后续步骤不会执行
         2. 对当前节点的子节点 children 进行排序，获取子节点的排布方向，以及子节点之间的平均间距
            1. 根据位置，判断子节点是 垂直还是水平排布 以及 子节点之间的间距
               1. 计算子节点 水平方向上的平均间距
               2. 计算子节点 垂直方向上的平均间距
            2. 如果是 水平，用 x 坐标进行排序
            3. 如果是 垂直，用 y 坐标排序
         3. 如果没有计算出来方向，并且不止一个子节点，节点标记 isRelative = true
         4. 如果没有计算出来方向，节点数量 === 0 或者 节点数量 > 1， 直接返回 node 即可
         5. 如果当前节点的类型是 group, 强制转成 frame 节点
         6. 如果没有计算出来方向，节点数量 === 1，就设置一个默认方向： HORIZONTAL
         7. 开始计算节点的 padding
            1. 如果只有一个子节点，计算出子节点在当前节点内容，left, top, right, bottom 距离
            2. 如果有多个节点，计算 padding
         8. 开始计算子节点的 align-items 布局对齐
            1. 判断子节点的宽度或高度 是不是存在跟父节点一样，则说明子节点 在水平或垂直方向上，align 是 STRETCH 布局
            2. 否则直接设置为 INHERIT
         9. 开始计算每个子节点在 主轴和交叉轴的对齐方式（justify-content, align-items）, 返回一个对象{primary: MIN/MAX/CENTER,counter: MIN/MAX/CENTER} 10.知道每个子节点的对齐方式，我们可以统计出，主轴、交叉轴上，出现频率最高的对齐方式
         10.

   4. 如果节点类型是 GROUP
      1. 如果只有一个节点，递归重复 2 步骤
      2. 重复 2.3.1 步骤
      3. 创建 Group Node
      4. 重复 2.1.3 ~ 2.1.7 操作
      5. 遍历子节点，递归重复 2 步骤
      6. 遍历子节点，并将这些矩形转换为包含这些节点的 Frame 节点
         1. 小于两个节点，无需后续步骤
         2. 执行 retrieveCollidingItems 查找在同一父级下的矩形节点之间的重叠情况，最后返回一个对象。其中键是矩形节点的 ID，值是与该节点重叠的其他矩形节点的数组。
         3. 找到 非交叉的节点
         4. 将当前节点强制转成 frame 节点
         5. 将交叉节点，全部塞到刚才强制转成的 frame 节点中，然后计算交叉的节点，相对 frame 的 x 和 y 的值
         6. 更新节点，重复 2.3.5 自动布局刚才的 frame 节点
         7. 然后布局整体节点
   5. 如果节点类型是 TEXT
      1. 略。。很简单
   6. 如果节点类型是 VECTOR
      1. 略，跟 RECTANGLE 节点相似
