//判断浏览器版本是否低于IE9
(function(){
    var DEFAULT_VERSION = 8;
    var ua = navigator.userAgent.toLowerCase();
    var isIE = ua.indexOf("msie")>-1;
    var safariVersion,numVerson;
    if(isIE){
        safariVersion =  ua.match(/msie ([\d.]+)/)[1];
        numVerson=parseInt(safariVersion[0]);
        if((numVerson>5)&&(numVerson<= DEFAULT_VERSION)){
            document.documentElement.style.display="none";
            document.body.style.display="none";
//          window.location.href="";
			return;
        }else{
            
        }
    }else{

    }
}());


$(function () {

    //自定义变量
    var oRegisterUrl = "User/Register",
        oLoginUrl = "User/Login",
        oCodeUrl = "User/Register",
        registerKey = false,
        loginKey = false,
        codeKey = false,
        remeberKey=true,
        protocolKey=true,
        myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;

    //事件注册
    (function () {

		$("body").on("click",".back-top-btn",function(event){
			$('body,html').animate({scrollTop:0},300);
		})

        $("body").on("click", ".login-phone", function () {
            $(".login-phone-tips").text("手机号不能为空");
            $(".login-phone-tips").show();

        })

        $("body").on("click", ".login-password", function () {
            $(".login-password-tips").text("密码不能为空");
            $(".login-password-tips").show();
        })

        $("body").on("click", ".rp-no", function () {
            $(this).hide();
            $(".rp-yes").show();
            remeberKey=true;
        })

        $("body").on("click", ".rp-yes", function () {
            $(this).hide();
            $(".rp-no").show();
            remeberKey=false;
        })

        $("body").on("click", ".lr-cancel", function () {
            $(".lr-container").hide();
        })

        $("body").on("click", ".login-register", function () {
            $(".lr-container").show();
        })

        $("body").on("click", ".forget-password-box", function () {
            window.location.href = "../User/FindPassword";
        })

        $("body").on("click", ".register-username", function () {
            $(".register-username-tips").text("用户名不能为空");
            $(".register-username-tips").show();
        })

        $("body").on("click", ".test-code", function () {
            $(".code-tips").text("验证码不能为空");
            $(".code-tips").show();
        })

        $("body").on("click", ".register-phone", function () {
            $(".register-phone-tips").text("手机号码不能为空");
            $(".register-phone-tips").show();
        })

        $("body").on("click", ".register-password", function () {
            $(".register-password-tips").text("密码不能为空");
            $(".register-password-tips").show();
        })

        $("body").on("click", ".protocol-no", function () {
            $(this).hide();
            $(".protocol-yes").show();
            protocolKey=true;
        })

        $("body").on("click", ".protocol-yes", function () {
            $(this).hide();
            $(".protocol-no").show();
            protocolKey=false;
        })

        $("body").on("click", ".lr-cancel", function () {
            $(".lr-container").hide();
        })

        //登陆
        $("body").on("click", ".lr-login-btn", function () {

            var oPhone = $(".login-phone").val();
            var oPassword = $(".login-password").val();

            if ($.trim(oPhone).length === 0) {
                alert("手机号不能为空");
                return;
            }
            if (!myreg.test($.trim(oPhone))) {
                alert("请输入有效的手机号");
                return;
            }
            if ($.trim(oPassword).length === 0) {
                alert("密码不能为空");
                return;
            }
             if ($.trim(oPassword).length < 6) {
                alert("密码长度不能少于6位");
                return;
            }
            if ($.trim(oPassword).length > 16) {
                alert("密码长度不能大于16位");
                return;
            }

            var myParams = {
                Tel: oPhone,
                Password:oPassword
            }
            var mySuccessFun = function (result) {
                console.log(result);
                if (result.Success) {
                    $(".protocol-yes").show();
                    $(".protocol-no").hide();
                    $(".rp-yes").hide();
                    $(".rp-no").show();
                    $(".lr-tips").text("").hide();
                    $(".lr-container").hide();
                } else {
                    alert(result.Message);
                    loginKey = false;
                }
            }
            var myErrorFun = function () {
                alert("网络出错了！");
                loginKey = false;
            }
            //发送登陆信息
            if (!loginKey) {
                loginKey = true;
                myAjax("post", oLoginUrl, JSON.stringify(myParams), mySuccessFun, myErrorFun);
            } else {
                
            }

        })

        //获取验证码
        $("body").on("click", ".get-code-btn", function () {

            var oPhone = $(".register-phone").val();

            if ($.trim(oPhone).length === 0) {
                alert("手机号不能为空");
                return;
            }
            if (!myreg.test($.trim(oPhone))) {
                alert("请输入有效的手机号");
                return;
            }

            var myParams = {
                Phone: oPhone,
            }
            var mySuccessFun = function (result) {
                console.log(result);
                if (result.Success) {
                    alert("验证码已发送");
                } else {
                    alert(result.Message);
                    codeKey = false;
                }
            }
            var myErrorFun = function () {
                alert("网络出错了！");
                codeKey = false;
            }
            //发送验证码信息
            if (!codeKey) {
                codeKey = true;
                myAjax("post", oCodeUrl, JSON.stringify(myParams), mySuccessFun, myErrorFun);
            } else {
                
            }
            
        })

        //注册
        $("body").on("click", ".lr-register-btn", function () {
            var oUserName = $(".register-username").val();
            var oPhone = $(".register-phone").val();
            var oFormatNum = $(".test-code").val();
            var oPassword = $(".register-password").val();

            if ($.trim(oUserName).length === 0) {
                alert("用户名不能为空");
                return;
            }
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
            if ($.trim(oPassword).length === 0) {
                alert("密码不能为空");
                return;
            }
            if ($.trim(oPassword).length < 6) {
                alert("密码长度不能少于6位");
                return;
            }
            if ($.trim(oPassword).length > 16) {
                alert("密码长度不能大于16位");
                return;
            }
            if(!protocolKey){
                alert("您还未同意《Caree Success注册协议》");
                return;
            }

            var myParams = {
                UserName: oUserName,
                VerificationCode: oFormatNum,
                Tel: oPhone,
                Password: oPassword
            }
            var mySuccessFun = function (result) {
                console.log(result);
                if (result.Success) {
                    $(".register-username").val("");
                    $(".register-phone").val("");
                    $(".test-code").val("");
                    $(".register-password").val("");
                    $(".lr-tips").text("").hide();
                    $(".lr-container").hide();
                } else {
                    alert(result.Message);
                    registerKey = false;
                }
            }
            var myErrorFun = function (error) {
                alert("网络出错了！");
                registerKey = false;
            }
            //发送注册信息
            if (!registerKey) {
                registerKey = true;
                myAjax("post", oRegisterUrl, JSON.stringify(myParams), mySuccessFun, myErrorFun);
            } else {

            }

        })

        $("body").on("click", ".login-btn", function () {
            $(this).css("color", "#ffbf00");
            $(this).find(".btn-line").show();
            $(".register-btn").css("color", "#6d6d6d");
            $(".register-btn").find(".btn-line").hide();
            $(".register-box").hide();
            $(".login-box").show();
        })

        $("body").on("click", ".register-btn", function () {
            $(this).css("color", "#ffbf00");
            $(this).find(".btn-line").show();
            $(".login-btn").css("color", "#6d6d6d");
            $(".login-btn").find(".btn-line").hide();
            $(".login-box").hide();
            $(".register-box").show();
        })
        
        $(window).scroll(function() {
			//获取文档滚动高度
		    var top = $(document).scrollTop();
		    if(top>=200){
		    	$("aside").show();
		    }else{
		    	$("aside").hide();
		    }
		})

    } ());

    //Ajax
    function myAjax(myType, myUrl, myParams, mySuccessFun, myErrorFun) {

        var params = {
            "controller": myUrl,
            data: myParams,
            contentType:"application/json; charset=utf-8"
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
