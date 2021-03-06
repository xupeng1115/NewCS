var app = new Vue({
    el: "#app",
    data: {
        //是否登录
        loginKey: isLogin,
        //是否显示侧边菜单  
        menuKey: false,

        //个人基本信息
        userInfo:ResumeBasic||{
            Name:'',
            Gender:''
        },
        picUrl:ResumeBasicPicturePaths
    },
    computed:{
        
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

