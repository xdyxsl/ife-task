# Notes during the task
## Demo 
task03 在线预览地址：<http://pkjy.github.io/ife-task/2016_spring/part1/task03.html>
task04 在线预览地址：<http://pkjy.github.io/ife-task/2016_spring/part1/task04.html>
#### task03 
整个任务我感觉有两种方式可以完成。利用float的浮动来脱离文本和利用position的relative和absolute定位来脱离文本流。

利用浮动的话感觉需要注意清除浮动：清除浮动的时候把包裹层的**before**和**after**伪类添加上`content:""`和`display:table`，再给**after**添加一个`clear:both`的样式就搞定了。

利用定位的话：貌似relative和absolute定位的话，父容器不能被被子容器撑开，可以用JS的方法。但是我还是用别的方法吧。。。我的决定方法是把重要的中间那部分，不用任何浮动或者定位，直接当作文本流进行控制。然后改动其他的margin，伪装成margin-top都一样高，然后把body的背景颜色调一下，就装的天衣无缝了。。。

注意任务要求的宽度等，需要先计算一番再定padding。

#### task04
额。。。感觉这个没什么特别难得地方。。但是还是感觉自己的垂直居中上有点不够完美，有点抖机灵了。。但整个下来思路还算比较清晰，稍微改了一下就完成了。。