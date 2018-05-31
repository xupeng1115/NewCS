var app = new Vue({
    el: "#app",
    data: {
        menuKey: false
    },
    methods: {
        menuHandle: function (event) {
            if (app.menuKey) {
                app.menuKey = false;
            } else {
                app.menuKey = true;
            }
        }
    }
})

$(function () {
    //“想从事的行业”
    var mySwiper1 = new Swiper('#swiper1', {
        autoplay: {
            delay: 2000,
            disableOnInteraction: true,
        },
        speed: 500,
        slidesPerView: "auto",
        slidesPerGroup: 1,
        freeMode: true,
        freeModeMomentum: true,
        });

    //“理想工作怎么找”
    var mySwiper2 = new Swiper('#swiper2', {
        autoplay: {
            delay: 2000,
            disableOnInteraction: true,
        },
        speed:700,
        slidesPerView: 1,
        slidesPerGroup: 1,
        freeMode: true,
        freeModeMomentum: true,

        pagination: {
            el: '.swiper-pagination2',
            bulletElement: 'li',
            clickable: true,
        }
        
    });

    //“合作企业”
    var mySwiper3 = new Swiper('#swiper3', {
        loop:true,
        autoplay: {
            delay:0,
            disableOnInteraction: true,
        },
        speed:5000,
        slidesPerView: "auto",
        slidesPerGroup: 1,
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
        'side': "right",
        'touch': false
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
    
    $("body").on("touchstart", ".flo-container", function (event) {
        event.preventDefault();
        slideout.close();
    });

});


