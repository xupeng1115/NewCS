//数据绑定
var app=new Vue({
    el:"#app",
    data:{
        positionDetail:JSON.parse(resumeDetail),
        positionTags:JSON.parse(resumeDetail).Tag
    }
});

(function(){

    $(document).ready(function(){
        //初始化地图尺寸
        $("#address-container").css("height",parseInt(($(window).width()-30)/3.45)+"px");
        //当文档窗口发生改变地图尺寸
        $(window).resize(function(){
            if($(window).width()<=800){
                $("#address-container").css("height",parseInt(($(window).width()-30)/3.45)+"px");
            }
        });  
        //绘制地图
        (function(){
            //通过地名获取经纬度
            function searchByStationName() {
                var point={};
            　　localSearch.setSearchCompleteCallback(function (searchResult) {
            　　　　 var poi = searchResult.getPoi(0);
                    point=poi.point;
            　　});
            　　return point;
            }
            //自定义地图标注图标
            function addMarker(point, index){  // 创建图标对象   
                var myIcon = new BMap.Icon("../../Content/img/m_positioning2.png", new BMap.Size(15, 20), {    
                    // 指定定位位置。   
                    // 当标注显示在地图上时，其所指向的地理位置距离图标左上    
                    // 角各偏移10像素和25像素。您可以看到在本例中该位置即是   
                    // 图标中央下端的尖角位置。    
                    anchor: new BMap.Size(10, 25),    
                    // 设置图片偏移。   
                    // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您   
                    // 需要指定大图的偏移位置，此做法与css sprites技术类似。    
                    imageOffset: new BMap.Size(0, 0 - index * 25)   // 设置图片偏移    
                });      
                // 创建标注对象并添加到地图   
                var marker = new BMap.Marker(point, {icon: myIcon});    
                map.addOverlay(marker);    
            }
            
            // 创建地图实例  BMap.point(经度，纬度)；注：使用其他坐标时要先转换为百度坐标
            var map = new BMap.Map("address-container");
            // 初始化地图，设置中心点坐标和地图级别
            point = new BMap.Point(116.404, 39.915);
            map.centerAndZoom(point, 11);

            map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
            map.enableContinuousZoom(true);    //启用地图惯性拖拽，默认禁用
            //添加自定义标记
            addMarker(point,0)
            $(".BMap_Marker").css("z-index","10000");
        }());

    });
}());

//logo没有成功加载出来时处理
function noFindLogo() {
    var oImg = event.srcElement;
    oImg.src = "../../Content/img/position_head.png";
    oImg.onerror = null;
}

//通过城市名获取经纬度
function theLocation(){
    var city = document.getElementById("cityName").value;
    if(city != ""){
        map.centerAndZoom(city,11);      // 用城市名设置地图中心点
    }
}



