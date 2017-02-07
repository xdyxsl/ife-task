function Questionaire() {
    this.init();
    this.requestInfo = decodeURI(location.search.substring(9));//主键的名称
    this.strPage = "";
}
Questionaire.prototype = {
    init: function() {
        console.log("初始化init",this);
        /**
         * IndexedDB储存
         */
        var request;
        request = indexedDB.open('Questionaire', 1); //打开(创建)数据库

        request.onerror = function(event) {
            alert("创建/打开数据库失败，失败MSG：" + event.target.error.message);
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
        var strURL = window.location.href;
        var arrURL = strURL.split('/');
        var lastStr = arrURL[arrURL.length-1];
        this.strPage = lastStr.slice(0,lastStr.indexOf('.'));
        switch(this.strPage){
            case "edit":
            this.edit.init();
            break;
            case "index":
            this.index.init();
            break;
            case "write":
            break;
            case "detail":
            break;
            default:
            break;
        }
    },
    // data:[],
    // info:{
    //  subject:"",
    //  allData:[],
    //  date:""
    // },
    write:{
        haha:function(){
            console.log("haha")
        }
    },
    index:{
        init:function(){
            this.renderTbody();
            this.needDeleteArr = [];
        },
        toggleMask:function (e){
            var e = window.event||e;

            var curStatus = document.getElementById("maskControl").className;
            if(curStatus ==='show'){
                document.getElementById("maskControl").className = 'hide';
            }else{
                document.getElementById("maskControl").className = 'show';
            }
            
            if(e.target.id=="delete_some"){//判断是否是删除多个的按钮
                var chekckedLines = document.getElementById("checkBox").getElementsByClassName('checked');
                for(var i=0;i<chekckedLines.length;i++){
                    this.needDeleteArr.push(chekckedLines[i].lastElementChild.id);
                }
                return this.needDeleteArr
            }
            this.needDeleteArr.push(e.target.parentNode.id)
            return this.needDeleteArr
        },
        toggleCheck:function(){
            if(event.target.checked){
                event.target.parentNode.parentNode.className = "checked";
            }else{
                if(document.getElementById('checkAll').checked){
                    document.getElementById('checkAll').checked = "";
                }
                event.target.parentNode.parentNode.className = "";
            }
        },
        checkAll:function(){
            var inputs = document.getElementsByName('myQN');
            if(event.target.checked){
                for(var i=0;i<inputs.length;i++){
                    inputs[i].checked = 'checked';
                    inputs[i].parentNode.parentNode.className = "checked";
                }
            }else{
                for(var i=0;i<inputs.length;i++){
                    inputs[i].checked = '';
                    inputs[i].parentNode.parentNode.className = "";
                }
            }
        },
        renderTbody:function(){
            //IndexedDB操作
            var request,database,htmlCont="";
            request = indexedDB.open("Questionaire",1);

            var that = this;//等会要变作用域
            request.onsuccess = function() {
                var db = this.result;

                var transaction = db.transaction('myQuestionaire','readwrite');
                var store = transaction.objectStore('myQuestionaire');
                var req = store.openCursor();

                var stateText = "",stateClass = "",inputStyle="";
                req.onsuccess = function(event){
                    console.log("游标遍历");
                    var cursor = event.target.result;
                    if(cursor){

                        switch(cursor.value.state){//判断状态
                            case "-1":
                            stateText = '未发布';
                            stateClass = "unpub";
                            inputStyle = "<a href='edit.html?subject="+cursor.value.subject+"'><input type='button' value='编辑问卷'></a><input type='button' value='删除问卷' onclick='myQuestionaire.index.toggleMask()'>"
                            break;
                            case "0":
                            stateText = '发布中';
                            stateClass = "pubing";
                            inputStyle = "<a href='write.html?subject="+cursor.value.subject+"'><input type='button' value='填写数据'></a><a href='detail.html?subject="+cursor.value.subject+"'><input type='button' value='查看数据'></a>"
                            break;
                            case "1":
                            stateText = '已结束';
                            stateClass = "pubed";
                            inputStyle = "<a href='detail.html?subject="+cursor.value.subject+"'><input type='button' value='查看数据'></a>";
                            break;
                            default:
                            break;
                        }
                        
                        //判断问卷是否过期，过期就更新state
                        //先获取要更改的值并且得到回执，回执的onsuccess里面把event.target.result用Put更新
                        if(that.getTimeCompare(cursor.value.date)){
                            var value = cursor.value.subject;
                            var tempRequest = store.get(value);
                            tempRequest.onsuccess = function(event){
                                var myTarget = event.target.result;
                                myTarget.state="1";
                                store.put(myTarget);
                            }
                        }

                        //渲染HTML内容
                        htmlCont += "<tr><td><input type='checkbox' name='myQN' onchange='myQuestionaire.index.toggleCheck()' ></td><td>"+cursor.value.subject+"</td><td>"+cursor.value.date+"</td><td class='"+stateClass+"'>"+stateText+"</td><td id="+cursor.value.subject+">"+inputStyle+"</td></tr>"
                        var date = cursor.value.date;
                        cursor.continue();
                    }else{
                        console.log("遍历结束");
                        document.getElementById('checkBox').innerHTML = htmlCont;
                    }
                }
            }
        },
        getTimeCompare:function(oldtime) {//感觉写法可以更优雅点，但是暂时没想到
            var tempArr = oldtime.split('-')

            var oldyear = Number(tempArr[0]);
            var oldmonth = Number(tempArr[1]);
            var oldday = Number(tempArr[2]);

            var a = new Date();
            var newyear = a.getFullYear();
            var newmonth = a.getMonth()+1;
            var newday = a.getDate();

            if(newyear>oldyear){
                return true;
            }else{
                if(newmonth>oldmonth){
                    return true;
                }else{
                    if(newday>oldday){
                        return true;
                    }else{
                        return false;
                    }
                }
            }
        },
        deleteQuestionaire:function (e){
            var e = window.event||e;

            var request,database;
            request = indexedDB.open("Questionaire",1);

            var that = this;//作用域问题
            request.onsuccess = function() {
                var db = this.result;
                console.log("成功打开indexedDB",db);

                var transaction = db.transaction('myQuestionaire','readwrite');
                var store = transaction.objectStore('myQuestionaire');
                console.log(that.needDeleteArr);
                for(var i=0;i<that.needDeleteArr.length;i++){
                    console.log(that.needDeleteArr[i]);
                    var rq = store.delete(that.needDeleteArr[i]);
                    rq.onsuccess = function(event){
                        console.log("删除成功");
                        that.renderTbody();
                    }
                }
                document.getElementById("maskControl").className = 'hide';//确定完后隐藏mask

                if(document.getElementById("checkAll").checked){//保证全选删除后，全选框是非选中状态
                    document.getElementById("checkAll").checked="";
                }
            }
        },
    },
    edit:{
        init:function(){
            this.requestInfo = decodeURI(location.search.substring(9));
            if(this.requestInfo!=''){
                this.DBtoOBJ();
            };
            console.log("edit初始化");
        },
        oneOfDB:function(){//判断是否已有数据

        },
        DBtoOBJ:function(){//把已有的数据渲染到HTML
            /**
             * IndexedDB储存
             */
            var request,staticObj;
            request = indexedDB.open('Questionaire', 1); //打开(创建)数据库

            request.onerror = function(event) {
                alert("创建/打开数据库失败，失败MSG：" + event.target.error.message);
            }
            var that = this;//底下this的作用域改变，提前复制一份
            request.onsuccess = function(event){
               db = event.target.result;

               var transaction = db.transaction('myQuestionaire','readwrite');
               var store = transaction.objectStore('myQuestionaire');
               var obj = store.get(that.requestInfo);
               obj.onsuccess = function(){
                   that.OBJtoHTML(obj.result);
               }
            }
        },
        OBJtoHTML:function(obj){//接受IDB读取出来的OBJ
            var html ="";
            for(var i=0;i<obj.allData.length;i++){

               switch(obj.allData[i].type){
                   case "radio":
                   html +="<div class='questions'><div class='radio'><span>"+obj.allData[i].name+"</span><span>单选题</span><input type='text' class='subject' placeholder='单选标题' value='"+obj.allData[i].subject+"'></div><div>";
                   break;
                   case "checkbox":
                   html +="<div class='questions'><div class='radio'><span>"+obj.allData[i].name+"</span><span>多选题</span><input type='text' class='subject' placeholder='多选标题' value='"+obj.allData[i].subject+"'></div><div>";
                   break;
                   case "textarea":
                   html +="<div class='questions'><div class='textarea'><span>"+obj.allData[i].name+"</span><span>文本题</span><input type='text' class='subject' placeholder='文本标题' value='"+obj.allData[i].subject+"'></div><div>";
                   break;
                   default:
                   break;
               }   

               for(var j=0;j<obj.allData[i].data.length;j++){
                   switch(obj.allData[i].type){
                       case "radio":
                       html +="<div class='radios'><input type='radio' name='"+Math.random()+"'  disabled='disabled'><input type='text' placeholder='单选内容' value='"+obj.allData[i].data[j].content+"'><span onclick='myQuestionaire.edit.deleSelf()'>X</span></div>";
                       break;
                       case "checkbox":
                       html +="<div class='checkboxs'><input type='checkbox'  disabled='disabled'><input type='text' placeholder='多选内容' value='"+obj.allData[i].data[j].content+"'><span onclick='myQuestionaire.edit.deleSelf()'>X</span></div>";
                       break;
                       case "textarea":
                       console.log(obj.allData[i].data[j].status)
                       if(obj.allData[i].data[j].status=="true"){//checked属性，想把勾选状态改成不勾选状态，貌似只有删除checked属性。把checked设置成什么东西，都会勾上。只有再加一层if了
                       html += "<input type='checkbox' checked='checked'><span>此题是否必填</span> <div><textarea cols='100' rows='10' placeholder='请填写你的回答' class='textareas'  disabled='disabled'></textarea></div>";
                       }else{
                        html += "<input type='checkbox' ><span>此题是否必填</span> <div><textarea cols='100' rows='10' placeholder='请填写你的回答' class='textareas'  disabled='disabled'></textarea></div>"
                       }
                       break;
                       default:
                       break;
                   }
               }
               switch(obj.allData[i].type){
                   case "radio":
                   case "checkbox":
                   html +="</div><div><span onclick='myQuestionaire.edit.newLine()'>+</span></div><div><span onclick='myQuestionaire.edit.moveUp()'>上移</span><span onclick='myQuestionaire.edit.moveDown()'>下移</span><span onclick='myQuestionaire.edit.copy()'>复用</span><span onclick='myQuestionaire.edit.deleQuestion()'>删除</span></div></div>";
                   break;
                   case "textarea":
                   html +="</div><div><span onclick='myQuestionaire.edit.moveUp()'>上移</span><span onclick='myQuestionaire.edit.moveDown()'>下移</span><span onclick='myQuestionaire.edit.copy()'>复用</span><span onclick='myQuestionaire.edit.deleQuestion()'>删除</span></div></div>";
                   break;
                   default:
                   break;
               }   
            }
            document.getElementById('write_subject').value = this.requestInfo;
            document.getElementById('edit-qbox').innerHTML = html;
        },
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
                    break;
                case "checkbox":
                    div.className = "checkbox";
                    span2.innerHTML = "多选题";
                    input.placeholder = "多选标题";
                    break;
                case "textarea":
                    div.className = "textarea";
                    span2.innerHTML = "文本题";
                    input.placeholder = "文本标题";

                    break;
                default:
                    break
            }
            div.appendChild(span1);
            div.appendChild(span2);
            div.appendChild(input);
            return div
        },
        middlePart: function(type, randomNumber) {
            var divWrap = document.createElement('div');
            var divParent = document.createElement('div');
            var input1 = document.createElement('input');

            var input2 = document.createElement('input');
            input2.type = "text";

            var span = document.createElement('span');
            span.setAttribute("onclick", "myQuestionaire.edit.deleSelf()");
            span.innerHTML = "X";

            switch (type) {
                case "radio":
                    input1.type = "radio";
                    input1.name = "radio" + randomNumber;
                    input1.disabled='disabled';

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
                    input1.disabled='disabled';

                    input2.placeholder = "多选内容";

                    divWrap.className = 'checkboxs';
                    divWrap.appendChild(input1);
                    divWrap.appendChild(input2);
                    divWrap.appendChild(span);
                    divParent.appendChild(divWrap);
                    return divParent
                    break;
                case "textarea":

                    var input = document.createElement('input');
                    input.type = "checkbox";
                    var span = document.createElement("span");
                    span.innerHTML = "此题是否必填";

                    var textarea = document.createElement('textarea');
                    textarea.cols = "100";
                    textarea.rows = "10";
                    textarea.disabled='disabled';
                    textarea.className = "textareas";
                    divWrap.appendChild(textarea);
                    divParent.appendChild(input);
                    divParent.appendChild(span);
                    divParent.appendChild(divWrap);
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
            span1.setAttribute("onclick", "myQuestionaire.edit.moveUp()");
            var span2 = document.createElement('span');
            span2.innerHTML = '下移';
            span2.setAttribute("onclick", "myQuestionaire.edit.moveDown()");
            var span3 = document.createElement('span');
            span3.innerHTML = '复用';
            span3.setAttribute("onclick", "myQuestionaire.edit.copy()");
            var span4 = document.createElement('span');
            span4.innerHTML = '删除';
            span4.setAttribute("onclick", "myQuestionaire.edit.deleQuestion()");

            div.appendChild(span1);
            div.appendChild(span2);
            div.appendChild(span3);
            div.appendChild(span4);
            return div
        },
        addPart: function() {
            var div = document.createElement('div');
            var span = document.createElement('span');
            span.setAttribute("onclick", "myQuestionaire.edit.newLine()");
            span.innerHTML = "+";
            div.appendChild(span);
            return div;
        },
        newRadio: function() { //创建新的单选，如果已经有数据则传入
            var randomNumber = Math.random();

            var contentDiv = document.createElement("div");
            contentDiv.className = 'questions';

            contentDiv.appendChild(this.topPart("radio"));
            contentDiv.appendChild(this.middlePart("radio", randomNumber));
            contentDiv.appendChild(this.addPart());
            contentDiv.appendChild(this.bottomPart());

            document.getElementById('edit-qbox').appendChild(contentDiv);
            myQuestionaire.edit.queueUp();
        },
        newCheckbox: function() { //创建新的多选
            var contentDiv = document.createElement("div");
            contentDiv.className = 'questions';

            contentDiv.appendChild(this.topPart("checkbox"));
            contentDiv.appendChild(this.middlePart("checkbox"));
            contentDiv.appendChild(this.addPart());
            contentDiv.appendChild(this.bottomPart());

            document.getElementById('edit-qbox').appendChild(contentDiv);
            myQuestionaire.edit.queueUp();
        },
        newTextarea: function() { //创建新的文本框
            var contentDiv = document.createElement("div");
            contentDiv.className = 'questions';

            contentDiv.appendChild(this.topPart("textarea"));
            contentDiv.appendChild(this.middlePart("textarea"));
            contentDiv.appendChild(this.bottomPart());

            document.getElementById('edit-qbox').appendChild(contentDiv);
            myQuestionaire.edit.queueUp();
        },
        newLine: function(e) { //整合单选和多选的添加行函数
            var e = window.event || e;
            switch (this.getQuestionType(e.target)) {
                case "radio":
                    var namebefore = e.target.parentNode.previousElementSibling.firstElementChild.firstElementChild.name
                    var input1 = document.createElement("input");
                    input1.type = "radio";
                    input1.name = namebefore;
                    input1.disabled='disabled';

                    var input2 = document.createElement("input");
                    input2.type = "text";
                    input2.placeholder = "单选内容";

                    var span = document.createElement("span");
                    span.setAttribute("onclick", "myQuestionaire.edit.deleSelf()");
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
                    input1.disabled='disabled';

                    var input2 = document.createElement("input");
                    input2.type = "text";
                    input2.placeholder = "多选内容";

                    var span = document.createElement("span");
                    span.setAttribute("onclick", "myQuestionaire.edit.deleSelf()");
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
        objSave: function() {
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
                perObj.subject = collecion[i].getElementsByClassName('subject')[0].value.trim();

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
                            detailObj.status = radios[j].firstElementChild.checked?'checked':'';
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
                            detailObj.status = checkboxs[j].firstElementChild.checked?'checked':'';
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
                        console.log(textarea)
                        detailObj.status = textarea.parentNode.previousElementSibling.previousElementSibling.checked?'true':'false';
                        console.log(status)
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
            this.info.subject = this.trim(headValue,"g"); //标题，也是唯一的索引
            this.info.allData = this.data; //Question数据的集合
            this.info.date = document.querySelector('[data-calendar]').value; //截止日期
            document.getElementById('limitedDate').innerHTML = document.querySelector('[data-calendar]').value;
            var dateObj = this.getCurrentTime();
            this.info.id = this.trim(headValue,"g") + dateObj.year + dateObj.month + dateObj.date + dateObj.hour + dateObj.minute + dateObj.second; //一个独一无二的ID，暂时不打算用这个
        },
        trim:function (str,is_global){
            var result;
            result = str.replace(/(^\s+)|(\s+$)/g,"");
            if(is_global.toLowerCase()=="g"){
               result = result.replace(/\s/g,"");
            }
            return result;
        },
        save: function() {
            this.objSave();
            this.info.state = '-1'; //未发布：-1，发布中：0，已结束：1
            this.addDataToDB(this.requestInfo);
            alert("保存成功");
            // window.location.href = "index.html";
        },
        confirmPost:function() {
            this.objSave();
            var curStatus = document.getElementById("maskControl").className;
            if (curStatus === 'show') {
                document.getElementById("maskControl").className = 'hide';
            } else {
                document.getElementById("maskControl").className = 'show';
            }
        },
        post: function() {
            this.objSave();
            this.info.state = '0'; //未发布：-1，发布中：0，已结束：1
            this.addDataToDB(this.requestInfo);
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
        addDataToDB: function(DBkey) {
            /**
             * IndexedDB储存
             */
            var request, database;
            request = indexedDB.open('Questionaire', 1); //打开(创建)数据库

            request.onerror = function(event) {
                alert("创建/打开数据库失败，失败MSG：" + event.target.error.message);
                return
            }

            var that = this;//下面作用域this改变
            request.onsuccess = function(event) {
                database = event.target.result;

                var transaction = database.transaction("myQuestionaire", "readwrite");
                store = transaction.objectStore("myQuestionaire");
 
                store.put({//不用通过Get先查询再操作，因为subject索引是唯一，直接Put会自动更新相应的OBJ
                    "id": that.info.id,
                    "subject": that.info.subject,
                    "date": that.info.date,
                    "state": that.info.state,
                    "allData": that.info.allData
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
    },
}
var myQuestionaire = new Questionaire(); //必须用myQuestionaire，写的时候是用的myQuestionaire为指针

// window.indexedDB.deleteDatabase("Questionaire");
