//数据绑定和事件绑定
var app = new Vue({
    el: "#app",
    data: {
		inputObj:{
			Name:"",
			Eamil:"",
			Phone:"",
			School:"",
			Professional:""
		},
		phoneReg:/^1[0-9]{10}$/
    },
    methods:{
    	viewReport:function(){
    		if($.trim(app.inputObj.Name)===""){
    			showMessage("姓名未输入!");
    			return;
    		}
    		
    		if($.trim(app.inputObj.Email)===""){
    			showMessage("邮箱地址未输入!");
    			return;
    		}else{
    			var index=$.trim(app.inputObj.Email).indexOf('@');
    			var length=$.trim(app.inputObj.Email).length;
    			if(index<0||index===0||(index+1)===length){
    				showMessage("邮箱格式错误!");
    				return;
    			}
    		}
    		
    		if($.trim(app.inputObj.Phone)===""){
    			showMessage("手机号未输入!");
    			return;
    		}else{
    			if(app.phoneReg.test($.trim(app.inputObj.Phone))){
    				showMessage("手机号码格式错误!");
    				return;
    			}
    		}
    		
    		if($.trim(app.inputObj.School)===""){
    			showMessage("学校名称未输入!");
    			return;
    		}
    		if($.trim(app.inputObj.Professional)===""){
    			showMessage("专业名称未输入!");
    			return;
    		}
    		
    		var myParams = app.inputObj;
            var mySuccessFun = function (result) {
                if (result.Success) {
                    window.location.href="/Assessment/m_EvaluationReport";
                } else {
                    showMessage(result.Message);
                }
            }
            var myErrorFun = function () {
                showMessage("网络出错了！");
            }
            //提交测评信息
            myAjax("post", "/Assessment/SubmitUserAssessmentNew", JSON.stringify(myParams), mySuccessFun, myErrorFun);
    		
    	}
    }
})


$(function(){
	
	//页面初始化操作
	(function(){

	}());
	
	//监听页面切换横竖屏
	$(window).on("resize",function(){

	})
	 
});


