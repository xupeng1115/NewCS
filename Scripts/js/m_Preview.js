var app = new Vue({
    el: "#app",
    data: {
        //是否登录
        loginKey: isLogin,

        //个人基本信息
        userInfo:ResumeBasic||{
            Name:'',
            Gender:''
        },
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


