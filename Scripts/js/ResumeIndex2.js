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
		//个人基本信息
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
		//教育经历模块
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
			
		],
		educationEditBackgrounds:[
			{
				id:10,
				background:"大专"
			},
			{
				id:11,
				background:"本科"
			},
			{
				id:12,
				background:"硕士"
			},
			{
				id:13,
				background:"博士"
			},
			{
				id:143,
				background:"其他"
			}
		],
		educationEditgraduatesYear:[
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
        educationEditgraduatesMonth:[
			{
				graduate:"01",
			},
			{
				graduate:"02",
			},
			{
				graduate:"03",
			},
			{
				graduate:"04",
			},
			{
				graduate:"05",
			},
			{
				graduate:"06",
			},
			{
				graduate:"07",
			},
			{
				graduate:"08",
			},
			{
				graduate:"09",
			},
			{
				graduate:"10",
			},
			{
				graduate:"11",
			},
			{
				graduate:"12",
			}
		],
		educationmajor:"",
		educationschool:"",
		educationBackgroundid:"",
		educationbackground:"",
		educationgraduate_year:"",
        educationgraduate_month:"",
		educationmonth:"",
		
		//荣誉经历模块
		awardgraduates_year:[
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
         awardgraduates_month:[
			{
				month:"01",
			},
			{
				month:"02",
			},
			{
				month:"03",
			},
			{
				month:"04",
			},
			{
				month:"05",
			},
			{
				month:"06",
			},
			{
				month:"07",
			},
			{
				month:"08",
			},
			{
				month:"09",
			},
			{
				month:"10",
			},
			{
				month:"11",
			},
			{
				month:"12",
			}
		],
		awardLists:[
			
		],
		awardname:"",
		awardgraduate_year:"",
        awardgraduate_month:"",
		
		//实习经历模块
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
			
		],
		practicecompanyname:"",
		practicepositionname:"",
		practicesite:"",
		practicebegin_year:"",
        practicebegin_month:"",
		practiceend_year:"",
        practiceend_month:"",
		practicecontent:"",
		
		//技能模块
		skillLists:[
			
		],
		skillname:"",
		skillbar:"",
		skilldec:"",
		
		//课外活动模块
		activityLists:[
			
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
		activitydate_year:"",
        activitydate_month:"",
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
			this.tagBoxShow=true;
		},
		tagConfirm:function(){
			this.tagBoxShow=false;
		},
		tagClick:function(tag,event){
			var oSelected=$(event.target).hasClass("selected");
			var oIndex;
			if(oSelected){
				$(event.target).removeClass("selected");
				$.each(this.selectedTags, function (index, item){
					if(item.ID===tag.ID){
						oIndex=index;
						return;
					}
				})
				this.selectedTags.splice(oIndex,0);
			}else{
				$(event.target).addClass("selected");
				this.selectedTags.push(tag);
			}
		},
		tagCancel:function(){
			this.tagBoxShow=false;
		},
		tagReset:function(){
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
				PicturePath:app.userInfo.PicturePath,
				Name:this.userEditInfo.Name,
				Gender:this.userEditInfo.Gender,							
				AddressInfo:this.userEditInfo.AddressInfo,
				Tel:this.userEditInfo.Tel,
				Email:this.userEditInfo.Email
			}
			var that = this;
			var mySuccessFun = function (result) {
                if (result.Success) {
					if(!that.userInfo.ID){
						Obj.ID=result.Data;
					}
					
                    getResumeBasicInfo();
                } else {
                    alert("网络出错了！");
                }
            }
            var myErrorFun = function (error) {
                alert("网络出错了！");
			}
			var that = this;

            //提交简历信息
            myAjax("post", "/Resume/SubmitResumeBasic", JSON.stringify(this.userInfo), mySuccessFun, myErrorFun);
            
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
		selectgraduateyear:function(graduate){
			this.educationgraduate_year=graduate;
		},
        selectgraduatemonth:function(graduate){
			this.educationgraduate_month=graduate;
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
			this.educationgraduate_year="";
            this.educationgraduate_month="";
			this.educationShift();
			this.moduleActiveHide(type);
			this.currentModule=0;
			this.clickEnable=true;
			this.headEditEnable=false;
		},
		//教育背景
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
			if($.trim(this.educationgraduate_year)===""){
				return;
			}
            var _endDay= Number(this.educationgraduate_year);
            var _beginDay = _endDay;
            
            switch (this.educationbackgroundid) {
            case 10:
                _beginDay = _endDay - 3;
                break;
            case 11:
                _beginDay = _endDay - 4;
                break;
            case 12:
                _beginDay = _endDay - 2;
                break;
            case 13:
                _beginDay = _endDay - 4;
                break;
            default:
                _beginDay = _endDay - 2;
                break;
            }

			var Obj={
				ResumeID:app.userEditInfo.ID,
				Major:this.educationmajor,
				Education:this.educationbackgroundid,
				SchoolName:this.educationschool,
				BeginDate: _beginDay + "-" +this.educationgraduate_month, 
				EndDate: _endDay + "-" +this.educationgraduate_month
			}
		
            var mySuccessFun = function (result) {
				
                if (result.Success) {
					Obj.ID=result.Data;
                    
                } else {
                    alert("网络出错了！");
                }
            }
            var myErrorFun = function (error) {
                alert("网络出错了！");
			}
			var that = this;

            //提交教育背景
            myAjax("post", "/Resume/SubmitEducationBackround", JSON.stringify(Obj), mySuccessFun, myErrorFun);
            
			that.educationLists.unshift(Obj);
			that.educationDate.splice(0,1,{year:that.educationgraduate_year,month:that.educationgraduate_month});
					
			that.moduleActiveHide(type);
			that.currentModule=0;
			that.clickEnable=true;
			that.headEditEnable=false;
					
			that.educationmajor="";
			that.educationschool="";
			that.educationbackground="";
			that.educationgraduate_year="";
			that.educationgraduate_month= "";
			that.educationbackgroundid="";
		},
		educationDelete:function(index,ID){
			var mySuccessFun = function (result) {
                if (result.Success) {
                    app.educationLists.splice(index,1);
					app.educationShift();
                } else {
                    alert(result.Message);
                }
            }
            var myErrorFun = function (error) {
                alert("网络出错了！");
            }
			myAjax("post", "/Resume/DeleteEducationBackround?Id="+ID, JSON.stringify(), mySuccessFun, myErrorFun);
		},

		awardselect_year:function(year){
			this.awardgraduate_year=year;
		},
        awardselect_month:function(month){
			this.awardgraduate_month=month;
		},
        //所获荣誉
		awardSave:function(type){
			if($.trim(this.awardname)===""){
				return;
			}
			if($.trim(this.awardgraduate_year)===""){
				return;
			}
			
			var Obj={
				ResumeID:app.userEditInfo.ID,
				HonorName:this.awardname,
				GetTime:this.awardgraduate_year + "-" +this.awardgraduate_month
			}
			
			var mySuccessFun = function (result) {
				
                if (result.Success) {
					Obj.ID=result.Data;
                    
                } else {
                    alert("网络出错了！");
                }
            }
            var myErrorFun = function (error) {
                alert("网络出错了！");
			}
			var that = this;

            //提交所获荣誉
            myAjax("post", "/Resume/SubmitHonor", JSON.stringify(Obj), mySuccessFun, myErrorFun);
 
			that.awardLists.unshift(Obj);
			that.moduleActiveHide(type);
			that.currentModule=0;
			that.clickEnable=true;
			that.headEditEnable=false;
			
			that.awardname="";
			that.awardgraduate_year="";
            that.awardgraduate_month= "";
		},
		awardCancel:function(type){
			this.awardname="";
			this.awardgraduate_year="";
            this.awardgraduate_month= "";
			this.moduleActiveHide(type);
			this.currentModule=0;
			this.clickEnable=true;
			this.headEditEnable=false;
		},
		awardDelete:function(index,ID){
			var mySuccessFun = function (result) {
                if (result.Success) {
					app.awardLists.splice(index,1);
                } else {
                    alert(result.Message);
                }
            }
            var myErrorFun = function (error) {
                alert("网络出错了！");
            }
			myAjax("post", "/Resume/DeleteHonor?Id="+ID, JSON.stringify(), mySuccessFun, myErrorFun);
		
		},
		//实习经历
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
			if($.trim(this.practicebegin_year)===""){
				return;
			}
			if($.trim(this.practiceend_year)===""){
				return;
			}
			if($.trim(this.practicecontent)===""){
				return;
			}
			
			var Obj={
				url:$("#CompanyLogoImg").attr('src'),
				companyname:this.practicecompanyname,
				positionname:this.practicepositionname,
				site:this.practicesite,
				begin:this.practicebegin_year +"-" + this.practicebegin_month,
				end:this.practiceend_year+"-" + this.practiceend_month,
				content:this.practicecontent
				
			}
			//"../../Content/img/position_head.png"
			var Objs={
				CompanyLogo:$("#CompanyLogoImg").attr('src'),
				ResumeID:app.userEditInfo.ID,
				CompanyName:this.practicecompanyname,
				PositionName:this.practicepositionname,
				AddressInfo:this.practicesite,
				BeginDate:this.practicebegin_year +"-" + this.practicebegin_month,
				EndDate:this.practiceend_year+"-" + this.practiceend_month,
				JobDescription:this.practicecontent
			}

			var mySuccessFun = function (result) {
                if (result.Success) {
					Obj.ID=result.Data;
					$("#CompanyLogoImg").attr('src',"../../Content/img/position_head.png");
                } else {
                    alert("网络出错了！");
                }
            }
            var myErrorFun = function (error) {
                alert("网络出错了！");
			}


            
            myAjax("post", "/Resume/SubmitInternshipExperience", JSON.stringify(Objs), mySuccessFun, myErrorFun);
 
			this.practiceLists.unshift(Obj);
			this.moduleActiveHide(type);
			this.currentModule=0;
			this.clickEnable=true;
			this.headEditEnable=false;

			this.practicecompanyname="";
			this.practicepositionname="";
			this.practicesite="";
			this.practicebegin_year="";
            this.practicebegin_month="";
			this.practiceend_year="";
            this.practiceend_month="";
			this.practicecontent="";
		},
		practiceCancel:function(type){
			this.practicecompanyname="";
			this.practicepositionname="";
			this.practicesite="";
			this.practicebegin_year="";
            this.practicebegin_month="";
			this.practiceend_year="";
            this.practiceend_month="";
			this.practicecontent="";
			
			this.moduleActiveHide(type);
			this.currentModule=0;
			this.clickEnable=true;
			this.headEditEnable=false;
		},
		practiceDelete:function(index,ID){
			var mySuccessFun = function (result) {
                if (result.Success) {
					app.practiceLists.splice(index,1);
                } else {
                    alert(result.Message);
                }
            }
            var myErrorFun = function (error) {
                alert("网络出错了！");
            }
			myAjax("post", "/Resume/DeleteInternshipExperience?Id="+ID, JSON.stringify(), mySuccessFun, myErrorFun);
			
		},
		practiceselectbegin_year:function(year){
			this.practicebegin_year=year;
		},
        practiceselectbegin_month:function(month){
			this.practicebegin_month=month;
		},        
		practiceselectend_year:function(year){
			this.practiceend_year=year;
		},
        practiceselectend_month:function(month){
			this.practiceend_month=month;
		},

        //特殊技能
		skillSave:function(type){
			if($.trim(this.skillname)===""){
				return;
			}
			if($.trim(this.skilldec)===""){
				return;
			}
			
			var Obj={
				ResumeID:app.userEditInfo.ID,
				name:this.skillname,
				SepciltyName:this.skillname,
				ResumeID:app.userEditInfo.ID,
				dec:this.skilldec,
				SkillDescription:this.skilldec,
				bar:this.skillbar,
				Skilled:this.skillbar
			}
			var mySuccessFun = function (result) {
                if (result.Success) {
					Obj.ID=result.Data;
                } else {
                    alert("网络出错了！");
                }
            }
            var myErrorFun = function (error) {
                alert("网络出错了！");
			}

            myAjax("post", "/Resume/SubmitSepcilty", JSON.stringify(Obj), mySuccessFun, myErrorFun);
 
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
		skillDelete:function(index,ID){
			var mySuccessFun = function (result) {
                if (result.Success) {
					app.skillLists.splice(index,1);
                } else {
                    alert(result.Message);
                }
            }
            var myErrorFun = function (error) {
                alert("网络出错了！");
            }
			myAjax("post", "/Resume/DeleteSepcilty?Id="+ID, JSON.stringify(), mySuccessFun, myErrorFun);	
		
		},

		//课外活动
		activityselect_year:function(year){
			this.activitydate_year=year;
		},
        activityselect_month:function(month){
			this.activitydate_month=month;
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
			if($.trim(this.activitydate_year)===""){
				return;
			}
			
			var Obj={
				name:this.activityname,
				
				dec:this.activitydec,
				
				date:this.activitydate_year+"-" + this.activitydate_month,
				
				site:this.activitysite,
				
			}
			var Objs={
				ResumeID:app.userEditInfo.ID,
				ActivityName:this.activityname,
				
				Description:this.activitydec,
				
				AttendTime:this.activitydate_year+"-" + this.activitydate_month,
				
				AddressInfo:this.activitysite
			}
			
			var mySuccessFun = function (result) {
                if (result.Success) {
					Obj.ID=result.Data;
                } else {
                    alert("网络出错了！");
                }
            }
            var myErrorFun = function (error) {
                alert("网络出错了！");
			}

            myAjax("post", "/Resume/SubmitActivity", JSON.stringify(Objs), mySuccessFun, myErrorFun);
 
			this.activityLists.unshift(Obj);
			this.moduleActiveHide(type);
			this.currentModule=0;
			this.clickEnable=true;
			this.headEditEnable=false;
			
			this.activityname="";
			this.activitydec="";
			this.activitydate_year="";
            this.activitydate_month ="";
			this.activitysite="";
		},
		activityCancel:function(type){
			this.activityname="";
			this.activitydec="";
			this.activitydate_year="";
            this.activitydate_month="";
			this.activitysite="";
			this.moduleActiveHide(type);
			this.currentModule=0;
			this.clickEnable=true;
			this.headEditEnable=false;
		},
		activityDelete:function(index,ID){
			var mySuccessFun = function (result) {
                if (result.Success) {
					app.activityLists.splice(index,1);
                } else {
                    alert(result.Message);
                }
            }
            var myErrorFun = function (error) {
                alert("网络出错了！");
            }
			myAjax("post", "/Resume/DeleteActivity?Id="+ID, JSON.stringify(), mySuccessFun, myErrorFun);	
		

		}
	}
})

//图片没有成功加载出来时处理
function nofind(){
    var oImg=event.srcElement;
    oImg.src="../../Content/img/head.png";
    oImg.onerror=null;
}

var titleUrl = "/My/GetTitles",
	addTitleUrl = "/My/SubmitUserTitle",
	userTitleUrl = "/My/GetUserTitles";

$(function(){

	loadUserTitle();
	//分页
	(function(){
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
	}());
	
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
		//绑定简历基本信息
		BindResumeBasic(ResumeBasic);
		//绑定教育背景
		BindEducationBackround();
		//绑定所获荣誉
		BindAward();
		//绑定实习经历
		BindPractice();
		//绑定语言或技术
		BindSkill();
		//绑定课外活动
		BindActivity();
		$("body").on("click",".back-top",function(event){
			$('body,html').animate({scrollTop:0},300);
		})
		
		$("body").on("click",".tag-cancel-btn",function(event){
			removeSelect();
			$(".flo-box").hide();
		})
		
		$("body").on("click",".add-tag-btn",function(event){});

		$("body").on("click",".add-tag-btn",function(event){
			var myParams = {
               
            }
            var mySuccessFun = function (result) {
				console.log(JSON.stringify(result.Data));
                if (result.Success) {
					var html="<div class=\"tag-cancel-btn\">\
								</div>\
								<div class=\"select-title\">\
									<span class=\"title-text\">标签选择</span> <span class=\"title-dec\">最多选择5个标签</span> <span class=\"tag-num-box\">共"+result.Data.length+"个标签</span>\
								</div>\
								<ul class=\"select-list\">\
									<li class=\"select-list-item\">\
										<div class=\"select-item-title\">\
											</div>\
										<ul class=\"select-item-list clearbox\">";
					$.each(result.Data,function(index,item){
						if(UserTitleList.indexOf(item.TitleName)>0){
							html+="<li class=\"select-item selected\" data-id="+item.ID+">"+item.TitleName+"</li>";
						}else{
							html+="<li class=\"select-item\" data-id="+item.ID+">"+item.TitleName+"</li>";
						}
							
					});
					html+="</ul></li></ul>\
					<div class=\"select-btn-box clearbox\">\
						<div class=\"select-btn select-confirm-btn\">\
							<span class=\"select-icon\"><i class=\"material-icons\">&#xE5CA;</i></span> <span class=\"btn-text\">确定</span>\
						</div>\
						<div class=\"select-btn select-reset-btn\">\
							<span class=\"select-icon\"><i class=\"material-icons\">&#xE5D5;</i></span> <span class=\"btn-text\">\
								重置</span>\
						</div>\
					</div>";
                    $(".title-list").html(html);
					$(".flo-box").show();
                } else {
                    alert(result.Message);
                }
            }
            var myErrorFun = function () {
                alert("网络出错了！");
            }
			//发送请求获取标签列表
            myAjax("get", titleUrl, JSON.stringify(myParams), mySuccessFun, myErrorFun,"application/json; charset=utf-8");
		})
		
		$("body").on("click",".select-confirm-btn",function(event){
			var ArrayTltleID=[];
			$.each($(".title-list .selected"),function(index,item){
				ArrayTltleID.push($(item).data("id"));
			});
			var myParams = {
				arrayTltleID:ArrayTltleID
            }
            var mySuccessFun = function (result) {
                if (result.Success) {
					$(".flo-box").hide();
					loadUserTitle();
				} else {
                    alert(result.Message);
                }
            }
            var myErrorFun = function () {
                alert("网络出错了！");
            }
			//提交用户选中的标签
            myAjax("Post", addTitleUrl,JSON.stringify(myParams), mySuccessFun, myErrorFun,"application/json; charset=utf-8");
		})
		
		$("body").on("click",".select-item",function(event){
			var oKey=$(this).hasClass("selected");
			if(oKey){
				$(this).removeClass("selected");
			}else{
				if($('.title-list .selected').length>=5){
					alert("最多选择5个标签");
				}
				else
				{
					$(this).addClass("selected");
				}
			}
				
		})
		
		$("body").on("click",".select-reset-btn",function(event){
			removeSelect();
		})
		
		$("body").on("click",".resume-nav-item",function(event){
			var oKey=$(this).hasClass("resume-nav-active");
			var oList=$(".resume-nav-item");
			if(!oKey){
				for(var i=0;i<oList.length;i++){
					if(oList.eq(i).hasClass("resume-nav-active")){
						oList.eq(i).removeClass("resume-nav-active");
						break;
					}
				}
				$(this).addClass("resume-nav-active");
			}
		})
		
		$("body").on("click",".add-education-btn",function(event){
			$(".education-edit-container").show();
		})
		
		$("body").on("click",".education-save-btn",function(event){
			$(".education-edit-container").hide();
		})
		
		$("body").on("click",".education-cancel-btn",function(event){
			$(".education-edit-container").hide();
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
			var oContent=$(this).text();
			$(".background-select").css("border","1px solid #e3e3e3");
			$(".background-content").text(oContent);
			$(".background-select-list").hide();
			oBack=false;
		})
		
		var oGraduateYear=false;
		$("body").on("click",".graduate-select-year",function(event){
			if(!oGraduateYear){
				$(this).css("borderColor","#ffbf00");
				$(".graduate-select-list-year").show();
				oGraduateYear=true;
			}else{
				$(this).css("borderColor","#e3e3e3");
				$(".graduate-select-list-year").hide();
				oGraduateYear=false;
			}
		})
		
		$("body").on("click",".graduate-item-year",function(event){
			$(".graduate-select-year").css("border","1px solid #e3e3e3");
			$(".graduate-select-list-year").hide();
			oGraduateYear=false;
		})

        var oGraduateMonth=false;
		$("body").on("click",".graduate-select-month",function(event){
			if(!oGraduateMonth){
				$(this).css("borderColor","#ffbf00");
				$(".graduate-select-list-month").show();
				oGraduateMonth=true;
			}else{
				$(this).css("borderColor","#e3e3e3");
				$(".graduate-select-list-month").hide();
				oGraduateMonth=false;
			}
		})
		
		$("body").on("click",".graduate-item-month",function(event){
			$(".graduate-select-month").css("border","1px solid #e3e3e3");
			$(".graduate-select-list-month").hide();
			oGraduateMonth=false;
		})
		
//        所获荣誉
		var oAwardYear=false;
		$("body").on("click",".award-select-year",function(event){
			if(!oAwardYear){
				$(this).css("borderColor","#ffbf00");
				$(".award-select-list-year").show();
				oAwardYear=true;
			}else{
				$(this).css("borderColor","#e3e3e3");
				$(".award-select-list-year").hide();
				oAwardYear=false;
			}
		})
		
		$("body").on("click",".award-year-item-year",function(event){
			$(".award-select-year").css("border","1px solid #e3e3e3");
			$(".award-select-list-year").hide();
			oAwardYear=false;
		})

        var oAwardMonth=false;
		$("body").on("click",".award-select-month",function(event){
			if(!oAwardMonth){
				$(this).css("borderColor","#ffbf00");
				$(".award-select-list-month").show();
				oAwardMonth=true;
			}else{
				$(this).css("borderColor","#e3e3e3");
				$(".award-select-list-month").hide();
				oAwardMonth=false;
			}
		})
		
		$("body").on("click",".award-year-item-month",function(event){
			$(".award-select-month").css("border","1px solid #e3e3e3");
			$(".award-select-list-month").hide();
			oAwardMonth=false;
		})
		
	

		//实习经历
		var oPracticeBeginYear=false;
		$("body").on("click",".practice-select-begin-year",function(event){
			if(!oPracticeBeginYear){
				$(this).css("borderColor","#ffbf00");
				$(".practice-date-list-begin-year").show();
				oPracticeBeginYear=true;
			}else{
				$(this).css("borderColor","#e3e3e3");
				$(".practice-date-list-begin-year").hide();
				oPracticeBeginYear=false;
			}
		})
		
		$("body").on("click",".practice-year-begin-year",function(event){
			$(".practice-select-begin-year").css("border","1px solid #e3e3e3");
			$(".practice-date-list-begin-year").hide();
			oPracticeBeginYear=false;
		})

        var oPracticeBeginMonth=false;
		$("body").on("click",".practice-select-begin-month",function(event){
			if(!oPracticeBeginMonth){
				$(this).css("borderColor","#ffbf00");
				$(".practice-date-list-begin-month").show();
				oPracticeBeginMonth=true;
			}else{
				$(this).css("borderColor","#e3e3e3");
				$(".practice-date-list-begin-month").hide();
				oPracticeBeginMonth=false;
			}
		})
		
		$("body").on("click",".practice-year-begin-month",function(event){
			$(".practice-select-begin-month").css("border","1px solid #e3e3e3");
			$(".practice-date-list-begin-month").hide();
			oPracticeBeginMonth=false;
		})
		
		var oPracticeEndYear=false;
		$("body").on("click",".practice-select-end-year",function(event){
			if(!oPracticeEndYear){
				$(this).css("borderColor","#ffbf00");
				$(".practice-date-list-end-year").show();
				oPracticeEndYear=true;
			}else{
				$(this).css("borderColor","#e3e3e3");
				$(".practice-date-list-end-year").hide();
				oPracticeEndYear=false;
			}
		})
		
		$("body").on("click",".practice-year-end-year",function(event){
			$(".practice-select-end-year").css("border","1px solid #e3e3e3");
			$(".practice-date-list-end-year").hide();
			oPracticeEndYear=false;
		})
        
		var oPracticeEndMonth=false;
		$("body").on("click",".practice-select-end-month",function(event){
			if(!oPracticeEndMonth){
				$(this).css("borderColor","#ffbf00");
				$(".practice-date-list-end-month").show();
				oPracticeEndMonth=true;
			}else{
				$(this).css("borderColor","#e3e3e3");
				$(".practice-date-list-end-month").hide();
				oPracticeEndMonth=false;
			}
		})
		
		$("body").on("click",".practice-year-end-month",function(event){
			$(".practice-select-end-month").css("border","1px solid #e3e3e3");
			$(".practice-date-list-end-month").hide();
			oPracticeEndMonth=false;
		})

		//课外活动
		var oActivityYear=false;
		$("body").on("click",".activity-select-year",function(event){
			if(!oActivityYear){
				$(this).css("borderColor","#ffbf00");
				$(".activity-select-list-year").show();
				oActivityYear=true;
			}else{
				$(this).css("borderColor","#e3e3e3");
				$(".activity-select-list-year").hide();
				oActivityYear=false;
			}
		})
		
		$("body").on("click",".activity-year-item-year",function(event){
			$(".activity-select-year").css("border","1px solid #e3e3e3");
			$(".activity-select-list-year").hide();
			oActivityYear=false;
		})


        var oActivityMonth=false;
		$("body").on("click",".activity-select-month",function(event){
			if(!oActivityMonth){
				$(this).css("borderColor","#ffbf00");
				$(".activity-select-list-month").show();
				oActivityMonth=true;
			}else{
				$(this).css("borderColor","#e3e3e3");
				$(".activity-select-list-month").hide();
				oActivityMonth=false;
			}
		})
		
		$("body").on("click",".activity-year-item-month",function(event){
			$(".activity-select-month").css("border","1px solid #e3e3e3");
			$(".activity-select-list-month").hide();
			oActivityMonth=false;
		})
		
		$(document).on("click",function(e){
			var b1=$(e.target).hasClass("background-select");
			var b2=$(e.target).hasClass("background-content");
			var g1=$(e.target).hasClass("graduate-select-year");
			var g2=$(e.target).hasClass("graduate-content-year");
            var g1_month=$(e.target).hasClass("graduate-select-month");
			var g2_month=$(e.target).hasClass("graduate-content-month");
			var a1=$(e.target).hasClass("award-select-year");
			var a2=$(e.target).hasClass("award-content-year");
            var a1_month=$(e.target).hasClass("award-select-month");
			var a2_month=$(e.target).hasClass("award-content-month");
			var c1=$(e.target).hasClass("activity-select-year");
			var c2=$(e.target).hasClass("activity-content-year");
            var c1_month=$(e.target).hasClass("activity-select-month");
			var c2_month=$(e.target).hasClass("activity-content-month");
			var d1=$(e.target).hasClass("practice-select-begin-year");
			var d2=$(e.target).hasClass("practice-content-begin-year");
            var d1_month=$(e.target).hasClass("practice-select-begin-month");
			var d2_month=$(e.target).hasClass("practice-content-begin-month");
			var e1=$(e.target).hasClass("practice-select-end-year");
			var e2=$(e.target).hasClass("practice-content-end-year");
            var e1_month=$(e.target).hasClass("practice-select-end-month");
			var e2_month=$(e.target).hasClass("practice-content-end-month");
			
			if(!(b1||b2)){
				$(".background-select").css("border","1px solid #e3e3e3");
				$(".background-select-list").hide();
				oBack=false;
			}
			
			if(!(g1||g2)){
				$(".graduate-select-year").css("border","1px solid #e3e3e3");
				$(".graduate-select-list-year").hide();
				oGraduateYear=false;
			}

            if(!(g1_month||g2_month)){
				$(".graduate-select-month").css("border","1px solid #e3e3e3");
				$(".graduate-select-list-month").hide();
				oGraduateMonth=false;
			}
			
			if(!(a1||a2)){
				$(".award-select-year").css("border","1px solid #e3e3e3");
				$(".award-select-list-year").hide();
				oAwardYear=false;
			}

            if(!(a1_month||a2_month)){
				$(".award-select-month").css("border","1px solid #e3e3e3");
				$(".award-select-list-month").hide();
				oAwardMonth=false;
			}
			
			if(!(c1||c2)){
				$(".activity-select-year").css("border","1px solid #e3e3e3");
				$(".activity-select-list-year").hide();
				oActivityYear=false;
			}

            if(!(c1_month||c2_month)){
				$(".activity-select-month").css("border","1px solid #e3e3e3");
				$(".activity-select-list-month").hide();
				oActivityMonth=false;
			}

			
			if(!(d1||d2)){
				$(".practice-select-begin-year").css("border","1px solid #e3e3e3");
				$(".practice-date-list-begin-year").hide();
				oPracticeBeginYear=false;
			}

            if(!(d1_month||d2_month)){
				$(".practice-select-begin-month").css("border","1px solid #e3e3e3");
				$(".practice-date-list-begin-month").hide();
				oPracticeBeginMonth=false;
			}
			
			if(!(e1||e2)){
				$(".practice-select-end-year").css("border","1px solid #e3e3e3");
				$(".practice-date-list-end-year").hide();
				oPracticeEndYear=false;
			}

            
			if(!(e1_month||e2_month)){
				$(".practice-select-end-month").css("border","1px solid #e3e3e3");
				$(".practice-date-list-end-month").hide();
				oPracticeEndMonth=false;
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

		$("body").on("click",".empty-btn",function(){
			window.location.href="../Job/List";
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
	}());
	
	
})

//Ajax
function myAjax(myType, myUrl, myParams, mySuccessFun, myErrorFun,myContentType) {
	if(!myContentType){
		myContentType = "application/json; charset=utf-8";
	}
	var params = {
		"controller": myUrl,
		data: myParams,
		contentType:myContentType
	};

	var successFun = mySuccessFun;
	var errorFun = myErrorFun;

	if (myType.toLocaleUpperCase() === "GET") {
		communication.get(params, successFun, errorFun);
	} else {
		communication.post(params, successFun, errorFun);
	}

}

function ShowUserTitle(Data){
	UserTitleList = JSON.stringify(Data);
	var html="";
	$.each(Data,function(index,item){
		html+="<li class=\"tag-item\">"+item.TitleName+"</li>";
	});
	
	$('.user-title-list').html(html);
}

function loadUserTitle(){
	var myParams = {
		   
	}
	var mySuccessFun = function (result) {
		if (result.Success) {
			ShowUserTitle(result.Data);
		} else {
			alert(result.Message);
		}
	}
	var myErrorFun = function () {
		alert("网络出错了！");
	}
	//发送请求获取标签列表
	myAjax("get", userTitleUrl, JSON.stringify(myParams), mySuccessFun, myErrorFun,"application/json; charset=utf-8");
}

//获取简历信息
function getResumeBasicInfo(){
	var myParams = {
		   
	}
	var mySuccessFun = function (result) {
		if (result.Success) {
			BindResumeBasic(result.Data);
		} else {
			alert(result.Message);
		}
	}
	var myErrorFun = function () {
		alert("网络出错了！");
	}
	//发送请求获取简历信息
	myAjax("get", "/Resume/GetResumeBasicInfo", JSON.stringify(myParams), mySuccessFun, myErrorFun,"application/json; charset=utf-8");
}

//简历基本信息
function BindResumeBasic(objstr){
	if(objstr){
		var obj = JSON.parse(objstr);
		app.userEditInfo.AddressInfo = obj.AddressInfo;
		app.userEditInfo.Email = obj.Email;
		app.userEditInfo.Gender = obj.Gender;
		app.userEditInfo.ID = obj.ID;
		app.userEditInfo.Name = obj.Name;
		app.userEditInfo.Tel = obj.Tel;
		if(ResumeBasicPicturePaths){app.userInfo.PicturePath = ResumeBasicPicturePaths; }
	}
}

//教育经历
function BindEducationBackround(){
	if(EducationBackround){
		var objList = JSON.parse(EducationBackround);
		
		$.each(objList,function(index,item){
			var obj = {
				ID:item.ID,
				SchoolName:item.SchoolName,
				Education:item.Education,
				BeginDate:item.BeginDate.substr(0,10),
				EndDate:item.EndDate.substr(0,10),
				Major:item.Major
			};
			app.educationLists.push(obj);
		})
	}
}

//所获荣誉
function BindAward(){
	if(Award){
		var objList = JSON.parse(Award);

		$.each(objList,function(index,item){
			var obj = {
				ID:item.ID,
				HonorName:item.HonorName,
				GetTime:item.GetTime.substr(0,10)
			};
			app.awardLists.push(obj);
		})
	}
}

//实习经历
function BindPractice(){
	if(InternshipExperience){
		var objList = JSON.parse(InternshipExperience);

		$.each(objList,function(index,item){
			var obj = {
				ID:item.ID,
				companyname:item.CompanyName,
				url:!item.CompanyLogo?"../../Content/img/position_head.png":item.CompanyLogo,
				site:item.AddressInfo,
				positionname:item.PositionName,
				begin:item.BeginDate.substr(0,10),
				end:item.EndDate.substr(0,10),
				content:item.JobDescription
			};
			app.practiceLists.push(obj);
		})
	}
}

//绑定语言或技术
function BindSkill(){
	if(Sepcilty){
		var objList = JSON.parse(Sepcilty);

		$.each(objList,function(index,item){
			var obj = {
				ID:item.ID,
				name:item.SepciltyName,
				bar:item.Skilled,
				dec:item.SkillDescription
			};
			app.skillLists.push(obj);
		})
	}
}

//绑定课外活动
function BindActivity(){

	if(Activity){
		var objList = JSON.parse(Activity);
		$.each(objList,function(index,item){
			var obj = {
				ID:item.ID,
				name:item.ActivityName,
				date:item.AttendTime.substr(0,7),
				site:item.AddressInfo,
				dec:item.Description
			};
			app.activityLists.push(obj);
		})
	}
}

function filePictureChange() {
	if(document.getElementById("PictureFile").value.length<=0){
		return false;
	}
	$.ajaxFileUpload({
		url: "/Resume/UserPhotoImport", //用于文件上传的服务器端请求地址
		type: "post",
		secureuri: false, //一般设置为false
		fileElementId: "PictureFile", //文件上传控件的id属性
		dataType: "json", //返回值类型 一般设置为json
		success: function (result) {
			if (result.Success) {
				app.userInfo.PicturePath = result.Data;
			} else {
				alert(result.Message);
			}
		},
		error: function (data, status, e) { //服务器响应失败处理函数
			alert(e);
		}
	});
}

function fileCompanyLogoChange() {
	
	if(document.getElementById("CompanyLogo").value.length<=0){
		return false;
	}
	$.ajaxFileUpload({
		url: "/Resume/CompanyLogoImport", //用于文件上传的服务器端请求地址
		type: "post",
		secureuri: false, //一般设置为false
		fileElementId: "CompanyLogo", //文件上传控件的id属性
		dataType: "json", //返回值类型 一般设置为json
		success: function (result) {
			if (result.Success) {
				$("#CompanyLogoImg").attr('src',result.Data);
			} else {
				alert(result.Message);
			}
		},
		error: function (data, status, e) { //服务器响应失败处理函数
			alert(e);
		}
	});
}

function imgClick(){
	$('#CompanyLogo').click();
}

(function(){
	loadUserTitle();
	function loadUserTitle(){
        var myParams = {
	        
        }
        var mySuccessFun = function (result) {
	        if (result.Success) {
                console.log(result.Data);
		        app.userTags=$.extend([],result.Data);
	        } else {
		        alert(result.Message);
	        }
        }
        var myErrorFun = function () {
	        alert("网络出错了！");
        }
        //发送请求获取标签列表
        myAjax("get", userTitleUrl, JSON.stringify(myParams), mySuccessFun, myErrorFun,"application/json; charset=utf-8");
    }
}());


