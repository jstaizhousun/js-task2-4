(function(){
    var btnKillVer1 = document.getElementById("kill-ver-1"),
        btnLastGame = document.getElementById("last-game"),
        btnLeft = document.getElementById("left"),
        btnRight = document.getElementById("right"),
        game1 = document.getElementById("game1"),
        game2 = document.getElementById("game2"),
        title = document.getElementById("title"),
        dot1 = document.getElementById("dot1"),
        dot2 = document.getElementById("dot2");

    function dotColor(){
        if(title.innerHTML === "杀人游戏"){
            dot2.style.background = "#fbb435";
        }else{
            dot1.style.background = "#fbb435";
        }
    }
    dotColor();


    btnLeft.onclick = function(){
        game2.style.display = "block";
        game1.style.display = "none";
        title.innerHTML = "捉鬼游戏";
        dot1.style.background = "#fbb435";
        dot2.style.background = "#f0f0f0";
    };
    btnRight.onclick = function(){
        game1.style.display = "block";
        game2.style.display = "none";
        title.innerHTML = "杀人游戏";
        dot2.style.background = "#fbb435";
        dot1.style.background = "#f0f0f0";
    };

    btnKillVer1.onclick = function(){
        window.location.href = "pages/setting.html";
    };
    btnLastGame.onclick = function(){
        window.location.href = "pages/setting.html";
    };
})();