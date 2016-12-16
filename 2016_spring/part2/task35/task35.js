//还没能逐条执行动作。。
(function createTable() {
    var table = document.getElementById('table');
    var tr_arr = [];
    for (var i = 0; i < 11; i++) {
        tr_arr[i] = document.createElement("tr");
        table.appendChild(tr_arr[i]);
        for (var j = 0; j < 11; j++) {
            var td_arr = [];
            td_arr[j] = document.createElement("td");
            tr_arr[i].appendChild(td_arr[j]);
            if (i == 0) {
                td_arr[j].setAttribute("class", "clear_border");
                if (j > 0) td_arr[j].innerHTML = j;
            }
            if (j == 0) {
                td_arr[0].setAttribute("class", "clear_border");
                if (i > 0) td_arr[0].innerHTML = i;
            }
        }
    }
    document.getElementById('command_input').value = 'MOV RIG 3 \nmoV bot 2\nMOV lef 1\ntra bot 2';
    updateLineNum()
})();

//正则分割内容框里的内容,扩展命令，添加数字
function enhanceCommand(str) {
    var filter = /\n/g;
    var inputArr = str.split(filter);
    return inputArr;
}

var robot = document.getElementById('robot_box');
var cmd_btn = document.getElementById('command_button');
var deg = 0; //初始化角度
var face = 0; //初始化方向  0: 上, 1: 右, 2: 下, 3: 左;
var xPos = 50;
var yPos = 50;

var RobotBox = {
    xPos: function() {
        xPos += "px";
        return robot.style.top
    },
    yPos: function() {
        yPos += "px"
        return robot.style.left
    },
    face: function() {
        face = face % 4;
        if (face == 0) {
            console.log(face, "朝上");
            return face;
        } else if (face == 1) {
            console.log(face, "朝左");
            return face;
        } else if (face == 2) {
            console.log(face, "朝下");
            return face;
        } else if (face == 3) {
            console.log(face, "朝右");
            return face;
        } else {
            throw "啊？"
        }
    },
    go: function(str, line_num) {
        switch (str) {
            case "GO":
                switch (face) {
                    case 0:
                        RobotBox.transTop();
                        break;
                    case 1:
                        RobotBox.transLeft();
                        break;
                    case 2:
                        RobotBox.transBottom();
                        break;
                    case 3:
                        RobotBox.transRight();
                        break;
                    default:
                        alert("???");
                        break;
                }
                break;
            case "TUN LEF":
                RobotBox.turnLeft();
                break;
            case "TUN RIG":
                RobotBox.turnRight();
                break;
            case "TUN BAC":
                RobotBox.turnBack();
                break;
            case "TRA LEF":
                RobotBox.transLeft()
                break;
            case "TRA TOP":
                RobotBox.transTop()
                break;
            case "TRA RIG":
                RobotBox.transRight()
                break;
            case "TRA BOT":
                RobotBox.transBottom();
                break;
            case "MOV LEF":
                RobotBox.moveLeft();
                break;
            case "MOV TOP":
                RobotBox.moveTop();
                break;
            case "MOV RIG":
                RobotBox.moveRight();
                break;
            case "MOV BOT":
                RobotBox.moveBottom();
                break;
            default: //处理错误的命令所对应的行数
                alert("指令错误，请查阅右边的指令");
                var Li = document.getElementById('command_display_count').getElementsByTagName("li");
                Li[line_num].style.borderRadius = "10px"
                Li[line_num].style.backgroundColor = "#FF9A9A"
        }
    },
    turnLeft: function() {
        face = face % 4;
        deg -= 90;
        robot.style.transform = "rotate(" + deg + "deg)";
        face++;
        RobotBox.face();
    },
    turnRight: function() {
        face = face % 4;
        deg += 90;
        robot.style.transform = "rotate(" + deg + "deg)";
        face += 3;
        RobotBox.face();
    },
    turnBack: function() {
        deg += 180;
        robot.style.transform = "rotate(" + deg + "deg)";
        face += 2;
        RobotBox.face();
    },
    transLeft: function() {
        setTimeout(function() {
            if (xPos > 50) {
                xPos -= 50;
                robot.style.left = xPos + 'px';
            }
        }, 20)
    },
    transTop: function() {
        setTimeout(function() {
            if (yPos > 50) {
                yPos -= 50;
                robot.style.top = yPos + 'px';
            }
        }, 20)
    },
    transRight: function() {
        setTimeout(function() {
            if (xPos < 500) {
                xPos += 50;
                robot.style.left = xPos + 'px';
            }
        }, 20)
    },
    transBottom: function() {
        setTimeout(function() {
            if (yPos < 500) {
                yPos += 50;
                robot.style.top = yPos + 'px';
            }
        }, 20)
    },
    moveLeft: function() {
        function turnFuncL() {
            if (face != 1) { //如果方向不同
                RobotBox.turnLeft();
                setTimeout(turnFuncL, 50);
            } else {
                setTimeout(RobotBox.transLeft, 1000);
            };
        }
        setTimeout(turnFuncL, 50);
    },
    moveTop: function() {
        function turnFuncT() {
            if (face != 0) { //如果方向不同
                RobotBox.turnLeft();
                setTimeout(turnFuncT, 50);
            } else {
                setTimeout(RobotBox.transTop, 1000);
            };
        }
        setTimeout(turnFuncT, 50);
    },
    moveRight: function() {
        function turnFuncR() {
            if (face != 3) { //如果方向不同
                RobotBox.turnLeft();
                setTimeout(turnFuncR, 50);
            } else {
                setTimeout(RobotBox.transRight, 1000);
            }
        };
        setTimeout(turnFuncR, 50);
    },
    moveBottom: function() {
        function turnFuncB() {
            if (face != 2) { //如果方向不同
                RobotBox.turnLeft();
                setTimeout(turnFuncB, 50);
            } else {
                setTimeout(RobotBox.transBottom, 1000);
            };
        }
        setTimeout(turnFuncB, 50);
    },
}

/***********************************输入框区域的函数********************************/

//创建行数标记
function renderLineNum(count) {
    var command_display_count = document.getElementById('command_display_count');
    command_display_count.innerHTML = "";
    for (var i = 1; i <= count; i++) {
        var li = document.createElement("li");
        var txt = document.createTextNode(i);
        li.appendChild(txt);
        command_display_count.appendChild(li);
    }
}

//检测当前输入框文本的行数,实时更新lineNum
function updateLineNum() {
    setTimeout(
        function activeEnter() {
            var command_input = document.getElementById('command_input');
            var line_num = command_input.value; //行数
            line_num.match(/\n/g) ? renderLineNum(line_num.match(/\n/g).length + 1) : renderLineNum(1);
        }, 0)
}

//实时设置第一个li的margin值，达到滚动的效果。
function setMargin() {
    var Li = document.getElementById('command_display_count').getElementsByTagName('li');
    Li[0].style.marginTop = -command_input.scrollTop + "px";
}

//执行按钮   
function render() {
    var inputArr = enhanceCommand(command_input.value);
    var x = 0;
    (function bigLoop() {
        if (x < inputArr.length) {
            var times = "";
            if (inputArr[x].slice(0, 2).toUpperCase() == "GO") {
                conmmand_input = "GO";
                times = inputArr[x].slice(3) ? Number(inputArr[x].slice(3)) : 1;
            } else if (inputArr[x] == "") {
                conmmand_input = "blank";
                times = 1;
            } else {
                conmmand_input = inputArr[x].slice(0, 7);
                times = inputArr[x].slice(8) ? Number(inputArr[x].slice(8)) : 1;
            }

            if (isNaN(times)) { alert("次数输入有误，请规范书写！"); }
            var i = 0;

            function finalLoop() {
                if (i < times) {
                    RobotBox.go(conmmand_input.toUpperCase(), x)
                    setTimeout(finalLoop, 1000);
                    console.log(conmmand_input, x, i, times)
                    i++;
                } else {
                    x++;
                    setTimeout(bigLoop, 1000);
                }
            }
            finalLoop();
        }
    })()
}

document.getElementById('clean_buttun').addEventListener("click", function() {
    command_input.value = "";
    updateLineNum();
}, false);
document.getElementById("refresh_button").addEventListener("click",function(){location.reload()},false)
cmd_btn.addEventListener("click", render, false);
