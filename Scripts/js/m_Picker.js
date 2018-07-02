(function(obj){
    obj.dateChange=function(){
        
    };
}(window.dateEvent={}));

$(function(){

    //注册日期选择器生成事件
    (function($) {
        $.init();
        $("body").on("click",".btn-date",function(){
            var _self = this;
            if(_self.picker) {
                _self.picker.show(function (rs) {
                    _selt.innerText = rs.text;
                    _self.picker.dispose();
                    _self.picker = null;
                });
            } else {
                var optionsJson = this.getAttribute('data-options') || '{}';
                var options = JSON.parse(optionsJson);
                var id = this.getAttribute('id');
                var index=this.getAttribute('index');

                /*
                * 首次显示时实例化组件
                */
                _self.picker = new $.DtPicker(options);
                _self.picker.show(function(rs) {
                    /*
                    * rs.value 拼合后的 value
                    * rs.text 拼合后的 text
                    * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
                    * rs.m 月，用法同年
                    * rs.d 日，用法同年
                    * rs.h 时，用法同年
                    * rs.i 分（minutes 的第二个字母），用法同年
                    */
                    _self.innerText = rs.y.text+'年'+rs.m.text+'月';
                    //修改列表日期
                    dateObj=rs.y.text+'-'+rs.m.text+'-'+'01';
                    // app.awardList[index].EndDate=rs.y.text+'-'+rs.m.text+'-'+'01';

                    /*
                    * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
                    */
                    _self.picker.dispose();
                    _self.picker = null;
                });
            }
        })
    })(mui,dateObj);

});


