//获取按钮get
var get = document.getElementById("get");
//获取杀手
var killerNuma = document.getElementById("killerNum");
//获取水民
var personNum = document.getElementById("personNum");

//合并杀手与水民,显示并随机排序
function rndPK(x) {
	var x;
	var y = num-x;
	killerNuma.innerHTML = x;
	personNum.innerHTML = y;
	killerNum = x;
	peopleNum = y;
}

//获取杀手和水民的数量并打乱
function getNum() {
	num = document.getElementsByName("num")[0].value;
	if (5<num&num<9) {
		rndPK(1);
	}
	else {
		if (8<num&num<12) {
			rndPK(2)
		}
		else{
			if (11<num&num<16) {
				rndPK(3)
			}
			else {
				if (15<num&num<19) {
					rndPK(4)
				}
				else {
					 killerNum.innerHTML = "";
					 personNum.innerHTML = "";
				}
			}
		}
	}
}

//封装数组并传参
function par() {
	sessionStorage.setItem("KillerNum",killerNum);
    sessionStorage.setItem("PeopleNum",peopleNum);
    window.location.href="deal.html"
}
//按钮点击事件
get.onclick = function() {
	if (5<num&num<19) {
	getNum();
	par();
	}
	else {
		alert("请输入正确的玩家数量");
	}
}
//按下enter建触发的事件
document.onkeydown=function(event){
  	var e = event||window.event||arguments.callee.caller.arguments[0];
  	if(e && e.keyCode==13){ // enter 键
      get.onclick();//要做的事情
 	}
}; 
