//Vue数据绑定与事件绑定
var app=new Vue({
	el:"#app",
	data:{
		loginKey:false,
		areaKey:false,
		industryKey:false,
		positionKey:false,
		
		positionList:positionList,
		recommendList:recommendList,
		areaList:areas,
		industryList:industrys,
		PostList:positions,
		
		selectType:"",
		areaValue:"",
		positionValue:"",
		industryValue:""
	},
	methods:{
		ImgError:function(){
			var oImg=event.srcElement;
		    oImg.src="../../Content/image/job_list_company01.png";
		    oImg.onerror=null;
		},
		detailHref:function(ID){
			window.location.href="Index.html?ID="+ID;
		},
		resumeHref:function(ID){
			window.location.href="Index.html?ID="+ID;
		},
		viewMath:function(ID){
			$(".lr-container").show();
		},
		emptyLogin:function(){
			$(".lr-container").show();
		},
		likeCut:function(ID,event){
			var yesKey=$(event.target).hasClass("yes-like");
			var noKey=$(event.target).hasClass("no-like")
			
			if(yesKey){
				$(event.target).removeClass("yes-like");
				$(event.target).addClass("no-like");
				this.positionList[ID].Like--;
				this.positionList=this.positionList;
			}else{
				$(event.target).removeClass("no-like");
				$(event.target).addClass("yes-like");
				this.positionList[ID].Like++;
				this.positionList=this.positionList;
			}
		},
		searchArea:function(){
			this.industryKey=false;
			this.positionKey=false;
			if(this.areaKey){
				this.areaKey=false;
			}else{
				this.areaKey=true;
			}
		},
		searchIndustry:function(){
			this.areaKey=false;
			this.positionKey=false;
			if(this.industryKey){
				this.industryKey=false;
			}else{
				this.industryKey=true;
			}
		},
		searchPosition:function(){
			this.areaKey=false;
			this.industryKey=false;
			if(this.positionKey){
				this.positionKey=false;
			}else{
				this.positionKey=true;
			}
		},
		areaItem:function(item){
			this.areaValue=item.Name;
		},
		industryItem:function(item){
			this.industryValue=item.Name;
		},
		positionItem:function(item){
			this.positionValue=item.Name;
		}
	}
})


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
		if(app.loginKey){
			var percents=getPercents();
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
		}
	}());
	
	//页面初始化执行操作
	(function(){
		$(document).on("click",function(e){
			if(e.target.className.indexOf("search-select-value")<0){
				app.positionKey=false;
				app.industryKey=false;
				app.areaKey=false;
			}
		})
	}());
	
	//jQuery事件注册
	(function(){
		
	}());
	
})

function getPercents(){
	var arr=[];
	$.each(positionList,function(index,item){
		arr.push(item.Match);
	})
	
	return arr;
}






