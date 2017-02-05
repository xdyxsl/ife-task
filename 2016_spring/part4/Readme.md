# 2016年百度IFE春季班
## Demo 
task50 任务要求地址：<https://github.com/pkjy/ife-task/tree/gh-pages/2016_spring/part4/task50><br>
task50 在线预览地址：<http://pkjy.github.io/ife-task/2016_spring/part4/task50/build/>

task51 任务要求地址：<https://github.com/pkjy/ife-task/tree/gh-pages/2016_spring/part4/task51><br>
task51 在线预览地址：<http://pkjy.github.io/ife-task/2016_spring/part4/task51/build/>

task52 任务要求地址：<https://github.com/pkjy/ife-task/tree/gh-pages/2016_spring/part4/task52><br>
task52 在线预览地址：<http://pkjy.github.io/ife-task/2016_spring/part4/task52/build/>

## IFE春季班第四阶段任务 

　　 第四阶段的主要目标是帮助大家在第三阶段的基础上结合模块化、过程管理工具，综合运用HTML，CSS，JavaScript实现一个小型的网站或者应用。第四阶段任务从 `4月18日` 开始，持续到 ` 5月22日`。大家可以第三阶段和第四阶段一起考虑来实现。

　　第四阶段任务一共有 3 个系列 3 个题目，如下：
* **系列任务一：RIA 问卷管理平台**

* **系列任务二：高级相册**

* **系列任务三：王牌特工游戏**



    同前两个阶段一样，并非所有人都要去完成所有任务，每个团队可以在这3个系列中任选一个进行实践。

    2016春季班所有任务均发布完成，预祝大家学习顺利！希望最终能够坚持下来的同学能够超出我们所有人预期。加油！！

## notes

#### task50 RIA 问卷管理平台
原生JS写的时候，在编辑页面，主要用到的是node的知识，有些坑没注意到的。
1. 如果用getElement等方法来获取的时候，或者说用element.childNodes、previousSibling等等有关node的方法，得到的是NodeList，这里面包含了所有的节点，也就是说nodeType为3的text节点也在里面，但是我们大多情况下是只需要nodeType为1的元素节点。我们只要element的话可以改用element.children或者firstElementChild或者previousElementSibling等等。
2. node原生就有很多方法，包括了新建，删除，替换，克隆等等，完全足够在编辑页面的功能。
```javascript
//查找节点  
document.getElementById("id");//通过id查找，返回唯一的节点，如果有多个将会返回第一个，在IE6、7中有个bug，会返回name值相同的元素，所有要做一个兼容  
document.getElementsByClassName("class");//通过class查找，返回节点数组  
document.getElementsByTagName("div");  
  
//创建节点  
document.createDocumentFragment();//创建内存文档碎片  
document.createElement();//创建元素  
document.createTextNode();//创建文本节点  
  
//添加节  
var ele = document.getElementById("my_div");  
var oldEle = document.createElement("p");  
var newEle=document.createElement("div");  
ele.appendChild(oldEle);  
//移除  
ele.removeChild(oldEle);  
//替换  
ele.replaceChild(newEle,oldEle);  
;插入  
ele.insertBefore(oldEle,newEle);//在newEle之前插入 oldEle节点  
  
//复制节点  
var cEle = oldEle.cloneNode(true);//深度复制，复制节点下面所有的子节点  
cEle = oldEle.cloneNode(false);//只复制当前节点，不复制子节点  
  
//移动节点  
var cloneEle = oldEle.cloneNode(true);//被移动的节点  
document.removeChild(oldEle);//删除原节点  
document.insertBefore(cloneEle,newEle);//插入到目标节点之前 

by hua @http://blog.csdn.net/hxfdarling/article/details/40347207
```
indexeddb怎么触发onupgradeneeded？
IDBOpenDBRequest还有一个类似回调函数句柄——onupgradeneeded。
**该句柄在我们请求打开的数据库的版本号和已经存在的数据库版本号不一致的时候调用。**
indexedDB.open方法还有第二个可选参数，数据库版本号，数据库创建的时候默认版本号为1，当我们传入的版本号和数据库当前版本号不一致的时候onupgradeneeded就会被调用，当然我们不能试图打开比当前数据库版本低的version.
代码中定义了一个myDB对象，在创建indexedDB request的成功毁掉函数中，把request获取的DB对象赋值给了myDB的db属性，这样就可以使用myDB.db来访问创建的indexedDB了。

用indexedBD的时候要善用onerror来获取错误的信息，这样就知道哪里出错了。

还是indexedBD的坑，在更新数据的时候，只能用store的put()方法来更新，并且对象是顶层(第一层)的数据，没有办法直接找到要更新的那一条然后定点更新。一直想着怎么准确找到要更新的地方准确更新数据，然而并没有办法，后来想到了解决的方法。就是先找到要更新的顶层，对这一层全部进行克隆，克隆的是个对象的存在，所以就可以随意改了，改好了之后再把这个修改完的用put()方法更新。

我想如果用Local storage来储存应该更方便些吧，并且兼容性会更好些。

基于首页对不同的数据进行查看或者编辑就需要在打开另一个页面的时候传递相应参数过去，location.href或者a链接里面的href等都跨域达到这个效果。接着在接收页面可以用location.search快速找到?及后面的地址，然后取出来，解码就能用了。解码编码是JavaScript 全局对象。[JavaScript 全局对象-W3C](http://www.w3school.com.cn/jsref/jsref_obj_global.asp)