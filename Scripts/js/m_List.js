
var app = new Vue({
    el: "#app",
    data: {
        //是否登录
        loginKey:true,
        //是否显示侧边菜单  
        menuKey: false,
        //当前页码
        currentPage:0,
        //职位列表
        positionList:positionList,
        //推荐列表
        recommendList:recommendList,
        //是否显示加载组件
        loadKey:false,
        //加载的列表
        addList:[],

        //筛选列表是否展开
        filterKey:false,

        //类型筛选
        filterType:'',
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
        if(this.loadKey){
            $.each($(".match").find("canvas"), function (index, item) {
                $(item).remove();
            })
            this.getCircle(this.positionList);
            this.loadKey=false;
        }
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
        //绘制单个圆
        getItmeCircle:function(item){
            if (app.loginKey) {
                var percent = app.getPercent(item);
                $('#indicatorContainer' + percent.ID).radialIndicator({
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
                var radObj = $('#indicatorContainer' + percent.ID).data('radialIndicator');
                if ($('#indicatorContainer' + percent.ID).length === 1) {
                    radObj.animate(percent.Score);
                }
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
        //序列化对象
        getPercent: function (item) {
            var obj={};
            obj.ID = item.ID;
            obj.Score = item.Score * 100;

            return arr;
        },
        //获取职位列表
        getList: function (p) {

            var myParams = {
                Title: app.positionName,
                JobType: app.selectType,
                Area: app.areaValue,
                PositionName: app.positionValue,
                Industry: app.industryValue,
                BeginPay: app.payFrom,
                EndPay: app.payTo,
                PageIndex: p,
                PageSize: pageSize,
                UserID: UserID == "" ? 0 : UserID,
                UserKey: UserKey,
                st: app.inputKey
            }

            //var pageUrl="/Job/PositionList";
            var pageUrl = "http://47.104.130.19:8085/knx/job_query.do";
            var mySuccessFun = function (result) {
                if (result !== null) {
                    //app.positionList = result.Data;
                    app.positionList = dataFormat(result.data);
                    if (p === 0) {
                        //app.pageCount = result.PageCount;
                        app.pageCount = Math.ceil(result.total / pageSize);
                        app.getPage(Math.ceil(result.total / pageSize));
                    }

                }
            }
            var myErrorFun = function (error) {
                showMessage("网络出错了！");
            }
            //myAjax("post", pageUrl, JSON.stringify(myParams), mySuccessFun, myErrorFun);
            getAjax("get", pageUrl, myParams, mySuccessFun, myErrorFun);
        },
        //推荐职业方法
        getJobList: function () {
            var myParams = {
                UserID: UserID == "" ? 0 : UserID,
                UserKey: UserKey
            }
            var pageUrl = "http://47.104.130.19:8085/knx/job_recommend.do";
            var mySuccessFun = function (result) {
                if (result !== null) {
                    app.recommendList = dataFormat(result.data);
                }
            }
            var myErrorFun = function (error) {
                showMessage("网络出错了！");
            }
            getAjax("get", pageUrl, myParams, mySuccessFun, myErrorFun);
        },
        //收藏职位
        likeCut: function (ID, IS, platform, Name, CompId,JID, index) {
            if (this.loginKey) {
                app.collectPosition(ID, IS, platform, Name, CompId,JID, index);
            } else {
                window.location.href="/Home/m_User";
            }
        },
        //收藏职位和取消职位
        collectPosition: function (ID, IS, platform, Name, CompId, JID, index) {
            var pageUrl = "/Job/SubmitCollect";
            if (IS) {
                //取消收藏      
                myParams = {
                    platform: platform,
                    id: ID,
                    type: 0
                }
            }else{
                myParams = {
                    platform: platform,
                    id: ID,
                    type: 1
                }
            }
            var mySuccessFun = function (result) {
                if (result !== null) {
                    if(IS){
                        app.positionList[index].Like -= 1;
                        app.positionList[index].IsLike = false;
                        app.positionList = $.extend([], app.positionList);
                        if (result.Success) {
                            var obj = {
                                JobID: ID
                            };
                            //记录收藏操作
                            InsertJobLog("/Job/DeleteCollect", (obj));
                        }
                    }else{
                        app.positionList[index].Like += 1;
                        app.positionList[index].IsLike = true;
                        app.positionList = $.extend([], app.positionList);
                        if (result.Success) {
                            var obj = { JobID: ID, JobName: Name, CompanyID: CompId, JID: JID };
                            //记录收藏操作
                            InsertJobLog("/Job/InsertCollectJobLog", (obj));
                        }
                    }
                }
            }
            var myErrorFun = function (error) {
                showMessage("网络出错了！");
            }
            getAjax("post", pageUrl, myParams, mySuccessFun, myErrorFun);
        },
        //切换显示筛选列表
        filterShow:function(){
            if(app.filterKey){
                app.filterKey=false;
            }else{
                app.filterKey=true;
            }
        }, 
        //类型筛选
        searchType:function(type){
            console.log(type);
            if(type===1){
                if(app.filterType!=='全职'){
                    app.filterType='全职';
                }
            }else{
                if(app.filterType!=='实习'){
                    app.filterType='实习';
                }
            }
        },
        //清空筛选项
        filterClear:function(){

        }
    }
})

$(function () {

    //绘制进度圆
    app.getCircle(app.positionList);

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

    //滚动加载
    $(window).scroll(function(event){
        var oLen=$(window).height();
        var oHeight=$(document).height();  
        var oTop=$(document).scrollTop(); 
        if((oHeight-oTop-oLen)<40){
            app.loadKey=true;
            $.each(addList,function(index,item){
                app.positionList.push(item);
            })
        }else{
            // $(".load-container").hide();
        }
    });
    
    //全屏触发事件
    $(document).on("touchstart", function (e) {

        //收起选项列表
        // if (e.target.className.indexOf("btn-banner-show") < 0) {
        //     app.filterKey = false;
        // }
    })


});

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
                obj["Score"] = lists[i][j];
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

//添加投递日志
function InsertJobLog(pageUrl, myParams) {
    var mySuccessFun = function (result) {
        if (result !== null) {
            //console.log(result);
            return result;

        }
    }
    var myErrorFun = function (error) {
        showMessage("网络出错了！");
    }
    getAjax("post", pageUrl, myParams, mySuccessFun, myErrorFun);
}

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

