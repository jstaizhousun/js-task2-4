//接收页面matching传递的参数并还原数组
var url =window.location.search;
var b = url.split("?")[1];
var arrAll = b.split("-");
var i = 1;
//构建一个函数，使得B显C隐
function bOncOff() {
	document.getElementById("picB").style.display = "block";
	document.getElementById("btnB").style.display = "block";	
	document.getElementById("picC").style.display = "none";
	document.getElementById("btnC").style.display = "none";
}
//构建一个函数，使得C显B隐
function cOnbOff() {
	document.getElementById("picB").style.display = "none";
	document.getElementById("btnB").style.display = "none";
	document.getElementById("picC").style.display = "block";
	document.getElementById("btnC").style.display = "block";			
}
//构建一个函数，使得A隐
function aOn() {
	document.getElementById("picA").style.display = "none";
	document.getElementById("btnA").style.display = "none";
}
//构建一个函数，使得A显B隐
function aOnbOff() {
	document.getElementById("picB").style.display = "none";
	document.getElementById("btnB").style.display = "none";
	document.getElementById("picA").style.display = "block";
	document.getElementById("btnA").style.display = "block";
}
//构建一个函数，使得A显C隐
function aOncOff() {
	document.getElementById("picC").style.display = "none";
	document.getElementById("btnC").style.display = "none";
	document.getElementById("picA").style.display = "block";
	document.getElementById("btnA").style.display = "block";
}
//构建一个函数，获取i的值并表示成数字
function numAll() {
	document.getElementById("n").innerHTML = i;
	document.getElementById("numA").innerHTML = i;
	if (i+1<=arrAll.length){
		document.getElementById("numB").innerHTML = i+1;
		document.getElementById("numC").innerHTML = i+1;
	}
	else {
		document.getElementById("btnB").innerHTML = "跳转至法官页面";
		document.getElementById("btnC").innerHTML = "跳转至法官页面";
	}
}
//构建一个函数，当数组中元素为P时显示水民。为K时显示杀手
function selectKP() {
		if (arrAll[i-1]=="K"){
			bOncOff();
		}
		else {
			cOnbOff();
		}
	}
//构建一个函数当i大于数组长度时执行跳转页面
function igo() {
	if(i>arrAll.length) {
		par();
	}
}
//获取并点击按钮A
var btnA =document.getElementById("btnA");
btnA.onclick = function() {
	aOn();
	selectKP();
}
//获取并点击按钮B
var btnB =document.getElementById("btnB");
btnB.onclick = function() {
	aOnbOff();
	i++;
	igo();
	numAll();
}
//获取并点击按钮C
var btnC =document.getElementById("btnC");
btnC.onclick = function() {
	aOncOff();
	i++;
	igo();
	numAll();
}
//封装数组并传参
function par() {
	var arrAll2 = arrAll.join("-");
	location.href="judge.html?"+encodeURI(arrAll2);
}