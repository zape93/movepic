function animate(obj,json,fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
            var flag = true;
            for(var k in json){
                if(k === "opacity"){
                    var leader = getStyle(obj,k)*100;
                    var target = json[k]*100;
                    var step = (target - leader)/10;
                    step = step>0?Math.ceil(step):Math.floor(step);
                    leader = leader + step;
                    obj.style[k] = leader/100;
                }else if(k === "zIndex"){
                    obj.style.zIndex = json[k];
                }else{
                    var leader = parseInt(getStyle(obj,k))||0;
                    var target = json[k];
                    var step = (target-leader)/10;
                    step = step>0?Math.ceil(step):Math.floor(step);
                    leader = leader+step;
                    obj.style[k] = leader + "px";
                }
                if (leader != target){
                    flag = false;
                }
            }
            if(flag){
                clearInterval(obj.timer);
                if (fn){
                    fn();
                }
            }
        },15);
}
function getStyle(obj,attr){
            if (window.getComputedStyle){
                return window.getComputedStyle(obj)[attr];
            }else{
                return obj.currentStyle[attr];
            }
}
window.onload = function () {
    if (!document.getElementById("box"))return false;
    if (!document.getElementsByClassName("arrow"))return false;
    if (!document.getElementsByTagName("li"))return false;
    if (!document.getElementById("prev"))return false;
    if (!document.getElementById("next"))return false;
    var config = [
        {
            "height":250,
            "width":400,
            "top":20,
            "left":100,
            "opacity":0.2,
            "zIndex":2,
        },
        {
            "height":300,
            "width":500,
            "top":70,
            "left":0,
            "opacity":0.8,
            "zIndex":3,
        },
        {
            "height":400,
            "width":700,
            "top":100,
            "left":250,
            "opacity":1,
            "zIndex":4,
        },
        {
            "height":300,
            "width":500,
            "top":70,
            "left":700,
            "opacity":0.8,
            "zIndex":3,
        },
        {
            "height":250,
            "width":400,
            "top":20,
            "left":700,
            "opacity":0.2,
            "zIndex":2,
        }
    ];
    var box = document.getElementById("box");
    var list = box.getElementsByTagName("li");
    var arrow = document.getElementsByClassName("arrow");
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");
    function assign() {
        if (list.length<1)return false;
        for (var i=0;i<list.length;i++){
            animate(list[i],config[i],function () {
                flag = true;
            })
        }
    }
    assign();
    prev.onclick = function () {
        if (flag){
            flag = false;
            config.push(config.shift());
            assign();
        }
    };
    next.onclick = function () {
            config.unshift(config.pop());
            assign();
    }
        var flag = true;
    var play = function () {
        player = setInterval(prev.onclick,2000);
        player;
    }
    var stop = function () {
        clearInterval(player);
    }
    box.onmouseover = stop;
    box.onmouseout = play;
    play();
}