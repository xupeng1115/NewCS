var app=new Vue({
    el:"#app",
    data:{
        menuKey:false
    },
    methods:{
        menuHandle:function(event){
            if(app.menuKey){
                app.menuKey=false;
            }else{
                app.menuKey=true;
            }
        }
    }
})

$(function(){

    //“想从事的行业”
    var mySwiper1 = new Swiper('.swiper-container1', {
        autoplay:3000,
        speed:700,
        slidesPerView :"auto",
        slidesPerGroup : 1,
        freeMode : true,
        freeModeMomentum : true,
    });

    //“理想工作怎么找”
    var mySwiper2 = new Swiper('.swiper-container2', {
        autoplay:2000,
        speed:700,
        slidesPerView :1,
        slidesPerGroup : 1,
        freeMode : true,
        freeModeMomentum : true,

        pagination : '.swiper-pagination2',
        paginationHide :true,
    });

    //“合作企业”
    var mySwiper3 = new Swiper('.swiper-container3', {
        loop:true,
        autoplay:1,
        speed:5000,
        slidesPerView :"auto",
        slidesPerGroup : 1,
        loopedSlides :1,
        freeMode : true,
        freeModeMomentum : true,
    });

    //侧滑导航
    var slideout = new Slideout({
        'panel': document.getElementById('panel'),
        'menu': document.getElementById('menu'),
        'padding': 190,
        'tolerance': 70,
        'side':"right"
    });

    $("body").on("click",".top-menu",function(){
        slideout.toggle();
    });

    slideout.on('beforeclose', function() {
        app.menuKey=false;
    });

    slideout.on('beforeopen', function() {
        app.menuKey=true;
    });

    slideout.on('close', function() {
        app.menuKey=false;
    });

    slideout.on('open', function() {
        app.menuKey=true;
    });
})