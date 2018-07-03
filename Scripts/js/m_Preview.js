var app = new Vue({
    el: "#app",
    data: {
        //是否登录
        loginKey: isLogin,

        //个人基本信息
        userInfo:ResumeBasic||{
            Name:'',
            Gender:'',
            Tel:'',
            Email:'',
            AddressInfo:'',
            JobStatus:''
        },
        //个人标签
        tagList:UserTitleList,
        //教育背景
        backgroundList:EducationBackround,
        //所获荣誉
        awardList:Award,
        //实习经历
        practiceList:InternshipExperience,
        //语言技能
        skillList:Sepcilty,
        //课外活动
        activityList:Activity,
        //自我评价
        evaluation:ResumeContent,
        //简历头像
        picUrl:ResumeBasicPicturePaths
    },
    computed:{
        
    },
    watch:{
        
    },
    updated: function () {
        
    },
    methods: {
        
    }
})

$(function () {

});

//公司logo没有成功加载出来时处理
function nofind() {
    var oImg = event.srcElement;
    oImg.src = "../../Content/m_img/m_empty.png";
    oImg.onerror = null;
}


