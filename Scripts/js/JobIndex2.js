//Vue数据模型（交互逻辑和事件绑定）
var app=new Vue({
	el:"#app",
	data:{
		loginKey:isLogin,
		recommendList:recommendList,
		resumeDetail:resumeDetail
	},
	methods:{
		ImgError:function(){
			var oImg=event.srcElement;
		    oImg.src="../../Content/image/job_list_company01.png";
		    oImg.onerror=null;
		},
	}
})

$(function(){
	
	//圆形进度条
	(function(){
		$('#indicatorContainer').radialIndicator({
	        barColor: '#ffbf00',
	        barWidth: 8,
	        initValue: 0,
	        fontFamily:'"PingFang SC","Microsoft Yahei"',
	        fontWeight:'normal',
	        fontSize:20,
	        fontColor:"#666666",
	        roundCorner : true,
	        percentage: true
	    });
	    
	    //进度从零运动到指定位置
	    var radObj = $('#indicatorContainer').data('radialIndicator');
		radObj.animate(68);
	}());
	
	//页面初始化执行
	(function(){
		
	}());
	
	//事件注册
	(function(){
		
		//侧边导航
		$(window).scroll(function() {
			//获取文档滚动高度
		    var top = $(document).scrollTop();

		    if(top>=378){
		    	$(".content-nav").addClass("nav-scroll");
		    }else{
		    	$(".content-nav").removeClass("nav-scroll");
		    }
		})
		
		//模块导航滚动
		$("body").on("click",".nav-href",function(event){
			var oActive=$(this).parent(".content-nav-item").hasClass("content-nav-active");
			var oNum=$(this).attr("num");
			var oList=$(".content-nav-item");
			var TOP=60;
			if(!oActive){
				$.each(oList,function(index,item){
					if($(item).hasClass("content-nav-active")){
						$(item).removeClass("content-nav-active");
						return;
					}
				})
				$(this).parent(".content-nav-item").addClass("content-nav-active");
			}
			
			$("html, body").animate({
		      	scrollTop: ($($(this).attr("href")).offset().top -TOP)+ "px"
		    }, {
		      	duration: 500,
		      	easing: "swing"
		    });
		    return false;
		})
		
	}());
	
})