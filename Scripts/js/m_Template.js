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

//是否微信内置浏览器
function isWeixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

//获取操作系统名称
function getOS() {
    //定义结果变量
    var name = 'Other';
    var version = '';
    //获取userAgent
    var ua = navigator.userAgent;
    //移动平台iOS探测
    var reg = /like Mac OS X|Android|Windows Phone|Symbian/ig;
    var regResult = reg.exec(ua);
    if (!regResult) {
        reg = /Mac OS X|Windows NT|Linux/ig;
        regResult = reg.exec(ua);
    }
    if (!regResult) {
        //返回UNKNOWN
        return name;
    } else {
        //操作系统检测
        switch (regResult[0]) {
            case 'like Mac OS X':
                name = 'iPhone';
                reg = /(iPhone|iPod|iPad).*?OS\s*(\d*[\_|\.\d]*)/ig;
                break;
            case 'Android':
                name = 'Android';
                reg = /(Android)\s*(\d*[\.\d]*)/ig;
                break;
            case 'Windows Phone':
                name = 'Windows Phone';
                reg = /(Windows Phone)\s*[OS]*\s*(\d*[\.\d]*)/ig;
                break;
            case 'Symbian':
                name = 'Symbian';
                reg = /(Symbian)\s*[OS]*\/*\s*(\d[\.\d]*)/ig;
                break;
            case 'Mac OS X':
                name = 'OS X';
                reg = /(Mac OS X)\s*(\d*[\_|\.\d]*)/ig;
                break;
            case 'Windows NT':
                name = 'Windows NT';
                reg = /(Windows NT)\s*(\d*[\_|\.\d]*)/ig;
                break;
            case 'Linux':
                name = 'Linux';
                reg = /(Linux)\s*(i*\d*)/ig;
                break
        }
        //获取版本号
        regResult = reg.exec(ua);
        if (regResult && regResult.length >= 3) {
            version = regResult[2].replace(/\_+/ig, '.');
            reg = /^\d+\.*\d*/ig;
            regResult = reg.exec(version);
            if (regResult) {
                version = regResult[0];
            }
        }
    };

    //返回操作系统名称+版本号
    //return [name, version].join(' ');
    return name.toLocaleLowerCase();
};

/*获取url指定参数值*/
function getUrlParameter(name) {
    var url = location.search.substr(1);
    var value, arr1 = [], arr2 = [];

    if (url) {
        arr1 = url.split("&");
        for (var i = 0; i < arr1.length; i++) {
            arr2 = arr1[i].split("=");
            if (arr2[0] == name) {
                value = arr2[1];
                if (value == "null" || value == "undefined") {
                    value = null;
                }
            }
        }
    }
    return value;
}

/*公共ajax加载事件*/
function g_loading() {
    if ($('.g_loading').length < 1) {
        $("body").append("<div class='g_loading'></div>")
    }
}

//去除加载
function remove_loading() {
    $('.g_loading').remove();
}


//上传logo
function fileCompanyLogoChange() {

    if (document.getElementById("CompanyLogo").value.length <= 0) {
        return false;
    }
    $.ajaxFileUpload({
        url: "/Resume/CompanyLogoImport", //用于文件上传的服务器端请求地址
        type: "post",
        secureuri: false, //一般设置为false
        fileElementId: "CompanyLogo", //文件上传控件的id属性
        dataType: "json", //返回值类型 一般设置为json
        success: function (result) {
            if (result.Success) {
                $("#CompanyLogoImg").attr('src', result.Data);
            } else {
                g_alert(result.Message);
            }
        },
        error: function (data, status, e) { //服务器响应失败处理函数
            g_alert(e);
        }
    });
}

//触发点击上传图片
function imgClick() {
    $('#CompanyLogo').click();
}

//上传简历头像
function filePictureChange() {
    console.log(ResumeBasic);
    if (document.getElementById("PictureFile").value.length <= 0) {
        return false;
    }
    $.ajaxFileUpload({
        url: "/Resume/UserPhotoImport", //用于文件上传的服务器端请求地址
        type: "post",
        data: { resumeId: ResumeBasic.ID },
        secureuri: false, //一般设置为false
        fileElementId: "PictureFile", //文件上传控件的id属性
        dataType: "json", //返回值类型 一般设置为json
        success: function (result) {
            console.log(result);
            if (result.Success) {
                app.userInfo.PicturePath = result.Data;
                $(".top-login-img").attr("src", result.Data);
            } else {
                showMessage(result.Message);
            }
        },
        error: function (data, status, e) { //服务器响应失败处理函数
            showMessage("提交基本上信息后,再上传图片");
        }
    });
}
//部分替换职位数据源列表
function dataFormat(lists) {
    var data = [];
    for (var i = 0; i < lists.length; i++) {
        var obj = {};
        for (var j in lists[i]) {
            if (j == "logoUrl") {
                obj["ImgUrl"] = lists[i][j];
            }
            if (j == "id") {
                obj["ID"] = lists[i][j];
            }
            if (j == "edu") {
                obj["Education"] = lists[i][j];
            }
            //新增公司ID
            if (j == "compId") {
                obj["CompId"] = lists[i][j];
            }
            //新增jid
            if (j == "jid") {
                obj["JID"] = lists[i][j];
            }
            if (j == "company") {
                obj["Company"] = lists[i][j];
            }
            if (j == "location") {
                obj["Area"] = lists[i][j];
            }
            if (j == "name") {
                obj["Name"] = lists[i][j];
            }
            if (j == "funType") {
                obj["TagName"] = lists[i][j];
            }
            if (j == "platform") {
                obj["PlatForm"] = lists[i][j];
            }
            if (j == "IsMailings") {
                obj["IsMailings"] = 0;
            }
            if (j == "score") {
                obj["Score"] = Math.floor(lists[i][j] * 100) + '%';
            }
            if (j == "isDelivered") {
                obj["IsMailings"] = lists[i][j];
            }
            if (j == "isCollected") {
                obj["IsLike"] = lists[i][j];
            }
            if (j == "totalCollection") {
                obj["Like"] = lists[i][j];
            }
        }
        data.push(obj);
    }
    return data;
}
