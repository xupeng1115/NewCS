//请求接口
var titleUrl = "/My/GetTitles",
	addTitleUrl = "/My/SubmitUserTitle";

var app = new Vue({
    el: "#app",
    data: {
        //是否登录
        loginKey:true,
        Len:UserTitleList.length,
        currentLen:0,
        tagList:UserTitleList,
        saveList:[]
        
    },
    watch:{
        
    },
    updated: function () {
        
    },
    methods: {
        getTags: function () {

            var myParams = {};
            var mySuccessFun = function (result) {
                if (result.Success) {
                    app.totalTags = result.Data;
                    showScroll();
                } else {
                    showMessage(result.Message);
                }
            }
            var myErrorFun = function () {
                showMessage("网络出错了！");
            }

            //发送请求获取所有的标签列表
            myAjax("get", titleUrl, JSON.stringify(myParams), mySuccessFun, myErrorFun, "application/json; charset=utf-8");
        },
        tagConfirm: function () {
            var tags = [];
            var tagNames = [];
            $.each(app.selectedTags, function (index, item) {
                tags.push(String(item.ID));
                tagNames.push(item.TitleName);
            })

            if (tags.length == 0) {
                showMessage("请至少选一个标签");
                return;
            }

            var myParams = {
                arrayTltleID: tags,
                arrayTitle: tagNames
            };
            var mySuccessFun = function (result) {
                if (result.Success) {
                    $(".flo-box").hide();
                    app.selectedTags = [];
                    app.tagBoxShow = false;
                    hideScroll();
                } else {
                    showMessage(result.Message);
                }
            }
            var myErrorFun = function () {
                showMessage("网络出错了！");
            }

            //发送请求获取标签列表
            myAjax("Post", addTitleUrl, JSON.stringify(myParams), mySuccessFun, myErrorFun, "application/json; charset=utf-8");

        },
        tagClick: function (tag, event) {
            var oSelected = $(event.target).hasClass("selected");

            if (this.selectedTags.length <= 5) {
                if (oSelected) {
                    var oIndex;
                    $(event.target).removeClass("selected");
                    $.each(this.selectedTags, function (index, item) {
                        if (item.TitleName === tag.TitleName) {
                            oIndex = index;
                            return;
                        }
                    })
                    this.selectedTags.splice(oIndex, 1);
                } else {
                    if (this.selectedTags.length < 5) {
                        $(event.target).addClass("selected");
                        this.selectedTags.push(tag);
                    } else {
                        showMessage("最多选择5个标签");
                    }
                }
            }
        },
    }
})

$(function () {

    app.getTags();
    
    $("body").on("touchstart", ".flo-container", function (event) {

    });

});

