var waterfall = {
    container: document.getElementById("wf_container"),
    src: "http://cued.xunlei.com/demos/publ/img/", //图片来自迅雷UED，图片链接的结尾为：P_001.jpg
    imgNumber: 0, //每张图的编号
    column: 6, //瀑布栏数，基于我取的照片，6栏最美好。
    zoomWidth: 350, //放大后的图片宽度
    setData: function() {
        var img_arr = this.container.getElementsByTagName("img"),
            self = this;
        for (var i = 0; i < img_arr.length; i++) {
            img_arr[i].setAttribute("onclick", "waterfall.zoom(this)");
            img_arr[i].setAttribute("title", "点击放大");
            img_arr[i].setAttribute("class", "wf-imgs");
        }
    },
    getIndex: function() { //获取图片编号
        var index = this.imgNumber;
        if (index < 10) {
            index = "00" + index;
        } else if (index < 100) {
            index = "0" + index;
        }
        return index;
    },
    append: function(column) { //添加函数
        if (this.imgNumber < 160) {
            var index = this.getIndex(),
                div = document.createElement("div"),
                img = document.createElement("img"),
                imgUrl = this.src + "P_" + index + ".jpg";

            img.setAttribute("src", imgUrl);
            div.appendChild(img);
            column.appendChild(div);
            this.imgNumber++;
        } else {
            return;
        }
    },
    create: function() {
        var column_html = "";
        for (var i = 0; i < this.column; i++) {
            var index = this.getIndex();
            column_html += "<div id='wfcolumn" + i + "' ><div><img src='" + this.src + "P_" + index + ".jpg' style></div></div>";
            this.imgNumber++;
        }
        this.container.innerHTML = column_html;
        this.appendOnce();
        this.appendOnce(); //先加两次,把滚动栏加载出来
    },
    appendOnce: function() { //判断每栏最后一个元素的offsetTop，给最短的增加图片
        var temp_arr = [];

        for (var i = 0; i < this.column; i++) { //把每栏最后一个子节点的offsetTop拿出来
            var name = "wfcolumn" + i;
            temp_arr.push(document.getElementById(name).lastChild.offsetTop);
        }

        var min = temp_arr[0];
        for (var x = 1; x < temp_arr.length; x++) {
            if (min > temp_arr[x]) {
                min = temp_arr[x]
            };
        }

        for (var i = 0; i < this.column; i++) {
            var name = "wfcolumn" + i;
            if (document.getElementById(name).lastChild.offsetTop == min) {
                this.append(document.getElementById(name));
            }
        }

    },
    scroll: function() {
        var that = this;
        window.onscroll = function() {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (document.body.clientHeight - window.screen.availHeight - scrollTop <= 100) {
                that.appendOnce();
                that.setData();
            }
        }
    },
    zoom: function(e) {
        var mask = document.getElementById("wf_mask");
        mask.innerHTML = "";
        mask.style.zIndex = "0";
        mask.style.display = "flex";

        var maskdiv = document.createElement("div");
        maskdiv.setAttribute("class", "wf-mask-background");

        var img = document.createElement("img");
        img.setAttribute("src", e.getAttribute("src"));
        img.setAttribute("class", "wf-mask-zoomin");
        img.setAttribute("title", "图片编号：" + e.getAttribute("src").slice(-7, -4));
        img.style.width = this.zoomWidth + "px";

        mask.appendChild(maskdiv);
        mask.appendChild(img);

        maskdiv.addEventListener("click", function() {
            mask.style.display = "none";
        }, false)
    },
    init: function() {
        this.scroll();
        this.create();
        this.setData();
    }
};

window.onload = function() {
    waterfall.init();
}