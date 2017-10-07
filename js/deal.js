(function(){
    var btnReturnSetting = document.getElementById("return-setting"),
        btnQuitGame = document.getElementById("quit-game"),
        btnLook = document.getElementById("look"),
        cardImg = document.getElementById("card-img"),
        cardNum = document.getElementById("card-number"),
        role = document.getElementById("role"),
        killerNum = parseInt(sessionStorage.getItem("KillerNum")),
        peopleNum = parseInt(sessionStorage.getItem("PeopleNum")),
        playerNum = killerNum + peopleNum,
        onclickNum = 1,
        playerArr = [];

    //分配身份
    function Deal(){
        var arr = [];
        for(var i=0;i<killerNum;i++){
            arr.push("杀手");
        }
        for(i=0;i<peopleNum;i++){
            arr.push("平民");
        }
        for(i=0;i<playerNum;i++){
            var j = parseInt(Math.random()*(playerNum-i));
            var obj = {};
            obj.name = arr[j];
            obj.die = 0;
            obj.why = "nothing";
            playerArr[i] = obj;
            arr.splice(j,1);
            //console.log(arr);
        }
        //保存数据
        var ar = JSON.stringify(playerArr);
        sessionStorage.setItem("PlayerArr",ar);
        //console.log(ar);
        var day = 1;
        sessionStorage.setItem("Day",day);
        //console.log(day);
    }
    Deal();

    //点击翻牌
    btnLook.onclick =function(){
        if (cardImg.getAttribute("src") === "../img/img1.jpg"){
            cardImg.src = "../img/img2.jpg";
            btnLook.innerHTML = "隐藏并传递给" + (onclickNum+1) + "号";
            cardImg.className = "card-img2";
            role.style.display = "block";
            role.innerHTML = playerArr[onclickNum-1].name;
            if(onclickNum === playerNum){
                btnLook.innerHTML = "法官查看";
            }
        }else{
            onclickNum +=1;
            if(onclickNum > playerNum){
                window.location.href = "diary.html";
                return;
            }
            cardImg.src = "../img/img1.jpg";
            cardNum.innerHTML = onclickNum;
            btnLook.innerHTML = "查看" + onclickNum + "号身份";
            cardImg.className = "card-img1";
            role.style.display = "none";
        }
    };
    btnReturnSetting.onclick = function(){
        sessionStorage.setItem("Day",1);
        window.location.href = "setting.html";
    };
    btnQuitGame.onclick = function(){
        var r = confirm("确定要退出游戏？");
        if (r === true){
            window.location.href = "../index.html";
        }
    };
})();