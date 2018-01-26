var pageIndex = 0;
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
	getComment();
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
function ShowComment(data){
	var html='';

	$.each(data,function(index,item){
	    var PicturePath = '../../Content/img/head.png';
		if(item.PicturePath){
			PicturePath=item.PicturePath;
		}
		html+="<li id='comment"+item.ID+"' class=\"commend-item\">";
		html+="<img src="+PicturePath+" alt=\"评论\" class=\"commend-head\"/>\
					<div class=\"commend-content\">\
						<div class=\"commend-name\">"+item.UserName+"</div>\
						<div class=\"commend-text\">"+item.Comment+"</div>\
						<div class=\"commend-date\">"+item.CreatedTime.replace("T"," ").substr(0,19)+"</div>\
						<div class=\"commend-item-reply-btn\" data-parentid="+item.ID+" onclick=\"showReplyDiv(this)\">回复</div>\
					</div>";
		html+="<div style=\"display:none\" id='Reply"+item.ID+"' class=\"item-reply-area\">\
					<textarea id='textComment"+item.ID+"' placeholder='回复"+item.UserName+"'></textarea>\
					<div class=\"item-reply-area-btn\" data-parentid="+item.ID+" onclick=\"submitComment(this)\">提交</div>\
					</div>";
		html+="<div class=\"item-comend-box\"><ul id='childComment"+item.ID+"' class=\"item-commend-list\">";
		if(item.ChildComment){
			$.each(item.ChildComment,function(index,item){
			    PicturePath = '../../Content/img/head.png';
				if(item.PicturePath){
					PicturePath=item.PicturePath;
				}
				html+="<li id='child"+item.ID+"' class=\"item-commend-item\">\
							<img src="+PicturePath+" alt=\"评论\" class=\"item-commend-head\"/>\
							<div class=\"item-commend-content\">\
								<div class=\"item-commend-name\">"+item.UserName+"</div>\
								<div class=\"item-commend-text\">"+item.Comment+"</div>\
								<div class=\"item-commend-date\">"+item.CreatedTime.replace("T"," ").substr(0,19)+"</div>\
							</div>\
						</li>";	
			})
		}
		html+="</ul></div></li>";
	})
	$("#Commendtlist").find("li").remove(); 
	$('#Commendtlist').append(html);

}
//显示回复栏
function showReplyDiv(obj){
	var parentId = $(obj).data("parentid");
	if($('#Reply'+parentId).css("display")=="none"){
		$('#Reply'+parentId).show();
	}else{
		$('#Reply'+parentId).hide();
	}
	
}

//获取评论
function getComment(){
	if(!positionID){
		alert("职位信息出错!");
		return false;
	}
	var myParams = {
		
	}
	var mySuccessFun = function (result) {
		if (result.Success) {
			//展示评论
			ShowComment(result.Data);
		} else {
			alert(result.Message);
		}
	}
	var myErrorFun = function (error) {
		alert("网络出错了！");
	}
	//获取评论
	myAjax("get", "/Job/GetPositionComment?Id="+positionID, JSON.stringify(myParams), mySuccessFun, myErrorFun);
}



//提交评论
function submitComment(obj){
	var parentId = $(obj).data("parentid");
	var comment = $("#textComment"+parentId).val();
	if(!comment){
		alert("请输入内容!");
		return false;
	}

	if(!filterXSS(comment)){
		alert("请输入合法内容!");
		return false;
	}
	
	
	var myParams = {
		ParentID: parentId,
		PositionID:positionID,
		Comment: filterXSS(comment)
	}
	var mySuccessFun = function (result) {
		if (result.Success) {
			//刷新评论列表
			if(!parentId){
				AddParentComment(result.Data);
			}else{
				AddChildComment(parentId,result.Data);
			}
		} else {
			alert(result.Message);
		}
	}
	var myErrorFun = function (error) {
		alert("网络出错了！");
	}
	//提交评论
	myAjax("post", "/Job/AddPositionComment", JSON.stringify(myParams), mySuccessFun, myErrorFun);
}


function AddChildComment(parentId,obj){
	var item = JSON.parse(obj);
	var html='';
	html+="<li id='child"+item.ID+"' class=\"item-commend-item\">\
							<img src="+item.PicturePath+" alt=\"评论\" class=\"item-commend-head\"/>\
							<div class=\"item-commend-content\">\
								<div class=\"item-commend-name\">"+item.UserName+"</div>\
								<div class=\"item-commend-text\">"+filterXSS($('#textComment'+parentId).val())+"</div>\
								<div class=\"item-commend-date\">"+getDateTimeNow()+"</div>\
							</div>\
						</li>";	
	$('#childComment'+parentId).append(html);
	$("#textComment"+parentId).val("");
}

//显示回复后的内容
function AddParentComment(obj){
	var item = JSON.parse(obj);
	var html='';
	html+="<li id='comment"+item.ID+"' class=\"commend-item\">";
	html+="<img src="+item.PicturePath+" alt=\"评论\" class=\"commend-head\"/>\
				<div class=\"commend-content\">\
					<div class=\"commend-name\">"+item.UserName+"</div>\
					<div class=\"commend-text\">"+filterXSS($("#textComment0").val())+"</div>\
					<div class=\"commend-date\">"+getDateTimeNow()+"</div>\
					<div class=\"commend-item-reply-btn\" data-parentid="+item.ID+" onclick=\"showReplyDiv(this)\">回复</div>\
				</div>";
	html+="<div style=\"display:none\" id='Reply"+item.ID+"' class=\"item-reply-area\">\
				<textarea id='textComment"+item.ID+"' placeholder='回复"+item.UserName+"'></textarea>\
				<div class=\"item-reply-area-btn\" data-parentid="+item.ID+" onclick=\"submitComment(this)\">提交</div>\
				</div>";
	html+="<div class=\"item-comend-box\"><ul id='childComment"+item.ID+"' class=\"item-commend-list\">";
	html+="</ul></div></li>";

	$('#Commendtlist').append(html);
	$("#textComment0").val("");

}


//Ajax
function myAjax(myType, myUrl, myParams, mySuccessFun, myErrorFun) {
	var params = {
		"controller": myUrl,
		data: myParams,
		contentType: "application/json; charset=utf-8"
	};

	var successFun = mySuccessFun;
	var errorFun = myErrorFun;

	if (myType.toLocaleUpperCase() === "GET") {
		communication.get(params, successFun, errorFun);
	} else {
		communication.post(params, successFun, errorFun);
	}
}

function getDateTimeNow(){
	var myDate = new Date();
	//获取当前年
	var year=myDate.getFullYear();
	//获取当前月
	var month=myDate.getMonth()+1;
	//获取当前日
	var date=myDate.getDate(); 
	var h=myDate.getHours();       //获取当前小时数(0-23)
	var m=myDate.getMinutes();     //获取当前分钟数(0-59)
	var s=myDate.getSeconds();  
	
	var now=year+'-'+TimeHandle(month)+"-"+TimeHandle(date)+" "+TimeHandle(h)+':'+TimeHandle(m)+":"+TimeHandle(s);

	return now;
}

function TimeHandle(s) {
    return s < 10 ? '0' + s: s;
}