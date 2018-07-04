import $ from 'jquery';
import {submitHandler} from './login.js';
import {getProductDate, getHotDate} from './productList.js';
import {pager,initPager} from './pager.js';
require('./plugins/jquery.cookie.js');

// 检验消息栏
function topMessage(){
	if($.cookie('message') == 'true'){
		$('#message').css('display','none');
	};
	$('#message').find('span').click(function(){
		$('#message').css('display','none');
		$.cookie('message','true');
	})
};


// 视频窗
$('.aside-div').eq(0).find('img').click(function(){
	$('#back').css('display','block');
	$('#video-dialog').css('display','block');
});
$('#video-dialog .close').click(function(){
	$('#back').css('display','none');
	$('#video-dialog').css('display','none');
});
$(document).keyup(function(e){
	if(e.keyCode == 27){
		$('#back').css('display','none');
		$('#video-dialog').css('display','none');
		$('#login').css('display','none');
	};
});


// 检验是否关注
function attention(){
	if($.cookie('followSuc') == 'true'){
		$('.unattention').hide();
		$('.attention').css('display','inline-block');
	}else{
		$('.attention').hide();
		$('.unattention').css('display','inline-block');
	};
};

// 关注按钮
$('.unattention').click(function(){
	if($.cookie('loginSuc') == 'true'){
		$.get('http://study.163.com/webDev/attention.htm',function(data){
			if(data == 1){
				$.cookie('followSuc','true');
				$('.unattention').hide();
				$('.attention').show();
			};
		});
	}else{
		$('#back').show();
		$('#login').show();
	};
});

// 已关注按钮
$('.attention').click(function(){
	$.cookie('followSuc',null);
	$('.attention').hide();
	$('.unattention').show();
});


// 关闭登录窗口
$('#login .close').click(function(){
	$('#back').hide();
	$('#login').hide();
});

// 表单提交
$('#loginForm').submit(submitHandler);
$('#loginForm').keyup(function(e){
	if(e.keyCode == 13){
		$('.submit').trigger('click');
	};
});

// tab切换
function tab (){
	let prize = null;
	if($(window).width() < 1205){
		prize = 15;
	}else{
		prize = 20;
	};
	getProductDate(1,prize);
	pager();
	$('#tab li').click(function(){
		if($(this).text() == '编程语言'){
			$('#tab li').removeClass('tab-on');
			$(this).addClass('tab-on');
			getProductDate(1,prize,20);
			initPager();
		}else if($(this).text() == '产品设计'){
			$('#tab li').removeClass('tab-on');
			$(this).addClass('tab-on');
			getProductDate(1,prize);
			initPager();
		};
	});
};

// 热门排行
function hot (){
	getHotDate();
	let num = 20;
	let timer = null;
	function hotPlay(){
		num = num -72.48;
		if(num < -777.28){
			num = 20;
		};
		let length = `${num}px`;
		$('#hot ul').css('top',length)
	};
	function autoPlay(){
		timer = setInterval(function(){
            hotPlay();
        }, 2000);
	};
	$('#hot').hover(function(){
		clearInterval(timer);
	},function(){
		autoPlay();
	})
	autoPlay();
};

$(function(){
	tab();
	hot();
	topMessage();
	attention();
})

$(window).resize(function(){
	tab();
});
