;(function($){
	var expdata = {
		'拜拜':'./img/express/88_org.gif',
		'鄙视':'./img/express/bs2_thumb.gif',
		'闭嘴':'./img/express/bz_thumb.gif',
		'刺激':'./img/express/cj_thumb.gif',
		'疯了':'./img/express/crazya_org.gif',
		'真棒':'./img/express/good_org.gif',
		'讨厌':'./img/express/hatea_org.gif',
		'抠鼻':'./img/express/kbsa_org.gif',
		'哭了':'./img/express/kl_thumb.gif',
		'大笑':'./img/express/laugh.gif',
		'爱情':'./img/express/lovea_org.gif',
		'悲剧':'./img/express/sada_thumb.gif',
		'害羞':'./img/express/shamea_thumb.gif',
		'微笑':'./img/express/smilea_thumb.gif',
		'露牙':'./img/express/tootha_org.gif',
		'笑哭':'./img/express/xiaoku_org.gif',
		'调皮':'./img/express/zy_thumb.gif',
		'小狗':'./img/express/doge_org.gif'
	};

	var $exp_list = $('.exp_list'),
		html = "";

	for(var key in expdata){
		html += '<li title="'+key+'"><img src="'+expdata[key]+'" alt=""></li>';
	}

    $exp_list.find('ul').html(html);
   
    $exp_list.delegate("li", "click", function(e){
    	var title = '['+$(this).attr("title")+']';
    	$("#say").val($("#say").val()+title);

    	e.stopPropagation();
    });
    $("body").not('.express, .exp_list').on("click", function(e){
    	$exp_list.fadeOut();
    });

    $('.exp_list .close').click(function(){
    	$exp_list.fadeOut();
    })

    window.expdata = expdata;
})(jQuery);
