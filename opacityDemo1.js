function animate(obj,json,fn) {
    clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var flag = true;
            for (var k in json){
                if (k === "opacity"){
                    var leader = getStyle(obj,k)*100;
                    var target = json[k]*100;
                    var step = (target - leader)/50;
                     step = step>0?Math.ceil(step):Math.floor(step);
                     leader = leader + step;
                     if ("opacity" in obj.style) {
                     obj.style.opacity = leader/100;
                     obj.style.filter = "alpha(opacity="+leader+")";
                     }else {
                         obj.style.filter = "alpha(opacity = "+leader/100+")";
                     }
                }
                if (leader != target){
                    flag = false;
                }
                if (flag){
                    clearInterval(obj.timer);
                    if(fn){
                        fn();
                    }
                }
            }
        },15);
}
function getStyle(obj,attr) {
    if (window.getComputedStyle){
        return window.getComputedStyle(obj)[attr];
    } else{
        return obj.currentStyle[attr];
    }
}
window.onload = function () {
    var config = [
        {
            "opacity":1,
        },
        {
            "opacity":0,
        },
        {
            "opacity":0
        },
        {
            "opacity":0
        },
        {
            "opacity":0
        },
    ];
    var box = document.getElementById("box");
    var list = document.getElementsByTagName("li");
    var buttons = document.getElementById("buttons").getElementsByTagName("span");
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");
    var index = 1;
    var cur = 1;
    function assign() {
        for(var i=0;i<list.length;i++){
            animate(list[i],config[i],function () {
                flag = true;
            });
        }
    }
    assign();
    prev.onclick = function () {
        index = index - 1;
        if (index<1){
            index = 5;
        }
        buttonsShow();
        flag = false;
        config.push(config.shift());
        assign();
    };
    next.onclick = function () {
        index = index + 1;
        if (index>5){
            index = 1;
        }
        buttonsShow();
        flag = false;
        config.unshift(config.pop());
        assign();
    };
    function buttonsShow() {
        for(var i=0;i<buttons.length;i++){
            if (buttons[i].className == "on"){
                buttons[i].className = "";
            }
        }
        buttons[index-1].className = "on";
    }
    function show() {
        for(var i=0;i<buttons.length;i++){
            if (buttons[i].className == "on"){
                buttons[i].className = "";
            }
        }
        buttons[index - 1].className = "on";
    }
    function num(offprev) {
        for (var i=0;i<offprev;i++){
            prev.onclick();
        }
    }
    function num1(offnext) {
        for (var i=0;i<offnext;i++){
            next.onclick();
        }
    }
    for (var i=0;i<buttons.length;i++){
        buttons[i].onclick = function () {
            if (this.className == "on") {
                return ;
            }
            var clickIndex = this.getAttribute("index");
            var step = Math.abs(clickIndex-index);
            if(index>clickIndex){
                num(step);
            }
            if(index<clickIndex){
                num1(step);
            }
        }
    }
    var play = function(){
        move = setInterval(next.onclick,2000);
        move;
    }
    var stop = function(){
        clearInterval(move);
    }
    box.onmouseover = stop;
    box.onmouseout = play;
    play();
}
