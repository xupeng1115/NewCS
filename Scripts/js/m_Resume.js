var app = new Vue({
    el: "#app",
    data: {
        //是否登录
        loginKey: isLogin,
        //是否显示侧边菜单  
        menuKey: false,
        //个人基本信息
        userInfo:ResumeBasic,
        tagList:UserTitleList,

        //手机号验证
        phoneReg:/^[0-9]{5,11}$/,
    },
    computed:{
        Tags:function(){
            var str='';
            if(this.tagList.length>0){
                for(var i=0;i<this.tagList.length;i++){
                    if(i>0){
                        str+=','+this.tagList[i].TitleName;
                    }else{
                        str+=this.tagList[i].TitleName;
                    }
                }
            }
            return str;
        },
        registerBtnAble:function(){
            return ($.trim(this.userInfo.Name)!=='')&&($.trim(this.userInfo.Gender)!=='')&&($.trim(this.userInfo.Tel)!=='')&&($.trim(this.userInfo.Email)!=='')&&($.trim(this.userInfo.AddressInfo)!=='');
        },
    },
    watch:{
        menuKey:function(val){
            if(val){
                $("html,body,.container,#panel").css({
                    'height':"100%",
                    'overflowY':"hidden"
                })
            }else{
                $("html,body,.container,#panel").css({
                    'height':"auto",
                    'overflowY':"scroll"
                })
            }
        },
    },
    updated: function () {
        
    },
    methods: {
        //是否显示侧边菜单
        menuHandle: function () {
            if (app.menuKey) {
                app.menuKey = false;
            } else {
                app.menuKey = true;
            }
        },
        //退出登陆
        exit:function(){
            var myParams = {
                
            };
            var mySuccessFun = function (result) {
                if (result.Success) {
                    app.loginKey = false;
                } else {
                    showMessage(result.Message);
                }
            };
            var myErrorFun = function () {
                showMessage("网络出错了！");
            };
            myAjax("post", "/User/LoginExit", JSON.stringify(myParams), mySuccessFun, myErrorFun);
        },
        goLogin:function(){
            window.location.href = "/Home/m_User";
        },
        resumeSave:function(){
            if(app.registerBtnAble){

                if(!app.phoneReg.test($.trim(app.userInfo.Tel))){
                    showMessage('请输入有效的手机号！');
                    $("input.tel-input").focus();
                    return;
                }

                if(app.userInfo.Email.indexOf("@")<0){
                    showMessage('请输入有效的邮箱地址！');
                    $("input.email-input").focus();
                    return;
                }

                var myParams = app.userInfo;

                var mySuccessFun = function (result) {
                    if (result.Success) {
                        if (!app.userInfo.ID) {
                            app.userInfo.ID = result.Data;
                        }
                        //简历主键ID赋值
                        ResumeBasic.ID = result.Data;
                        showMessage("简历个人基本信息保存成功");
                    } else {
                        showMessage(result.Message);
                    }
                }
                var myErrorFun = function (error) {
                    showMessage("网络出错了！");
                }
    
                //提交简历信息
                myAjax("post", "/Resume/SubmitResumeBasic", JSON.stringify(myParams), mySuccessFun, myErrorFun);
            }else{
                showMessage("请先完善个人简历信息");
            }
        },
        //类型筛选
        searchType:function(type){
            if(type===1){
                if(app.userInfo.Gender!==1){
                    app.userInfo.Gender=1;
                }
            }else{
                if(app.userInfo.Gender!==0){
                    app.userInfo.Gender=0;
                }
            }
        },
        headClick:function(){
            $('#PictureFile').click();
        }
        
    }
})

$(function () {

    //请求数据源
    (function () {
        // app.getJobList();
    }());
    
    //侧滑导航
    var slideout = new Slideout({
        'panel': document.getElementById('panel'),
        'menu': document.getElementById('menu'),
        'padding': 190,
        'tolerance': 70,
        'side': "right",
        'touch': false
    });

    $("body").on("click",".top-menu",function(){
        slideout.toggle();
    });

    slideout.on('beforeclose', function() {
        app.menuKey=false;
    });

    slideout.on('beforeopen', function() {
        app.menuKey=true;
    });

    slideout.on('close', function() {
        app.menuKey=false;
    });

    slideout.on('open', function() {
        app.menuKey=true;
    });
    
    $("body").on("touchstart", ".flo-container", function (event) {
        event.preventDefault();
        slideout.close();
    });

    //退出登陆
    $("body").on("click", ".btn-exit", function () {
        var myParams = {

        };
        var mySuccessFun = function (result) {
            if (result.Success) {
                app.loginKey = false;
                slideout.close();
            } else {
                showMessage(result.Message);
            }
        };
        var myErrorFun = function () {
            showMessage("网络出错了！");
        };
        myAjax("post", "/User/LoginExit", JSON.stringify(myParams), mySuccessFun, myErrorFun);
    });

    //全屏触发事件
    $(document).on("touchstart", function (e) {

        //收起选项列表
        // if (e.target.className.indexOf("btn-banner-show") < 0) {
        //     app.filterKey = false;
        // }
    })

});

//公司logo没有成功加载出来时处理
function nofind() {
    var oImg = event.srcElement;
    oImg.src = "../../Content/m_img/m_empty.png";
    oImg.onerror = null;
}

//公司logo没有成功加载出来时处理
function noFindLogo() {
    var oImg = event.srcElement;
    oImg.src = "../../Content/m_img/m_empty.png";
    oImg.onerror = null;
}

