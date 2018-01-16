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
			$(this).find(".like-icon").find(".fa-heart-o").hide();
			$(this).find(".like-icon").find(".fa-heart").show();
		})
		
	}());
	
})