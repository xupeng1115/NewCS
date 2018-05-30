(function(){
	mui.init({
		swipeBack: true,	//启用右滑关闭功能
	});
	//侧滑容器父节点
	var offCanvasWrapper = mui('#offCanvasWrapper');
	//主界面容器
	// var offCanvasInner = offCanvasWrapper[0].query('.mui-inner-wrap');
	// //菜单容器
	// var offCanvasSide = document.getElementById("offCanvasSide");
	
	// document.getElementById('offCanvasShow').addEventListener('tap', function() {
	// 	offCanvasWrapper.offCanvas('show');
	// });
	// document.getElementById('offCanvasHide').addEventListener('tap', function() {
	// 	offCanvasWrapper.offCanvas('close');
	// });

	//主界面和侧滑菜单界面均支持区域滚动；
	mui('#offCanvasSideScroll').scroll();
	mui('#offCanvasContentScroll').scroll();

}());
