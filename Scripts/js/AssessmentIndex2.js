//定义全局进度圆变量
var radialObj = null;
//重置测评数
var oNum = 0;

//Vue事件绑定和数据绑定
var app = new Vue({
    el: "#app",
    data: {
        lokinKey: true,
        assessmentList: getAssessment(SubjectList),
        currentPage: 0,
        pageNum:Math.ceil(SubjectList.length / 15),
        submitList: [],
        pageList:[],
        examShow: true,
        resultShow: false,
        guideShow: false,
        tipShow: true,

        Code: "",
        TypeName: "",
        Score: null,
        CodeDescribe: "",
        TypeDescribe: "",
        baseNum: baseNum

    },
    methods: {
        //关闭注意事项
        closeTip: function () {
            app.tipShow = false;
            $(".content-wrapper").animate({
                "width": "1000px"
            }, 1000);
        },
        //打开注意事项
        openTip: function () {
            if (!app.tipShow) {
                app.tipShow = false;
                $(".content-wrapper").animate({
                    "width": "776px"
                }, 1000);
                setTimeout(function () {
                    app.tipShow = true;
                }, 1000)
            } else {

            }
        },
        //点选题目
        getCheck: function (ID, typeid,event) {
            $(event.target).find("input").prop("checked", true);
            var val = $('input[name="' + ID + '"]:checked').val();
            var isOnce = true;
            $.each(app.submitList, function (index, item) {
                if (item.ID === ID) {
                    isOnce = false;
                    //app.submitList[index].Choice = Number(val);
                    app.submitList[index].ChoiceNew = val;
                    return false;
                }
            })
            if (isOnce) {
                app.submitList.push({ ID: ID, TypeID: typeid, ChoiceNew: val, SubjectName: "", SubjectContent: "" });
            }
            radialObj.value(app.submitList.length);

            if (app.pageList.indexOf(app.currentPage)<0) {
                app.pageList.push(app.currentPage);
            }

        },
        //提交答题结果
        submitBtn: function () {
            var formatNum = '';
            //44到题目余数14添加一个条件(app.submitList.length % 15) > 0 
            if ((app.submitList.length % 15)!=14) {
                g_alert('第<span style="color:#ffbf00"> ' + (app.currentPage + 1) + ' </span>页还有<span style="color:#ffbf00;"> ' + (15-app.submitList.length % 15) + ' </span>道题未填答，请完善答题');
                return false;
            } else {
                if (app.pageList.length < 3) {

                    if (app.pageList.indexOf(0) < 0) {
                        formatNum += ' 1';
                    }
                    if (app.pageList.indexOf(1) < 0) {
                        formatNum += ' 2';
                    }
                    if (app.pageList.indexOf(2) < 0) {
                        formatNum += ' 3';
                    }
                    //if (app.pageList.indexOf(3) < 0) {
                    //    formatNum += ' 4';
                    //}

                    g_alert('第<span style="color:#ffbf00">'+formatNum + ' </span>页还未填答，请完善答题');
                    return false;
                }
            }
            

            var myParams = {
                assessmentList: app.submitList
            }
            var mySuccessFun = function (result) {
                if (result.Success) {
                    if (result.Data.GUID) {
                        app.examShow = false;
                        app.guideShow = true;
                        app.tipShow = false;
                    } else {
                        app.dirResult(result.Data, result.Data.ExaminationsResult);
                        app.examShow = false;
                        app.resultShow = true;
                        app.tipShow = false;
                    }
                } else {
                    g_alert(result.Message);
                }
            }
            var myErrorFun = function () {
                g_alert("网络出错了！");
            }
            //提交测评信息
            myAjax("post", "/Assessment/SubmitUserAssessmentNew", JSON.stringify(myParams), mySuccessFun, myErrorFun);
        },
        //重置答题
        resetBtn: function () {
            app.resetCheck();
        },
        resetCheck: function () {
            var oList = $('input[type="radio"]:checked');
            $.each(oList, function (index, item) {
                $(item).removeAttr("checked");
                app.submitList = [];
            })

            radialObj.value(0);
            app.currentPage = 0;
            app.pageList = [];

            oNum++;
            $(".page-container").html('<div class="tcdPageCode tcdPageCode' + oNum + '"></div>');
            $(".tcdPageCode" + oNum).createPage({
                pageCount: app.pageNum,
                current: 1,
                backFn: function (p) {
                    app.currentPage = (p - 1);
                }
            });

            app.guideShow = false;
            app.resultShow = false;
            app.examShow = true;
            app.tipShow = true;
            $(".content-wrapper").css("width", "776px");
        },
        //返回测评
        backAssessment: function () {
            app.resetCheck();
        },
        //绘制测评结果
        dirResult: function (result, resultPicture) {
            var titles = [];
            var scores = [];

            $.each(JSON.parse(resultPicture), function (index, item) {
                titles.push(index);
                scores.push(item);
            })
            $('#container').highcharts({
                chart: {
                    polar: true,
                    type: 'area'
                },
                title: {
                    text: '',
                    x: -80
                },
                pane: {
                    size: '80%'
                },
                xAxis: {
                    categories: titles,
                    tickmarkPlacement: 'on',
                    lineWidth: 0
                },
                yAxis: {
                    gridLineInterpolation: 'polygon',
                    lineWidth: 0,
                    min: 0
                },
                legend: {
                    enabled: false
                },
                series: [{
                    name: '分数',
                    showInNavigator: false,
                    data: scores,
                    pointPlacement: 'on'
                }]
            });

            app.Code = result.Code;
            app.TypeName = result.TypeName;
            app.Score = result.Score;
            app.CodeDescribe = result.CodeDescribe;
            app.TypeDescribe = result.TypeDescribe;

        },
        formatNum: function () {
            var oNum=(app.submitList.length)%15;
            if (oNum > 0) {
                g_alert('您第<span style="color:#ffbf00;"> '+(app.currentPage+1)+' </span>页还有<span style="color:#ffbf00;"> ' + (15-oNum) + ' </span>道题未填答，请完善答题');
                return false;
            } else {
                return true;
            }
        }

    }
})


$(function () {

    //分页
    (function () {
        $(".page-container").html('<div class="tcdPageCode tcdPageCode' + oNum + '"></div>');
        
        $(".tcdPageCode"+oNum).createPage({
            pageCount: app.pageNum,
            current: 1,
            backFn: function (p) {
                app.currentPage = (p - 1);
            }
        });
    }());

    //答题进度
    (function () {
        //答题进度
        radialObj = radialIndicator('#indicatorContainer', {
            barColor: '#ffbf00',
            barWidth: 9,
            initValue: 0,
            minValue: 0,
            maxValue:SubjectList.length ,
            fontFamily: '"PingFang SC","Microsoft Yahei"',
            fontWeight: 'normal',
            fontSize: 28,
            fontColor: "#fff",
            roundCorner: true,
            percentage: false,
            format: function (value) {
                return value + "/" + SubjectList.length;
            }
        });

    } ());

    //测评报告
    (function () {
        if (UserExam) {
            app.dirResult(JSON.parse(UserExam), ResultPictrue);
            app.examShow = false;
            app.resultShow = true;
            app.tipShow = false;
        } else {
            app.examShow = true;
            app.resultShow = false;
        }
    } ());

    //事件注册
    (function () {

        $("body").on("click", ".back-top", function (event) {
            $('body,html').animate({ scrollTop: 0 }, 300);
        })

        $("body").on("click", ".assessment-begin-btn", function () {
            $('body,html').animate({ scrollTop: 440 }, 500);
        })

        $("body").on("click", ".prompt-login-btn", function () {
            getStorage();
        })

        var topBanner = $(".top-banner").height();
        //答题进度
        $(window).scroll(function () {

            //获取文档滚动高度
            var top = $(document).scrollTop();
            if (top >= (topBanner + 65)) {
                $(".content-nav").css({
                    "height": "60px",
                    "opacity": 0.8
                });
            } else {
                $(".content-nav").css({
                    "height": "0",
                    "opacity": 0
                });
            }
        })
    } ());
})

//获取处理后的数组
function getAssessment(list) {
    var newList = [],
		subList = [],
		pageNum = Math.ceil(list.length / 15);
    for (var i = 0; i < pageNum; i++) {
        if (i === (pageNum - 1)) {
            for (var j = i * 15; j < list.length; j++) {
                list[j].Num = j;
                subList.push(list[j]);
            }
        } else {
            for (var j = i * 15; j < (i + 1) * 15; j++) {
                list[j].Num = j;
                subList.push(list[j]);
            }
        }
        newList.push(subList);
        subList = [];
    }

    return newList;
}