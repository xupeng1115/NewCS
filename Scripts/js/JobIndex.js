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
	
	//事件注册
	(function(){
		
		$("body").on("click",".back-top",function(event){
			$('body,html').animate({scrollTop:0},300);
		})
		
	}());
	
})