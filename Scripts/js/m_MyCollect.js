var app = new Vue({
    el: "#app",
    data: {
        //是否登录
        loginKey: isLogin,
        //是否显示侧边菜单  
        menuKey: false,
        //当前页码
        currentPage: 0,
        //总页数
        pageCount:0,
        //职位列表
        jobList:jobList,
        
        //是否显示加载组件
        loadKey:false,
        //加载的列表
        addList: [],
        //是否首次加载
        isFirst:true,
        listKey: false,
        likekey:true,

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
        //监听数组变化
        jobList: {
            handler(newVal) {
                this.listKey = true;
            },
            deep: true
        },
    },
    updated: function () {
        if (this.listKey && this.likekey) {
            $.each($(".match").find("canvas"), function (index, item) {
                $(item).remove();
            })
            this.getCircle(this.jobList);
            this.listKey = false;
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
        dataFormat:function(lists) {
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
        },
        //绘制进度圆
        getCircle: function (list) {
            if (app.loginKey) {
                var percents = app.getPercents(list);               
                $.each(percents, function (index, item) {
                    setTimeout(function () {
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
                            radObj.animate(Math.floor(item.Score));
                        }
                    }, 100)
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
        getJobList: function (p) {
            var myParams = {
                UserID: UserID == "" ? 0 : UserID,
                UserKey: UserKey,
                pageIndex: p,
                pageSize: pageSize
            }
            var pageUrl = "http://47.104.130.19:8085/knx/jobs_delivered_by_user.do";
            var mySuccessFun = function (result) {
                console.log(result);
                if (result !== null) {
                    app.jobList = dataFormat(result.data);
                    app.pageCount = Math.ceil(result.data.length / pageSize);
                }
            }
            var myErrorFun = function (error) {
                showMessage("网络出错了！");
            }
            getAjax("get", pageUrl, myParams, mySuccessFun, myErrorFun);
        },
        addPosition:function(){
            if (app.currentPage < app.pageCount) {
                app.currentPage = app.currentPage + 1;
                app.getList(app.currentPage);
            }else{
                showMessage("没有更多职位了！");
            }
        },
        //收藏职位
        likeCut: function (ID, IS, platform, Name, CompId,JID, index) {
            if (this.loginKey) {
                app.collectPosition(ID, IS, platform, Name, CompId,JID, index);
            } else {
                showMessage("请先登录,才可以收藏职位");
            }
        },
        //收藏职位和取消职位
        collectPosition: function (ID, IS, platform, Name, CompId, JID, index) {
            var pageUrl = "/Job/SubmitCollect";
            if (IS) {
                //取消收藏      
                var myParams = {
                    platform: platform,
                    id: ID,
                    type: 0
                }
            }else{
                var myParams = {
                    platform: platform,
                    id: ID,
                    type: 1
                }
            }
            var mySuccessFun = function (result) {
                if (result !== null) {
                    //收藏职位不用重绘进度圆
                    app.likekey = false;

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
                        showMessage("取消收藏成功!");
                    }else{
                        app.positionList[index].Like += 1;
                        app.positionList[index].IsLike = true;
                        app.positionList = $.extend([], app.positionList);
                        if (result.Success) {
                            var obj = { JobID: ID, JobName: Name, CompanyID: CompId, JID: JID };
                            //记录收藏操作
                            InsertJobLog("/Job/InsertCollectJobLog", (obj));
                        }
                        showMessage("收藏成功!");
                    }
                }
            }
            var myErrorFun = function (error) {
                showMessage("网络出错了！");
            }
            getAjax("post", pageUrl, myParams, mySuccessFun, myErrorFun);
        },
    }
})

$(function () {

    //请求数据源
    (function () {
        // app.getJobList();
        //页面初次加载绘制圆形匹配度进度条
        app.getCircle(app.jobList);
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
                obj["Score"] = Math.floor(lists[i][j]*100)+'%';
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

