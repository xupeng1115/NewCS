var app = new Vue({
    el: "#app",
    data: {
        //是否登录
        loginKey:true,
        //是否显示侧边菜单  
        menuKey: false,
        
        //产品详情
        positionDetail:{
            PositionID: Product.ID,
            Price: Product.Price,
            Name: Product.ProductName,
            Remark: Product.Remark
        },

        //个人信息验证
        nameShow:false,
        telShow:false,
        emailShow:false,

        //个人信息
        Name:UserName,
        Tel:Tel,
        Email:Email,
        
        //是否同意协议
        controlKey:true,
    },
    computed:{
        submitBtnAble:function(){
            return ($.trim(this.Name)!=='')&&($.trim(this.Tel)!=='')&&($.trim(this.Email)!=='')&&this.controlKey;
        }
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
        }
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
                    location.href = "/Home/m_Index";
                } else {
                    showMessage(result.Message);
                    loginKey = false;
                }
            };
            var myErrorFun = function () {
                showMessage("网络出错了！");
                loginKey = false;
            };
            myAjax("post", oLoginExitUrl, JSON.stringify(myParams), mySuccessFun, myErrorFun);
        },
        //信息验证
        NameF:function(){
            if(app.Name!==''){
                app.nameShow=true;
            }else{
                app.nameShow=false;
            }
        },
        TelF:function(){
            if(app.Tel!==''){
                app.telShow=true;
            }else{
                app.telShow=false;
            }
        },
        EmailF:function(){
            if(app.Email!==''){
                app.emailShow=true;
            }else{
                app.emailShow=false;
            }
        },
        NameBlur:function(){
            app.nameShow = false;
        },
        TelBlur:function(){
            app.telShow = false;
        },
        EmailBlur:function(){
            app.emailShow = false;
        },
        nameClear:function(){
            app.Name="";
            $("input.input-name").focus();
        },
        telClear:function(){
            app.Tel="";
            $("input.input-tel").focus();
        },
        emailClear:function(){
            app.Email="";
            $("input.input-email").focus();
        },
        orderSubmit:function(){
            if(app.submitBtnAble){
                document.myform.submit();
            }else{
                if($.trim(app.Name)===''){
                    showMessage("请先填写您的姓名");
                    return;
                }
                
                if($.trim(app.Tel)===''){
                    showMessage("请先填写您的联系电话");
                    return;
                }

                if($.trim(app.Email)===''){
                    showMessage("请先填写您的联系地址");
                }

                if(!app.controlKey){
                    showMessage("请先同意我们的服务协议");
                }
            }
        }
    }
})


$(function () {

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

