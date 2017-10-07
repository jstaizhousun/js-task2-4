(function(){
    var btnGoIndex = document.getElementById("go-home-page"),
        btnRead = document.getElementById("read"),
        btnAgain = document.getElementById("again"),
        btnUpLoad = document.getElementById("uploading"),
        who = document.getElementById("who"),
        cup = document.getElementById("winner"),
        killer = document.getElementById("killer"),
        people = document.getElementById("people"),
        gameEvent = document.getElementById("event"),
        killerNum = parseInt(sessionStorage.getItem("KillerNum")),
        peopleNum = parseInt(sessionStorage.getItem("PeopleNum")),
        playerNum = killerNum + peopleNum,
        playerArr = JSON.parse(sessionStorage.getItem("PlayerArr")),
        winner = sessionStorage.getItem("Winner"),
        day = parseInt(sessionStorage.getItem("Day"));

        //传到这里的天数多一天
        day = day -1;
        //console.log(winner);
        //console.log(playerArr);

    function Write(){
        cup.innerHTML = winner + "胜利";
        who.innerHTML = winner;
        killer.innerHTML = "杀 手" + killerNum + "人";
        people.innerHTML = "平 民" + peopleNum + "人";

        //用户编号和名称
        for(var i=1;i<=day;i++){
            //遍历输出相应的用户数据
            var name1="", number1="", name2="", number2="";
            for(var j=0;j<playerNum;j++){
                if(playerArr[j].die === i){
                    if(playerArr[j].why === "kill"){
                        //这里的j是用户下标
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
            gameEvent = $(gameEvent);
            if(name1 === ""){
                gameEvent.append(
                    "<div class=\"day-list\">" +
                    "<div>第" + i + "天<span class=\"game-time\">0小时07分</span></div>" +
                    "<div class=\"game-event\">晚上：这一天杀手没有杀人</div>" +
                    "<div class=\"game-event\">白天："+number2+"号被全民投票投死，"+number2+"号是"+name2+"</div>" +
                    "</div>"
                );
            }else{
                gameEvent.append(
                    "<div class=\"day-list\">" +
                    "<div>第" + i + "天<span class=\"game-time\">0小时07分</span></div>" +
                    "<div class=\"game-event\">晚上："+number1+"号被杀手砍死，"+number1+"号是"+name1+"</div>" +
                    "<div class=\"game-event\">白天："+number2+"号被全民投票投死，"+number2+"号是"+name2+"</div>" +
                    "</div>"
                );
            }
        }
    }
    Write();

    //左上返回首页
    btnGoIndex.onclick = function(){
        window.location.href = "../index.html";
    };
    //右上说明
    btnRead.onclick = function(){
        window.location.href = "";
    };
    //左下再来一局
    btnAgain.onclick = function(){
        window.location.href = "setting.html";
    };
    //右下返回法官日志
    btnUpLoad.onclick = function(){
        window.location.href = "";
    };

})();