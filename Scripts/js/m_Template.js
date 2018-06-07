//引入fastclick.js事件快速响应处理
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}

//Ajax
function myAjax(myType, myUrl, myParams, mySuccessFun, myErrorFun) {
    var params = {
        "controller": myUrl,
        data: myParams,
        contentType: "application/json; charset=utf-8"
    };

    var successFun = mySuccessFun;
    var errorFun = myErrorFun;

    if (myType.toLocaleUpperCase() === "GET") {
        communication.get(params, successFun, errorFun);
    } else {
        communication.post(params, successFun, errorFun);
    }
}

//Ajax
function getAjax(myType, myUrl, myParams, mySuccessFun, myErrorFun) {
    var params = {
        "controller": myUrl,
        data: myParams,
        contentType: "application/x-www-form-urlencoded"
    };

    var successFun = mySuccessFun;
    var errorFun = myErrorFun;

    if (myType.toLocaleUpperCase() === "GET") {
        communication.get(params, successFun, errorFun);
    } else {
        communication.post(params, successFun, errorFun);
    }
}

//替换回车和换行符
function TransferString(content) {
    var string = content;
    try {
        string = string.replace(/\r\n/g, "<br>")
        string = string.replace(/\n/g, "<br>");
    } catch (e) {
        console.log(e.message);
    }
    return string;
}

//禁止用户缩放页面
window.onload = function () {
    document.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
            event.preventDefault();
            event.stopPropagation();
        }
    })
    var lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
            event.stopPropagation();
        }
        lastTouchEnd = now;
    }, false)
}

//头像没有成功加载出来时处理
function nofind() {
    var oImg = event.srcElement;
    oImg.src = "../../Content/m_img/m_head.png";
    oImg.onerror = null;
}

//公司logo没有成功加载出来时处理
function nofind() {
    var oImg = event.srcElement;
    oImg.src = "../../Content/m_img/m_empty.png";
    oImg.onerror = null;
}
