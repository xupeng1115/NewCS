
//Vue数据绑定与事件绑定
var app=new Vue({
	el:"#app",
	data:{
		loginKey:true,
		phone:"",
		email:"",
		name:"",
		phoneTip:"",
		emailTip:"",
		nameTip:"",
		nameTipShow:false,
		phoneTipShow:false,
		emailTipShow:false,
		argeement:true,
		
		positionDetail:{
			PositionID:0,
			Price:'20000.00',
			Charge:'3000.00',
			Total:'23000.00',
			Num:15133664455,
			Serve:12,
			Type:"全职服务产品"
		}
	},
	computed:{
		
	},
	watch:{
		
	},
	updated:function(){
		
	},
	methods:{
		phoneFilter:function(){
			var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
			if(this.phone===""){
				this.phoneTip="手机号必填";
				this.phoneTipShow=true;
				return false;
			}else if(!myreg.test(this.phone)){
				this.phoneTip="请输入有效的手机号";
				this.phoneTipShow=true;
				return false;
			}else{
				return true;
			}
		},
		emailFilter:function(){
			var myreg=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			if(this.email===""){
				this.emailTip="邮箱必填";
				this.emailTipShow=true;
				return false;
			}else if(!myreg.test(this.email)){
				this.emailTip="请输入有效的邮箱地址";
				this.emailTipShow=true;
				return false;
			}else{
				return true;
			}
		},
		nameFilter:function(){
			if($.trim(this.name)===''){
				this.nameTip="姓名必填";
				this.nameTipShow=true;
				return false;
			}else{
				return true;
			}
		},
		printClick:function(){
			app.nameFilter();
			app.phoneFilter();
			app.emailFilter();
			if(!app.argeement){
				alert("您还没同意支付协议");
			}
			
			if(app.nameTipShow&&app.phoneTipShow&&app.emailTipShow){
				
			}
		},
		payClick:function(){
			app.nameFilter();
			app.phoneFilter();
			app.emailFilter();
			if(!app.argeement){
				alert("您还没同意支付协议");
			}
			
			if(app.nameTipShow&&app.phoneTipShow&&app.emailTipShow){
				var PrintUrl="";
				var myParams = {
					Name:$.trim(app.name),
					Phone:$.trim(app.phone),
					Email:$.trim(app.email),
					PositionID:app.positionDetail.PositionID
				};
	            var mySuccessFun = function(result){
	            	if(result.Success){
	            		
	            	}else{
	            		alert(result.Message);
	            	}
	            }
	            var myErrorFun=function(){
	            	alert("网络出错了！");
	            }
				
				//发送请求获取用户标签列表
	            //myAjax("post",PrintUrl,JSON.stringify(myParams),mySuccessFun,myErrorFun,"application/json; charset=utf-8");
			}
		},
		nameFocus:function(){
			app.nameTipShow=false;
		},
		phoneFocus:function(){
			app.phoneTipShow=false;
		},
		emailFocus:function(){
			app.emailTipShow=false;
		}
	}
})

$(function(){
	
	//页面初始化执行操作
	(function(){
		
	}());
	
	//jQuery事件注册
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
			window.location.href="/Job/List";
		})
		
		$("body").on("click",".top-evaluation-btn",function(){
			window.location.href="/Assessment/Index";
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








