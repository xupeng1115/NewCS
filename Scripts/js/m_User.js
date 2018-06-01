var app = new Vue({
    el: "#app",
    data: {
        //登录
        loginInfo:{
            Phone:"",
            Password:""
        },
        loginCS:{
            PhS:false,
            PdS:false
        },
        loginPdKey:false,

        //注册
        registerInfo:{
            Name:"",
            Phone:"",
            Code:"",
            Password:"",
            PasswordConfirm:""
        },
        rgCS:{
            NameS:false,
            PhS:false,
            CodeS:false,
            PdS:false,
            PdCS:false
        },
        codeText:"获取验证码",
        
        //找到密码
        findInfo:{
            Phone:"",
            Code:"",
            Password:"",
            PasswordConfirm:""
        },
        findCS:{
            PhS:false,
            CodeS:false,
            PdS:false,
            PdCS:false
        },

        //切换0:登陆，1:注册，2:修改密码 
        switchKey:0,
        //手机号验证
        phoneReg:/^[0-9]{5,11}$/,
        //是否记住密码 默认：true:记住
        rememberKey:true,
        //手机号是否注册过 true:未注册，false:已注册
        onlyPhone:true,
        //验证码返回值
        smsID:0,
    },
    computed:{
        loginBtnAble:function(){
            return ($.trim(this.loginInfo.Phone)!=='')&&($.trim(this.loginInfo.Password)!=='');
        },
        registerBtnAble:function(){
            return ($.trim(this.registerInfo.Name)!=='')&&($.trim(this.registerInfo.Phone)!=='')&&($.trim(this.registerInfo.Code)!=='')&&($.trim(this.registerInfo.Password)!=='')&&($.trim(this.registerInfo.PasswordConfirm)!=='');
        },
        findBtnAble:function(){
            return ($.trim(this.findInfo.Phone)!=='')&&($.trim(this.findInfo.Code)!=='')&&($.trim(this.findInfo.Password)!=='')&&($.trim(this.findInfo.PasswordConfirm)!=='');
        },
        title:function(){
            return this.switchKey===0?'登录':(this.switchKey===1?'注册':'忘记密码');
        },
        right:function(){
            return this.switchKey===0?'注册':'登录';
        },
        head:function(){
            return this.switchKey===0?'欢迎登录Career Success':(this.switchKey===1?'欢迎注册Career Success':'修改密码');
        },
    },
    methods: {
        //登录
        loginPhF:function(){
            if(app.loginInfo.Phone!==''){
                app.loginCS.PhS=true;
            }else{
                app.loginCS.PhS=false;
            }
        },
        loginPdF:function(){
            if(app.loginInfo.Password!==''){
                app.loginCS.PdS=true;
            }else{
                app.loginCS.PdS=false;
            }
        },
        loginPhBlur:function(){
            app.loginCS.PhS=false;
        },
        loginPdBlur:function(){
            app.loginCS.PdS=false;
        },
        loginPdType:function(){
            $("input.login-password").focus();
            if(app.loginPdKey){
                $("input.login-password").attr("type","text");
                app.loginPdKey=false;
            }else{
                $("input.login-password").attr("type","password");
                app.loginPdKey=true;
            }
        },
        loginPhClear:function(){
            app.loginInfo.Phone="";
            $("input.login-phone").focus();
        },
        loginPdClear:function(){
            app.loginInfo.Password="";
            $("input.login-password").focus();
        },

        //注册
        rgNameF:function(){
            if(app.registerInfo.Name!==''){
                app.rgCS.NameS=true;
            }else{
                app.rgCS.NameS=false;
            }
        },
        rgPhF:function(){
            if(app.registerInfo.Phone!==''){
                app.rgCS.PhS=true;
            }else{
                app.rgCS.PhS=false;
            }
        },
        rgCodeF:function(){
            if(app.registerInfo.Code!==''){
                app.rgCS.CodeS=true;
            }else{
                app.rgCS.CodeS=false;
            }
        },
        rgPdF:function(){
            if(app.registerInfo.Password!==''){
                app.rgCS.PdS=true;
            }else{
                app.rgCS.PdS=false;
            }
        },
        rgPdCF:function(){  
            if(app.registerInfo.PasswordConfirm!==''){
                app.rgCS.PdCS=true;
            }else{
                app.rgCS.PdCS=false;
            }
        },
        rgNameBlur:function(){
            app.rgCS.NameS=false;
        },
        rgPhBlur:function(){
            app.rgCS.PhS=false;
        },
        rgCodeBlur:function(){
            app.rgCS.CodeS=false;
        },
        rgPdBlur:function(){
            app.rgCS.PdS=false;
        },
        rgPdCBlur:function(){
            app.rgCS.PdCS=false;
        },
        rgNameClear:function(){
            app.registerInfo.Name="";
            $("input.register-name").focus();
        },
        rgPhClear:function(){
            app.registerInfo.Phone="";
            $("input.register-phone").focus();
        },
        rgCodeClear:function(){
            app.registerInfo.Code="";
            $("input.register-code").focus();
        },
        rgPdClear:function(){
            app.registerInfo.Password="";
            $("input.register-password").focus();
        },
        rgPdConfirmClear:function(){
            app.registerInfo.PasswordConfirm="";
            $("input.register-pdconfirm").focus();
        },

        //修改密码
        findPhF:function(){
            if(app.findInfo.Phone!==''){
                app.findCS.PhS=true;
            }else{
                app.findCS.PhS=false;
            }
        },
        findCodeF:function(){
            if(app.findInfo.Code!==''){
                app.findCS.CodeS=true;
            }else{
                app.findCS.CodeS=false;
            }
        },
        findPdF:function(){
            if(app.findInfo.Password!==''){
                app.findCS.PdS=true;
            }else{
                app.findCS.PdS=false;
            }
        },
        findPdCF:function(){    
            if(app.findInfo.PasswordConfirm!==''){
                app.findCS.PdCS=true;
            }else{
                app.findCS.PdCS=false;
            }
        },
        findPhBlur:function(){
            app.findCS.PhS=false;
        },
        findCodeBlur:function(){
            app.findCS.CodeS=false;
        },
        findPdBlur:function(){
            app.findCS.PdS=false;
        },
        findPdCBlur:function(){
            app.findCS.PdCS=false;
        },
        findPhClear:function(){
            app.findInfo.Phone="";
            $("input.find-phone").focus();
        },
        findCodeClear:function(){
            app.findInfo.Code="";
            $("input.find-code").focus();
        },
        findPdClear:function(){
            app.findInfo.Password="";
            $("input.find-password").focus();
        },
        findPdConfirmClear:function(){
            app.findInfo.PasswordConfirm="";
            $("input.find-pdconfirm").focus();
        },

        //切换登陆，注册，找回密码
        switchType:function(){
            if(app.switchKey===0){
                app.switchKey=1;
            }else{
                app.switchKey=0;
            }
        },
        findPassword:function(){
            app.switchKey=2;
        },

        //Click登录
        login:function(){
            if(app.loginBtnAble){

                if(!app.phoneReg.test($.trim(this.loginInfo.Phone))){
                    showMessage('请输入有效的手机号！');
                    $("input.login-phone").focus();
                    return;
                }
                if($.trim(this.loginInfo.Password).length<6){
                    showMessage('密码长度不能少于6位！');
                    $("input.login-password").focus();
                    return;
                }
                if($.trim(this.loginInfo.Password).length>16){
                    showMessage('密码长度不能大于16位！');
                    $("input.login-password").focus();
                    return;
                }

                var myParames={
                    Tel:$.trim(app.loginInfo.Phone),
                    Password:$.trim(app.loginInfo.Password)
                }

                var mySuccessFun = function (result) {
                    if (result.Success) {
                        if (rememberKey) {
                            localStorage.setItem('LoginPhone', $.trim(app.loginInfo.Phone));
                            localStorage.setItem('LoginPassword', $.trim(app.loginInfo.Password));
                        } else {
                            localStorage.removeItem('LoginPhone');
                            localStorage.removeItem('LoginPassword');
                        }

                        location.href = "m_Index.html";

                    } else {
                        showMessage(result.Message);
                    }
                };

                var myErrorFun = function () {
                    showMessage("网络出错了！");
                };

                myAjax("post", "/User/Login", JSON.stringify(myParams), mySuccessFun, myErrorFun);
            }

        },

        //Click注册
        register:function(){
            if(app.registerBtnAble){

                if(!app.phoneReg.test($.trim(this.registerInfo.Phone))){
                    showMessage('请输入有效的手机号！');
                    $("input.register-phone").focus();
                    return;
                }
                if($.trim(this.registerInfo.Password).length<6){
                    showMessage('密码长度不能少于6位！');
                    $("input.register-password").focus();
                    return;
                }
                if($.trim(this.registerInfo.Password).length<6){
                    showMessage('密码长度不能少于6位！');
                    $("input.register-password").focus();
                    return;
                }
                if($.trim(this.registerInfo.PasswordConfirm)!==$.trim(this.registerInfo.Password)){
                    showMessage('两次密码输入不一致！');
                    $("input.register-pdconfirm").focus();
                    return;
                }

                var myParames={
                    UserName: $.trim(app.registerInfo.Name),
                    VerificationCode: $.trim(app.registerInfo.Code),
                    Tel: $.trim(app.registerInfo.Phone),
                    Password: $.trim(app.registerInfo.Password),
                    SMSID: app.smsID
                }

                var mySuccessFun = function (result) {
                    if (result.Success) {
                        location.href = "m_Index.html";
                    } else {
                        showMessage(result.Message);
                    }
                };

                var myErrorFun = function () {
                    showMessage("网络出错了！");
                };

                myAjax("post", "/User/Register", JSON.stringify(myParams), mySuccessFun, myErrorFun);
            }
        },

        //Click找回密码
        find:function(){
            if(app.registerBtnAble){

                if(!app.phoneReg.test($.trim(this.registerInfo.Phone))){
                    showMessage('请输入有效的手机号！');
                    $("input.register-phone").focus();
                    return;
                }
                if($.trim(this.registerInfo.Password).length<6){
                    showMessage('密码长度不能少于6位！');
                    $("input.register-password").focus();
                    return;
                }
                if($.trim(this.registerInfo.Password).length<6){
                    showMessage('密码长度不能少于6位！');
                    $("input.register-password").focus();
                    return;
                }
                if($.trim(this.registerInfo.PasswordConfirm)!==$.trim(this.registerInfo.Password)){
                    showMessage('两次密码输入不一致！');
                    $("input.register-pdconfirm").focus();
                    return;
                }

                var myParames={
                    VerificationCode: $.trim(app.findInfo.Code),
                    Tel: $.trim(app.findInfo.Phone),
                    NewPassword: $.trim(app.findInfo.Password),
                    ConfirmPassword: $.trim(app.findInfo.Password),
                    SMSID:app.smsID
                }

                var mySuccessFun = function (result) {
                    if (result.Success) {
                        app.switchKey=0;
                    } else {
                        showMessage(result.Message);
                    }
                };

                var myErrorFun = function () {
                    showMessage("网络出错了！");
                };

                myAjax("post", "/User/FindPassword", JSON.stringify(myParams), mySuccessFun, myErrorFun);
            }
        }

    }
})

$(function () {
    
    // $("body").on("focus","input",function(){
    //     setTimeout(function(){
    //         document.body.scrollTop = document.body.scrollHeight;
    //     },300);
    // })
    
});


