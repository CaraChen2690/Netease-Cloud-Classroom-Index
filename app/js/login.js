import $ from 'jquery';
import {MD5} from './plugins/md5.js';
// require('./plugins/md5.js');

// 为弹出层表单添加事件监听
function submitHandler (event){
	event.preventDefault();
	let userName = MD5($('#userName').val());
	let password = MD5($('#password').val());
	if (userName !== "" && password !== ""){//验证表单有效性
		//发送验证请求
		login(userName,password);
	};
};

//发送验证请求
function login(userName, password){
	$.get("http://study.163.com/webDev/login.htm", {userName:userName,password:password}, function (data) {
		if(data == 1){
		//登录成功
			$('#back').css('display','none');
			$('#login').css('display','none');
			$.cookie("loginSuc", "true");
			$.get('http://study.163.com/webDev/attention.htm',(data) =>{
				if(data == 1){
					$.cookie('followSuc','true');
					$('.unattention').css('display','none');
					$('.attention').css('display','inline-block');
				};
			});
		}else{
			$('.errmsg').css('display','block');
			$('.errmsg').text('账号或密码错误');
		};
	});
};
export {submitHandler}