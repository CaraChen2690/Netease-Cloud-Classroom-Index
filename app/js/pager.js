import $ from 'jquery';
import {getProductDate} from './productList.js';

// 换页器
export function pager(){
	let prize = null,
		linum =null,
		type = null,
		total = 50;

	if($(window).width() < 1205){
		prize = 15;
		linum = Math.ceil(total / prize);
	}else{
		prize = 20;
		linum = Math.ceil(total / prize);
	};
	
	// 创造换页器
	function createPager(){
		$('#pager').html(`<li id="pager-pre" class="pager-btn">&lt;</li><li id="pager-next" class="pager-btn">&gt;</li>`);
		for(let i = 0; i < linum; i++){
			let li = `<li class="li-num pager-num">${ i + 1 }</li>`;
			$('#pager-next').before(li);
		};
		$('#pager .li-num').eq(0).addClass('pager-on').removeClass('pager-num');
	};
	createPager();

	// 判断课程类型
	function judgeType(){
		if($('#tab .tab-on').text() == '产品设计'){
			type = 10;
		}else if($('#tab .tab-on').text() == '编程语言'){
			type = 20;
		};
		return type;
	};
	
	// 页码按钮
	$('#pager .li-num').click(function(){
		let el = $(this);
		let pagerNum = el.text();
		judgeType();
		pagerChange(el);
		getProductDate(pagerNum,prize,type);
	});

	// 上一页按钮
	$('#pager-next').click(function(){
		let numChange = Number($('#pager .pager-on').text());
		if(numChange > linum - 1){
			numChange = linum -1;
		};
		let pagerNum = numChange + 1;
		judgeType();
		getProductDate(pagerNum,prize,type);
		$('#pager .pager-on').removeClass('pager-on').addClass('pager-num');
		$('#pager .li-num').eq(numChange).addClass('pager-on').removeClass('pager-num');
	});

	// 下一页按钮
	$('#pager-pre').click(function(){
		let numChange = Number($('#pager .pager-on').text()) - 2;
		if(numChange < 0){
			numChange = 0;
		};
		let pagerNum = numChange + 1;
		judgeType();
		getProductDate(pagerNum,prize,type);
		$('#pager .pager-on').removeClass('pager-on').addClass('pager-num');
		$('#pager .li-num').eq(numChange).addClass('pager-on').removeClass('pager-num');
	});

	// 页码改变
	function pagerChange(el){
		$('#pager .pager-on').removeClass('pager-on').addClass('pager-num');
		el.addClass('pager-on').removeClass('pager-num');
	};
};

// 初始化换页器
export function initPager(){
		$('#pager .pager-on').removeClass('pager-on').addClass('pager-num');
		$('#pager .li-num').eq(0).addClass('pager-on').removeClass('pager-num');
};