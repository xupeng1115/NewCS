var oList=[
    {
        ID:1,
        Score:0.9
    },
    {
        ID:2,
        Score:0.3
    },
    {
        ID:3,
        Score:0.7
    },
    {
        ID:4,
        Score:0.2
    }
]

var app = new Vue({
    el: "#app",
    data: {
        loginKey:true,
        menuKey: false
    },
    methods: {
        menuHandle: function (event) {
            if (app.menuKey) {
                app.menuKey = false;
            } else {
                app.menuKey = true;
            }
        },
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
        //绘制进度圆
        getCircle: function (list) {
            if (app.loginKey) {
                var percents = app.getPercents(list);
                $.each(percents, function (index, item) {
                    $('#indicatorContainer' + item.ID).radialIndicator({
                        barColor: '#ffbf00',
                        barWidth: 7,
                        initValue: 0,
                        fontFamily: '"PingFang SC","Microsoft Yahei"',
                        fontWeight: 'normal',
                        fontSize: 22,
                        fontColor: "#333",
                        roundCorner: true,
                        percentage: true
                    });

                    //进度从零运动到指定位置
                    var radObj = $('#indicatorContainer' + item.ID).data('radialIndicator');
                    if ($('#indicatorContainer' + item.ID).length === 1) {
                        radObj.animate(item.Score);
                    }
                })
            }
        },
        //序列化百分比
        getPercents: function (list) {
            var arr = [];
            $.each(list, function (index, item) {
                var obj = {};
                obj.ID = item.ID;
                obj.Score = item.Score * 100;
                arr.push(obj);
            })
            return arr;
        },
    }
})

$(function () {

    //绘制进度圆
    app.getCircle(oList);

    //“想从事的行业”
    var mySwiper1 = new Swiper('#swiper1', {
        // autoplay: {
        //     delay: 2000,
        //     disableOnInteraction: true,
        // },
        speed: 500,
        slidesPerView: "auto",
        slidesPerGroup: 1,
        freeMode: true,
        freeModeMomentum: true,
    });

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

});


