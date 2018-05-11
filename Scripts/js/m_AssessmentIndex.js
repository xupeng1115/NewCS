//数据绑定和事件绑定
var app = new Vue({
    el: "#app",
    data: {
        List: SubjectList,
        Len: SubjectList.length,
        currentItem: 1,
        submitList: [],
        pageShow:false,
       	lineNum:0
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
        },
        submitBtn: function () {
            var oNum = app.Len - app.submitList.length;
            if (oNum > 0) {
                showMessage('您还有<span style="color:#ffbf00;"> ' + oNum + ' </span>道题未填答，请完善答题');
                return false;
            }

            var myParams = {
                assessmentList: app.submitList
            }
            var mySuccessFun = function (result) {
                if (result.Success) {
                    console.log(result);
                    showMessage("恭喜您！测评提交成功");
                } else {
                    showMessage(result.Message);
                }
            }
            var myErrorFun = function () {
                showMessage("网络出错了！");
            }
            //提交测评信息
            myAjax("post", "/Assessment/SubmitUserAssessmentNew", JSON.stringify(myParams), mySuccessFun, myErrorFun);
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
       	},
       	resetLine:function(){
       		$(".pages .page:nth-child("+app.lineNum+"n)").css("marginRight","15px");
	    	var w=$(window).width();
			var w1=40;
			var	w2=50;
			var w3=w-w1;
			var oLeft=20;
			var oRight=20;
			var num=Math.floor(w3/w2);  
			var p1=w3%w2;
			var p2=35-p1,p3=15+p1;
			var o1=Math.floor(p2/2);
			var o2=Math.floor(p3/2);
			console.log(num);
			console.log(p1);
			
			if(p1>=10){
				num++;
				if(p2%2!==0){
					oLeft=20-o1-1;
					oRight=20-o1;
				}else{
					oLeft=20-o1;
					oRight=20-o1;
				}
			}else{
				if(p3%2!==0){
					oLeft=20+o2+1;
					oRight=20+o2;
				}else{
					oLeft=20+o2;
					oRight=20+o2;
				}
			}
			
			app.lineNum=num;
			$(".pages").css({"paddingLeft":oLeft+"px","paddingRight":oRight+"px"});
			$(".pages .page:nth-child("+app.lineNum+"n)").css("marginRight","0");
       	}
    }
})


$(function(){
	
	//页面初始化操作
	(function(){
		app.resetLine();
	}());
	
	//监听页面切换横竖屏
	$(window).on("resize",function(){
		app.resetLine();
	})
	  
});


