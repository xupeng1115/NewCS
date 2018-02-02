$(function(){
	
	//分页
	(function(){
		$(".tcdPageCode").createPage({
	        pageCount:4,
	        current:1,
	        backFn:function(pageIndex){
				$('.assessment-list').hide();
				$('.assessment-list'+pageIndex).show();
	        }
	    });
	}());
	
	//答题进度
	(function(init,num){
		var radialObj = radialIndicator('#indicatorContainer', {
	        barColor: '#ffbf00',
	        barWidth: 9,
	        initValue: init,
	        minValue:0,
    		maxValue: num,
	        fontFamily:'"PingFang SC","Microsoft Yahei"',
	        fontWeight:'normal',
	        fontSize:28,
	        fontColor:"#fff",
	        roundCorner : true,
	        percentage: false,
	        format: function (value) {
        		return value+"/"+num;
    		}
	   	});
		
		setInterval(function () {
			if(init===61){
				init=0;
			}
    		radialObj.value(init++);
		}, 1000);
	}(window.assessmentInit=0,window.assessmentNum=60));
	
	//测评报告
	(function(){
		if(UserExam){
			BindResultPicture(JSON.parse(UserExam),ResultPictrue);
		}else{
			GetSubJectList(0);
		}
	}());
	
	//事件注册
	(function(){
		
		$("body").on("click",".back-top",function(event){
			$('body,html').animate({scrollTop:0},300);
		})
		
		$("body").on("click",".assessment-reset-btn",function(){
			$(".content-container").hide();
			$(".assessment-report").show();
        })


        $("body").on("click",".prompt-login-btn",function(event){
            $(".lr-container").show();
        })
		
		$("body").on("click",".assessment-submit-btn",function(){
			var Missing=0;
			var assessmentList = $('.assessment-item');
			var arrayAssessment =[];
			$.each(assessmentList,function(index,item){
				var isTure = 3;
				if($(item).find("input:checked").hasClass("assessment-yes")){
					isTure = 1;
				}else if($(item).find("input:checked").hasClass("assessment-no")){
					isTure = 0;
				}else{
					Missing++;
				}	
				arrayAssessment.push({ID:$(item).data("id"),TypeID:$(item).data("typeid"),Choice:isTure,SubjectName:"",SubjectContent:""});
			})
			if(Missing>0){
				alert("还有"+Missing+"未答，请完善答案");
				return false;
			}

			var myParams = {
				assessmentList: arrayAssessment
			}
			var mySuccessFun = function (result) {
				console.log(result);
				if (result.Success) {
					if(result.Data.GUID){
						$(".content-container").hide();
						$(".prompt-login").show();
					}else{
						BindResultPicture(result.Data,result.Data.ExaminationsResult);
					}
				} else {
					alert(result.Message);
				}
			}
			var myErrorFun = function () {
				alert("网络出错了！");
				
			}
			//提交测评信息
			myAjax("post", "/Assessment/SubmitUserAssessment", JSON.stringify(myParams), mySuccessFun, myErrorFun);
		})
		
	}());


	function BindResultPicture(result,resultPicture){

		console.log(result);
		console.log(resultPicture);
		var titles = [];
		var scores = [];
		
		$.each(JSON.parse(resultPicture),function(index,item){
			titles.push(index);
			scores.push(item);
		})
		$('#container').highcharts({
	        chart: {
	            polar: true,
	            type: 'area'
	        },
	        title: {
	            text: '职业兴趣测评',
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
	        	enabled:false
	        },
	        series: [{
	            name:'分数',
	            showInNavigator:false,
	            data: scores,
	            pointPlacement: 'on'
	        }]
	    });

		$(".content-container").hide();
		$(".report-back-btn").hide();
		$(".assessment-report").show();
		$("#TypeName").text(result.TypeName);
		$("#TypeNames").text(result.TypeName);
		$("#Code").text(result.Code);
		$("#Codes").text(result.Code);
		$("#CodeDescribe").html(result.CodeDescribe);
		$("#TypeDescribe").html(result.TypeDescribe);
		$("#Score").text(result.Score);
		
	}

	//Ajax
    function myAjax(myType, myUrl, myParams, mySuccessFun, myErrorFun) {

        var params = {
            "controller": myUrl,
            data: myParams,
            contentType:"application/json; charset=utf-8"
        };

        var successFun = mySuccessFun;
        var errorFun = myErrorFun;

        if (myType.toLocaleUpperCase() === "GET") {
            communication.get(params, successFun, errorFun);
        } else {
            communication.post(params, successFun, errorFun);
        }
    }
})




