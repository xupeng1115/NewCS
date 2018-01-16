$(function(){

	//初始化操作
	(function(){
		$(".back-top").hide();
	}());
	
	
	//事件注册
	(function(){
		
		$("body").on("click",".flow-btn-online",function(){
			window.location.href="../Course/List.html"
		})
		
		
		//侧边导航
		$(window).scroll(function() {
			//获取文档滚动高度
		    var top = $(document).scrollTop();

		    if(top>=345){
		    	$(".nav-wrapper").addClass("nav-scroll");
		    }else{
		    	$(".nav-wrapper").removeClass("nav-scroll");
		    }
		})
		
		//模块导航滚动
		$("body").on("click",".nav-href",function(event){
			var oActive=$(this).parent(".nav-item").hasClass("active-nav-item");
			var oNum=$(this).attr("num");
			var oList=$(".nav-item");
			var TOP=0;
			if(!oActive){
				$.each(oList,function(index,item){
					if($(item).hasClass("active-nav-item")){
						$(item).removeClass("active-nav-item");
						return;
					}
				})
				$(this).parent(".nav-item").addClass("active-nav-item");
			}
			if(oNum==="1"){
				TOP=0;
			}else{
				TOP=45;
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




