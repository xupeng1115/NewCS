//Vue数据模型（交互逻辑和事件绑定）
var app=new Vue({
	el:"#app",
	data:{
		loginKey:isLogin
	}
})

$(function(){
	
	//页面初始化执行
	(function(){
		
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