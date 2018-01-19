
//Vue数据绑定与事件绑定
var app=new Vue({
	el:"#app",
	data:{
		loginKey:true,
		areaKey:false,
		industryKey:false,
		positionKey:false,
		pageKey:false,
		
		positionList:positionList,
		recommendList:recommendList,
		areaList:areas,
		industryList:industrys,
		PostList:positions,
		
		positionName:"研发工程师",
		searchObj:{
			selectType:"",
			areaValue:"",
			positionValue:"",
			industryValue:""
		},
		payFrom:3000,
		payTo:13000,
		
		pageCount:pageCount1
	},
	computed:{
		
	},
	watch:{
		//监听对象和对象
		searchObj:{
			handler(newVal){
				this.postSearch();
			},
			deep:true
		},
		positionList:{
			handler(newVal){
				this.pageKey=true;
			},
			deep:true
		},
		pageCount:function(val){
			this.getPage(val);
		}
	},
	mounted:function(){
		
	},
	updated:function(){
		//职位列表生成元素并数据更新后重新绘制匹配度进度条
		if(this.pageKey&&this.loginKey){
			this.getCircle(this.recommendList);
			this.pageKey=false;
		}
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
			if(this.loginKey){
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
			}else{
				$(".lr-container").show();
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
			this.searchObj.areaValue=item.Name;
		},
		industryItem:function(item){
			this.searchObj.industryValue=item.Name;
		},
		positionItem:function(item){
			this.searchObj.positionValue=item.Name;
		},
		postSearch:function(){
			var myParams={
				Job:this.positionName,
				Type:app.searchObj.selectType,
				Area:app.searchObj.areaValue,
				Position:app.searchObj.positionValue,
				Industry:app.searchObj.industryValue,
				From:app.payFrom,
				To:app.payTo
			}
			var searchUrl="../../Scripts/mock/jobList.json";
			var mySuccessFun=function(result){
				app.positionList=app.recommendList;
				console.log(myParams);
			}
			var myErrorFun = function (error) {
                alert("网络出错了！");
           	}
			myAjax("get", searchUrl, JSON.stringify(myParams), mySuccessFun, myErrorFun);
		},
		getCircle:function(list){
			if(app.loginKey){
				var percents=this.getPercents(list);
				$.each(percents,function(index,item){
					$('#indicatorContainer'+item.ID).radialIndicator({
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
				    var radObj = $('#indicatorContainer'+item.ID).data('radialIndicator');
				    if($('#indicatorContainer'+item.ID).length===1){
				    	radObj.animate(item.Match);
				    }
				})
			}
		},
		getPercents:function(list){
			var arr=[];
			$.each(list,function(index,item){
				var obj={};
				obj.ID=item.ID;
				obj.Match=item.Match;
				arr.push(obj);
			})
			return arr;
		},
		getPage:function(count){
			$(".tcdPageCode").createPage({
		        pageCount:count,
		        current:1,
		        //切换页码时列表刷新
		        backFn:function(p){
		            var myParams={
		            	Job:this.positionName,
		            	Type:app.searchObj.selectType,
						Area:app.searchObj.areaValue,
						Position:app.searchObj.positionValue,
						Industry:app.searchObj.industryValue,
						From:app.payFrom,
						To:app.payTo,
						pageNum:p
					}
					var pageUrl="../../Scripts/mock/jobList.json";
					var mySuccessFun=function(result){
						app.positionList=app.recommendList;
						console.log(myParams);
					}
					var myErrorFun = function (error) {
		                alert("网络出错了！");
		           	}
					myAjax("get", pageUrl, JSON.stringify(myParams), mySuccessFun, myErrorFun);
		        }
		    });
		},
		clearSelect:function(){
			this.searchObj.selectType="";
			this.searchObj.areaValue="";
			this.searchObj.positionValue="";
			this.searchObj.industryValue="";
			this.payFrom=3000;
			this.payTo=13000;
			
			var myParams={
				Job:this.positionName,
            	Type:this.searchObj.selectType,
				Area:this.searchObj.areaValue,
				Position:this.searchObj.positionValue,
				Industry:this.searchObj.industryValue,
				From:this.payFrom,
				To:this.payTo
			}
			var pageUrl="../../Scripts/mock/jobList.json";
			var mySuccessFun=function(result){
				app.positionList=app.recommendList;
				console.log(myParams);
			}
			var myErrorFun = function (error) {
                alert("网络出错了！");
           	}
			myAjax("get", pageUrl, JSON.stringify(myParams), mySuccessFun, myErrorFun);
		},
		searchBtn:function(){
			var myParams={
				Job:this.positionName,
            	Type:this.searchObj.selectType,
				Area:this.searchObj.areaValue,
				Position:this.searchObj.positionValue,
				Industry:this.searchObj.industryValue,
				From:this.payFrom,
				To:this.payTo
			}
			var pageUrl="../../Scripts/mock/jobList.json";
			var mySuccessFun=function(result){
				app.positionList=app.recommendList;
				console.log(myParams);
			}
			var myErrorFun = function (error) {
                alert("网络出错了！");
           	}
			myAjax("get", pageUrl, JSON.stringify(myParams), mySuccessFun, myErrorFun);
		}
	}
})

$(function(){
	
	//可拖动价钱区域
	(function(){
		var $range = $("#range");
		var track = function (data) {
//			delete data.input;
//			delete data.slider;
			
			app.payFrom=data.from;
			app.payTo=data.to;
		};
		
		$range.ionRangeSlider({
			type: "double",
			min:0,
			max: 20000,
			from:3000,
			to:13000,
			step: 100,
			grid: false,
			onStart: track,
			onChange: track,
			onFinish: track,
			onUpdate: track
		});
	}());
	
	//页面初始化执行操作
	(function(){
		//页面初次加载绘制圆形匹配度进度条
		if(app.loginKey){
			app.getCircle(app.positionList);
		}
		
		//生成分页
		if(app.pageCount>1){
			app.getPage(app.pageCount);
		}
	}());
	
	//jQuery事件注册
	(function(){
		
		//对比价钱区间是否变化中间量
		var payFromVal,payToVal;
		
		//隐藏下拉框
		$(document).on("click",function(e){
			if(e.target.className.indexOf("search-select-value")<0){
				app.positionKey=false;
				app.industryKey=false;
				app.areaKey=false;
			}
		})
		
		//鼠标点下记录价钱区间
		$("body").on("mousedown",".irs-slider",function(){
			payFromVal=app.payFrom,
			payToVal=app.payTo;
		})
		
		//鼠标抬起获取价钱区间
		$("body").on("mouseup",".irs-slider",function(){
			if(payFromVal!==app.payFrom||payToVal!==app.payTo){
				app.pageCount=pageCount2;
				app.postSearch();
			}
		})
		
		$("body").on("click",".login-register",function(){
			app.loginKey=true;
			
		})
		
		
	}());
})



