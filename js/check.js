$(function(){
    // 焦点
    $("#say").focus(function(){
        $(this).parent().addClass( 'focus' );
    }).blur(function(){
        $(this).parent().removeClass( 'focus' );
    });

    //ctrl+center发布
    $("#say").keydown(function(e){
        var code = e.charCode || e.which || e.keyCode;
        if(e.ctrlKey && code == 13) { 
            Manager.submit();
            return false;
        } 

        var text = $(this).val(),
            len = text.length,
            limit = 140,
            s = limit-len,
            $limit = $("#limit");

        if(s<=10 && s>5){
            $limit.removeClass( 'rank0' ).addClass( 'rank1' );
        }else if(s>0 && s<=5){
            $limit.removeClass( 'rank1' ).addClass( 'rank0' );
        }else if(s<=0){
            code!==8 && $(this).val(text.substr(0, limit));
        }else{
            $limit.removeClass( 'rank0 rank1' );
        }
        s = s<=0 ? 0 : s;
        $("#limit").html(s);
    });

    //摁按钮发布
    $("#submit").click(function(){
        Manager.submit();
    });

    // 绑定删除事件
    $(".content").delegate(".delBtn", "click", function(){
        $(this).parents('li').slideUp('slow', function() {
            $(this).remove();
        });
    });

    $(".express").click(function(e){
        $(".exp_list").fadeIn();
        e.stopPropagation();
    })
})

var Manager = {
    submit : function(){
        var word = $.trim($("#say").val()),
            datetime = '';
        if(word=="" || word.length==0 || word.length>140){
            this.warning();
            return;
        }
        $("#submit").attr({"disabled":"disabled"});//暂时禁用按钮
        
        datetime = this.getNowtime();

        word = this.replaceStr(word);

        var $ul = $("#talklist"),
            $one = $('<li class="item"><p>'+word+'</p><div class="info"><span class="datetime fl">'+datetime+'</span><div class="fr"><a class="delBtn" href="javascript:;"">删除</a></div></div></li>');
        
        $ul.find('.first').after($one);
        $one.hide().slideDown( 'slow' );

        this.reset();
    },

    // 获取当前时间
    getNowtime : function(){
        var date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth()+1,
            day = date.getDay(),
            hour = date.getHours(),
            minute = date.getMinutes(),
            second = date.getSeconds();

        return year+'/'+this.fillzero(month)+'/'+this.fillzero(day)+' '+this.fillzero(hour)+':'+this.fillzero(minute)+':'+this.fillzero(second);
    },

    fillzero : function(num){
        return num<10 ? '0'+num : num;
    },

    // 重置输入框
    reset:function(){
        $("#say").val("");        //清除输入框的内容
        $("#say").focus();        //输入框获取焦点
        $("#submit").removeAttr('disabled');//按钮可以使用
        $("#limit").html(140).removeClass( 'rank0 rank1' );
    },

    // 表情替换
    replaceStr : function(str){
        str = $.trim(str);
        var start = 0,
            html = "",
            t = str.length,
            i, j;
        for(i=0; i<t-3; i++){
            if(str[i]=='[' && str[i+3]==']'){
                j = str.substring(i+1, i+3);
                html += str.substring(start, i);
                if(typeof window.expdata[j] !== 'undefined'){
                    html += '<img src="'+window.expdata[j]+'" alt="exp" />';
                }else{
                    html += str.substring(i, i+4);
                }
                i = i+3;
                start = i+1;
            }
        }
        html += str.substring(start, t);
        return html;
    },

    timer : null,
    
    // 警示
    warning : function(){
        $("#say").addClass( "warning" );

        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(function(){
            $("#say").removeClass( "warning" );
        }, 800);
    }
}
