/**
 * [Header component]
 */
var HeaderContent = React.createClass({
    render:function(){
        return (
            <div>
                <img src="log_50x50.png" />
                <h3>问卷管理</h3>
                <span>我的问卷</span>
            </div>
        );
    },
})

ReactDOM.render(
    <HeaderContent />,
    document.getElementsByClassName('js-header')[0]
);
/**
 * [List component] 01-1
 */
var ListTable = React.createClass({
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
    render:function(){
        var ifChecked = "";
        var isChecked = "";
        if(this.state.checked){
            ifChecked = "checked";
            isChecked = "checked";
        }else{
            ifChecked = "";
        }
        return (
            <table>
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
                        <input type="button" value="编辑" />
                        <input type="button" value="删除" onClick={this.delete}/ >
                        <input type="button" value="查看数据" />
                    </td>
                </tr>
                <tr className={ifChecked}>
                    <td><input type="checkbox" name="myQN" onChange={this.handleClick} checked={isChecked} /></td>
                    <td>这是我的第二份问卷</td>
                    <td>2016-05-12 11:15:56</td>
                    <td className="unpub">未发布</td>
                    <td>
                        <input type="button" value="编辑" />
                        <input type="button" value="删除" onClick={this.delete}/ >
                        <input type="button" value="查看数据" />
                    </td>
                </tr>
                <tr className={ifChecked}>
                    <td><input type="checkbox" name="myQN" onChange={this.handleClick} checked={isChecked} /></td>
                    <td>这是我的第二份问卷</td>
                    <td>2016-05-12 11:15:56</td>
                    <td className="pubed">已发布</td>
                    <td>
                        <input type="button" value="编辑" />
                        <input type="button" value="删除" onClick={this.delete}/ >
                        <input type="button" value="查看数据" />
                    </td>
                </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td><input type="checkbox" id="selectAll" onChange={this.handleChange}/>全选</td>
                        <td><input type="button" value="删除" onClick={this.delete}/></td>
                        <td><input type="button" id="addQn" value="+ 新增问卷"/></td>
                    </tr>
                </tfoot>
            </table>
        )
    }
})
ReactDOM.render(
    <ListTable />,
    document.getElementById("container")
)

/**
 * [Mask component] 01-2
 */
var Mask = React.createClass({
    getInitialState:function(){
        return {
            display:false,
        }
    },
    handleClick:function(){
        this.setState({display: !this.state.display});
    },
    render:function(){
        var isShow = "";
        if(this.state.display==true){
            isShow = "show";
        }else{
            isShow = "hide";
        }
        return (
            <div id="maskControl" className={isShow}>
                <div className="mask"></div>
                <div className="alert">
                    <div className="alert-top">
                        <span>提示</span>
                        <span onClick={this.handleClick} className="close">X</span>
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
    document.getElementById("mask-component")
)
/**
 * [Detail component] 01-3
 */