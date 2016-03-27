/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */

function addAqiData() {
	var city = document.getElementById("aqi-city-input");
	var value = document.getElementById("aqi-value-input");
  var cityString = city.value.toString().trim();
  var valueString = value.value.toString().trim();
  if(!cityString.match(/^[A-Za-z\u4E00-\u9FA5]+$/) || !valueString.match(/^\d+$/)){
    alert("输入有误！请重新输入！");
  } else {  
    aqiData[cityString] = valueString - 0;
  }
}
/**
 * 渲染aqi-table表格
 */

//判断对象是否为空
 function isEmptyObject(obj){
    for(var n in obj){
      return false
    } 
    return true; 
} 

function renderAqiList(){
  var table = document.getElementById("aqi-table");
   while(table.hasChildNodes()) 
   //当table下还存在子节点时 循环继续
    {
        table.removeChild(table.firstChild);
    }
  if(!isEmptyObject(aqiData)){
    var trh = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    table.appendChild(trh);
    td1.innerHTML = "城市";
    trh.appendChild(td1);
    td2.innerHTML = "空气质量";
    trh.appendChild(td2);
    td3.innerHTML = "操作";
    trh.appendChild(td3);
    for(var i in aqiData){
      var tr = document.createElement("tr");
      table.appendChild(tr);
      var city = document.createElement("td");
      city.innerHTML = i
      //Object.keys(aqiData)[i];
      tr.appendChild(city);
      var value = document.createElement("td");
      value.innerHTML = aqiData[i];
      tr.appendChild(value);
      var td = document.createElement("td");
      var delBtn = document.createElement("button");
      delBtn.innerHTML = "删除";
      delBtn.id = "delBtn" + i ;
      tr.appendChild(td);
      td.appendChild(delBtn);
      delBtn.onclick = delBtnHandle;
    }
  }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  for(var i in aqiData){
    if(this.id == "delBtn" + i){  
    delete aqiData[i];
    }
  }
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var addBtn = document.getElementById("add-btn");
  addBtn.onclick = addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
}

init();