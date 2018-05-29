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

})