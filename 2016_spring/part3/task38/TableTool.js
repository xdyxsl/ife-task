function TableTool(param) {
    this.data = param;
    this.createTable();
    this.bindSort();
    this.isFrozen();
};

TableTool.prototype = {
    data: {
        /**
         **设置参数，在INDEX页用new方法新建一个实例就OK了，参数如下
         **/
        // table_name:"default", 表格名称
        // table_head: ["Name", "course1", "course2", "course3"], 表格首栏
        // isSort: [0, 1, 1, 1], 1为有排序功能，0为没有
        // tbody_obj: { 表格详细数据
        //     1:["person1", 20, 90, 40],
        //     2:["person2", 90, 60, 90],
        //     3: ["person3", 60, 100, 70],
        // },
        // tdWH: [200, 50], 表格宽和高
        // head_color: "#eee",首栏背景颜色
        // table_color: "#F8C0FF",表格背景色
        // isFrozen: 1 //1为冻结，0为不冻结
    },
    createTable: function() {
        var table = document.createElement("table");
        table.setAttribute("id", this.data.table_name);

        table.style.textAlign = "center";
        table.style.backgroundColor = this.data.table_color;
        table.style.borderCollapse = "collapse";

        var thead = document.createElement("thead");
        thead.style.backgroundColor = this.data.head_color; //标题行背景色

        var table_html = "",
            tempHTML = "";
        for (var i = 0; i < this.data.table_head.length; i++) {
            //借鉴http://sakitama.github.io所采取的方式，用符号代替图片的箭头
            if (this.data.isSort[i] == "1") {
                tempHTML = "</p><span data-index='1' class='asc'>↑</span>&nbsp<span data-index='1' class='des'>↓</span</td>"; //标记递增为asc；递减des
            } else {
                tempHTML = "</p><span data-index='0'></span>&nbsp<span data-index='0'></span</td>";
            }
            table_html += "<td name='" + this.data.table_head[i] + "'><p>" + this.data.table_head[i] + tempHTML;
        }

        thead.innerHTML = table_html;
        table.appendChild(thead);

        var tbody = document.createElement("tbody");
        var tbody_html = "";

        for (var i in this.data.tbody_obj) {
            for (var j = 0; j < this.data.table_head.length; j++) {
                tbody_html += "<td>" + this.data.tbody_obj[i][j] + "</td>";
            }
            tbody_html = tbody_html + "</tr>";
        }

        tbody.innerHTML = tbody_html;
        table.appendChild(tbody);

        document.body.appendChild(table);

        //操作单元格的宽高
        var td = document.getElementsByTagName("td");
        var td_width = this.data.tdWH[0] + "px";
        var td_height = this.data.tdWH[1] + "px";
        for (var k = 0; k < td.length; k++) {
            td[k].style.width = td_width;
            td[k].style.height = td_height;
        }
        
        this.bindSort();
    },
    bindSort:function(){
        var span_newarr = new Array();
        var span_arr = document.getElementsByTagName("span");
        var cur_t = document.getElementById(this.data.table_name);
        var cur_t_span_arr = cur_t.getElementsByTagName("span");
        for (var i = 0; i < span_arr.length; i++) {
            span_newarr.push(span_arr[i])
        }
        // console.log(span_newarr);
        var that = this;
        span_newarr.forEach(function(item){
            item.style.cursor = "pointer";
            item.addEventListener("click", function() {
                if (this.getAttribute("class") == "asc") {
                    for (x in that.data.table_head) {
                        if (this.parentNode.getAttribute("name").toUpperCase() == that.data.table_head[x].toUpperCase()) {
                            temp1 = that.sortUp(x);
                            // console.log("temp1",temp1)
                        }
                    }
                } else {
                    for (x in that.data.table_head) {
                        if (this.parentNode.getAttribute("name").toUpperCase() == that.data.table_head[x].toUpperCase()) {
                            that.sortDown(x);
                        }
                    }
                }
                that.createTable();
                that.resetTable();
                that.isFrozen();
            }, false)
        })
        // for (var i = 0; i < span_arr.length; i++) {
        //     var that = this; //底下事件监听的时候this无法定位到数组内，所以拷贝一份
        //     span_arr[i].style.cursor = "pointer";
        //     span_arr[i].addEventListener("click", function() {
        //         if (this.getAttribute("class") == "asc") {
        //             for (x in that.data.table_head) {
        //                 if (this.parentNode.getAttribute("name").toUpperCase() == that.data.table_head[x].toUpperCase()) {
        //                     that.sortUp(x);
        //                 }
        //             }
        //         } else {
        //             for (x in that.data.table_head) {
        //                 if (this.parentNode.getAttribute("name").toUpperCase() == that.data.table_head[x].toUpperCase()) {
        //                     that.sortDown(x);
        //                 }
        //             }
        //         }

        //         that.createTable();
        //         that.resetTable();
                
        //     }, false)
        // }
    },
    sortUp: function(index) { //引入一个newArr和newObj先来处理排序，index指代的是要排序科目在数组中的位置
        var sortData = this.data.tbody_obj,
            newArr = [],
            newObj = {};
        for (key in sortData) {
            newArr.push(sortData[key]);
        }

        newArr.sort(function(a, b) {
            return a[index] - b[index];
        });

        for (var i = 0; i < newArr.length; i++) {
            newObj[i + 1] = newArr[i];
        }
        this.data.tbody_obj = newObj;
        // return newObj;
    },
    sortDown: function(index) { //引入一个newArr和newObj先来处理排序，index指代的是要排序科目在数组中的位置
        var sortData = this.data.tbody_obj,
            newArr = [],
            newObj = {};
        for (key in sortData) {
            newArr.push(sortData[key]);
        }

        newArr.sort(function(a, b) {
            return b[index] - a[index];
        });

        for (var i = 0; i < newArr.length; i++) {
            newObj[i + 1] = newArr[i];
        }
        this.data.tbody_obj = newObj;
        // return newObj;
    },
    resetTable: function() { //删除掉旧的表格
        var old = document.getElementById(this.data.table_name);
        document.body.removeChild(old);
    },
    isFrozen: function() {
        switch (this.data.isFrozen) {
            case 0:
                break;
            case 1:
                var tableChoose = document.getElementById(this.data.table_name);
                var firstTr = tableChoose.childNodes[0];
                var tdh = this.data.tdWH[1];
                var tdw = this.data.tdWH[0];
                var that = this;
                window.addEventListener("scroll", function() {
                    var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
                    if ((scrolltop < tableChoose.offsetTop + tableChoose.clientHeight) && (scrolltop > tableChoose.offsetTop)) {
                        firstTr.style.position = "fixed";
                        firstTr.style.top = 0;
                    } else {
                        firstTr.style.position = "inherit";
                    }
                }, false)
                break;
            default:
                alert("isFrozen参数错误，对应首航冻结默认无冻结。");
                break;
        }
    }
}
