"use strict";

//Vue数据模型（交互逻辑和事件绑定）
var app=new Vue({
	el:"#app",
	data:{
		loginKey:isLogin
	}
})

$(function(){
	
	//轮播滚动
	(function(){
		var mySwiper = new Swiper ('.swiper-container', {
			autoplay:3000,
			speed:1600,
		    loop: true,
			slidesPerView : 3,
			slidesPerGroup : 1,
			spaceBetween :20,
			autoplayDisableOnInteraction : false,
		    
		    // 如果需要前进后退按钮
		    nextButton: '.swiper-button-next',
		    prevButton: '.swiper-button-prev',
		    
		})
	}());
	
	//初始化操作
	(function(){
		$(".back-top").hide();
	}());
	
	//事件注册
	(function(){
		
		$("body").on("click",".consult",function(event){
			showConsult();
		})
		
		$("body").on("click",".consult-close-btn",function(event){
			hideConsult();
		})
		
		$("body").on("click",".consult-know-btn",function(){
			hideConsult();
		})
		
		$("body").on("click",".consult-login-btn",function(){
			hideConsult();
			$(".lr-container").show();
		})
		
		$("body").on("click",".search-btn",function(){
			window.location.href="../Job/List.html";
		})
		
		$("body").on("click",".top-evaluation-btn",function(){
			window.location.href="../Assessment/Index.html";
		})
		
	}());
	
})

//显示侧边咨询弹窗
function showConsult(){
	var widthValue=document.body.clientWidth;
	var browserType=BrowserType();
	if(widthValue>1500){
		$("html,body").addClass("no-scroll-high");
	}else{
		if(browserType==="IE9"||browserType==="Chrome"||browserType==="Safari"||browserType==="Opera"){
			$("html,body").addClass("no-scroll-low");
		}else{
			$("html,body").addClass("no-scroll-high");
		}
	}
	
	$(".flo-consult").show();
}
//隐藏侧边咨询弹窗
function hideConsult(){
	var widthValue=document.body.clientWidth;
	var browserType=BrowserType();
	
	$(".flo-consult").hide();
	if(widthValue>1500){
		$("html,body").removeClass("no-scroll-high");
	}else{
		if(browserType==="IE9"||browserType==="Chrome"||browserType==="Safari"||browserType==="Opera"){
			$("html,body").removeClass("no-scroll-low");
		}else{
			$("html,body").removeClass("no-scroll-high");
		}
	}
}
