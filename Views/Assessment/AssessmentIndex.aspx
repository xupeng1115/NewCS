@{
    ViewBag.Title = "智慧生涯--职业测评";
}
@section header {
    <link rel="stylesheet" href="~/Content/css/AssessmentIndex.css?v=20180205" />
}
<!-- Banner-->
<div class="row top-banner">
    <div class="banner-content">
        <div class="assessment-name">职业兴趣测评</div>
        <div class="assessment-msg">本测评旨在了解您在工作中的职业兴趣不水电费，描述文字文字文字文字描述文字文字文字文字。请根据题目描述与自己实际情况的符合程度作答。</div>
        <div class="assessment-begin-btn">立即开始</div>
        <div class="banner-icon"></div>
        <div class="assessment-num-box">已有 <span class="assessment-num" v-html="baseNum"></span> 名留学生做过此测评</div>
    </div>
</div>

<!-- Content -->
<section class="row">
    <!-- 测评简介 -->
    <div class="row content-top">
        <div class="top-container">
            <div class="tip-item">
                <span class="tip-text">极高的测评准确率</span>
            </div>
            <div class="tip-item">
                <span class="tip-text">基于近况而非未来的判断</span>
            </div>
            <div class="tip-item">
                <span class="tip-text">给予专业建议与资料</span>
            </div>
        </div>
    </div>
    <!-- 测评题目进度导航 -->
    <div class="row content-nav" style="display:none;" v-show="examShow">
        <div class="assessment-nav-container">
            <span class="assessment-nav-title">职业兴趣测评</span>
            <div id="indicatorContainer"></div>
            <span class="assessment-back-btn"><a href="/Home/Index">返回首页</a></span>
        </div>
    </div>
    <!-- 测评内容 -->
    <div class="content-box clearbox">
        <div class="content-wrapper" v-bind:class="{'content-wrapper-width':!examShow}">
            <!-- 测评题目 -->
            <div class="content-container" style="display:none;" v-show="examShow">
                <div class="content-header">
                    <span>您喜欢从事下列活动吗？（请选择是或否）</span>
                    <span class="question-num">共60题</span>
                    <span class="notice-btn" v-on:click="openTip">注意事项</span>
                </div>
                <ul class="asssessment-list-total">
                    <li class="assessment-list-page" v-for="(page,index) in assessmentList" v-bind:key="index" v-bind:index="index" style="display:none;" v-show="currentPage===index">
                        <ul class="assessment-list">
                            <li class="assessment-item" v-for="(item,num) in page" v-bind:key="num" v-bind:index="item.ID">
                                <span class="assessment-index" v-html="(item.Num+1)+'.'"><!--1.--></span>
                                <span class="assessment-text" v-html="item.SubjectName"><!--装配、修理电器或玩具。--></span>
                                <div class="input-box" v-on:click="getCheck(item.ID,item.TypeID,$event)">
                                    <input type="radio" name="radio1" class="assessment-no assessment-radio" v-bind:typeid="item.TypeID" v-bind:name="item.ID"  v-bind:value="item.SubjectOptionList[0].TypeCode" />                   
                                </div>
                                <div class="input-box" v-on:click="getCheck(item.ID,item.TypeID,$event)">
                                    <input type="radio" name="radio1" class="assessment-yes assessment-radio" v-bind:typeid="item.TypeID" v-bind:name="item.ID" v-bind:value="item.SubjectOptionList[1].TypeCode" />
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div class="page-container">
                    @* <div class="tcdPageCode"></div>*@
                </div>
                <div class="assessment-btn assessment-submit-btn" v-on:click="submitBtn">提交</div>
                <div class="assessment-btn assessment-reset-btn" v-on:click="resetBtn">重置</div>
            </div>

            <!-- 引导登录 -->
            <div class="prompt-login" style="display:none;" v-show="guideShow">
                <div class="prompt-title">恭喜您完成职业兴趣测评！</div>
                <div class="prompt-bg"></div>
                <div class="prompt-msg">您尚未登录，登录后系统将根据您的测评结果，为您推荐合适职位。</div>
                <div class="prompt-login-btn">立即登录</div>
                <div class="prompt-back-btn" v-on:click="backAssessment">返回测评</div>
            </div>

            <!-- 测评结果报告 -->
            <div class="assessment-report" style="display:none;" v-show="resultShow">
                <div class="report-title">职业兴趣测评结果</div>
                <div class="report-msg">有关资料表明，如果一个人对某个工作有兴趣，就能够发挥他全部才能的80%-90%，并且能较长时间保持高效率而不感到疲劳；而对工作缺乏兴趣的人，只能发挥其全部才能的20%-30%，也容易疲劳、厌倦。查看以下结果，看看你的职业兴趣是什么。</div>
                <div class="report-box clearbox">
                    <ul class="report-left">
                        <li class="report-item">
                            <div class="item-title">测评得分：</div>
                            <div class="item-content" v-html="Score"><!--100分--></div>
                        </li>
                        <li class="report-item">
                            <div class="item-title">职业兴趣类型：</div>
                            <div class="item-content" v-html="TypeName"><!--现实型--></div>
                        </li>
                        <li class="report-item">
                            <div class="item-title">霍兰德职业代码：</div>
                            <div class="item-content" v-html="Code"><!--ERI--></div>
                        </li>
                    </ul>
                    <div class="report-right">
                        <div id="container" style="min-width: 400px; max-width: 600px; height: 400px; margin: 0 auto"></div>
                    </div>
                </div>
                <div class="report-theme">
                    <div class="theme-title" v-html="TypeName"><!--现实型--></div>
                    <div class="theme-content" v-html="TypeDescribe">
                        <!--现实型的人是栽培者，乐于促进事物的增长和繁荣。现实型的人对成功所带来的名望或金钱奖励兴趣不大，他们只是单纯的喜欢把事完成。
                        <br>
                        他们对创新和尝试理解复杂信息缺乏兴趣。而且，他们享受于容易被感觉、品尝、听到或闻到的事物。现实型的人在职场上追求稳定和安全感。他们可靠、固执、自觉且不食言。-->
                    </div>
                </div>
                <div class="report-theme">
                    <div class="theme-title" v-html="Code"><!--ERI--></div>
                    <div class="theme-msg">根据您的兴趣匹配，您适合的典型职业有：</div>
                    <div class="theme-content" v-html="CodeDescribe"><!--建筑物管理员、工业工程师、农场管理员、护士长、农业经营管理人员、化学设备销售工程师、机械设备销售工程师、设备保养工程师、油库经理、税务代理、钻井或生产班组长、土木工程队工头、伐木工头、电厂主管、测绘主管、维护保养主管、彩陶主管、现场工程师、燃料系统维护主管、业务评估经理、洗衣店经理、路况检测官、调度员、日程业务员、菜蔬生产主管、机器运作监察员、碳电极监察员、胶合板工等。--></div>
                </div>
                <div class="report-back-btn"><a href="/Home/Index">返回首页</a></div>
            </div>

            <div class="flo-piece line five"></div>
            <div class="flo-piece square six"></div>
            <div class="flo-piece square seven"></div>
            <div class="flo-piece circle eight"></div>
            <div class="flo-piece line nine"></div>
        </div>

        <!-- 测评注意事项 -->
        <div class="content-tip" style="display:none;" v-show="tipShow">
            <div class="tip-header">
                <span>注意事项</span>
                <span class="tip-cancel" v-on:click="closeTip"></span>
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
</section>
@section scripts {
    <script type="text/javascript">
        var SubjectList = JSON.parse('@Html.Raw(ViewBag.SubjectList)');
        var UserExam = '@Html.Raw(ViewBag.UserExam)';
        var ResultPictrue = '@Html.Raw(ViewBag.Result)';
        var AssessmentCount = '@Html.Raw(ViewBag.AssessmentCount)';
        //完成测评基数
        var baseNum = '@ViewBag.baseNum';
    </script>
    <script src="~/Scripts/lib/radialIndicator.js"></script>
    <script src="~/Scripts/lib/jquery.page_assessment.js"></script>
    <script src="~/Scripts/lib/highcharts.js"></script>
    <script src="~/Scripts/lib/highcharts-more.js"></script>
    <script src="~/Scripts/lib/exporting.js"></script>
    <script src="~/Scripts/lib/highcharts-zh_CN.js"></script>
    <script src="~/Scripts/js/AssessmentIndex.js?v=20171226" type="text/babel">
    </script>

}
