# 2016年百度IFE春季班
## Demo 
task39 任务要求地址：<https://github.com/pkjy/ife-task/tree/gh-pages/2016_spring/part3/task39><br>
task39 在线预览地址：<http://pkjy.github.io/ife-task/2016_spring/part3/task39/>

## IFE春季班第三阶段任务

　　 第三阶段的主要目标是帮助大家 综合练习HTML，CSS，JavaScript。第三阶段任务从 `4月11日` 开始，持续到 `5月4日`。当然，您也可以在这个时间以后继续自行实践练习。第三阶段的任务主要是为第四阶段的大任务进行准备，会有比较大的连贯性。

　　第三阶段任务一共有 3 个系列 13 个题目，如下：
* 系列任务一：RIA 问卷管理平台准备工作

> **任务三十七**：浮出层组件实现

> **任务三十八**：支持表头排序功能的表格组件实现

> **任务三十九**：首行冻结表格组件实现

> **任务四十**：简单日历组件实现

> **任务四十一**：日历组件升级

> **任务四十一**：支持日期段选择的日历组件实现
　
* 系列任务二：高级相册准备工作

> **任务四十三**：拼图布局

> **任务四十四**：瀑布布局

> **任务四十五**：木桶布局

* 系列任务三：王牌特工游戏准备工作

> **任务四十六**：游戏界面元素的简单实现

> **任务四十七**：与游戏中元素的互动实现

> **任务四十八**：游戏地图的实现

> **任务四十九**：更炫酷的游戏实现


　　同前两个阶段一样，并非所有人都要去完成所有任务，每个团队可以在这3个系列中任选一个进行实践。

## notes

#### task37 浮出层组件实现
Window.innerWidth 获得当前浏览器显示区域的宽

#### task39 UI组件之冻结行列表格
scrollTop需要兼容。

```
window.onscroll = function(e) {
        /**
         * [兼容浏览器]
         */
        var e = e || window.event;
        var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;

        //coding 
    }
```
一个比较快速的方法。`getBoundingClientRect()`方法。
它返回一个对象，其中包含了left、right、top、bottom四个属性，分别对应了该元素的左上角和右下角相对于浏览器窗口（viewport）左上角的距离。
所以，网页元素的相对位置就是
```
var X= this.getBoundingClientRect().left;

var Y =this.getBoundingClientRect().top;
```
再加上滚动距离，就可以得到绝对位置.
```
var X= fixed_table.getBoundingClientRect().left+document.documentElement.scrollLeft;

var Y =fixed_table.getBoundingClientRect().top+document.documentElement.scrollTop;


```