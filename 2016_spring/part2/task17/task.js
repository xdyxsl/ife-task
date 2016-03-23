/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

//随机RGB颜色
function randomColor(){
  color = {
    r : Math.floor(Math.random()*250),
    g : Math.floor(Math.random()*250),
    b : Math.floor(Math.random()*250),
  }
  return color.r+','+color.g+','+color.b;
}

// 用于渲染图表的数据
 chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var chart_wrap = document.getElementById('aqi-chart-wrap');//获取表格区的内容

  var now_select_city = pageState["nowSelectCity"];//当前选择城市
  var now_gra_time = pageState["nowGraTime"];//当前选择的粒度,默认是day
 console.log(now_select_city,now_gra_time);
  var graData = chartData[now_gra_time][now_select_city];
  console.log("graData",graData);

  //设置HTML样式模板
  var style = "style='width:{width};height:{height};background-color:rgba({color},0.6)'";
  var title = "title = {title}的空气质量数值为：{data}";
  var module = "<div "+style+title+" ></div>";

  var html = "";//循环体外先声明
  for(var x in graData){
    html += module.replace('{width}',graData[x]['width']).replace('{height}',graData[x]['height']).replace('{color}',graData[x]['color']).replace('{title}',graData[x]['title']).replace('{data}',graData[x]['data']);//调用5次replace()方法动态设置浏览器元素为数据组里的数据
    console.log("graData的x是 ",x,"render里面的graData ",graData,"render里面的graData[x] ",graData[x])

  }
  chart_wrap.innerHTML = html;
}
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(e) {
// 确定是否选项发生了变化 
  if(pageState["nowGraTime"] == e.target.value){return false};
  // 设置对应数据
  pageState["nowGraTime"] = e.target.value;
  // 调用图表渲染函数
  renderChart()
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(e) {
  // 确定是否选项发生了变化 
  if(pageState["nowSelectCity"] == e.target.value){return false};
  // 设置对应数据
  pageState["nowSelectCity"] = e.target.value;
  // 调用图表渲染函数
  renderChart()
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var form_gra_time = document.getElementById('form-gra-time');
  form_gra_time.addEventListener("change",graTimeChange,false);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var result = "";
  for(var city in aqiSourceData){
    result += "<option>"+city+"</option>"
  }
  var city_select = document.getElementById('city-select');
  city_select.innerHTML = result;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  city_select.addEventListener("change",citySelectChange,false)
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  
  var day ={};//创建天为单位的数组

  var week = {};//创建周为单位的数组

  var month = {};//创建月为单位的数组

  for(var city in aqiSourceData){
    //先遍历声明日、周、月的数组
    day[city] = {};
    week[city] = {};
    month[city] = {};
    for(var data in aqiSourceData[city]){//再次遍历，把每个城市对应的数据挑出来

      var sourceData = aqiSourceData[city][data];//aqiSourceData[city][data]是每个城市的每日空气质量数据
      var dayGet = {};//声明一个数组暂时存放需要的数据
      dayGet['data'] = sourceData; //把数据赋给date属性
      dayGet['height'] = sourceData*0.75 + "px";//把数据值乘以0.75赋给height，给以后动态调用
      dayGet['width'] ='10px';//每日数据的宽度设为10px
      dayGet['color'] = randomColor();
      dayGet['title'] = city;

      day[city][data] = dayGet;//把dayGet所获得的动态数组赋给day数组的当前值

    }
  } console.log(day)
  chartData.day = day;
    
}

/**
 * 初始化函数
 */
function init() {

  initGraTimeForm()
  initCitySelector();
  initAqiChartData();


  if (pageState['nowSelectCity'] == -1) {
    pageState['nowSelectCity'] = '北京';
    renderChart();
  }
}
init();