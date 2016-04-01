//大致的结构是
//del_ff函数
//		因为在输入框发生变化时要通过节点移动查找的
//	方法去找到相应操作的对应节点，然而浏览器对于页
//  面节点的解读有所不同，chrome，firefox都会将html
//  标签直接的换行符解读为文本节点，因而需要一个函
//  数来通过先遍历一遍子节点并根据nodeName来清除文
//  本节点的方法“净化”一个获取了的DOM对象
//  （其实是网上扒的）

//正常输入时的提示函数guideGive
//		由于这个过程只涉及到一个很单纯的过程:
//   “输入类型”-->“提示信息”的简单映射，所以先获取
//   父节点的className再进行判断输出即可

//失去焦点时autoCheck + statusCheck函数
//		autoCheck获取对象并从中获取到需要的值和有
//	关操作对象，并传递给statusCheck处理，根据获取
//  的规则和检测对象，对操作对象进行相关的输出。

//checkAll提交全部内容时触发
//		即获取所有的事件触发对象（输入框），并让
//	他们通过先前的失去焦点绑定的函数来检测，通过
//  对一些特征的检测来判定各个框是否都是通过检测的

function del_ff(elem){
	var elem_child = elem.childNodes;
	for(var i=0; i<elem_child.length;i++){
		if(elem_child[i].nodeName == "#text" && !/\s/.test(elem_child.nodeValue))
		{
			elem.removeChild(elem_child[i]);
		}
	}
	return elem;
}
function guideGive(obj){
	var handledParentNode = del_ff(obj.parentNode);
	var tipGivingBox = handledParentNode.childNodes[2]
	var stringContainer = handledParentNode.childNodes[1]
	var ruleName = obj.parentNode.className;
	if(ruleName == "Name"){
		tipGivingBox.innerHTML = "请输入4~16位字符";
		stringContainer.style.backgroundImage = "url(image/textbox_gray.png)";
		tipGivingBox.style.color = "gray";
	}
	else if(ruleName == "Pass"){
		tipGivingBox.innerHTML = "请输入4~16位字符,仅支持英文数字下划线";
		stringContainer.style.backgroundImage = "url(image/textbox_gray.png)";
		tipGivingBox.style.color = "gray";
	}
	else if(ruleName == "PassCheck"){
		tipGivingBox.innerHTML = "请再次输入密码";
		stringContainer.style.backgroundImage = "url(image/textbox_gray.png)";
		tipGivingBox.style.color = "gray";
	}
	else if(ruleName == "Email"){
		tipGivingBox.innerHTML = "请输入邮箱地址"
		stringContainer.style.backgroundImage = "url(image/textbox_gray.png)";
		tipGivingBox.style.color = "gray";
	}
	else if(ruleName == "Tel"){
		tipGivingBox.innerHTML = "请输入手机号码"
		stringContainer.style.backgroundImage = "url(image/textbox_gray.png)";
		tipGivingBox.style.color = "gray";
	}
}
function autoCheck(obj)
{
	var handledParentNode = del_ff(obj.parentNode);
	var tipGivingBox = handledParentNode.childNodes[2];
	var stringContainer = handledParentNode.childNodes[1];
	var stringToTest = handledParentNode.childNodes[1].value;
	var ruleName = obj.parentNode.className;
	statusCheck(stringToTest,ruleName,stringContainer,tipGivingBox)
}
function statusCheck(stringToTest,ruleName,stringContainer,tipGivingBox){
	if(ruleName == "Name")
	{
		var stringLength;//字符串计算总长度
		var stringCNsign;//字符串中中文符号的个数
		var stringCNword;//字符串中中文字符的个数
		if((stringToTest.match(/[\uFF00-\uFFEF]/g))==null)
			stringCNsign = 0;
		else
			stringCNsign = stringToTest.match(/[\uFF00-\uFFEF]/g).length;
		//String.match(RegExp)方法可以根据正则表达式查找字符或字符串，并以次为分隔单位将查找到的字符/串推入一个数组
		//方便用.length方法来检查个数，但是如果match了0个，返回的是一个null所以要单独处理...	

		if((stringToTest.match(/[\u4E00-\u9FA5\uF900-\uFA2D]/g))==null)
			stringCNword = 0;
		else
			stringCNword = stringToTest.match(/[\u4E00-\u9FA5\uF900-\uFA2D]/g).length;
		//同上
		stringLength = stringCNword + stringCNsign + stringToTest.length;
		//字符串“长度”=字符个数（不计类型）+字符串中特殊字符的个数
		if(stringLength == 0)//根据检测的结果进行不同的响应
			{
				tipGivingBox.style.color = "#ff6f6f"//调整提示信息的颜色
				stringContainer.style.backgroundImage= "url(./image/textbox_red.png)";//输入框是用backgroundimage做的所以用js改下背景
				tipGivingBox.innerHTML="名称不能为空";//调整提示文字
			}
		else if(stringLength <=3 || stringLength>=17)
			{
				tipGivingBox.style.color = "#ff6f6f"
				stringContainer.style.backgroundImage= "url(./image/textbox_red.png)";
				tipGivingBox.innerHTML="长度为4~16个字符";
			}
		else
			{
				tipGivingBox.style.color = "#3bdf6a"
				stringContainer.style.backgroundImage= "url(./image/textbox_green.png)";
				tipGivingBox.innerHTML="通过验证";
			}
	}
	else if(ruleName == "Pass")
	{
		if(stringToTest.length == 0)
		{
			tipGivingBox.style.color = "#ff6f6f"//调整提示信息的颜色
			stringContainer.style.backgroundImage= "url(./image/textbox_red.png)";//输入框是用backgroundimage做的所以用js改下背景
			tipGivingBox.innerHTML="密码不能为空";//调整提示文字		
		}
		else if(stringToTest.match(/[A-Za-z0-9_]/g) == null)
		{
			tipGivingBox.style.color = "#ff6f6f"//调整提示信息的颜色
			stringContainer.style.backgroundImage= "url(./image/textbox_red.png)";//输入框是用backgroundimage做的所以用js改下背景
			tipGivingBox.innerHTML="仅支持英文数字下划线";//调整提示文字
		}
		else if(stringToTest.match(/[A-Za-z0-9_]/g).length != stringToTest.length)
		{
			tipGivingBox.style.color = "#ff6f6f"//调整提示信息的颜色
			stringContainer.style.backgroundImage= "url(./image/textbox_red.png)";//输入框是用backgroundimage做的所以用js改下背景
			tipGivingBox.innerHTML="含有非法字符,仅支持英文数字下划线";//调整提示文字
		}
		else if(stringToTest.length <=3|| stringToTest.length >=17)
		{
			tipGivingBox.style.color = "#ff6f6f"//调整提示信息的颜色
			stringContainer.style.backgroundImage= "url(./image/textbox_red.png)";//输入框是用backgroundimage做的所以用js改下背景
			tipGivingBox.innerHTML="密码过长或过短，请控制在4-16位以内";//调整提示文字
		}
		else 
		{
			tipGivingBox.style.color = "#3bdf6a"
			stringContainer.style.backgroundImage= "url(./image/textbox_green.png)";
			tipGivingBox.innerHTML="通过验证";
		}
		var handledGrandParentNode = del_ff(stringContainer.parentNode.parentNode);
		var handledGrandParentNode = del_ff(stringContainer.parentNode.parentNode);
		var i ;
		var handledNextParentNode ; 
		for(i = 0;handledGrandParentNode.childNodes[i]!=stringContainer.parentNode;i++);
		handledNextParentNode = del_ff((handledGrandParentNode.childNodes[i+1]));
		if(tipGivingBox.innerHTML=="通过验证"&&stringToTest == handledNextParentNode.childNodes[1].value)
		{
			handledNextParentNode.childNodes[2].innerHTML="通过验证";
			handledNextParentNode.childNodes[1].style.backgroundImage= "url(./image/textbox_green.png)";
			handledNextParentNode.childNodes[2].style.color = "#3bdf6a";
		}
		else if(handledNextParentNode.childNodes[1].value.length!=0)
		{
			handledNextParentNode.childNodes[2].style.color = "#ff6f6f"//调整提示信息的颜色
			handledNextParentNode.childNodes[1].style.backgroundImage= "url(./image/textbox_red.png)";//输入框是用backgroundimage做的所以用js改下背景
			handledNextParentNode.childNodes[2].innerHTML="请重新确认密码";//调整提示文字
		}
	}
	else if(ruleName == "PassCheck")
	{
		var handledGrandParentNode = del_ff(stringContainer.parentNode.parentNode);
		var i ;
		var handledPrevParentNode ; 
		for(i = 0;handledGrandParentNode.childNodes[i]!=stringContainer.parentNode;i++);
		handledPrevParentNode = del_ff((handledGrandParentNode.childNodes[i-1]));
		if(stringToTest == handledPrevParentNode.childNodes[1].value && handledPrevParentNode.childNodes[2].innerHTML == "通过验证")
		{
			tipGivingBox.style.color = "#3bdf6a"
			stringContainer.style.backgroundImage= "url(./image/textbox_green.png)";
			tipGivingBox.innerHTML="通过验证";
		}
		else if(handledPrevParentNode.childNodes[2].innerHTML != "通过验证")
		{
			tipGivingBox.style.color = "#ff6f6f"
			stringContainer.style.backgroundImage= "url(./image/textbox_red.png)";
			tipGivingBox.innerHTML="请先输入正确的密码";
		}
		else
		{
			tipGivingBox.style.color = "#ff6f6f"
			stringContainer.style.backgroundImage= "url(./image/textbox_red.png)";
			tipGivingBox.innerHTML="前后两次密码不符";
		}
	}
	else if(ruleName == "Email")
	{
		if(stringToTest.length == 0)
		{
			tipGivingBox.style.color = "#ff6f6f"
			stringContainer.style.backgroundImage= "url(./image/textbox_red.png)";
			tipGivingBox.innerHTML="邮箱不能为空";
		}
		else if(stringToTest.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g)==null)
		{
			tipGivingBox.style.color = "#ff6f6f"
			stringContainer.style.backgroundImage= "url(./image/textbox_red.png)";
			tipGivingBox.innerHTML="请输入正确的邮箱格式";
		}
		else
		{
			tipGivingBox.style.color = "#3bdf6a"
			stringContainer.style.backgroundImage= "url(./image/textbox_green.png)";
			tipGivingBox.innerHTML="通过验证";
		}
	}
	else if(ruleName == "Tel")
	{
		if(/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(stringToTest))
		{
			tipGivingBox.style.color = "#3bdf6a"
			stringContainer.style.backgroundImage= "url(./image/textbox_green.png)";
			tipGivingBox.innerHTML="通过验证";
		}
		else
		{
			tipGivingBox.style.color = "#ff6f6f"
			stringContainer.style.backgroundImage= "url(./image/textbox_red.png)";
			tipGivingBox.innerHTML="请输入正确的手机号码格式";
		}
		if(stringToTest.length == 0)
		{
			tipGivingBox.style.color = "#ff6f6f"
			stringContainer.style.backgroundImage= "url(./image/textbox_red.png)";
			tipGivingBox.innerHTML="手机号码不能为空";
		}
	}
}
function checkAll(){
    var boxs = document.getElementsByTagName("input");
	var i;
	var flag = true;
	for(i = 0;i < boxs.length;i++)
	{
		autoCheck(boxs[i]);
		if(boxs[i].style.backgroundImage != "url(./image/textbox_red.png)")
			flag = false;
	}
	setTimeout(function(){
		if(flag){
			alert("提交成功♂");
		}
		else{
			alert("提交失败♀")
		}
	},200)
}