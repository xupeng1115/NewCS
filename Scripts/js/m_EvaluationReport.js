//数据绑定和事件绑定
var app = new Vue({
    el: "#app",
    data: {
		userExam:JSON.parse(TransferString(UserExam)),
		resultPictrue:ResultPictrue,
		rule:13
    },
    methods:{
    	viewReport:function(){
    		window.location.href="/Assessment/m_EvaluationReport";
    	},
    	draw:function(){
    		app.rule=Math.floor(($(window).width()-20-94)/20);
    		var oResult = JSON.parse(ResultPictrue);
            if (ResultPictrue) {
                $(".theme-i").animate({
                    "width": ((oResult.I) * app.rule) + "px"
                }, 400);
                $(".theme-t").animate({
                    "width": ((oResult.T) * app.rule) + "px"
                }, 400);
                $(".theme-s").animate({
                    "width": ((oResult.S) * app.rule) + "px"
                }, 400);
                $(".theme-j").animate({
                    "width": ((oResult.J) * app.rule) + "px"
                }, 400);
                $(".theme-e").animate({
                    "width": ((oResult.E) * app.rule) + "px"
                }, 400);
                $(".theme-f").animate({
                    "width": ((oResult.F) * app.rule) + "px"
                }, 400);
                $(".theme-n").animate({
                    "width": ((oResult.N) * app.rule) + "px"
                }, 400);
                $(".theme-p").animate({
                    "width": ((oResult.P) * app.rule) + "px"
                }, 400);
            }
    	}
    }
})


$(function(){
	
	//页面初始化操作
	(function(){
		app.draw();
	}());
	
	//监听页面切换横竖屏
	$(window).on("resize",function(){
		app.draw();
	})
	 
});


