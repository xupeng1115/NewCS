$(function () {

    //自定义变量
    var oFindPasswordUrl = "FindPassword",
        findKey =false,
        myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;

    //事件注册
    (function () {

        $("body").on("click", ".login-back-btn", function () {
            window.location.href = "../Home/Index";
        })

        $("body").on("click", ".back-index-btn", function () {
            window.location.href = "../Home/Index";
        })

        $("body").on("click", ".confirm-btn", function () {

            var oPhone = $(".phone-number").val();
            var oFormatNum = $(".test-code").val();
            var oNewPassword = $(".new-password").val();
            var oRepeatPassword = $(".repeat-password").val();

            if ($.trim(oPhone).length === 0) {
                alert("手机号不能为空");
                return;
            }
            if (!myreg.test($.trim(oPhone))) {
                alert("请输入有效的手机号");
                return;
            }
            if ($.trim(oFormatNum).length === 0) {
                alert("验证码不能为空");
                return;
            }
            if ($.trim(oNewPassword).length === 0) {
                alert("新密码不能为空");
                return;
            }
            if ($.trim(oNewPassword).length < 6) {
                alert("新密码长度不能少于6位");
                return;
            }
            if ($.trim(oNewPassword).length > 16) {
                alert("新密码长度不能大于16位");
                return;
            }
            if (oNewPassword !== oRepeatPassword) {
                alert("两次密码输入不一致!");
                return;
            }

            var myParams = {
                Tel: oPhone,
                VerificationCode: oFormatNum,
                NewPassword: oNewPassword,
                ConfirmPassword: oRepeatPassword
            }
            var mySuccessFun = function (result) {
                console.log(result);
                if (result.Success) {
                    $(".line-three").css("background", "#ffbf00");
                    $(".step-two").css("color", "#6d6d6d");
                    $(".step-two").find(".step-number").css({
                        "color": "#ffbf00",
                        "borderColor": "#ffbf00"
                    })
                    $(".form-box").hide();
                    $(".find-success-box").show();
                } else {
                    alert(result.Message);
                    findKey = false;
                }
            }
            var myErrorFun = function (error) {
                alert("网络出错了！");
                findKey = false;
            }
            //发送找回密码信息
            if (!findKey) {
                findKey = true;
                myAjax("post", oFindPasswordUrl, JSON.stringify(myParams), mySuccessFun, myErrorFun);
            } else {

            }

        })

        $(".phone-number").focus(function () {
            $(".phone-tips").text("手机号码不能为空");
            $(".phone-tips").show();
        })

        $("body").on("click", ".test-code", function () {
            $(".code-tips").text("验证码不能为空");
            $(".code-tips").show();
        })

        $("body").on("click", ".new-password", function () {
            $(".password-tips").text("密码不能为空");
            $(".password-tips").show();
        })

        $("body").on("click", ".repeat-password", function () {
            $(".repeat-tips").text("重复密码不能为空");
            $(".repeat-tips").show();
        })

    } ());

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
})