var app = new Vue({
    el: "#app",
    data: {
        //是否登录
        loginKey:true,
        //是否显示侧边菜单  
        menuKey: false,
        
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
        }
    }
})


$(function () {

    //轮播滚动
    var mySwiper1 = new Swiper ('.swiper-container1', {
        autoplay: true,
        speed:1000,
        loop : true,
        slidesPerView: "auto",
        slidesPerGroup: 1,
        freeMode: true,
        freeModeMomentum: true,
        pagination: {
            el: '.swiper-pagination1',
        },
    })
    
    //轮播滚动
    var mySwiper2 = new Swiper ('.swiper-container2', {
        autoplay: true,
        speed:800,
        loop : true,
        slidesPerView: "auto",
        slidesPerGroup: 1,
        freeMode: true,
        freeModeMomentum: true,
        pagination: {
            el: '.swiper-pagination2',
        },
    })
    
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

    //模块导航滚动
    $("body").on("click",".nav-item",function(event){
        var oActive=$(this).hasClass("active-nav-item");
        var oList=$(".nav-item");
        var oTop=45;
        if(!oActive){
            $.each(oList,function(index,item){
                if($(item).hasClass("active-nav-item")){
                    $(item).removeClass("active-nav-item");
                    return;
                }
            })
            $(this).addClass("active-nav-item");
        }

        $("html, body").animate({
            scrollTop: ($($(this).attr("href")).offset().top -oTop)+ "px"
        }, {
            duration: 300,
            easing: "swing"
        });
        return false;
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

