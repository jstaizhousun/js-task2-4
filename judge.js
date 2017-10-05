//接收参数并转化为数组
var url = window.location.search;
var b = url.split("?")[1];
var arrAll = b.split("-");
var length = arrAll.length;
//根据人数创建div
function creatediv (){
	var x = "";
	for (var i=0;i<length;i++){
	var a = "<div class=content><div class=status id=a"+i+"></div><div class=number id=b"+i+"></div></div>";
	x = x+a;
	}
	return x;
};
document.getElementById("main").innerHTML = creatediv();
//判断杀手和水民
function selectKP() {
	for (var i=0; i<length;i++){	
		if (arrAll[i]=="P"){	
			document.getElementById("a"+i).innerHTML="刁民";
		}
		else {
			document.getElementById("a"+i).innerHTML="杀手";
		}	
	} 
}
//编号
function number() {
	for (var i=0; i<length;i++){
		document.getElementById("b"+i).innerHTML=i+1+"号";
	}
}
//打开页面时执行
window.onload = function(){
	selectKP();
	number()
}
//打包数组准备传参；
function par () {
	var b = arrAll.join("-");
	location.href="judge-stage.html?"+encodeURI(b);
}
//点击按钮时执行
var btn = document.getElementById("btn");
btn.onclick = function(){
	par ();
}