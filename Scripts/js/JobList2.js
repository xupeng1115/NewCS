$(function(){
	
	//分页
	(function(){
		$(".tcdPageCode").createPage({
	        pageCount:100,
	        current:1,
	        backFn:function(p){
	            console.log(p);
	        }
	    });
	}());
	
	//圆形进度条
	(function(){
		var percents=[23,44,66,77,23,88];
		$.each(percents,function(index,item){
			$('#indicatorContainer'+index).radialIndicator({
		        barColor: '#ffbf00',
		        barWidth: 7,
		        initValue: 0,
		        fontFamily:'"PingFang SC","Microsoft Yahei"',
		        fontWeight:'normal',
		        fontSize:22,
		        fontColor:"#333",
		        roundCorner : true,
		        percentage: true
		    });
		    
		    //进度从零运动到指定位置
		    var radObj = $('#indicatorContainer'+index).data('radialIndicator');
			radObj.animate(item);
		})
	}());
	
	
	//事件注册
	(function(){
		
		$("body").on("click",".back-top",function(event){
			$('body,html').animate({scrollTop:0},300);
		})
		
		$("body").on("click",".position-name",function(){
			window.location.href="Index.html";
		})
		
		$("body").on("click",".sort-item",function(){
			var _self=this;
			if(!$(_self).hasClass(".sort-item-change")){
				$(".sort-item").each(function(i,obj){
					$(obj).removeClass("sort-item-change");
				})
				$(_self).addClass("sort-item-change");
			}else{
				
			}
		})
		
		$("body").on("click",".position-like",function(){
			var yesKey=$(this).find(".like-icon").hasClass("yes-like");
			var noKey=$(this).find(".like-icon").hasClass("no-like")
			
			if(yesKey){
				$(this).find(".like-icon").removeClass("yes-like");
				$(this).find(".like-icon").addClass("no-like");
			}else{
				$(this).find(".like-icon").removeClass("no-like");
				$(this).find(".like-icon").addClass("yes-like");
			}
		})
		
	}());
	
})