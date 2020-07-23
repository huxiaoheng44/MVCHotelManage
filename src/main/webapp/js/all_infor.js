(function($){
	$.getData=function(name){
		var reg=new RegExp("(^|&)"+name+"=([^&]+)(&|$)?");
		var result = window.location.search.substr(1).match(reg);
		if (result!= null) return result[2]; return null;		
	}
})(jQuery);


var employeeid=$.getData('employeeid');
var power=$.getData('power');


$(document).ready(function(){
	var w=$("#userpic").width();
  	$("#userpic").height(w);
	$("#inputNone").attr("value",employeeid);
	$("#showInfo").click(function(){
		changeTab();
	});
	$("#showAlter").click(function(){
		changeTab();
	});
	getInfo();
	// getSalary();
	$("#alterInfoBtn").click(function(){
		alterInfo();
	});
	$("#alterPwdBtn").click(function(){
		alterPwd();
	})

})

//判断对象/JSON是否为空 空返回1 非空返回0
function isEmptyObject(e) {
	var t;
	for (t in e)
		return 0;
	return 1;
}

//判断字符串是否为空 空返回1 非空返回0
function isEmptyString(str){
	if(str=='null'||str=='')
		return 1;
	return 0;
}


function changeTab(){
	var info=$("#showInfodiv").css("display");
	var alter=$("#showAlterdiv").css("display");
	if(info=="block"){
		$("#showInfodiv").css("display","none");
		$("#showAlterdiv").fadeIn();	
	}
	else{
		$("#showAlterdiv").css("display","none")
		$("#showInfodiv").fadeIn();
	}
}

var info;

function getInfo(){
	$.ajax({
		type:"POST",
		url:"../employee/getSelfInfo.do",
		dataType:"JSON",
		data:{
			"employeeid":employeeid
		},
		success:function(data){
			if(data.code==0){
				info=data.employee;
				var span=$("span");
				var job = " ";
				if(info.photourl !== null){
					$("#userpic").attr("src", '../' + info.photourl)
				}
				if(info.power == "0"){
					job = "管理员"
				}else if(info.power == "1"){
					job = " 经理"
				}else if(info.power == "2"){
					job = "员工"
				}else{
					job = "清洁工"
				}
				span.filter("#account").text(info.useraccount);
				span.filter("#idnum").text(info.idcard);
				span.filter("#name").text(info.realname);
				span.filter("#income").text(info.salary.income);
				span.filter("#job").text(job);
				$("#showC").css("display","block");
				span.filter("#bonus").text(info.salary.bonus);
				$("#inputName").val(info.realname);
				span.filter("#age").text(info.age);
				$("#inputAge").val(info.age)
				span.filter("#phone").text(info.phone);
				$("#inputPhone").val(info.phone)
			}
			else{
				alert("获取信息失败");
			}
		},
		error:function(){
			alert("获取信息出现错误");
		}
	})
}

function alterInfo(){
	var name=$("#inputName").val();
	var age=$("#inputAge").val();
	var phone=$("#inputPhone").val();
	var employee={
		realname:name,
		age:age,
		phone:phone,
		employeeid:employeeid
	}
	if(isEmptyString(name) || isEmptyString(age) || isEmptyString(phone)){
		alert("请填写全信息");
	}
	else{
		$.ajax({
			type:"POST",
			url:"../employee/updateSelfInfo.do",
			dataType:"JSON",
			contentType: "application/json;charset=utf-8",
			data:JSON.stringify(employee),
			// data:{
			// 	"employeeid":employeeid,
			// 	"password":info.password,
			// 	"realname":name,
			// 	"age":age,
			// 	"power":power,
			// 	"idcard":info.idcard,
			// 	"phone":phone
			//
			// },
			success:function(data){
				if(data.code==0){
					alert("修改成功");
					window.location.reload();
				}
				else
					alert("修改失败")
			},
			error:function(){
				alert("修改信息出现错误");
			}
		})
	}
}

function alterPwd(){
	var oldPwd=$("#inputoldPwd").val();
	var newPwd=$("#inputnewPwd").val();
	var renewPwd=$("#inputrenewPwd").val();
	var employee={
		employeeid:employeeid,
		password:renewPwd
	}
	if(isEmptyString(oldPwd) || isEmptyString(newPwd) || isEmptyString(renewPwd)){
		alert("请填写全信息");
	}
	else if(oldPwd!=info.password)
		alert("原密码不正确");
	else if(newPwd!=renewPwd)
		alert("新密码两次不一致")
	else{
		$.ajax({
			type:"POST",
			url:"../employee/updateSelfInfo.do",
			dataType:"JSON",
			contentType: "application/json;charset=utf-8",
			data:JSON.stringify(employee),
			success:function(data){
				if(data.code==0){
					alert("修改成功");
					window.location.reload();
				}
				else
					alert("修改失败")
			},
			error:function(){
				alert("修改密码出现错误");
			}
		})
	}
}
//
// function getSalary(){
// 	if(power!="0"){
// 		$("#showS").css("display","block");
// 		$("#showC").css("display","block");
// 		$.ajax({
// 			type:"POST",
// 			url:"../config/getConfig.do",
// 			dataType:"JSON",
// 			data:{},
// 			success:function(data){
// 				if(data.code=="0"){
// 					var config=data.config;
// 					if(power=="1"){
// 						$("#salary").text(config.manage);
// 						$("#commission").text(config.managesalary+"%");
// 					}
// 					else if(power=="2"){
// 						$("#salary").text(config.staff);
// 						$("#commission").text(config.staffsalary+"%");
// 					}
// 					else{
// 						$("#salary").text(config.cleaner);
// 						$("#commission").text(config.cleanerssalary+"%");
// 					}
//
// 				}
// 				else{
// 					alert("获取配置错误");
// 				}
//
// 			},
// 			error:function(){
// 				alert("获取配置发生错误")
// 			}
//
// 		});
// 	}
// }