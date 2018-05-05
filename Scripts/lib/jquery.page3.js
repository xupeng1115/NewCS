(function ($) {
    var ms = {
        init: function (obj, args) {
            return (function () {
                ms.fillHtml(obj, args);
                ms.bindEvent(obj, args);
            })();
        },
        //填充html
        fillHtml: function (obj, args) {
            return (function () {
                obj.empty();
                //上一页
                if (args.current > 1) {
                    obj.append('<a href="javascript:;" class="prevPage">上一页</a>');
                } else {
                    obj.remove('.prevPage');
                    obj.append('<span class="disabled">上一页</span>');
                }
                //中间页码
                //起始页码
                if (args.current != 1) {
                    obj.append('<a href="javascript:;" class="tcdNumber">' + 1 + '</a>');
                }
                //是否有前部缺省
                if (args.current - 4 > 2 && args.current <= args.pageCount && args.pageCount > 12) {
                    obj.append('<span>...</span>');
                }
                //有缺省时中间部分起始页码
                var start=0,end=0;
                
                if (args.current <= 1) {
                    start = 1;
                    if (args.pageCount > 12) {
                        end = 11;
                    } else {
                        end = args.pageCount-1;
                    }
                } else if(args.current>1&&args.current < args.pageCount){
                    if (args.pageCount <= 12) {
                        start = 2;
                        end = args.pageCount - 1;
                    } else {
                        if ((args.current - 4) <= 2) {
                            start = 2;
                            end = 11;
                        } else {
                            if ((args.pageCount - args.current) < 6) {
                                if (args.pageCount > 999) {
                                    start = args.pageCount - 9;
                                } else {
                                    start = args.pageCount - 11;
                                }
                                end = args.pageCount - 1;
                            } else {
                                start = args.current - 4;
                                end = args.current + 4;
                            }
                        }
                    }

                } else {
                    end = args.pageCount;
                    if (args.pageCount > 12) {
                        if (args.pageCount > 999) {
                            start = args.pageCount - 9;
                        } else {
                            start = args.pageCount - 11;
                        }
                    } else {
                        start = 2;
                    }
                }

                for (; start <= end; start++) {
                    if (start != args.current) {
                        obj.append('<a href="javascript:;" class="tcdNumber">' + start + '</a>');
                    } else {
                        obj.append('<span class="current">' + start + '</span>');
                    }
                }
                if ((args.pageCount-args.current)>5&& args.pageCount > 12) {
                    obj.append('<span>...</span>');
                }
                if (args.current != args.pageCount) {
                    obj.append('<a href="javascript:;" class="tcdNumber">' + args.pageCount + '</a>');
                }
                //下一页
                if (args.current < args.pageCount) {
                    obj.append('<a href="javascript:;" class="nextPage">下一页</a>');
                } else {
                    obj.remove('.nextPage');
                    obj.append('<span class="disabled">下一页</span>');
                }
            })();
        },
        //绑定事件
        bindEvent: function (obj, args) {
            return (function () {
                obj.on("click", "a.tcdNumber", function () {
                    var current = parseInt($(this).text());
                    ms.fillHtml(obj, { "current": current, "pageCount": args.pageCount });
                    if (typeof (args.backFn) == "function") {
                        args.backFn(current);
                    }
                });
                //上一页
                obj.on("click", "a.prevPage", function () {
                    var current = parseInt(obj.children("span.current").text());
                    ms.fillHtml(obj, { "current": current - 1, "pageCount": args.pageCount });
                    if (typeof (args.backFn) == "function") {
                        args.backFn(current - 1);
                    }
                });
                //下一页
                obj.on("click", "a.nextPage", function () {
                    var current = parseInt(obj.children("span.current").text());
                    ms.fillHtml(obj, { "current": current + 1, "pageCount": args.pageCount });
                    if (typeof (args.backFn) == "function") {
                        args.backFn(current + 1);
                    }
                });
            })();
        }
    }
    $.fn.createPage = function (options) {
        var args = $.extend({
            pageCount: 15,
            current: 1,
            backFn: function () { }
        }, options);
        ms.init(this, args);
    }
})(jQuery);