$(document).ready(function(){
	// getCode();
	var h=$(window).height();
	$("#main").css("height",h);
	$("#loginBtn").click(function(){
		login();
	})
	// $("#code").click(function(){
	// 	getCode();
	// })
})


//获取验证码
// function getCode(){
// 	$("#code").attr("src","./user/createImage?code="+Math.random());
// }

//登录
function login(){
	var user=$("#inputName").val();
	var pwd=$("#inputPassword").val();
	$.ajax({
		type:"POST",
		url:"./employee/login.do",
		dataType:"JSON",
		data:{
			"useraccount":user,
			"password":pwd
		},
		success:function(data){
			console.log(data)
			if(data.code=="0"){

				var urlString="pages/myCenter.html?power="+data.employee.power+"&employeeid="+data.employee.employeeid+"&realname="+data.employee.realname;
				url=encodeURI(urlString);
				window.location.href=urlString;
			}
			else if(data.code=="-1"){
				alert("密码错误")
			}
		},
		error:function(){
			alert("登录 发生错误");
		}
	});
}