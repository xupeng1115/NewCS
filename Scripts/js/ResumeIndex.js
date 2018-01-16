"use strict";

var oUserInfo={
	ID:0,
	PicturePath:"",
	Name:"",
	Gender:"",							
	AddressInfo:"",
	Tel:"",
	Email:""
//	ID:1,
//	PicturePath:'../../Content/img/head.png',
//	Name:'Jessie Lai',
//	Gender:'1',							
//	AddressInfo:'上海市长宁区玛瑙路1438号国际古北财富中心二期',
//	Tel:'15136677782',
//	Email:'987239822@qq.com'
}

//Vue数据模型（交互逻辑和事件绑定）
var app=new Vue({
	el:'#app',
	data:{							
		tagBoxShow:false,									
		totalTags:[									
			{ID:1,TitleName:"研发类"},
			{ID:2,TitleName:"吃苦耐劳"},
			{ID:3,TitleName:"奉献精神呵呵呵"},
			{ID:4,TitleName:"研发类"},
			{ID:5,TitleName:"吃苦耐劳"},
			{ID:6,TitleName:"奉献精神呵呵呵"},
			{ID:7,TitleName:"研发类"},
			{ID:8,TitleName:"吃苦耐劳"},
			{ID:9,TitleName:"奉献精神呵呵呵"}
		],
		userTags:[],
		selectedTags:[],
		
		userInfoShow:oUserInfo.Name!==""&&oUserInfo.Gender!==""&&oUserInfo.Tel!==""&&oUserInfo.AddressInfo!==""&&oUserInfo.Email!=="",
		editOnce:!(oUserInfo.Name!==""&&oUserInfo.Gender!==""&&oUserInfo.Tel!==""&&oUserInfo.AddressInfo!==""&&oUserInfo.Email!==""),
		userInfo:{
			ID:oUserInfo.ID,
			PicturePath:oUserInfo.PicturePath,
			Name:oUserInfo.Name,
			Gender:oUserInfo.Gender,							
			AddressInfo:oUserInfo.AddressInfo,
			Tel:oUserInfo.Tel,
			Email:oUserInfo.Email
		},
		userEditInfo:{
			ID:oUserInfo.ID,
			PicturePath:oUserInfo.PicturePath,
			Name:oUserInfo.Name,
			Gender:oUserInfo.Gender,							
			AddressInfo:oUserInfo.AddressInfo,
			Tel:oUserInfo.Tel,
			Email:oUserInfo.Email
		},
		userPhoneShow:false,
		userEmailShow:false,
		headEditEnable:false,
		clickEnable:true,
		
		ModuleShow_1:false,
		ModuleShow_2:false,
		ModuleShow_3:false,
		ModuleShow_4:false,
		ModuleShow_5:false,
		currentModule:0,
		
		currrentDate:new Date().getFullYear(),
		educationDate:[
			{
				year:2012,
				month:"7月"
			},
			{
				year:2015,
				month:"7月"
			},
			{
				year:2019,
				month:"7月"
			}
		],
		educationLists:[
			{
				SchoolName:"斯坦福大学",
				Education:6,
				BeginDate:"2015-05-06",
				EndDate:"2018-06-06",
				Major:"计算机"
			},
			{
				SchoolName:"耶鲁大学",
				Education:7,
				BeginDate:"2015-05-06",
				EndDate:"2018-06-06",
				Major:"计算机"
			},
			{
				SchoolName:"剑桥大学",
				Education:8,
				BeginDate:"2015-05-06",
				EndDate:"2018-06-06",
				Major:"计算机"
			}
		],
		educationEditBackgrounds:[
			{
				id:5,
				background:"大专",
			},
			{
				id:6,
				background:"本科",
			},
			{
				id:7,
				background:"硕士",
			},
			{
				id:8,
				background:"博士",
			},
			{
				id:9,
				background:"其他",
			}
		],
		educationEditgraduates:[
			{
				graduate:"2019",
			},
			{
				graduate:"2018",
			},
			{
				graduate:"2017",
			},
			{
				graduate:"2016",
			},
			{
				graduate:"2015",
			},
			{
				graduate:"2014",
			},
			{
				graduate:"2013",
			},
			{
				graduate:"2012",
			},
			{
				graduate:"2011",
			}
		],
		educationmajor:"",
		educationschool:"",
		educationBackgroundid:"",
		educationbackground:"",
		educationgraduate:"",
		educationmonth:"",
		
		awardgraduates:[
			{
				year:"2019",
			},
			{
				year:"2018",
			},
			{
				year:"2017",
			},
			{
				year:"2016",
			},
			{
				year:"2015",
			},
			{
				year:"2014",
			},
			{
				year:"2013",
			},
			{
				year:"2012",
			},
			{
				year:"2011",
			}
		],
		awardLists:[
			{
				HonorName:"外语系第十三届英语戏剧比赛一等奖一等奖",
				GetTime:"2015-05-06"
			},
			{
				HonorName:"外语系第十三届英语戏剧比赛一等奖一等奖",
				GetTime:"2015-05-06"
			},
			{
				HonorName:"外语系第十三届英语戏剧比赛一等奖一等奖",
				GetTime:"2015-05-06"
			}
		],
		awardname:"",
		awardgraduate:"",
		
		practiceYears:[
			{
				year:2019
			},
			{
				year:2018
			},
			{
				year:2017
			},
			{
				year:2016
			},
			{
				year:2015
			},
			{
				year:2014
			},
			{
				year:2013
			},
			{
				year:2012
			},
			{
				year:2011	
			},
			{
				year:2010
			}
		],
		practiceLists:[
			{
				url:"../../Content/img/position_head.png",
				companyname:"洋葱数学",
				positionname:"HR助理",
				site:"长沙-岳麓区",
				begin:"2016/08/11",
				end:"2016/09/20",
				content:"1、协助上级建立健全公司招聘、培训、保险、绩效考核等人力资源制度建设;"
						+"<br>"+
						"2、建立、维护人事档案，办理和更新劳动合同；"
						+"<br>"+
						"3、收集相关的劳动用工等人事政策及法规；"
						+"<br>"+
						"4、执行招聘工作流程，协调、办理员工招聘、入职、离职、调任、升职等手续；"
						+"<br>"+
						"5、协同开展新员工入职培训，执行培训计划，以及培训效果的跟踪、反馈；"
						+"<br>"+
						"6、办理相应的社会保险、医保等外联工作；"
						+"<br>"+
						"7、在技术服务部的主要职责：1、文件整理；2、绩效考核数据统计；3、服务计划与出差记录；"
						+"<br>"+
						"8、其他临时任务。"
			},
			{
				url:"../../Content/img/position_head.png",
				companyname:"洋葱数学",
				positionname:"HR助理",
				site:"长沙-岳麓区",
				begin:"2016/08/11",
				end:"2016/09/20",
				content:"1、协助上级建立健全公司招聘、培训、保险、绩效考核等人力资源制度建设;"
						+"<br>"+
						"2、建立、维护人事档案，办理和更新劳动合同；"
						+"<br>"+
						"3、收集相关的劳动用工等人事政策及法规；"
						+"<br>"+
						"4、执行招聘工作流程，协调、办理员工招聘、入职、离职、调任、升职等手续；"
						+"<br>"+
						"5、协同开展新员工入职培训，执行培训计划，以及培训效果的跟踪、反馈；"
						+"<br>"+
						"6、办理相应的社会保险、医保等外联工作；"
						+"<br>"+
						"7、在技术服务部的主要职责：1、文件整理；2、绩效考核数据统计；3、服务计划与出差记录；"
						+"<br>"+
						"8、其他临时任务。"
			},
			{
				url:"../../Content/img/position_head.png",
				companyname:"洋葱数学",
				positionname:"HR助理",
				site:"长沙-岳麓区",
				begin:"2016/08/11",
				end:"2016/09/20",
				content:"1、协助上级建立健全公司招聘、培训、保险、绩效考核等人力资源制度建设;"
						+"<br>"+
						"2、建立、维护人事档案，办理和更新劳动合同；"
						+"<br>"+
						"3、收集相关的劳动用工等人事政策及法规；"
						+"<br>"+
						"4、执行招聘工作流程，协调、办理员工招聘、入职、离职、调任、升职等手续；"
						+"<br>"+
						"5、协同开展新员工入职培训，执行培训计划，以及培训效果的跟踪、反馈；"
						+"<br>"+
						"6、办理相应的社会保险、医保等外联工作；"
						+"<br>"+
						"7、在技术服务部的主要职责：1、文件整理；2、绩效考核数据统计；3、服务计划与出差记录；"
						+"<br>"+
						"8、其他临时任务。"
			}
		],
		practicecompanyname:"",
		practicepositionname:"",
		practicesite:"",
		practicebegin:"",
		practiceend:"",
		practicecontent:"",
		
		skillLists:[
			{
				name:'英语CET-6',
				bar:"200",
				dec:"熟练使用英语交流"
			},
			{
				name:'英语CET-6',
				bar:"100",
				dec:"熟练使用英语交流"
			},
			{
				name:'英语CET-6',
				bar:"300",
				dec:"熟练使用英语交流"
			}
		],
		skillname:"",
		skillbar:"",
		skilldec:"",
		
		activityLists:[
			{
				name:"学术学术辩论",
				date:"2017年1月20日",
				site:"苏州",
				dec:"课程由英锐联合哈佛大学辩论委员会课程由英锐联合哈佛大学辩论委员会课程由英锐联合哈佛大学辩论委员会课程由英锐联合哈佛大学辩论委员会",
			},
			{
				name:"学术学术辩论",
				date:"2017年1月20日",
				site:"苏州",
				dec:"课程由英锐联合哈佛大学辩论委员会课程由英锐联合哈佛大学辩论委员会课程由英锐联合哈佛大学辩论委员会课程由英锐联合哈佛大学辩论委员会",
			},
			{
				name:"学术学术辩论",
				date:"2017年1月20日",
				site:"苏州",
				dec:"课程由英锐联合哈佛大学辩论委员会课程由英锐联合哈佛大学辩论委员会课程由英锐联合哈佛大学辩论委员会课程由英锐联合哈佛大学辩论委员会",
			}
		],
		activityYears:[
			{
				year:2019
			},
			{
				year:2018
			},
			{
				year:2017
			},
			{
				year:2016
			},
			{
				year:2015
			},
			{
				year:2014
			},
			{
				year:2013
			},
			{
				year:2012
			},
			{
				year:2011	
			},
			{
				year:2010
			}
		],
		
		activitysite:"",
		activitydec:"",
		activitydate:"",
		activityname:""
		
	},
	computed:{
		phoneFilter:function(){
			var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
			if(this.userEditInfo.Tel===""){
				this.userPhoneShow=true;
				return "必填";
			}else if(!myreg.test(this.userEditInfo.Tel)){
				this.userPhoneShow=true;
				return "请输入有效的手机号";
			}else{
				this.userPhoneShow=false;
			}
		},
		emailFilter:function(){
			var myreg=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			if(this.userEditInfo.Email===""){
				this.userEmailShow=true;
				return "必填";
			}else if(!myreg.test(this.userEditInfo.Email)){
				this.userEmailShow=true;
				return "请输入有效的邮箱地址";
			}else{
				this.userEmailShow=false;
			}
		}
	},
	methods:{
		addTags:function(){
			$.each(this.userTags,function(index,item){
				this.selectedTags.push(item);
			})
			this.tagBoxShow=true;
		},
		tagConfirm:function(){
			$.each(this.selectedTags,function(index,item){
				var oIndex=index,oItem=item;
				$.each(this.userTags,function(index,item){
					if(item.ID!==oItem.ID){
						this.userTags.push(oItem);
					}
				})
			})
			this.userTags=this.selectedTags;
			this.tagBoxShow=false;
		},
		tagClick:function(tag,event){
			var oNum=this.selectedTags.length;
			console.log(oNum);
			var oSelected=$(event.target).hasClass("selected");
			var oIndex;
			if(oNum<=5){
				if(oNum===5){
					if(oSelected){
						$(event.target).removeClass("selected");
						this.tagSplice(tag);
					}
				}else{
					if(oSelected){
						$(event.target).removeClass("selected");
						this.tagSplice(tag);
					}else{
						$(event.target).addClass("selected");
						this.selectedTags.push(tag);
					}
				}
			}else{
				alert("最多选择5个标签");
			}
		},
		tagSplice:function(tag){
			var oIndex;
			$.each(this.selectedTags, function (index, item){
				if(item.ID===tag.ID){
					oIndex=index;
					return;
				}
			})
			this.selectedTags.splice(oIndex,1);
		},
		tagCancel:function(){
			this.tagBoxShow=false;
		},
		tagReset:function(){
			var oSelects=$(".select-item");
			$.each(oSelects,function(index,item){
				if($(item).hasClass("selected")){
					$(item).removeClass("selected");
				}
			})
			this.selectedTags.splice(0);
			this.tagBoxShow=false;
		},
		infoEdit:function(){
			if(!this.headEditEnable){
				this.clickEnable=false;
				this.userInfoShow=false;
			}
		},
		infoSave:function(){
			
			if(this.currentModule!==0){
				return;
			}
			
			if(this.userEditInfo.Name===""){
				$(".info-name").focus();
				return;
			}
			
			if(this.userEditInfo.Gender===""){
				return;
			}
			
			if(this.userPhoneShow){
				$(".info-phone").focus();
				return;
			}
			
			if(this.userEmailShow){
				$(".info-email").focus();
				return;
			}
			
			if(this.userEditInfo.AddressInfo===""){
				$(".info-address").focus();
				return;
			}
			this.userInfo={
				ID:this.userEditInfo.ID,
				PicturePath:this.userEditInfo.PicturePath,
				Name:this.userEditInfo.Name,
				Gender:this.userEditInfo.Gender,							
				AddressInfo:this.userEditInfo.AddressInfo,
				Tel:this.userEditInfo.Tel,
				Email:this.userEditInfo.Email
			}
			this.editOnce=false;
			this.clickEnable=true;
			this.userInfoShow=true;
		},
		infoCancel:function(){
			
			if(this.editOnce){
				return;
			}else{
				this.userEditInfo={
					ID:this.userInfo.ID,
					PicturePath:this.userInfo.PicturePath,
					Name:this.userInfo.Name,
					Gender:this.userInfo.Gender,							
					AddressInfo:this.userInfo.AddressInfo,
					Tel:this.userInfo.Tel,
					Email:this.userInfo.Email
				}
				this.clickEnable=true;
				this.userInfoShow=true;
			}
		},
		addModule:function(type){
			if(this.clickEnable){
				if(this.currentModule===0){
					this.moduleActiveShow(type);
					if(type===1){
						this.educationUnshift();
					}
					this.currentModule=type;
					this.clickEnable=false;
					this.headEditEnable=true;
				}
			}else{
				if(type===this.currentModule){
					this.moduleActiveHide(type);
					if(type===1){
						this.educationShift();
					}
					this.currentModule=0;
					this.clickEnable=true;
					this.headEditEnable=false;
				}
			}
		},
		moduleActiveShow:function(type){
			switch(type){
				case 1:
					this.ModuleShow_1=true;
				break;
				case 2:
					this.ModuleShow_2=true;
				break;
				case 3:
					this.ModuleShow_3=true;
				break;
				case 4:
					this.ModuleShow_4=true;
				break;
				case 5:
					this.ModuleShow_5=true;
				break;
			}
		},
		moduleActiveHide:function(type){
			switch(type){
				case 1:
					this.ModuleShow_1=false;
				break;
				case 2:
					this.ModuleShow_2=false;
				break;
				case 3:
					this.ModuleShow_3=false;
				break;
				case 4:
					this.ModuleShow_4=false;
				break;
				case 5:
					this.ModuleShow_5=false;
				break;
			}
		},
		selectgraduate:function(graduate){
			this.educationgraduate=graduate;
		},
		selectbackground:function(background,id){
			this.educationbackground=background;
			this.educationbackgroundid=id;
		},
		educationUnshift:function(){
			this.educationDate.unshift({year:"",month:""});
		},
		educationShift:function(){
			this.educationDate.shift();
		},
		educationCancel:function(type){
			this.educationmajor="";
			this.educationschool="";
			this.educationgraduate="";
			this.educationShift();
			this.moduleActiveHide(type);
			this.currentModule=0;
			this.clickEnable=true;
			this.headEditEnable=false;
		},
		educationSave:function(type){
			if($.trim(this.educationmajor)===""){
				return;
			}
			if($.trim(this.educationschool)===""){
				return;
			}
			if($.trim(this.educationbackground)===""){
				return;
			}
			if($.trim(this.educationgraduate)===""){
				return;
			}

			var Obj={
				Major:this.educationmajor,
				Education:this.educationbackgroundid,
				SchoolName:this.educationschool,
				BeginDate:Number(this.educationgraduate)-4,
				EndDate:Number(this.educationgraduate)
			}
			
			this.educationLists.unshift(Obj);
			this.educationDate.splice(0,1,{year:this.educationgraduate,month:"7月"});
			
			this.moduleActiveHide(type);
			this.currentModule=0;
			this.clickEnable=true;
			this.headEditEnable=false;
			
			this.educationmajor="";
			this.educationschool="";
			this.educationbackground="";
			this.educationgraduate="";
			this.educationbackgroundid="";
		},
		educationDelete:function(index){
			this.educationLists.splice(index,1);
			this.educationShift();
		},
		awardselect:function(year){
			this.awardgraduate=year;
		},
		awardSave:function(type){
			if($.trim(this.awardname)===""){
				return;
			}
			if($.trim(this.awardgraduate)===""){
				return;
			}
			
			var Obj={
				HonorName:this.awardname,
				GetTime:this.awardgraduate
			}
			
			this.awardLists.unshift(Obj);
			this.moduleActiveHide(type);
			this.currentModule=0;
			this.clickEnable=true;
			this.headEditEnable=false;
			
			this.awardname="";
			this.awardgraduate="";
		},
		awardCancel:function(type){
			this.awardname="";
			this.awardgraduate="";
			this.moduleActiveHide(type);
			this.currentModule=0;
			this.clickEnable=true;
			this.headEditEnable=false;
		},
		awardDelete:function(index){
			this.awardLists.splice(index,1);
		},
		practiceSave:function(type){
			if($.trim(this.practicecompanyname)===""){
				return;
			}
			if($.trim(this.practicepositionname)===""){
				return;
			}
			if($.trim(this.practicesite)===""){
				return;
			}
			if($.trim(this.practicebegin)===""){
				return;
			}
			if($.trim(this.practiceend)===""){
				return;
			}
			if($.trim(this.practicecontent)===""){
				return;
			}
			
			var Obj={
				url:"../../Content/img/position_head.png",
				companyname:this.practicecompanyname,
				positionname:this.practicepositionname,
				site:this.practicesite,
				begin:this.practicebegin,
				end:this.practiceend,
				content:this.practicecontent
			}

			this.practiceLists.unshift(Obj);
			this.moduleActiveHide(type);
			this.currentModule=0;
			this.clickEnable=true;
			this.headEditEnable=false;

			this.practicecompanyname="";
			this.practicepositionname="";
			this.practicesite="";
			this.practicebegin="";
			this.practiceend="";
			this.practicecontent="";
		},
		practiceCancel:function(type){
			this.practicecompanyname="";
			this.practicepositionname="";
			this.practicesite="";
			this.practicebegin="";
			this.practiceend="";
			this.practicecontent="";
			
			this.moduleActiveHide(type);
			this.currentModule=0;
			this.clickEnable=true;
			this.headEditEnable=false;
		},
		practiceDelete:function(index){
			this.practiceLists.splice(index,1);
		},
		practiceselectbegin:function(year){
			this.practicebegin=year;
		},
		practiceselectend:function(year){
			this.practiceend=year;
		},
		skillSave:function(type){
			if($.trim(this.skillname)===""){
				return;
			}
			if($.trim(this.skilldec)===""){
				return;
			}
			
			var Obj={
				name:this.skillname,
				dec:this.skilldec,
				bar:this.skillbar
			}
			
			this.skillLists.unshift(Obj);
			this.moduleActiveHide(type);
			this.currentModule=0;
			this.clickEnable=true;
			this.headEditEnable=false;
			
			this.skillname="";
			this.skilldec="";
		},
		skillCancel:function(type){
			this.skillname="";
			this.skilldec="";
			
			this.moduleActiveHide(type);
			this.currentModule=0;
			this.clickEnable=true;
			this.headEditEnable=false;
		},
		skillDelete:function(index){
			this.skillLists.splice(index,1);
		},
		activityselect:function(year){
			this.activitydate=year;
		},
		activitySave:function(type){
			if($.trim(this.activityname)===""){
				return;
			}
			if($.trim(this.activitydec)===""){
				return;
			}
			if($.trim(this.activitysite)===""){
				return;
			}
			if($.trim(this.activitydate)===""){
				return;
			}
			
			var Obj={
				name:this.activityname,
				dec:this.activitydec,
				date:this.activitydate,
				site:this.activitysite
			}
			
			this.activityLists.unshift(Obj);
			this.moduleActiveHide(type);
			this.currentModule=0;
			this.clickEnable=true;
			this.headEditEnable=false;
			
			this.activityname="";
			this.activitydec="";
			this.activitydate="";
			this.activitysite="";
		},
		activityCancel:function(type){
			this.activityname="";
			this.activitydec="";
			this.activitydate="";
			this.activitysite="";
			this.moduleActiveHide(type);
			this.currentModule=0;
			this.clickEnable=true;
			this.headEditEnable=false;
		},
		activityDelete:function(index){
			this.activityLists.splice(index,1);
		}
	}
})


//图片没有成功加载出来时处理
function nofind(){
    var oImg=event.srcElement;
    oImg.src="../../Content/img/head.png";
    oImg.onerror=null;
}

$(function(){

	//分页
	(function($){
		$(".tcdPageCode1").createPage({
	        pageCount:100,
	        current:1,
	        backFn:function(p){
	            console.log(p);
	        }
	    });
	    
	    $(".tcdPageCode2").createPage({
	        pageCount:100,
	        current:1,
	        backFn:function(p){
	            console.log(p);
	        }
	    });
	}(jQuery));
	
	//拖动进度条
	(function($){
		var tag = false,ox = 0,left = 100,bgleft = 0,num=0;
        $('.skill-edit-progress_btn').mousedown(function(e) {
            ox = e.pageX-left;
            tag = true;
        });
        $(document).mouseup(function() {
            tag = false;
        });
        $("html,body").mouseup(function() {
            tag = false;
        });
        $('.skill-edit-progress').mousemove(function(e) {//鼠标移动
            if (tag) {
                left = e.pageX - ox;
                if (left <= 12) {
                    left = 10;
                }else if (left > 404) {
                    left = 404;
                }

                if(left>=0&&left<200){
                	$(".skill-edit-degree").html("一般");
                }
                if(left>=200&&left<300){
                	$(".skill-edit-degree").html("熟练");
                }
                if(left>=300&&left<350){
                	$(".skill-edit-degree").html("良好");
                }
                if(left>=350){
                	$(".skill-edit-degree").html("优秀");
                }
                $('.skill-edit-progress_btn').css('left', left);
                $('.skill-edit-progress_bar').width(left);
                
                app.skillbar=left;
                
            }
        });
	}(jQuery));
	
	//页面初始化
	(function(){
		
	}(jQuery));
	
	//事件注册
	(function(){

		$("body").on("click",".back-top",function(event){
			$('body,html').animate({scrollTop:0},600);
		})
		
		var oBack=false;
		$("body").on("click",".background-select",function(event){
			if(!oBack){
				$(this).css("borderColor","#ffbf00");
				$(".background-select-list").show();
				oBack=true;
			}else{
				$(this).css("borderColor","#e3e3e3");
				$(".background-select-list").hide();
				oBack=false;
			}
		})
		
		$("body").on("click",".background-item",function(event){
			$(".background-select").css("border","1px solid #e3e3e3");
			$(".background-select-list").hide();
			oBack=false;
		})
		
		var oGraduate=false;
		$("body").on("click",".graduate-select",function(event){
			if(!oGraduate){
				$(this).css("borderColor","#ffbf00");
				$(".graduate-select-list").show();
				oGraduate=true;
			}else{
				$(this).css("borderColor","#e3e3e3");
				$(".graduate-select-list").hide();
				oGraduate=false;
			}
		})
		
		$("body").on("click",".graduate-item",function(event){
			$(".graduate-select").css("border","1px solid #e3e3e3");
			$(".graduate-select-list").hide();
			oGraduate=false;
		})
		
		var oAward=false;
		$("body").on("click",".award-select",function(event){
			if(!oAward){
				$(this).css("borderColor","#ffbf00");
				$(".award-select-list").show();
				oAward=true;
			}else{
				$(this).css("borderColor","#e3e3e3");
				$(".award-select-list").hide();
				oAward=false;
			}
		})
		
		$("body").on("click",".award-year-item",function(event){
			$(".award-select").css("border","1px solid #e3e3e3");
			$(".award-select-list").hide();
			oAward=false;
		})
		
		var oPracticeBegin=false;
		$("body").on("click",".practice-select-begin",function(event){
			if(!oPracticeBegin){
				$(this).css("borderColor","#ffbf00");
				$(".practice-date-list-begin").show();
				oPracticeBegin=true;
			}else{
				$(this).css("borderColor","#e3e3e3");
				$(".practice-date-list-begin").hide();
				oPracticeBegin=false;
			}
		})
		
		$("body").on("click",".practice-year-begin",function(event){
			$(".practice-select-begin").css("border","1px solid #e3e3e3");
			$(".practice-date-list-begin").hide();
			oPracticeBegin=false;
		})
		
		var oPracticeEnd=false;
		$("body").on("click",".practice-select-end",function(event){
			if(!oPracticeEnd){
				$(this).css("borderColor","#ffbf00");
				$(".practice-date-list-end").show();
				oPracticeEnd=true;
			}else{
				$(this).css("borderColor","#e3e3e3");
				$(".practice-date-list-end").hide();
				oPracticeEnd=false;
			}
		})
		
		$("body").on("click",".practice-year-end",function(event){
			$(".practice-select-end").css("border","1px solid #e3e3e3");
			$(".practice-date-list-end").hide();
			oPracticeEnd=false;
		})
		
		var oActivity=false;
		$("body").on("click",".activity-select",function(event){
			if(!oActivity){
				$(this).css("borderColor","#ffbf00");
				$(".activity-select-list").show();
				oActivity=true;
			}else{
				$(this).css("borderColor","#e3e3e3");
				$(".activity-select-list").hide();
				oActivity=false;
			}
		})
		
		$("body").on("click",".activity-year-item",function(event){
			$(".activity-select").css("border","1px solid #e3e3e3");
			$(".activity-select-list").hide();
			oActivity=false;
		})
		
		$(document).on("click",function(e){
			var b1=$(e.target).hasClass("background-select");
			var b2=$(e.target).hasClass("background-content");
			var g1=$(e.target).hasClass("graduate-select");
			var g2=$(e.target).hasClass("graduate-content");
			var a1=$(e.target).hasClass("award-select");
			var a2=$(e.target).hasClass("award-content");
			var c1=$(e.target).hasClass("activity-select");
			var c2=$(e.target).hasClass("activity-content");
			var d1=$(e.target).hasClass("practice-select-begin");
			var d2=$(e.target).hasClass("practice-content-begin");
			var e1=$(e.target).hasClass("practice-select-end");
			var e2=$(e.target).hasClass("practice-content-end");
			
			if(!(b1||b2)){
				$(".background-select").css("border","1px solid #e3e3e3");
				$(".background-select-list").hide();
				oBack=false;
			}
			
			if(!(g1||g2)){
				$(".graduate-select").css("border","1px solid #e3e3e3");
				$(".graduate-select-list").hide();
				oGraduate=false;
			}
			
			if(!(a1||a2)){
				$(".award-select").css("border","1px solid #e3e3e3");
				$(".award-select-list").hide();
				oAward=false;
			}
			
			if(!(c1||c2)){
				$(".activity-select").css("border","1px solid #e3e3e3");
				$(".activity-select-list").hide();
				oActivity=false;
			}
			
			if(!(d1||d2)){
				$(".practice-select-begin").css("border","1px solid #e3e3e3");
				$(".practice-date-list-begin").hide();
				oPracticeBegin=false;
			}
			
			if(!(e1||e2)){
				$(".practice-select-end").css("border","1px solid #e3e3e3");
				$(".practice-date-list-end").hide();
				oPracticeEnd=false;
			}
		})
		
		$("body").on("click",".position-name",function(){
			window.location.href="PositionDetail.html";
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
		
		//模块切换
		$("body").on("click",".nav-item",function(){
			var oType=$(this).attr("num");
			var oActive=$(".nav-item-active").attr("num");

			if(oType!==oActive){
				$(".nav-item[num='"+oActive+"']").removeClass("nav-item-active");
				$(".backstage-module[num='"+oActive+"']").hide();
				$(this).addClass("nav-item-active");
				$(".backstage-module[num='"+oType+"']").show();
			}else{
			
			}
		})

		$("body").on("click",".empty-btn",function(){
			window.location.href="../Job/List.html";
		})

		function removeSelect(){
			var oList=$(".select-item");
			for(var i=0;i<oList.length;i++){
				if($(oList.eq(i).hasClass("selected"))){
					$(oList.eq(i).removeClass("selected"));
				}else{
					
				}
			}
		}
		
		//侧边导航
		$(window).scroll(function() {
			//获取文档滚动高度
		    var top = $(document).scrollTop();
		    var scrollHeight = $(document).height();
　　			var windowHeight = $(this).height();

		    if(top>=530&&scrollHeight-top-700>=0){
		    	$(".resume-nav-box").addClass("resume-nav-scroll");
		    }else{
		    	$(".resume-nav-box").removeClass("resume-nav-scroll");
		    }
		})
		
		//侧边导航滚动
		$("body").on("click",".nav-href",function(event){
			var oActive=$(this).parent(".resume-nav-item").hasClass("resume-nav-active");
			var oList=$(".resume-nav-item");
			if(!oActive){
				$.each(oList,function(index,item){
					if($(item).hasClass("resume-nav-active")){
						$(item).removeClass("resume-nav-active");
						return;
					}
				})
				$(this).parent(".resume-nav-item").addClass("resume-nav-active");
			}
			
			$("html, body").animate({
		      	scrollTop: ($($(this).attr("href")).offset().top -30)+ "px"
		    }, {
		      	duration: 500,
		      	easing: "swing"
		    });
		    return false;
		})
		
	}());
	
})


