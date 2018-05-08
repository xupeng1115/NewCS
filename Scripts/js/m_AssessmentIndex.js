var app=new Vue({
    el:"#app",
    data:{
        List:SubjectList,
        Len:SubjectList.length,
        currentItem:1,
    },
    methods:{
        selectPre:function(){
            if(app.currentItem!==1){
                app.currentItem--;
            }
            
        },
        selectNext:function(){
            if(app.currentItem!==app.Len){
                app.currentItem++;
            }
        },
        //点选题目
        selectItem: function (Item,num,type) {
            var oBox = $('.input-box[num="' + num + '"]');
            if (type === 0) {
                if (!(oBox.eq(0).hasClass("input-box-active"))) {
                    oBox.eq(1).removeClass("input-box-active");
                    oBox.eq(1).find(".input-radio-flo").removeClass("input-radio-active");
                    oBox.eq(0).addClass("input-box-active");
                    oBox.eq(0).find(".input-radio-flo").addClass("input-radio-active");

                    oBox.eq(0).find("input").prop("checked", true);
                    app.setValue(Item);
                }
            } else {
                if (!(oBox.eq(1).hasClass("input-box-active"))) {
                    oBox.eq(0).removeClass("input-box-active");
                    oBox.eq(0).find(".input-radio-flo").removeClass("input-radio-active");
                    oBox.eq(1).addClass("input-box-active");
                    oBox.eq(1).find(".input-radio-flo").addClass("input-radio-active");

                    oBox.eq(1).find("input").prop("checked", true);
                    app.setValue(Item);
                }
            }
        },
        setValue: function (Item) {
            var val = $('input[name="' + Item.ID + '"]:checked').val();
            var isOnce = true;
            $.each(app.submitList, function (index, item) {
                if (item.ID === Item.ID) {
                    isOnce = false;
                    //app.submitList[index].Choice = Number(val);
                    app.submitList[index].ChoiceNew = val;
                    return false;
                }
            })
            if (isOnce) {
                app.submitList.push({ ID: Item.ID, TypeID: Item.typeid, ChoiceNew: val, SubjectName: Item.SubjectName, SubjectContent: Item.SubjectContent });
            }
            radialObj.value(app.submitList.length);

            if (app.pageList.indexOf(app.currentPage) < 0) {
                app.pageList.push(app.currentPage);
            }
        },
        submitBtn:function(){
            
        }
    }
})



