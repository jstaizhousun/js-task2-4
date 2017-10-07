/**
 * Created by Rayr Lee on 2017/9/24.
 */

(function(){
    var btnReturnDiary = document.getElementById("return-diary"),
        btnQuitGame    = document.getElementById("quit-game"),
        btnGameOver    = document.getElementById("game-over"),
        btnDiray       = document.getElementById("diary"),
        day            = document.getElementsByClassName("day"),
        stage          = document.getElementsByClassName("stage"),
        item           = document.getElementsByClassName("item"),
        result         = document.getElementsByClassName("result"),
        container      = document.getElementById("container"),
        lastDay        = document.getElementById("last-day"),
        lastStage      = document.getElementById("stage"),
        btnKill        = document.getElementById("kill"),
        killWho        = document.getElementById("who-die"),
        btnLastWord    = document.getElementById("last-word"),
        btnSpeak       = document.getElementById("speak"),
        btnVote        = document.getElementById("vote"),
        voteWho        = document.getElementById("vote-who"),
        killerNum      = parseInt(sessionStorage.getItem("KillerNum")),
        peopleNum      = parseInt(sessionStorage.getItem("PeopleNum")),
        playerNum      = killerNum + peopleNum,
        playerArr      = JSON.parse(sessionStorage.getItem("PlayerArr")),
        today          = parseInt(sessionStorage.getItem("Day")),
        event          = parseInt(sessionStorage.getItem("Event"));


    // 测试用
    // playerArr[3].die = 1;
    // playerArr[3].why = "kill";
    // playerArr[6].die = 1;
    // playerArr[6].why = "vote";
    // today =3;

    // today:用来记录游戏进行到第几天
    // event:用来记录tag操作到第几步

    console.log("游戏第"+today+"天");
    console.log(playerArr);
    console.log("event = "+event);

    function Write(){
        container = $(container);
        for(var i=1;i<today;i++){
            //遍历输出相应的用户数据
            var name1="", number1="", name2="", number2="";
            for(var j=0;j<playerNum;j++){
                if(playerArr[j].die === i){
                    if(playerArr[j].why === "kill"){
                        //这里的j是用户下标，所以要加1
                        number1 = j+1;
                        name1 = playerArr[j].name;
                    }else{
                        number2 = j+1;
                        name2 = playerArr[j].name;
                    }
                }
            }
            console.log(name1,number1,name2,number2);
            //如果name1为空，说明这一天杀手没有杀人
            if(name1 === ""){
                container.append(
                    "<div class='day-box'>"+
                    "<div class='day'>第"+i+"天</div>"+
                    "<div class='stage'>"+
                    "<div class='item checked'>杀手杀人<span class='click'></span></div>"+
                    "<span class='result'>这一晚很平静</span>"+
                    "<div class='item checked'>亡灵发表遗言<span class='click'></span></div>"+
                    "<div class='item checked'>玩家依次发言<span class='click'></span></div>"+
                    "<div class='item checked'>全民投票<span class='click'></span></div>"+
                    "<span class='result'>"+number2+"号被投票投死，真实身份是"+name2+"</span>"+
                    "</div>"+
                    "</div>");
            }else{
                container.append(
                    "<div class='day-box'>"+
                    "<div class='day'>第"+i+"天</div>"+
                    "<div class='stage'>"+
                    "<div class='item checked'>杀手杀人<span class='click'></span></div>"+
                    "<span class='result'>"+number1+"号被杀手杀死，真实身份是"+name1+"</span>"+
                    "<div class='item checked'>亡灵发表遗言<span class='click'></span></div>"+
                    "<div class='item checked'>玩家依次发言<span class='click'></span></div>"+
                    "<div class='item checked'>全民投票<span class='click'></span></div>"+
                    "<span class='result'>"+number2+"号被投票投死，真实身份是"+name2+"</span>"+
                    "</div>"+
                    "</div>");
            }
        }
        lastDay.innerHTML = "第"+today+"天";
        lastStage.style.display = "block";

    }
    Write();

    //判断网页从?kill或是?diary而来，则执行以下操作
    function Receive(){
        //得到"?"之后的部分
        var url = window.location.search;
        //indexOf() 返回指定字符串值在字符串中首次出现的位置，没有出现，则返回-1
        if (url.indexOf("?") !== -1){
            //sunstr() 从字符串的下标1开始抽取
            var str = url.substr(1);
            if ((str === "kill")||(str === "diary")){
                var name,tag = -1;
                for(var k=0;k<playerNum;k++){
                    if((playerArr[k].die === today)&&(playerArr[k].why === "kill")){
                        name = playerArr[k].name;
                        tag = k;
                    }
                }
                if(tag === -1){
                    killWho.innerHTML = "这一晚很平静";
                }else{
                    killWho.innerHTML = (tag+1) + "号被杀手杀死，真实身份是" + name;
                }
            }
            if (str === "kill"){
                event++;
            }

        }
    }
    Receive();

    //点击可以展开关闭前几天的tag，闭包
    for (var i=0;i<day.length;i++){
        (function(i){
            day[i].onclick = function(){
                var style = stage[i].style;
                style.display = style.display == "block"?"none":"block";
            }
        })(i);
    }

    //分别对应四个tag点击事件
    var fsm = function(events,tab){
        if(events === tab){
            switch(tab){
                case 1:
                    btnKill.style.background = "#83b09a";
                    $("#kill span").addClass("click");
                    window.location.href = "diary.html?kill";
                    console.log("case:1 event = "+event);
                    break;
                case 2:
                    btnLastWord.style.background = "#83b09a";
                    $("#last-word span").addClass("click");
                    event++;
                    confirm("亡灵请发表遗言");
                    console.log("case:2 event = "+event);
                    break;
                case 3:
                    btnSpeak.style.background = "#83b09a";
                    $("#speak span").addClass("click");
                    event++;
                    confirm("玩家请依次发言");
                    console.log("case:3 event = "+event);
                    break;
                case 4:
                    btnVote.style.background = "#83b09a";
                    $("#vote span").addClass("click");
                    event = 1;
                    sessionStorage.setItem("Event",event);
                    window.location.href = "diary.html?vote";
                    console.log("case:4 event = "+event);
                    break;
            }
        }else if(tab < event){
            confirm("请点下一步");
        }else{
            confirm("请按顺序来");
        }
    };

    // 杀手杀人
    btnKill.onclick = function(){
        fsm(event,1);
    };

    // 亡灵发表遗言
    btnLastWord.onclick = function(){
        fsm(event,2);
    };

    // 玩家依次发言
    btnSpeak.onclick = function(){
        fsm(event,3);
    };

    //全民投票
    btnVote.onclick = function(){
        fsm(event,4);
    };

    //其他页面返回本页面，用来重新渲染已经操作过得tag
    function Color(){
        for(var i=1;i<4;i++){
            for(var j=1;j<event;j++){
                if(i === j){
                    switch(j){
                        case 1:
                            btnKill.style.background = "#83b09a";
                            $("#kill span").addClass("click");
                            console.log("case:1 event = "+event);
                            break;
                        case 2:
                            btnLastWord.style.background = "#83b09a";
                            $("#last-word span").addClass("click");
                            console.log("case:2 event = "+event);
                            break;
                        case 3:
                            btnSpeak.style.background = "#83b09a";
                            $("#speak span").addClass("click");
                            console.log("case:3 event = "+event);
                            break;
                        case 4:
                            btnVote.style.background = "#83b09a";
                            $("#vote span").addClass("click");
                            console.log("case:4 event = "+event);
                            break;
                    }
                }
            }
        }
    }
    Color();
    console.log("color: event = "+event);

    //======================================================================

    //左上返回上一页
    btnReturnDiary.onclick = function(){
        sessionStorage.setItem("Event",event);
        window.location.href = "diary.html?diary";
    };
    //右下返回法官日志
    btnDiray.onclick = function(){
        sessionStorage.setItem("Event",event);
        window.location.href = "diary.html?diary";
    };
    //右上退出游戏
    btnQuitGame.onclick = function() {
        var r = confirm("确定要退出游戏？");
        if (r === true) {
            window.location.href = "../index.html";
        }
    };
    //左下结束游戏
    btnGameOver.onclick = function() {
        var r = confirm("这么好玩的游戏，你确定就这么结束？");
        if (r === true) {
            window.location.href = "gameover.html";
        }
    };

})();