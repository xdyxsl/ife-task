function Questionaire() {
    this.init();
}
Questionaire.prototype = {
    init: function() {
        console.log("初始化init");
        var requestInfo = decodeURI(location.search.substring(9))||"标题";
        /**
         * IndexedDB储存
         */
        var request;
        request = indexedDB.open('Questionaire', 1); //打开(创建)数据库

        request.onerror = function(event) {
            alert("创建/打开数据库失败，失败MSG：" + event.target.error.message);
            return
        }
        request.onsuccess = function(event) {
            db = event.target.result;
            console.log("创建/打开数据库成功" );
            var transaction = db.transaction('myQuestionaire','readwrite');
            var store = transaction.objectStore('myQuestionaire');
            var req = store.openCursor();

            var html;
            req.onsuccess = function(event){
                document.getElementById("write_subject").value = requestInfo;//改标题
                console.log("游标遍历");
                var cursor = event.target.result;
                if(cursor){
                    if(cursor.key==requestInfo){//如果是当前传入的标题就渲染该数据
                        var allData = cursor.value.allData;
                        console.log("有啊a")
            // <div class='questions'><div class='radio'><span>Q1</span><span>单选题</span><input type='text' class='subject' placeholder='单选标题'></div><div><div class='radios'><input type='radio' name='radio0.8593255928410857'><input type='text' placeholder='单选内容'><span onclick='myQuestionaire.deleSelf()'>X</span></div></div><div><span onclick='myQuestionaire.newLine()'>+</span></div><div><span onclick='myQuestionaire.moveUp()'>上移</span><span onclick='myQuestionaire.moveDown()'>下移</span><span onclick='myQuestionaire.copy()'>复用</span><span onclick='myQuestionaire.deleQuestion()'>删除</span></div></div>
                        
                        for(var i=0;i<allData.length;i++){

                            switch(allData[i].type){
                                case "radio":
                                html +="<div class='questions'><div class='"+allData[i].type+"'><span>"+allData[i].name+"</span><span>单选题</span><span class='subject'>"+allData[i].subject+"</span></div><div id='"+allData[i].name+"'>";
                                break;
                                case "checkbox":
                                html +="<div class='questions'><div class='"+allData[i].type+"'><span>"+allData[i].name+"</span><span>多选题</span><span class='subject'>"+allData[i].subject+"</span></div><div id='"+allData[i].name+"'>";
                                break;
                                case "textarea":
                                html +="<div class='questions'><div class='"+allData[i].type+"'><span>"+allData[i].name+"</span><span>文本题</span><span class='subject'>"+allData[i].subject+"</span></div><div id='"+allData[i].name+"'>";
                                break;
                                default:
                                console.log("见了鬼");
                                break;
                            }   

                            for(var j=0;j<allData[i].data.length;j++){
                                switch(allData[i].type){
                                    case "radio":
                                    html += "<div class='"+allData[i].type+"s'><input type='"+allData[i].type+"' name='"+allData[i].data[j].randomNumberId+"'/><span>"+allData[i].data[j].content+"</span></div>"
                                    break;
                                    case "checkbox":
                                    html += "<div class='"+allData[i].type+"s'><input type='"+allData[i].type+"'/><span>"+allData[i].data[j].content+"</span></div>"
                                    break;
                                    case "textarea":

                                    var mark = "",judge;
                                    if(allData[i].data[j].status){//是否必须填
                                        mark="该题为必填";
                                        judge=true;
                                    }else{
                                        mark="该题为选填";
                                        judge=false;
                                    }
                                    html += "<div class='"+allData[i].type+"s'><textarea cols='100' rows='10' placeholder='请填写你的回答' class='textareas' >"+allData[i].data[j].content+"</textarea><p class='"+judge+"'>"+mark+"</p></div>"
                                    break;
                                    default:
                                    console.log("见了鬼");
                                    break;
                                }
                            }
                        html +="</div></div>";
                        }
                    }else{//没有存在的话
                        html = ""
                    }
            
                    var date = cursor.value.date;
                    cursor.continue();
                }else{
                    console.log("遍历结束");
                    document.getElementById("edit-qbox").innerHTML = html;
                }
            }
        }
        request.onupgradeneeded = function(event) {
            var db = event.target.result;
            var objStore = db.createObjectStore("myQuestionaire", {
                keyPath: "subject"
            })

            objStore.createIndex("id", "id", { //创建一个id的索引
                unique: true //是否唯一，true的话这个第二次储存的时候就无效
            });
            objStore.createIndex("date", "date", {
                unique: false
            });
            objStore.createIndex("state", "state", {
                unique: false
            });
            objStore.createIndex("allData", "allData", {
                unique: false
            });

        }
    },
    // data:[],
    // info:{
    //  subject:"",
    //  allData:[],
    //  date:""
    // },
    topPart: function(type) {
        var div = document.createElement('div');

        var span1 = document.createElement('span');
        var span2 = document.createElement('span');

        var input = document.createElement('input');
        input.type = 'text';
        input.className = "subject";

        switch (type) {
            case "radio":
                div.className = "radio";
                span2.innerHTML = "单选题";
                input.placeholder = "单选标题";

                div.appendChild(span1);
                div.appendChild(span2);
                div.appendChild(input);
                break;
            case "checkbox":
                div.className = "checkbox";
                span2.innerHTML = "多选题";
                input.placeholder = "多选标题";

                div.appendChild(span1);
                div.appendChild(span2);
                div.appendChild(input);
                break;
            case "textarea":
                div.className = "textarea";
                span2.innerHTML = "文本题";
                input.placeholder = "文本标题";

                div.appendChild(span1);
                div.appendChild(span2);
                div.appendChild(input);

                var input2 = document.createElement('input');
                input2.type = "checkbox";
                var span3 = document.createElement("span");
                span3.innerHTML = "此题是否必填";

                div.appendChild(input2);
                div.appendChild(span3);
                break;
            default:
                break
        }
        return div
    },
    middlePart: function(type, randomNumber) {
        var divWrap = document.createElement('div');
        var divParent = document.createElement('div');
        var input1 = document.createElement('input');

        var input2 = document.createElement('input');
        input2.type = "text";

        var span = document.createElement('span');
        span.setAttribute("onclick", "myQuestionaire.deleSelf()");
        span.innerHTML = "X";

        switch (type) {
            case "radio":
                input1.type = "radio";
                input1.name = "radio" + randomNumber;

                input2.placeholder = "单选内容";

                divWrap.className = 'radios';
                divWrap.appendChild(input1);
                divWrap.appendChild(input2);
                divWrap.appendChild(span);
                divParent.appendChild(divWrap);
                return divParent
                break;
            case "checkbox":
                input1.type = "checkbox";

                input2.placeholder = "多选内容";

                divWrap.className = 'checkboxs';
                divWrap.appendChild(input1);
                divWrap.appendChild(input2);
                divWrap.appendChild(span);
                divParent.appendChild(divWrap);
                return divParent
                break;
            case "textarea":
                var textarea = document.createElement('textarea');
                textarea.cols = "100";
                textarea.rows = "10";
                textarea.placeholder = "请填写你的回答";
                textarea.className = "textareas";
                divParent.appendChild(textarea);
                return divParent
                break;
            default:
                break;
        }
    },
    bottomPart: function() { //创建上移、下移、复用、删除那一行
        var div = document.createElement('div');
        var span1 = document.createElement('span');
        span1.innerHTML = '上移';
        span1.setAttribute("onclick", "myQuestionaire.moveUp()");
        var span2 = document.createElement('span');
        span2.innerHTML = '下移';
        span2.setAttribute("onclick", "myQuestionaire.moveDown()");
        var span3 = document.createElement('span');
        span3.innerHTML = '复用';
        span3.setAttribute("onclick", "myQuestionaire.copy()");
        var span4 = document.createElement('span');
        span4.innerHTML = '删除';
        span4.setAttribute("onclick", "myQuestionaire.deleQuestion()");

        div.appendChild(span1);
        div.appendChild(span2);
        div.appendChild(span3);
        div.appendChild(span4);
        return div
    },
    addPart: function() {
        var div = document.createElement('div');
        var span = document.createElement('span');
        span.setAttribute("onclick", "myQuestionaire.newLine()");
        span.innerHTML = "+";
        div.appendChild(span);
        return div;
    },
    newRadio: function() { //创建新的单选
        var randomNumber = Math.random();

        var contentDiv = document.createElement("div");
        contentDiv.className = 'questions';

        contentDiv.appendChild(this.topPart("radio"));
        contentDiv.appendChild(this.middlePart("radio", randomNumber));
        contentDiv.appendChild(this.addPart());
        contentDiv.appendChild(this.bottomPart());

        document.getElementById('edit-qbox').appendChild(contentDiv);
        myQuestionaire.queueUp();
    },

    newCheckbox: function() { //创建新的多选
        var contentDiv = document.createElement("div");
        contentDiv.className = 'questions';

        contentDiv.appendChild(this.topPart("checkbox"));
        contentDiv.appendChild(this.middlePart("checkbox"));
        contentDiv.appendChild(this.addPart());
        contentDiv.appendChild(this.bottomPart());

        document.getElementById('edit-qbox').appendChild(contentDiv);
        myQuestionaire.queueUp();
    },

    newTextarea: function() { //创建新的文本框
        var contentDiv = document.createElement("div");
        contentDiv.className = 'questions';

        contentDiv.appendChild(this.topPart("textarea"));
        contentDiv.appendChild(this.middlePart("textarea"));
        contentDiv.appendChild(this.bottomPart());

        document.getElementById('edit-qbox').appendChild(contentDiv);
        myQuestionaire.queueUp();
    },
    newLine: function(e) { //整合单选和多选的添加行函数
        var e = window.event || e;
        switch (this.getQuestionType(e.target)) {
            case "radio":
                var namebefore = e.target.parentNode.previousElementSibling.firstElementChild.firstElementChild.name
                var input1 = document.createElement("input");
                input1.type = "radio";
                input1.name = namebefore;

                var input2 = document.createElement("input");
                input2.type = "text";
                input2.placeholder = "单选内容";

                var span = document.createElement("span");
                span.setAttribute("onclick", "myQuestionaire.deleSelf()");
                span.innerHTML = "X";

                var div = document.createElement("div");
                div.className = "radios";
                div.appendChild(input1);
                div.appendChild(input2);
                div.appendChild(span);

                e.target.parentNode.previousSibling.appendChild(div);
                break;
            case "checkbox":
                var input1 = document.createElement("input");
                input1.type = "checkbox";

                var input2 = document.createElement("input");
                input2.type = "text";
                input2.placeholder = "多选内容";

                var span = document.createElement("span");
                span.setAttribute("onclick", "myQuestionaire.deleSelf()");
                span.innerHTML = "X";

                var div = document.createElement("div");
                div.className = "checkboxs";
                div.appendChild(input1);
                div.appendChild(input2);
                div.appendChild(span);

                e.target.parentNode.previousSibling.appendChild(div);
                break;
            default:
                break;
        }
    },
    deleSelf: function(e) {
        var e = window.event || e;
        var thisNode = e.target.parentNode;
        if (thisNode.parentNode.getElementsByTagName('div').length != 1) {
            thisNode.parentNode.removeChild(thisNode);
        }
    },
    editPageRender: function() {
        this.info = {};
        this.data = [];

        var collecion = document.getElementsByClassName('questions'); //把每一个Question的数据内容以OBJ的形式储存到DATA数组中
        for (var i = 0; i < collecion.length; i++) {
            var perObj = {
                name: "",
                type: "",
                subject: "",
                data: []
            };

            perObj.name = collecion[i].firstElementChild.firstElementChild.innerHTML;
            perObj.type = collecion[i].firstElementChild.className;
            perObj.subject = collecion[i].getElementsByClassName('subject')[0].value;

            switch (perObj.type) {
                case "radio":
                    var radios = collecion[i].getElementsByClassName('radios');
                    var randomNumberId = Math.random();
                    for (var j = 0; j < radios.length; j++) {
                        var detailObj = {
                            status: 0,
                            content: "",
                            count:0,
                            randomNumberId:randomNumberId//方便渲染的时候单选按钮不串流
                        }
                        detailObj.status = radios[j].firstElementChild.checked;
                        detailObj.content = radios[j].firstElementChild.nextElementSibling.value;
                        perObj.data.push(detailObj);
                    }
                    this.data.push(perObj);
                    break;
                case "checkbox":
                    var checkboxs = collecion[i].getElementsByClassName('checkboxs');
                    for (var j = 0; j < checkboxs.length; j++) {
                        var detailObj = {
                            status: 0,
                            content: "",
                            count:0
                        }
                        detailObj.status = checkboxs[j].firstElementChild.checked;
                        detailObj.content = checkboxs[j].firstElementChild.nextElementSibling.value;
                        perObj.data.push(detailObj);
                    }
                    this.data.push(perObj);
                    break;
                case "textarea":
                    var textarea = collecion[i].getElementsByTagName('textarea')[0];
                    var detailObj = {
                        status: 0,
                        content: "",
                        count:0
                    }
                    detailObj.status = textarea.parentNode.previousElementSibling.getElementsByTagName('input')[1].checked;
                    detailObj.content = textarea.value;
                    perObj.data.push(detailObj);
                    this.data.push(perObj);
                    break;
                default:
                    console.log("出错了！");
                    break;
            }

        }

        //储存Question以外的数据
        var headValue = document.getElementById("write_subject").value;
        this.info.subject = headValue; //标题，也是唯一的索引
        this.info.allData = this.data; //Question数据的集合
        this.info.date = document.querySelector('[data-calendar]').value; //截止日期
        document.getElementById('limitedDate').innerHTML = document.querySelector('[data-calendar]').value;
        // var dateObj = this.getCurrentTime();
        // this.info.id = headValue + dateObj.year + dateObj.month + dateObj.date + dateObj.hour + dateObj.minute + dateObj.second; //一个独一无二的ID，暂时不打算用这个
    },
    save: function() {
        this.editPageRender();
        this.info.state = '-1'; //未发布：-1，发布中：0，已结束：1
        this.addDataToDB();
        alert("保存成功");
        // window.location.href = "index.html";
    },
    confirmPost:function() {
        this.editPageRender();
        var curStatus = document.getElementById("maskControl").className;
        if (curStatus === 'show') {
            document.getElementById("maskControl").className = 'hide';
        } else {
            document.getElementById("maskControl").className = 'show';
        }
    },
    post: function() {
        this.editPageRender();
        this.info.state = '0'; //未发布：-1，发布中：0，已结束：1
        this.addDataToDB();
        alert("发布成功");
        // window.location.href = "index.html";
    },
    moveUp: function(e) {
        var e = window.event || e;
        var oldEle = e.target.parentNode.parentNode;
        var targetNode = oldEle.previousElementSibling;
        if (targetNode != null) {
            var cloneEle = oldEle.cloneNode(true);
            oldEle.parentNode.removeChild(oldEle);
            targetNode.parentNode.insertBefore(cloneEle, targetNode)
        } else {
            alert("移到头了！");
        }
        this.queueUp();
    },
    queueUp: function() {
        var wrapBox = document.getElementById("edit-qbox");
        var j;
        for (var i = 0; i < wrapBox.children.length; i++) {
            j = i + 1;
            wrapBox.children[i].firstElementChild.firstElementChild.innerHTML = "Q" + j;
        }
    },
    moveDown: function(e) {
        var e = window.event || e;
        var oldEle = e.target.parentNode.parentNode;
        var parent = oldEle.parentNode
        var targetNode = oldEle.nextElementSibling;
        if (targetNode != null) {
            var cloneEle = oldEle.cloneNode(true);
            oldEle.parentNode.removeChild(oldEle);
            targetNode.parentNode.insertBefore(cloneEle, targetNode.nextElementSibling);
        } else {
            alert("移到头了！");
        }
        this.queueUp();
    },
    copy: function(e) {
        var e = window.event || e;
        var oldEle = e.target.parentNode.parentNode;
        var cloneNode = oldEle.cloneNode(true);
        var str = "Q" + this.getQuestionNum(e);
        cloneNode.firstElementChild.firstChild.innerHTML = str;

        //如果是单选，更改单选的name，防止选项串流
        var randomNumber = Math.random();
        if (cloneNode.firstElementChild.className == "radio") {
            var radios = cloneNode.getElementsByClassName('radios');
            for (var i = 0; i < radios.length; i++) {
                cloneNode.getElementsByClassName('radios')[i].firstElementChild.name = "radio" + randomNumber;
            }
        }

        oldEle.parentNode.appendChild(cloneNode);
    },
    deleQuestion: function(e) {
        var e = window.event || e;
        var currentDiv = e.target.parentNode.parentNode;
        currentDiv.parentNode.removeChild(currentDiv);
        this.queueUp();
    },
    getQuestionNum: function() {
        return document.getElementById('edit-qbox').children.length + 1
    },
    getQuestionType: function(target) { //基于添加新行所在的位置获得当前问题的类型
        return target.parentNode.parentNode.firstElementChild.className
    },
    getCurrentTime: function() { //获取当前的时间
        var nowDate = new Date();
        var year = nowDate.getFullYear();
        var month = nowDate.getMonth();
        var date = nowDate.getDate();
        var hour = nowDate.getHours();
        var minute = nowDate.getMinutes();
        var second = nowDate.getSeconds();
        var day = nowDate.getDay();
        var time = nowDate.getTime();
        return {
            "year": year,
            "month": month,
            "date": date,
            "hour": hour,
            "minute": minute,
            "second": second,
            "day": day,
            "time": time
        }
    },
    addDataToDB: function() {
        /**
         * IndexedDB储存
         */
        var request, database;
        request = indexedDB.open('Questionaire', 1); //打开(创建)数据库

        request.onerror = function(event) {
            alert("创建/打开数据库失败，失败MSG：" + event.target.error.message);
            return
        }
        request.onsuccess = function(event) {
            database = event.target.result;
            console.log("创建/打开数据库成功,db为", database);

            var transaction = database.transaction("myQuestionaire", "readwrite");
            store = transaction.objectStore("myQuestionaire");
            store.put({
                "id": myQuestionaire.info.id,
                "subject": myQuestionaire.info.subject,
                "date": myQuestionaire.info.date,
                "state": myQuestionaire.info.state,
                "allData": myQuestionaire.info.allData
            })
        }
    },
    toggleShowBtn: function(e) {
        var e = window.event || e;
        if (e.target.parentNode.firstElementChild.className == "hide") {
            e.target.parentNode.firstElementChild.className = "show";
        } else {
            e.target.parentNode.firstElementChild.className = "hide";
        }
    }
}
var myQuestionaire = new Questionaire(); //必须用myQuestionaire，写的时候是用的myQuestionaire为指针

// window.indexedDB.deleteDatabase("Questionaire");
