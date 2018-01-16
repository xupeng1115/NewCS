$(function(){
	
	//分页
	(function(){
		$(".tcdPageCode").createPage({
	        pageCount:4,
	        current:1,
	        backFn:function(p){
	            console.log(p);
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
	            categories: ['R', 'I', 'A', 'S',
	                         'E', 'C'],
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
	            data: [43000, 59000, 60000, 35000, 44000, 60000],
	            pointPlacement: 'on'
	        }]
	    });
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
		
		$("body").on("click",".assessment-submit-btn",function(){
			console.log(123);
			$(".content-container").hide();
			$(".prompt-login").show();
		})
		
	}());
})




