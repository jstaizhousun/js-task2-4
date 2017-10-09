(function(){
    var btnReturnDeal = document.getElementById("return-deal"),
        btnQuitGame = document.getElementById("quit-game"),
        btnStart = document.getElementById("start"),
        caption = document.getElementById("caption"),
        caption1 = document.getElementById("caption1"),
        caption2 = document.getElementById("caption2"),
        player = document.getElementsByClassName("block"),
        role = document.getElementsByClassName("role"),
        knife = document.getElementsByClassName("knife"),
        killerNum = parseInt(sessionStorage.getItem("KillerNum")),
        peopleNum = parseInt(sessionStorage.getItem("PeopleNum")),
        playerNum = killerNum + peopleNum,
        playerArr = JSON.parse(sessionStorage.getItem("PlayerArr")),
        day = parseInt(sessionStorage.getItem("Day")),
        music = document.getElementById("music"),
        playMusic = document.getElementById("play-music"),
        container = document.getElementById("container"),
        title = document.getElementById("title");
    /*这里为调试*/
    //playerArr[3].die = 1;
    //console.log("游戏第" + day + "天");
    //console.log(arr);
    
    //写网页
    function Write(){
        container = $(container);
        for(var i=0;i<playerNum;i++){
            container.append(
                "<div class='cell'>" +
                "<div class='block' id='player" + i + "'>" +
                "<div class='role'>" + playerArr[i].name + "</div>" +
                "<div class='number'>" + (i + 1) + "号</div>" +
                "<div class='knife'></div>" +
                "</div>" +
                "</div>"
            );
        }
    }
    Write();

    /*
     定义三种网页版本：
     变量：pageType =
     0、default  进入的版本
     1、diary    法官查看
     2、kill     杀手跳转
     3、vote     投票跳转
     判断版本，写入相应的页面
     */
    //定义为初始页面
    var pageType = "default";
    //选择网页版本
    function Receive(){
        //得到"?"之后的部分
        var url = window.location.search;
        //indexOf() 返回指定字符串值在字符串中首次出现的位置，没有出现，则返回-1
        if (url.indexOf("?") !== -1){
            //sunstr() 从字符串的下标1开始抽取
            var str = url.substr(1);
            if (str === "kill"){
                KillStyle();
                pageType = "kill";
            }
            if(str === "vote"){
                VoteStyle();
                pageType = "vote";
            }
            if(str === "diary"){
                btnStart.innerHTML = "返回";
                for (var i=0;i<playerNum;i++){
                    if(playerArr[i].die !== 0){
                        role[i].style.background = "#83b09a";
                    }
                }
                pageType = "diary";
            }
        }
    }
    Receive();
    /*这里为调试*/
    //console.log("网页样式："+pageType);

    //index 为最终被选定死亡的玩家下标
    var index = null;
    //判断点击了哪个玩家，并显示小刀
    for(var i=0;i<playerNum;i++){
        (function(i){
            player[i].onclick = function(){
                //杀手按钮转入
                if(pageType === "kill"){
                    if(playerArr[i].die !== 0){
                        confirm("当前玩家已死亡，请选择其他玩家");
                    }else if(playerArr[i].name === "杀手"){
                        confirm("别开枪，自己人！");
                    }else{
                        for(var j=0;j<playerNum;j++){
                            knife[j].style.display = "none";
                        }
                        knife[i].style.display = "block";
                        index = i;
                        //console.log("index = "+index);
                    }
                }
                //投票按钮转入
                if(pageType === "vote"){
                    if(playerArr[i].die !== 0){
                        confirm("当前玩家已死亡，请选择其他玩家");
                    }else{
                        for(j=0;j<playerNum;j++){
                            knife[j].style.display = "none";
                        }
                        knife[i].style.display = "block";
                        index = i;
                        //console.log("index = "+index);
                    }
                }
            }
        })(i);
    }

    //投票页面样式
    function VoteStyle(){
        title.innerHTML = "投票";
        btnStart.innerHTML = "确定";
        caption.style.display = "block";
        //将所有已死的玩家背景色更换
        for (var i=0;i<playerNum;i++){
            if(playerArr[i].die !== 0){
                role[i].style.background = "#83b09a";
            }
        }
    }

    //杀手杀人页面样式
    function KillStyle(){
        VoteStyle();
        title.innerHTML = "杀手杀人";
        caption1.innerHTML = "杀手请睁眼，请选择要砍死的对象";
        caption2.innerHTML = "点击下方玩家头像，对被即将被砍死的玩家进行标记";
    }
    //计算死了多少
    var $killerNum = 0,
        $peopleNum = 0;
    function GameOver(){
        for(var i=0;i<playerNum;i++){
            if((playerArr[i].name === "杀手")&&(playerArr[i].die !== 0)){
                $killerNum +=1;
            }
            if((playerArr[i].name === "平民")&&(playerArr[i].die !== 0)){
                $peopleNum +=1;
            }
        }
    }

    //开始游戏按钮：确定、提交数据
    btnStart.onclick = function(){
        if (pageType === "kill"){
            //这里杀手选择砍不砍人
            if(index === null){
                window.location.href = "libretto.html?kill";
            }else{
                playerArr[index].die = day;
                playerArr[index].why = "kill";
                ar = JSON.stringify(playerArr);
                sessionStorage.setItem("PlayerArr",ar);
            GameOver();
                killerNum = killerNum - $killerNum;
                peopleNum = peopleNum - $peopleNum;
                if(peopleNum === 0){
                    sessionStorage.setItem("PlayerArr",ar);
                    day = parseInt(sessionStorage.getItem("Day"));
                    sessionStorage.setItem("Winner","杀手");
                    window.location.href = "gameover.html";
                }else if(killerNum === 0){
                    sessionStorage.setItem("PlayerArr",ar);
                    day = parseInt(sessionStorage.getItem("Day"));
                    sessionStorage.setItem("Winner","平民");
                    window.location.href = "gameover.html";
                }else{
                window.location.href = "libretto.html?kill";
                }
            }
        }else if(pageType === "vote"){
            //这里必须砍人
            if(index === null){
                confirm("这里必须要投票");
            }else{
                //先提交数据
                playerArr[index].die = day;
                playerArr[index].why = "vote";
                ar = JSON.stringify(playerArr);
                sessionStorage.setItem("PlayerArr",ar);
                day = parseInt(sessionStorage.getItem("Day"));
                sessionStorage.setItem("Day",day+1);
                //运行计算函数，判断是否结束游戏
                GameOver();
                killerNum = killerNum - $killerNum;
                peopleNum = peopleNum - $peopleNum;
                if(peopleNum === 0){
                    sessionStorage.setItem("Winner","杀手");
                    window.location.href = "gameover.html";
                }else if(killerNum === 0){
                    sessionStorage.setItem("Winner","平民");
                    window.location.href = "gameover.html";
                }else{
                    window.location.href = "libretto.html?vote";
                }
            }
        }else if(pageType === "diary"){
            window.location.href = "libretto.html?diary";
        }else{
            sessionStorage.setItem("Event",1);
            window.location.href = "libretto.html";
        }
    };

    //返回上一页
    btnReturnDeal.onclick = function(){
        window.location.href = "deal.html";
    };

    //退出游戏
    btnQuitGame.onclick = function(){
        var r = confirm("确定要退出游戏？");
        if (r === true){
            window.location.href = "../index.html";
        }
    };
})();