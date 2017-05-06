使用transform 3D + Node WS 来模拟一个 房子、人及对话的模型
------------

### transform 3D 技术解析

1、用transform做一个立体的盒子 [查看](room.html)

1）作用于父元素

* transform-style属性 [@see MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-style)

> transform-style属性指定了，该元素的子元素是（看起来）位于三维空间内，还是在该元素所在的平面内被扁平化。该属性不会被（自动）继承。

> 只有元素本身也设置了tranform，同时设置transform-style，那么当他的子元素设置transform时，其子元素则以3D效果渲染的，如果其子元素不需要3d转换，则不需要设置，或者可以设置为flat。查看栗子[with](http://codepen.io/FredWe/pen/oXoRZa) and [without](http://codepen.io/FredWe/pen/doZEvQ)

* perspective / 视距 [@see MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective)

> 目前浏览器都不支持 perspective 属性。Chrome 和 Safari 支持替代的 -webkit-perspective 属性。

> 当为元素定义 perspective 属性时，其子元素会获得透视效果，而不是元素本身。perspective 属性只影响 3D 转换元素。

* perspective-origin / 视角 [@see MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective-origin)

> 结论 最外层的transform元素的父元素，或者body设置视距，如果已经设置了transform的元素a的子元素想获得3D转换，需要对a设置transform-style属性


2）作用于子元素

* transform

> 注意对同一个元素的多个transform，两组相同的操作不同顺序会导致不同的结果

* transform-origin


2、transform之后的位置计算问题

> 比如我们点击bottom中的位置，想要获取点击位置的坐标，但e.pageX获取的是screen的top\left，而bottom经过rotate之后的位置已经不太好计算。因为不仅仅牵涉到等腰梯形与矩形的映射，它同时受到了视角和视距的影响。

3、transform之后的事件响应问题

> 难点：点击事件获取受到视角（perspective-origin）跟视距（perspective）的影响，并且在不同屏幕大小上表现不一致。

> 难点：.bottom 本身就是rotate的，其中的点击事件已经受到了影响，但依然可用，在其中的span中的person再次rotate，导致完全失去了hover、click等事件的响应

4、IOS transform之后的z-index层级问题

> [@see 张鑫旭](http://www.zhangxinxu.com/wordpress/2016/08/safari-3d-transform-z-index/)

### 人 / avatar

1、行走动画

> 通过CSS制作一系列特定的动画，分别给手部、腿部、头部，以及整体，当person增加walking类时触发动画集合，取消类时自动停止行走动画。

> 只是在原位置动画，并不在父元素中产生移动。

2、位置移动 思考及问题

> 方向：获取方向必须能够获知目的地

> 目的地：通过鼠标的点击跟自身的位置计算出角度，也就是动画的方向。

> 1）每点击一下走一小段距离（以自身圆点为中心，终点方向的半径范围的距离），

> 优点：能够还原网游的走路习惯，即点击只是说明方向，并非目的地，每次点击只行走一小段距离。

> 缺点：实现较难，此方法需要准确获知点击位置在bottom中的位置，但e.pageX获取的是screen的top\left，而bottom经过rotate之后的位置已经不太好计算。因为不仅仅牵涉到等腰梯形与矩形的映射，它同时受到了视角和视距的影响。即使我们能够只判断大概方位，但在实际中，依然需要判断点击位置与现在位置是否小于行走的固定距离或者是否已经到边界，以确定停止，即最终依然需要获得点击的精确位置。(通过下方方法能够获取到大概点击位置)

> 2）往地面位置添加地板，对地板添加点击事件，点击地板行走到该地板坐标位置。

> 优点：通过往bottom中放置地板（span元素），能够准确获知点击的位置span.offsetLeft span.offsetTop，从而实现精准位置移动动画。

> 缺点：添加地板，我们会假设地面上所有的元素都占用以地板大小为单位的位置，比如一个物体占用了该位置，其他物品就无法去到这个位置，按照直接运动过去的动画方法，如果中间有间隔，也会直接穿过去。除非后期做路线计算。

> 3）通过单独的方向控制按钮来控制上下左右移动，变量存储每个人的位置。

3、表情

> 借用现在青少年群体中使用较多的字符表情，或者经典的QQ表情为原型，使符号表情表现在虚拟人物的表情上

4、avatar 的塑造

> 每个人都是固定的人的类的衍生体，通过配置文件来渲染，可调用表情函数传递表情ID执行不同的表情，可以调用说话函数


### 聊天

1、采用箭头气泡的说话框

2、推送的人

> 说话是说给这个位置听的，比如这个房间，或者这个位置附近多少距离，并不是说给某个人听的，人如果在这个房间，或者在这个位置附近，则予以推送显示。打破现有的对话方式。

可供参考

* [codepen](http://codepen.io/johan-tirholm/pen/qbzXjV)
* [codepen](http://codepen.io/karimmaassen/pen/GJtDf)