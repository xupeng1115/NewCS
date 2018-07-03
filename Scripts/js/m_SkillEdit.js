var app = new Vue({
    el: "#app",
    data: {
        //是否登录
        loginKey: isLogin,

        //教育背景
        skillList:Sepcilty,
    },
    computed:{
        
    },
    watch:{
        
    },
    updated: function () {
        
    },
    methods: {
        changeSkill:function(){

        },
        addSkill:function(){
            app.skillList.push({
                "SepciltyName":"",
                "Skilled":"",
                "SkillDescription":""
            });
        },
        deleteSkill:function(index){
            app.skillList.splice(index,1);
        }
    }
});

$(function(){

});


//公司logo没有成功加载出来时处理
function nofind() {
    var oImg = event.srcElement;
    oImg.src = "../../Content/m_img/m_empty.png";
    oImg.onerror = null;
}


