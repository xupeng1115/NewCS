@{
    ViewBag.Title = "Index";
}
@section header {
    <link rel="stylesheet" href="~/Content/iconfont/material-icons.css"/>
	<link rel="stylesheet" href="~/Content/css/AssessmentIndex.css?v=20171226"/>
}
<!-- Banner-->
<div class="row top-banner">
	<div class="banner-content">
		<div class="assessment-name">职业兴趣测评</div>
		<div class="assessment-msg">本测评旨在了解您在工作中的职业兴趣不水电费，描述文字文字文字文字描述文字文字文字文字。请根据题目描述与自己实际情况的符合程度作答。</div>
		<div class="assessment-begin-btn">立即开始</div>
		<div class="banner-icon"></div>
		<div class="assessment-num-box">已有 <span class="assessment-num">33853</span> 名留学生做过此测评</div>
	</div>
</div>
<!-- Content -->
<section class="row">
    <!-- 测评简介 -->
	<div class="row content-top">
		<div class="top-container">
			<div class="tip-item">
				<span class="tip-text">极高的测评准确率</span></div>
			<div class="tip-item">
				<span class="tip-text">基于近况而非未来的判断</span>
			</div>
			<div class="tip-item">
				<span class="tip-text">给予专业建议与资料</span>
			</div>
		</div>
	</div>
    <!-- 测评内容 -->
	<div class="content-box clearbox">
		<div class="content-wrapper">
        <!-- 测评题目 -->
			<div class="content-container">
				<div class="content-header">
					<span>您喜欢从事下列活动吗？（请选择是或否）</span>
					<span class="question-num">共60题</span>
					<span class="notice-btn">注意事项</span>
				</div>
				<ul class="assessment-list1 assessment-list">
					
				</ul>
				<ul class="assessment-list2 assessment-list">
					
				</ul>
				<ul class="assessment-list3 assessment-list">
					
				</ul>
				<ul class="assessment-list4 assessment-list">
					
				</ul>	
				<div class="tcdPageCode"></div>
				<div class="assessment-btn assessment-submit-btn">提交</div>
				<div class="assessment-btn assessment-reset-btn">重置</div>
			</div>
			
            <!-- 引导登录 -->
			<div class="prompt-login">
				<div class="prompt-title">恭喜您完成职业兴趣测评！</div>
				<div class="prompt-bg"></div>
				<div class="prompt-msg">您尚未登录，登录后系统将根据您的测评结果，为您推荐合适职位。</div>
				<div class="prompt-login-btn">立即登录</div>
			</div>
			
            <!-- 测评结果报告 -->
			<div class="assessment-report">
				<div class="report-title">职业兴趣测评结果</div>
				<div class="report-msg">有关资料表明，如果一个人对某个工作有兴趣，就能够发挥他全部才能的80%-90%，并且能较长时间保持高效率而不感到疲劳；而对工作缺乏兴趣的人，只能发挥其全部才能的20%-30%，也容易疲劳、厌倦。查看以下结果，看看你的职业兴趣是什么。</div>
				<div class="report-box clearbox">
					<ul class="report-left">
						<li class="report-item">
							<div class="item-title">测评得分：</div>
							<div id="Score" class="item-content"></div>
						</li>
						<li class="report-item">
							<div class="item-title">职业兴趣类型：</div>
							<div id="TypeName" class="item-content"></div>
						</li>
						<li class="report-item">
							<div class="item-title">霍兰德职业代码：</div>
							<div id="Code" class="item-content"></div>
						</li>
					</ul>
					<div class="report-right">
						<div id="container" style="min-width: 400px; max-width: 600px; height: 400px; margin: 0 auto"></div>
					</div>
				</div>
				<div class="report-theme">
					<div id="TypeNames" class="theme-title"></div>
					<div id="TypeDescribe" class="theme-content">
					</div>
				</div>
				<div class="report-theme">
					<div id="Codes" class="theme-title"></div>
					<div class="theme-msg">根据您的兴趣匹配，您适合的典型职业有：</div>
					<div id="CodeDescribe" class="theme-content"></div>
				</div>
				<div class="report-back-btn">返回首页</div>
			</div>
					
			<div class="flo-piece line five"></div>
			<div class="flo-piece square six"></div>
			<div class="flo-piece square seven"></div>
			<div class="flo-piece circle eight"></div>
			<div class="flo-piece line nine"></div>
		</div>

        <!-- 测评注意事项 -->
		<div class="content-tip">
			<div class="tip-header">
				<span>注意事项</span>
				<span class="tip-cancel"></span>
			</div>
			<ul class="tip-list">
				<li class="tip-text">1.请根据您的实际情况作答，并以最快速度完成每道试题。</li>
				<li class="tip-text">2.选项没有对与错之分。</li>
				<li class="tip-text">3.请选择更接近你平时感受或行为的那项。</li>
				<li class="tip-text">4.请选择你是怎么样的，而不要选择你想要怎样、以为会怎样、或者认为哪样更好。</li>
			</ul>
		</div>
				
		<div class="flo-piece line one"></div>
		<div class="flo-piece square two"></div>
		<div class="flo-piece line three"></div>
		<div class="flo-piece circle four"></div>
				
	</div>
	
     <!-- 测评题目进度导航 -->
	<div class="row content-nav">
		<div class="assessment-nav-container">
			<span class="assessment-nav-title">职业兴趣测评</span>
			<div id="indicatorContainer"></div>
			<span class="assessment-back-btn">返回首页</span>
		</div>
	</div>
</section>
@section scripts {
    <script src="~/Scripts/lib/radialIndicator.js"></script>
	<script src="~/Scripts/lib/jquery.page.js"></script>
	<script src="~/Scripts/lib/highcharts.js"></script>
	<script src="~/Scripts/lib/highcharts-more.js"></script>
	<script src="~/Scripts/lib/exporting.js"></script>
	<script src="~/Scripts/lib/highcharts-zh_CN.js"></script>
	<script src="~/Scripts/js/AssessmentIndex.js?v=20171226"></script>
    <script type="text/javascript">
        var SubjectList = '@Html.Raw(ViewBag.SubjectList)';
		var UserExam = '@Html.Raw(ViewBag.UserExam)';
		var ResultPictrue = '@Html.Raw(ViewBag.Result)';
	
		function GetSubJectList(){
			for(var j=0;j<4;j++){
				var html = '';
				var  data = JSON.parse(SubjectList);
				for(var i=j*15;i<(j+1)*15;i++){
						html+="<li class=\"assessment-item\" data-id="+data[i].ID+" data-typeid="+data[i].TypeID+">\
							<span class=\"assessment-index\">"+(i+1)+".</span>\
							<span class=\"assessment-text\">"+data[i].SubjectName+"</span>\
							<input type=\"checkbox\" name=\"checkbox\" class=\"assessment-no assessment-checkbox\" />\
							<input type=\"checkbox\" name=\"checkbox\" class=\"assessment-yes assessment-checkbox\" />\
						</li>";
				}
				$('.assessment-list'+(j+1)).html(html);
			}
			$('.assessment-list').hide();
			$('.assessment-list1').show();
		}
    </script>
}
