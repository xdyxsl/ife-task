# Notes during the task
## Demo 
task01 在线预览地址：<http://pkjy.github.io/ife-task/2016_spring/part1/task01.html>

task02 在线预览地址：<http://pkjy.github.io/ife-task/2016_spring/part1/task02.html>

task03 在线预览地址：<http://pkjy.github.io/ife-task/2016_spring/part1/task03.html>

task04 在线预览地址：<http://pkjy.github.io/ife-task/2016_spring/part1/task04.html>

task05 在线预览地址：<http://pkjy.github.io/ife-task/2016_spring/part1/task05.html>

task07 在线预览地址：<http://pkjy.github.io/ife-task/2016_spring/part1/task07.html>
#### task02
a伪类的顺序要注意一下，因为浏览器解析是从上往下解析样式的。a伪类的顺序应该是**lvha**。
#### task03 
整个任务我感觉有两种方式可以完成。利用float的浮动来脱离文本和利用position的relative和absolute定位来脱离文本流。

利用浮动的话感觉需要注意清除浮动：清除浮动的时候把包裹层的**before**和**after**伪类添加上`content:""`和`display:table`，再给**after**添加一个`clear:both`的样式就搞定了。

利用定位的话：貌似relative和absolute定位的话，父容器不能被被子容器撑开，可以用JS的方法。但是我还是用别的方法吧。。。我的决定方法是把重要的中间那部分，不用任何浮动或者定位，直接当作文本流进行控制。然后改动其他的margin，伪装成margin-top都一样高，然后把body的背景颜色调一下，就装的天衣无缝了。。。

注意任务要求的宽度等，需要先计算一番再定padding。

#### task04
额。。。感觉这个没什么特别难得地方。。但是还是感觉自己的垂直居中上有点不够完美，有点抖机灵了。。但整个下来思路还算比较清晰，稍微改了一下就完成了。。

#### task05 
额，又是浮动。。醉了。。这次采取的方式是父级元素相对定位，固定宽度的地方设置绝对定位和宽度，自适应宽度的地方不设宽度设置一个margin就好了。。简单无脑省事，省得新建个层去包裹搞什么有的没得，太麻烦。。可以参考这个网站<http://jo2.org/css-auto-adapt-width/>说的，本来想试试那个`display:table`和`display:table-cell`的，好用是好用。但是不熟，发现有的DIV设置margin什么的都无效了，所以没用了，日后再研究下。

#### task07
给的背景图大小宽度有限，通过`background-size:100% auto;`来让大小填充满整个屏幕。
子元素浮动之后，父元素没有高了。。解决办法有很多种，伪类清浮动搞了好久没搞起。。我就选择给父元素设置`overflow:hidden`属性。参考网页<http://blog.it985.com/13653.html>
哎。。。要做到完全响应式比较麻烦。。暂时用了点小trick,去完成其他的再说。。
IE8暂时对背景图片的SIZE属性支持的不好，还没去HACK的。
那个复选框的样式，有点麻烦。单纯用背景去搞的话原来的黑色的小箭头还在，貌似可以用别的方法遮住自带的样式，先放着不搞。。