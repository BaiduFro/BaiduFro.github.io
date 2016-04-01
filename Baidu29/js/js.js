//注释仅供很恨很恨很很入门的小伙伴参考

	var testButton = document.getElementById("testButton");
	//获取按钮对象
	var infoDisplay = document.getElementById("infoDisplay");
	//获取提示信息框对象
	var contentBox = document.getElementById("contentBox");
	//获取输入框对象

	function test(){
		var stringToTest = contentBox.value;
		//从输入框获取内部值
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
				infoDisplay.style.color = "#ff6f6f"//调整提示信息的颜色
				contentBox.style.backgroundImage= "url(./image/textbox_red.png)";//输入框是用backgroundimage做的所以用js改下背景
				infoDisplay.innerHTML="名称不能为空";//调整提示文字
			}
		else if(stringLength <=3 || stringLength>=17)
			{
				infoDisplay.style.color = "#ff6f6f"
				contentBox.style.backgroundImage= "url(./image/textbox_red.png)";
				infoDisplay.innerHTML="长度为4~16个字符";
			}
		else
			{
				infoDisplay.style.color = "#3bdf6a"
				contentBox.style.backgroundImage= "url(./image/textbox_green.png)";
				infoDisplay.innerHTML="通过验证";
			}
		
		
	}
