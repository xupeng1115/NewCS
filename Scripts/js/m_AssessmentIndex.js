//数据绑定和事件绑定
var app = new Vue({
    el: "#app",
    data: {
        List: SubjectList,
        Len: SubjectList.length,
        currentItem: 1,
        submitList: [],
        pageShow:false
    },
    methods: {
        selectPre: function () {
            if (app.currentItem !== 1) {
                app.currentItem--;
            }

        },
        selectNext: function () {
            if (app.currentItem !== app.Len) {
                app.currentItem++;
            }
        },
        //点选题目
        selectItem: function (Item, num, type) {
            var oBox = $('.question-item[num="' + num + '"]');
            if (type === 0) {
                if (!(oBox.eq(0).hasClass("input-active"))) {
                    oBox.eq(1).removeClass("input-active");
                    oBox.eq(1).find(".input-radio-flo").removeClass("input-radio-active");
                    oBox.eq(0).addClass("input-active");
                    oBox.eq(0).find(".input-radio-flo").addClass("input-radio-active");

                    oBox.eq(0).find("input").prop("checked", true);
                    app.setValue(Item,num);
                }
            } else {
                if (!(oBox.eq(1).hasClass("input-active"))) {
                    oBox.eq(0).removeClass("input-active");
                    oBox.eq(0).find(".input-radio-flo").removeClass("input-radio-active");
                    oBox.eq(1).addClass("input-active");
                    oBox.eq(1).find(".input-radio-flo").addClass("input-radio-active");

                    oBox.eq(1).find("input").prop("checked", true);
                    app.setValue(Item,num);
                }
            }
        },
        setValue: function (Item,num) {
            var val = $('input[name="' + Item.ID + '"]:checked').val();
            $(".page").eq(num-1).addClass("disable");
            
            var isOnce = true;
            $.each(app.submitList, function (index, item) {
                if (item.ID === Item.ID) {
                    isOnce = false;
                    //app.submitList[index].Choice = Number(val);
                    app.submitList[index].ChoiceNew = val;
                    return false;
                }
            })
            if (isOnce) {
                app.submitList.push({ ID: Item.ID, TypeID: Item.typeid, ChoiceNew: val, SubjectName: Item.SubjectName, SubjectContent: Item.SubjectContent });
            }
            //if (app.currentItem <app.Len) {
            //    app.currentItem++;
            //}
        },
        submitBtn: function () {
            var oNum = app.Len - app.submitList.length;
            if (oNum > 0) {
                showMessage('您还有<span style="color:#ffbf00;"> ' + oNum + ' </span>道题未填答，请完善答题');
                return false;
            }

            var pageUrl = "/Assessment/SubmitUserAssessmentNew";
            var myParams = {
                assessmentList: app.submitList
            }

            //提交测评信息
            $.ajax({
                url: pageUrl,
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(myParams),
                success: function (result) {
                    if (result !== null) {
                        console.log(result);
                        showMessage("恭喜您！测评提交成功");
                    }
                }, error: function () {
                    showMessage("网络出错了！");
                    
                }
            })
        },
       	getPageList:function(){
       		if(app.pageShow){
       			app.pageShow=false;
       		}else{
       			app.pageShow=true;
       		}
       	},
       	getPage:function(index){
       		if(index<(app.Len+1)){
       			app.currentItem=index;
       			app.pageShow=false;
       		}else{
  				window.location.href="Index.html";
       		}
       	}
    }
})



