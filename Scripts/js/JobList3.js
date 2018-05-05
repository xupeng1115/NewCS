//加载动画
var opts = {
    lines: 11, // 花瓣数目
    length: 20, // 花瓣长度
    width: 4, // 花瓣宽度
    radius: 15, // 花瓣距中心半径
    corners: 1, // 花瓣圆滑度 (0-1)
    rotate: 0, // 花瓣旋转角度
    direction: 1, // 花瓣旋转方向 1: 顺时针, -1: 逆时针
    color: '#fff', // 花瓣颜色
    speed: 1.5, // 花瓣旋转速度
    trail: 60, // 花瓣旋转时的拖影(百分比)
    shadow: false, // 花瓣是否显示阴影
    hwaccel: false, //spinner 是否启用硬件加速及高速旋转            
    className: 'spinner', // spinner css 样式名称
    zIndex: 2e9, // spinner的z轴 (默认是2000000000)
    top: 'auto', // spinner 相对父容器Top定位 单位 px
    left: 'auto'// spinner 相对父容器Left定位 单位 px
};

var spinner = new Spinner(opts);

//分页计数器
var num = 0;
var IsTrueLable = "根据您的测评和简历进行大数据分析推荐更适合您的职位";
var GetTrue = GetTrueOrFalse("1");
//Vue数据绑定与事件绑定
var app = new Vue({
    el: "#app",
    data: {
        loginKey: isLogin,
        sendKey: false,
        areaKey: false,
        industryKey: false,
        positionKey: false,
        pageKey: false,
        notNewKey: true,

        //positionList: positionData.Data,
        positionList: [],
        recommendList: recommendData,

        industryList: industrys,
        //areaList: areas,
        //positList: positions,
        cityList: areaObj.cityList,
        provinceList: areaObj.provinceList,
        positList: positions,
        currentSelect: "",

        cityCurrentList: [],
        inputCityList: [],

        //可选搜索项
        positionName: PositionTitle,
        selectType: "",
        areaValue: "",
        positionValue: "",
        industryValue: IndustryValue,
        payFrom: 0,
        payTo: 20000,
        pageCount: 0,

        //匹配列表
        matchData: positions,
        matchList: [],

        //简历和测评是否完成
        IsTrue: IsTrueLable,
        //推荐职位是否隐藏
        IsHide: GetTrue
    },
    computed: {

    },
    watch: {
        //监听对象和对象

        //监听数组变化
        positionList: {
            handler(newVal) {

                this.pageKey = true;
            },
            deep: true
        },
        //监听页码变化
        //pageCount: function (val) {
        //    //更新生成页码
        //    this.getPage(val);
        //},
        //监听工作类型变化
        selectType: function (newVal, oldVal) {
            this.selectType = newVal;
            if (newVal !== "") {
                this.getList(0, 1);
            }
        }
    },
    mounted: function () {

    },
    updated: function () {
        //职位列表生成元素并数据更新后重新绘制匹配度进度条
        if (this.pageKey && this.loginKey && this.notNewKey) {
            $.each($(".position-match").find("canvas"), function (index, item) {
                $(item).remove();
            })
            this.getCircle(this.positionList);
            this.pageKey = false;
        }
    },
    methods: {
        ImgError: function () {
            var oImg = event.srcElement;
            oImg.src = "../../Content/image/empty.png";
            oImg.onerror = null;
        },
        viewMatch: function (ID) {
            getStorage();
        },
        emptyLogin: function () {
            getStorage();
        },
        likeCut: function (ID, IS, platform, index, event) {
            var oEle = $(event.target);
            if (this.loginKey) {
                app.collectPosition(ID, IS, platform, index, oEle);
            } else {
                getStorage();
            }
        },
        //搜索职位投递简历
        Mailing: function (ID, IS, platform, index) {
            if (this.loginKey) {
                //if (IS == 0) {
                //    var mySuccessFun = function () {
                //        app.sendKey = true;
                //        app.positionList[index].IsMailings = 1;
                //        app.positionList = $.extend([], app.positionList);
                //    }
                //    var myErrorFun = function (error) {
                //        alert("网络出错了！");
                //    }
                //    myAjax("post", "/Job/SubmitUserResumeMailing?id=" + ID, "", mySuccessFun, myErrorFun);
                //} else {
                //}
                var istrue = GetTrueOrFalse("0");
                if (!IS && istrue) {
                    //投递简历
                    var pageUrl = "http://47.104.130.19:8085/knx/user_job_delivery.do";
                    var myParams = {
                        user: {
                            UserID: UserID == "" ? 0 : UserID,
                            UserKey: UserKey
                        },
                        data: {
                            platform: platform,
                            id: ID
                        }
                    }
                    var mySuccessFun = function (result) {
                        if (result !== null) {
                            app.notNewKey = false;
                            app.sendKey = true;
                            app.positionList[index].IsMailings = 1;
                            app.positionList = $.extend([], app.positionList);
                        }
                    }
                    var myErrorFun = function (error) {
                        //请求失败后去掉加载动画
                        g_alert("网络出错了！");
                    }
                    getAjax("post", pageUrl, JSON.stringify(myParams), mySuccessFun, myErrorFun);
                }



            } else {
                getStorage();
            }

        },
        //推荐职位投递简历
        recommendMailing: function (ID, IS, index) {
            if (this.loginKey) {
                var istrue = GetTrueOrFalse("0");
                if (IS == 0 && istrue) {
                    var mySuccessFun = function () {
                        app.sendKey = true;
                        app.recommendList[index].IsMailings = 1;
                        app.recommendList = $.extend([], app.recommendList);
                    }
                    var myErrorFun = function (error) {
                        g_alert("网络出错了！");
                    }

                    myAjax("post", "/Job/SubmitUserResumeMailing?id=" + ID, "", mySuccessFun, myErrorFun);
                } else {

                }
            } else {
                getStorage();
            }
        },
        //收藏职位和取消职位
        collectPosition: function (ID, IS, platform, index, Ele) {
            console.log(IS);
            app.collectKey = true;
            var Obj = {
                //              type:IS,
                //				PositionID:ID
            }
            var myParams = []
            var pageUrl = "http://47.104.130.19:8085/knx/user_job_collect.do";
            if (IS) {
                //取消收藏      
                myParams = {
                    user: {
                        UserID: UserID == "" ? 0 : UserID,
                        UserKey: UserKey
                    },
                    data: {
                        platform: platform,
                        id: ID,
                        type: 0
                    }
                }
                var mySuccessFun = function (result) {
                    if (result !== null) {
                        //识别非数组更新操作
                        app.notNewKey = false;

                        Ele.removeClass("yes-like");
                        Ele.addClass("no-like");
                        app.positionList[index].Like -= 1;
                        app.positionList[index].IsLike = false;
                        app.positionList = $.extend([], app.positionList);
                    }
                }
                var myErrorFun = function (error) {
                    //请求失败后去掉加载动画
                    g_alert("网络出错了！");
                }
                getAjax("post", pageUrl, JSON.stringify(myParams), mySuccessFun, myErrorFun);
            } else {
                //收藏
                myParams = {
                    user: {
                        UserID: UserID == "" ? 0 : UserID,
                        UserKey: UserKey
                    },
                    data: {
                        platform: platform,
                        id: ID,
                        type: 1
                    }
                }
                var mySuccessFun = function (result) {
                    if (result !== null) {
                        //识别非数组更新操作
                        app.notNewKey = false;

                        Ele.removeClass("no-like");
                        Ele.addClass("yes-like");
                        app.positionList[index].Like += 1;
                        app.positionList[index].IsLike = true;
                        app.positionList = $.extend([], app.positionList);
                    }
                }
                var myErrorFun = function (error) {
                    //请求失败后去掉加载动画
                    g_alert("网络出错了！");
                }
                getAjax("post", pageUrl, JSON.stringify(myParams), mySuccessFun, myErrorFun);
            }

            //if (IS == 1) {
            //    console.log(IS);
            //    //取消收藏
            //    var mySuccessFun = function () {
            //        Ele.removeClass("yes-like");
            //        Ele.addClass("no-like");
            //        app.positionList[index].Like -= 1;
            //        app.positionList[index].IsLike = 0;
            //        app.positionList = $.extend([], app.positionList);
            //    }
            //    var myErrorFun = function (error) {
            //        alert("网络出错了！");
            //    }
            //    myAjax("post", "/Job/PositionCollection?id=" + ID + "&type=0", "", mySuccessFun, myErrorFun);


            //} else {
            //    进行收藏

            //    var mySuccessFun = function () {
            //        Ele.removeClass("no-like");
            //        Ele.addClass("yes-like");
            //        app.positionList[index].Like += 1;
            //        app.positionList[index].IsLike = 1;
            //        app.positionList = $.extend([], app.positionList);
            //    }
            //    var myErrorFun = function (error) {
            //        alert("网络出错了！");
            //    }
            //    myAjax("post", "/Job/PositionCollection?id=" + ID + "&type=1", "", mySuccessFun, myErrorFun);

            //}
        },
        //工作类型选择
        checkType: function (type) {
            if (type === '实习') {
                $(".select-practice").prop("checked", "checked");
                app.selectType = "实习";
            } else {
                $(".select-full").prop("checked", "checked");
                app.selectType = "全职";
            }
        },
        //城市搜索
        searchArea: function () {
            app.industryKey = false;
            app.positionKey = false;
            app.currentSelect = "city1";
            app.cityCurrentList = $.extend([], app.inputCityList);
            var oLists = $(".filter-item-text");
            $.each(app.cityCurrentList, function (index, item) {
                $(".filter-item-text[index=" + item.ID + "]").removeClass("filter-default").addClass("activeitem");
            });

            if (this.areaKey) {
                this.areaKey = false;
            } else {
                this.areaKey = true;
            }
        },
        //行业搜索
        searchIndustry: function () {
            this.areaKey = false;
            this.positionKey = false;
            if (this.industryKey) {
                this.industryKey = false;
            } else {
                this.industryKey = true;
            }
        },
        //职位搜索
        searchPosition: function () {
            this.areaKey = false;
            this.industryKey = false;
            if (this.positionKey) {
                this.positionKey = false;
            } else {
                this.positionKey = true;
            }
        },
        //城市选择
        areaItem: function (item) {
            if (item.name !== this.areaValue) {
                this.areaValue = item.Name;
                app.getList(0, 1);
            }

        },
        //行业选择
        industryItem: function (item) {
            if (item.name !== this.industryValue) {
                this.industryValue = item.Name;
                app.getList(0, 1);
            }
        },
        //职位选择
        positionItem: function (item) {
            if (item.name !== this.positionValue) {
                this.positionValue = item.Name;
                app.getList(0, 1);
            }
        },
        //关键字enter搜索
        positionEnter: function () {
            app.searchBtn();
        },
        //点击匹配项
        matchItem: function (item) {
            app.positionName = item.Name;
            app.searchBtn();
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
        //生成页码并绑定页码点击事件
        getPage: function (count) {
            num++;
            var oHtml = $(".page-container").html('<div class="tcdPageCode ' + 'tcdPageCode' + num + '"></div>');
            $(".tcdPageCode" + num).createPage({
                pageCount: count,
                current: 1,
                backFn: function (p) {
                    app.getList(p - 1, 1);
                }
            });
        },
        //发送请求获取搜索列表
        getList: function (p, type) {
            //发送请求时添加加载动画
            $("#spin").show();
            spinner.spin($("#spin").get(0));

            if (type === 0) {
                //清空选择地区
                app.cityCurrentList.splice(0);
                app.inputCityList.splice(0);
                var oLists = $(".filter-item-text");
                $.each(app.cityCurrentList, function (index, item) {
                    $(".filter-item-text[index=" + item.ID + "]").removeClass("activeitem").addClass("filter-default");
                });
                //清空工作类型选择
                $(".select-full").prop("checked", false);
                $(".select-practice").prop("checked", false);

                app.selectType = "";
                app.areaValue = "";
                app.positionValue = "";
                app.industryValue = "";
                app.payFrom = 0;
                app.payTo = 20000;

                app.resetPrice();
            }

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
                UserKey: UserKey
            }

            //var pageUrl="/Job/PositionList";
            var pageUrl = "http://47.104.130.19:8085/knx/job_query.do";
            var mySuccessFun = function (result) {
                if (result !== null) {
                    //启动重绘进度圆
                    app.notNewKey = true;
                    //app.positionList = result.Data;
                    app.positionList = dataFormat(result.data);
                    if (p === 0) {
                        //app.pageCount = result.PageCount;
                        app.pageCount = Math.ceil(result.total / pageSize);
                        app.getPage(Math.ceil(result.total / pageSize));
                    }

                    //清空匹配数组
                    app.matchList = [];
                }
                //请求成功后去掉加载动画
                $("#spin").hide();
                spinner.spin();
            }
            var myErrorFun = function (error) {
                //请求失败后去掉加载动画
                $("#spin").hide();
                spinner.spin();
                g_alert("网络出错了！");
            }
            //myAjax("post", pageUrl, JSON.stringify(myParams), mySuccessFun, myErrorFun);
            getAjax("get", pageUrl, myParams, mySuccessFun, myErrorFun);

        },
        //清空选择
        clearSelect: function () {
            if (app.selectType !== "" || app.areaValue !== "" || app.positionValue !== "" || app.industryValue !== "" || app.payFrom !== 0 || app.payTo !== 20000) {
                app.getList(0, 0);
            }
        },
        //重置可选价钱区
        resetPrice: function () {
            $(".search-pay-box").html('<input id="range" style="display:none;"/>');
            var $range = $("#range");
            var track = function (data) {
                //			    delete data.input;
                //			    delete data.slider;

                app.payFrom = data.from;
                app.payTo = data.to;
            };

            $range.ionRangeSlider({
                type: "double",
                min: 0,
                max: 20000,
                from: 0,
                to: 20000,
                step: 100,
                grid: false,
                onStart: track,
                onChange: track,
                onFinish: track,
                onUpdate: track
            });
        },
        //点击搜索按钮
        searchBtn: function () {
            app.getList(0, 0);

        },
        //关闭投递成功弹窗
        colseSend: function () {
            this.sendKey = false;
        },
        //切换弹窗侧边导航
        selectNav: function (index) {
            if (index !== app.currentSelect) {
                app.currentSelect = index;
            }
        },
        //点选地区
        selectAreaItem: function (item, event) {
            var oIndex = app.cityCurrentList.indexOf(item);
            if (oIndex >= 0) {
                app.cityCurrentList.splice(oIndex, 1);
                $(event.target).removeClass("activeitem").addClass("filter-default");
            } else {
                if (app.cityCurrentList.length >= 2) {
                    g_alert("最多选择两项");
                } else {
                    app.cityCurrentList.push(item);
                    $(event.target).removeClass("filter-default").addClass("activeitem");
                }
            }
        },
        //取消以选中的地区
        cancelAreaItem: function (item, event) {
            var oIndex1 = app.cityList.indexOf(item);
            var oIndex2 = app.provinceList.indexOf(item);
            if (oIndex1 >= 0) {
                var oIndex = Number($(event.target).attr("index"));
                app.cityCurrentList.splice(oIndex, 1);
                $(".filter-item-text[index=" + item.ID + "]").removeClass("activeitem").addClass("filter-default");
                return;
            }

            if (oIndex2 >= 0) {
                var oIndex = Number($(event.target).attr("index"));
                app.cityCurrentList.splice(oIndex, 1);
                $(".filter-item-text[index=" + item.ID + "]").removeClass("activeitem").addClass("filter-default");
                return;
            }
        },
        //关闭选择地区弹窗
        areaClose: function () {
            app.areaKey = false;
            app.currentSelect = '';
            app.cityCurrentList.splice(0);
            var oLists = $(".filter-item-text");
            $.each(oLists, function (index, item) {
                $(item).removeClass("activeitem").addClass("filter-default");
            });
        },
        //确定选择地区弹窗
        areaContrim: function () {
            app.inputCityList = $.extend([], app.cityCurrentList);
            var oValue = '';
            $.each(app.inputCityList, function (index, item) {
                if (index > 0) {
                    oValue += "+" + item.Text;
                } else {
                    oValue += item.Text;
                }
            })
            app.areaValue = oValue;
            app.getList(0, 1);
            app.areaClose();
        }
    }
});

//新增测评信息和简历完善度是否完成的判断条件
//type=0单击事件调用,1默认加载调用
function GetTrueOrFalse(type) {
    //测评信息
    var istrue = false;
    //简历信息
    if (JSON.stringify(ResumeBasic) != "{}") {
        //自我评价
        if (ResumeBasic.Content != null) {
            //教育背景
            if (EducationBackround.length > 0) {
                //荣誉信息
                if (Award.length > 0) {
                    //实习信息
                    if (InternshipExperience.length > 0) {
                        //特长技能
                        if (Sepcilty.length > 0) {
                            //测评信息
                            if (IsAssessment == "False") {
                                g_alert("请完成测评后进行投递");
                                istrue = false;
                                IsTrueLable = "请完成测评后,进行大数据分析推荐更适合您的职位";
                            } else {
                                istrue = true;
                            }
                        } else {
                            g_alert("请完善技术技能后进行投递");
                            istrue = false;
                            IsTrueLable = "请完善简历后,进行大数据分析推荐更适合您的职位";
                        }
                    } else {
                        g_alert("请完善实习信息后进行投递");
                        istrue = false;
                        IsTrueLable = "请完善简历后,进行大数据分析推荐更适合您的职位";
                    }
                } else {
                    g_alert("请完善荣誉信息后进行投递");
                    istrue = false;
                    IsTrueLable = "请完善简历后,进行大数据分析推荐更适合您的职位";
                }
            } else {
                g_alert("请完善教育背景后进行投递");
                istrue = false;
                IsTrueLable = "请完善简历后,进行大数据分析推荐更适合您的职位";
            }
        } else {
            g_alert("请完善自我介绍后进行投递");
            istrue = false;
            IsTrueLable = "请完善简历后,进行大数据分析推荐更适合您的职位";
        }
    }
    else {
        //判断是否登录,在登录情况下才提示信息
        //if (isLogin) {
        //    g_alert("请完善个人信息");
        //}
        if (type=="0") {
            g_alert("请完善个人信息");
        }
        IsTrueLable = "请完善简历后,进行大数据分析推荐更适合您的职位";
        istrue = false;

    }
    return istrue;
}





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

$(function () {

    //可拖动价钱区域
    (function () {
        app.resetPrice();
    }());

    //页面初始化执行操作
    (function () {
        app.getList(0, 1);
        //页面初次加载绘制圆形匹配度进度条
        if (app.loginKey) {
            //app.positionList = positionData.Data;
            app.getCircle(app.positionList);
        }
        //生成分页
        var oHtml = $(".page-container").html('<div class="tcdPageCode ' + 'tcdPageCode' + num + '"></div>');
        if (app.pageCount > 1) {
            $(".tcdPageCode" + num).createPage({
                pageCount: app.pageCount,
                current: 1,
                //切换页码时列表刷新
                backFn: function (p) {
                    app.getList(p - 1, 1);
                }
            });
        }
    }());

    //验证是否有placeholder属性
    (function () {
        if (!hasPlaceholderSupport()) {
            if (PositionTitle == '') {
                $(".search-box").addClass("search-box-ph");
            }
        }
    }());

    //jQuery事件注册
    (function () {

        $("body").on("input", ".search-input", function () {
            if (!hasPlaceholderSupport()) {
                $(".search-box").removeClass("search-box-ph");
            }
            app.matchList.splice(0);
            var oValue = $(this).val();
            for (var i = 0; i < app.matchData.length; i++) {
                if (app.matchData[i].Name.toLowerCase().indexOf(oValue.toLowerCase()) >= 0) {
                    app.matchList.push(app.matchData[i]);
                }
            }
        });

        $("body").on("click", ".search-box", function () {
            $(".search-input").focus();
        });

        $("body").on("focus", ".search-input", function () {
            app.matchList.splice(0);
        });

        //对比价钱区间是否变化中间量
        var payFromVal, payToVal;

        //隐藏下拉框
        $(document).on("click", function (e) {
            if (e.target.className.indexOf("search-industry-value") < 0) {
                //app.positionKey = false;
                app.industryKey = false;
                //app.areaKey = false;
            }

            if (e.target.className.indexOf("search-match-item") < 0) {
                app.matchList.splice(0);
            }
        })

        //鼠标点下记录价钱区间
        $("body").on("mousedown", ".irs-slider", function () {
            payFromVal = app.payFrom,
			payToVal = app.payTo;
        })

        //鼠标抬起获取价钱区间
        $("body").on("mouseup", ".irs-slider", function () {
            if (payFromVal !== app.payFrom || payToVal !== app.payTo) {
                app.getList(0, 1);
            }
        })

    }());
})

//图片没有成功加载出来时处理
function nofind() {
    var oImg = event.srcElement;
    oImg.src = "../../Content/img/head.png";
    oImg.onerror = null;
}



