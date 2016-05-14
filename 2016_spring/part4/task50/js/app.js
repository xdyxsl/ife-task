/**
 * [Header component]
 */
var HeaderContent = React.createClass({
    render:function(){
        return (
            <div>
                <img src="imgs/log_50x50.png" />
                <h3>问卷管理</h3>
                <span>我的问卷</span>
            </div>
        );
    },
})

ReactDOM.render(
    <HeaderContent />,
    document.getElementById('header')
);
/**
 * [List component] 01-1
 */
var ListBox = React.createClass({
    getInitialState:function(){
        return {
            checked:false,
        }
    },
    handleChange:function(){
        this.setState({checked: !this.state.checked});
    },
    handleClick:function(event){
        if(event.target.parentNode.parentNode.className=="checked"){
            event.target.parentNode.parentNode.className="";
        }else{
            event.target.parentNode.parentNode.className="checked";
            isChecked = "checked";
        }
    },
    delete:function(){
        document.getElementById("maskControl").className = "show";
    },
    addQuest:function(){
        ReactDOM.render(
            <Add />,
            document.getElementById("container")
        );
    },
    detail:function(){
        ReactDOM.render(
            <Detail />,
            document.getElementById("container")
        );
    },
    edit:function(){
        ReactDOM.render(
            <Edit />,
            document.getElementById("container")
        )
    },
    render:function(){
        var ifChecked = "",
            isChecked = "";
        if(this.state.checked){
            ifChecked = "checked";
            isChecked = "checked";
        }else{
            ifChecked = "";
        }
        return (
            <table className="list-table">
                <thead>
                <tr>
                    <th></th>
                    <th>标题</th>
                    <th>时间</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr className={ifChecked}>
                    <td><input type="checkbox" name="myQN" onChange={this.handleClick} checked={isChecked} /></td>
                    <td>这是我的第一份问卷</td>
                    <td>2016-05-12 11:15:56</td>
                    <td className="pubing">发布中</td>
                    <td>
                        <input type="button" value="编辑" onClick={this.edit}/>
                        <input type="button" value="删除" onClick={this.delete}/ >
                        <input type="button" value="查看数据" onClick={this.detail}/>
                    </td>
                </tr>
                <tr className={ifChecked}>
                    <td><input type="checkbox" name="myQN" onChange={this.handleClick} checked={isChecked} /></td>
                    <td>这是我的第二份问卷</td>
                    <td>2016-05-12 11:15:56</td>
                    <td className="unpub">未发布</td>
                    <td>
                        <input type="button" value="编辑" onClick={this.edit}/>
                        <input type="button" value="删除" onClick={this.delete}/ >
                        <input type="button" value="查看数据" onClick={this.detail}/>
                    </td>
                </tr>
                <tr className={ifChecked}>
                    <td><input type="checkbox" name="myQN" onChange={this.handleClick} checked={isChecked} /></td>
                    <td>这是我的第二份问卷</td>
                    <td>2016-05-12 11:15:56</td>
                    <td className="pubed">已发布</td>
                    <td>
                        <input type="button" value="编辑" onClick={this.edit}/>
                        <input type="button" value="删除" onClick={this.delete}/ >
                        <input type="button" value="查看数据" onClick={this.detail}/>
                    </td>
                </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td><input type="checkbox" id="selectAll" onChange={this.handleChange}/>全选</td>
                        <td><input type="button" value="删除" onClick={this.delete}/></td>
                        <td><input type="button" id="addQn" value="+ 新增问卷" onClick={this.addQuest}/></td>
                    </tr>
                </tfoot>
            </table>
        )
    }
})
ReactDOM.render(
    <ListBox />,
    document.getElementById("container")
);

/**
 * [Mask component] 01-2
 */
var Mask = React.createClass({
    // getInitialState:function(){//不用state来操控，直接通过控制class来操作
    //     return {
    //         display:false,
    //     }
    // },
    handleClick:function(){
        // this.setState({display: !this.state.display});
        document.getElementById("maskControl").className = "hide";
    },
    render:function(){
        var isShow = "hide";
        // var isShow = ""; 
        // if(this.state.display==true){
        //     isShow = "show";
        // }else{
        //     isShow = "hide";
        // }
        return (
            <div id="maskControl" className={isShow}>
                <div className="mask"></div>
                <div className="alert">
                    <div className="alert-top">
                        <span>提示</span>
                        <span className="close" onClick={this.handleClick} >X</span>
                    </div>
                    <div className="alert-bottom">
                        <p>确认要删除此问卷？</p>
                        <div>
                            <input type="button" value="确定" />
                            <input type="button" value="取消" onClick={this.handleClick}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})
ReactDOM.render(
    <Mask />,
    document.getElementById("mask")
);
/**
 * [Detail component] 01-3
 */
var Detail = React.createClass({
    goHome:function(){
        ReactDOM.render(
            <ListBox />,
            document.getElementById("container")
        );
    },
    render:function(){
        return (
            <div className="datail">
                <div className="detail-header">
                    <span onClick={this.goHome}><img src="imgs/back-16.png" alt="back"/>返回</span>
                    <div>
                        <h2>这里是标题</h2>
                        <p>此统计分析只包含完整回收的数据</p>
                    </div>
                </div>
                <div className="detail-boxes">
                    <div className="detail-box">
                        <div>
                            <span>Q1</span>
                            <dl>
                                <dt>单选题</dt>
                                <dd>选项一</dd>
                                <dd>选项二</dd>
                            </dl>
                        </div>
                        <div className="detail-chart">
                            <p>数据占比</p>
                            <div>
                                这里是图标
                            </div>
                        </div>
                    </div>
                    <div className="detail-box">
                        <div>
                            <span>Q2</span>
                            <dl>
                                <dt>多选题</dt>
                                <dd>选项一</dd>
                                <dd>选项二</dd>
                                <dd>选项三</dd>
                                <dd>选项四</dd>
                            </dl>
                        </div>
                        <div className="detail-chart">
                            <p>数据占比</p>
                            <div>
                                这里是图标
                            </div>
                        </div>
                    </div>
                    <div className="detail-box">
                        <div>
                            <span>Q3</span>
                            <dl>
                                <dt>单选题</dt>
                                <dd>选项一</dd>
                                <dd>选项二</dd>
                            </dl>
                        </div>
                        <div className="detail-chart">
                            <p>数据占比</p>
                            <div>
                                这里是图标
                            </div>
                        </div>
                    </div>
                    <div className="detail-box">
                        <div>
                            <span>Q4</span>
                            <dl>
                                <dt>文本题</dt>
                                <dd>选项一</dd>
                                <dd>选项二</dd>
                            </dl>
                        </div>
                        <div className="detail-chart">
                            <p>有效回答占比</p>
                            <div>
                                这里是图标
                            </div>
                        </div>
                    </div>
                </div>
                <div className="detail-bottom" onClick={this.goHome}>
                    <img src="imgs/back-32.png" alt="back"/>
                    <span>返回</span>
                </div>
                
            </div>
        )
    }
})
// ReactDOM.render(
//     <Detail />,
//     document.getElementById("detail")
// );
/**
 * [Add component] 新建问卷页 02-1
 */
var Add = React.createClass({
    edit:function(){
        ReactDOM.render(
            <Edit />,
            document.getElementById("container")
        )
    },
    render:function(){
        return (
            <div className="add" onClick={this.edit}>
                <div className="add-icon"><img src="imgs/add-32.png" alt="add"/></div>
                <span>新建问卷</span>
            </div>
        )
    }
});
// ReactDOM.render(
//     <Add />,
//     document.getElementById("add")
// );
/**
 * [Edit component] 问卷编辑页 03-1
 */
var Edit = React.createClass({
    getInitialState:function(){
        return {
            value:"这里是标题",
            display:false,
            data:[],
            questType:"单选题",
            www:"<dd>单选一</dd><dd>单选二</dd>",
        }
    },
    handleClick:function(){
        this.setState({display:!this.state.display})
    },
    handleChange:function(event){
        this.setState({value:event.target.value})
    },
    makeChoice:function(event){
        if(event.target.innerHTML == "单选"){
            this.setState({questType:"单选题"});
        }else if(event.target.innerHTML == "多选"){
            this.setState({questType:"多选题"});
        }else{
            this.setState({questType:"文本题"});
        }
    },
    render:function(){
        var questIndex,moveUp,moveDown,copy,dele,choiceType;
        var value = this.state.value,isShow="";
        if(this.state.display){
            isShow = "show";
        }else{
            isShow = "hide";
        }

        if(this.state.questType=="单选题"){
            choiceType = this.state.www;
        }else if(this.state.questType=="多选题"){
            choiceType = "<dd>选项一</dd><dd>选项二</dd><dd>选项三</dd><dd>选项四</dd>"
        }else if(this.state.questType=="文本题"){
            choiceType = "<dd><textarea></textarea></dd>";
        }else{
            return;
        }

        return (
            <div className="edit">
                <div className="edit-header">
                    <input type="text" value={value} onChange={this.handleChange}/>
                </div>
                <div className="edit-qbox">
                    <span>{questIndex}</span>
                    <dl>
                        <dt>{this.state.questType}</dt>
                        <dd>{choiceType}</dd>
                    </dl>
                    <div>
                        <span>{moveUp}</span>
                        <span>{moveDown}</span>
                        <span>{copy}</span>
                        <span>{dele}</span>
                    </div>
                </div>
                <div className="edit-body">
                    <ul className={isShow}>
                        <li onClick={this.makeChoice}><img src="imgs/radio-16.png" alt="q-icon"/><span>单选</span></li>
                        <li onClick={this.makeChoice}><img src="imgs/check-16.png" alt="q-icon"/><span>多选</span></li>
                        <li onClick={this.makeChoice}><img src="imgs/text-16.png" alt="q-icon"/><span>文本题</span></li>
                    </ul>
                    <span onClick={this.handleClick}>+ 添加问题</span>
                </div>
                <div className="edit-footer">
                    <div>
                        <span>问卷截至日期</span>
                        <input type="text" />
                    </div>
                    <div>
                        <input type="button" value="保存问卷"/>
                        <input type="button" value="发布问卷"/>
                    </div>
                </div>
            </div>
        )
    }
})
// ReactDOM.render(
//     <Edit />,
//     document.getElementById("edit")
// )
