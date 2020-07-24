(function($){
	$.getData=function(name){
		var reg=new RegExp("(^|&)"+name+"=([^&]+)(&|$)?");
		var result = window.location.search.substr(1).match(reg);
		if (result!= null) return result[2]; return null;
	}
})(jQuery);

var pageNum=1;
var pageSize=8;
var l;

$(document).ready(function(){
	getStaffList();
	$("#pre").on('click',function(){
		getPre();
	});
	$("#next").on('click',function(){
		getNext();
	});
	$("#addEmployeeBtn").on('click',function(){
		addEmployee();
	});

})

//判断对象/JSON是否为空 空返回1 非空返回0
function isEmptyObject(e) {
	var t;
	for (t in e)
		return 0;
	return 1;
}


var selfpower = $.getData("power")
var list;
function getStaffList(){
	$.ajax({
		type:"post",
		url:"../employee/getEmployees.do",
		dataType:"JSON",
		data:{
			"pageNum":pageNum,
			"pageSize":pageSize
		},
		success:function(data){
			if(data.code=="0"){
				if(isEmptyObject(data.List)&&pageNum>0){
					pageNum=pageNum-1;
					getStaffList();
				}
				else{
					var power=" ";
					var htmlStr=" ";
					var btnStr=" ";
					list=data.List;
					l=0;
					console.log(selfpower)
					$("#pre").css("display","block");
					$("#next").css("display","block");
					$("#staffList").empty();
					$("#staffList").append("<tr><th>员工号</th><th>账号</th><th>姓名</th><th>年龄</th><th>职位</th><th>联系方式</th><th>操作</th></tr>")
					for(i in list){
						if(selfpower == "0") {
							if (list[i].power == 0) {
								power = "管理员";
								btnStr = " ";
							} else if (list[i].power == "1" ) {
								power = "经理";
								btnStr = "<input type=\"button\" id=\"setStaff\" data-employeeid=\"" + list[i].employeeid + "\" class=\"btn btn-success\" value=\"设置为员工\"/> <input type=\"button\" id=\"delEmployee\" data-employeeid=\"" + list[i].employeeid + "\" class=\"btn btn-danger\" value=\"删除\"/>"
							} else if (list[i].power == "2") {
								power = "员工";
								btnStr = "<input type=\"button\" id=\"setManage\" data-employeeid=\"" + list[i].employeeid + "\" class=\"btn btn-success\" value=\"设置为经理\"/> <input type=\"button\" id=\"setPwd\" data-employeeid=\"" + list[i].employeeid + "\" class=\"btn btn-info\" value=\"重置密码\"/> <input type=\"button\" id=\"delEmployee\" data-employeeid=\"" + list[i].employeeid + "\" class=\"btn btn-danger\" value=\"删除\"/>"
							} else {
								power = "清洁工";
								btnStr = "<input type=\"button\" id=\"setPwd\" data-employeeid=\"" + list[i].employeeid + "\" class=\"btn btn-info\" value=\"重置密码\"/> <input type=\"button\" id=\"delEmployee\" data-employeeid=\"" + list[i].employeeid + "\" class=\"btn btn-danger\" value=\"删除\"/> "
							}
						}else if(selfpower == "1"){
							if (list[i].power == "0") {
								power = "管理员";
								btnStr = " ";
							// } else if (list[i].power == "1" ) {
							// 	if(employeeid == list[i].employeeid)
							// 	power = "经理";
							// 	btnStr = "<input type=\"button\" id=\"setPwd\" data-employeeid=\"" + list[i].employeeid + "\" class=\"btn btn-info\" value=\"重置密码\"/> <input type=\"button\" id=\"delEmployee\" data-employeeid=\"" + list[i].employeeid + "\" class=\"btn btn-danger\" value=\"删除\"/>"
							} else if (list[i].power == "1") {
								power = "经理";
								btnStr = "<input type=\"button\" id=\"setPwd\" data-employeeid=\"" + list[i].employeeid + "\" class=\"btn btn-info\" value=\"重置密码\"/> <input type=\"button\" id=\"delEmployee\" data-employeeid=\"" + list[i].employeeid + "\" class=\"btn btn-danger\" value=\"删除\"/>"
							}
							else if (list[i].power == "2") {
								power = "员工";
								btnStr = "<input type=\"button\" id=\"setPwd\" data-employeeid=\"" + list[i].employeeid + "\" class=\"btn btn-info\" value=\"重置密码\"/> <input type=\"button\" id=\"delEmployee\" data-employeeid=\"" + list[i].employeeid + "\" class=\"btn btn-danger\" value=\"删除\"/>"
							} else {
								power = "清洁工";
								btnStr = "<input type=\"button\" id=\"setPwd\" data-employeeid=\"" + list[i].employeeid + "\" class=\"btn btn-info\" value=\"重置密码\"/> <input type=\"button\" id=\"delEmployee\" data-employeeid=\"" + list[i].employeeid + "\" class=\"btn btn-danger\" value=\"删除\"/> "
							}
						}
						
						htmlStr="<tr data-employeeid=\""+list[i].employeeid+"\"><td>"+list[i].employeeid+"</td><td>"+list[i].useraccount+"</td><td>"+list[i].realname+"</td><td>"+list[i].age+"</td><td>"+power+"</td><td>"+list[i].phone+"</td><td>"+btnStr+"</td></tr>";
						$("#staffList").append(htmlStr);
						l++;
						//console.log(htmlStr)
					}
					if(pageNum=="1") $("#pre").css("display","none");
					if(pageSize>l) $("#next").css("display","none");
					btnOn();

				}
			}
			else{
				alert("获取员工列表失败")
			}
			

			
		},
		error:function(){
			alert("获取员工列表发生错误")
		}
	})
}

function btnOn(){
	$("input").filter("#setStaff").on('click',function(event){
        setPosition(event,"2");
	});
	$("input").filter("#setManage").on('click',function(event){
		setPosition(event,"1");
	});
	$("input").filter("#setPwd").on('click',function(event){
        setPwd(event);
	});
	$("input").filter("#delEmployee").on('click',function(event){
		delEmployee(event);
	});
	$("input").filter("#setPageBtn").on('click',function( ){
		setPage( );
	})
}

function getPre(){
	pageNum=pageNum-1;
	getStaffList();
}

function getNext(){
	pageNum=pageNum+1;
	getStaffList();
	
}

function setPage(){
	
	if($("#inputPage").val()<0 || $("#inputPage").val()==0)
		alert("请输入正确页码");
	else{
		pageNum=$("#inputPage").val();
		getStaffList();
	}
	
}

function setPosition(event,alter){
	var employeeid=$(event.target).data("employeeid");
	var info;
	for(i in list){
		if(list[i].employeeid==employeeid){
			info=list[i];
		}
	}
	var employee={
		employeeid:employeeid,
		power:alter
	}
	$.ajax({
		type:"POST",
		url:"../employee/updateSelfInfo.do",
		dataType:"JSON",
		data:{
			"employeeid":employeeid,
			"useraccount":null,
			"password":alter,
			"realname":null,
			"age":null,
			"power":null,
			"idcard":null,
			"phone":null,
			"photourl":null,
		},
		success:function(data){
			if(data.code==0){
				alert("修改成功");
				getStaffList();
			}
			else
				alert("修改失败")
		},
		error:function(){
			alert("修改信息出现错误");
		}
	})

}

function setPwd(event){
	var employeeid=$(event.target).data("employeeid");
	var info;
	for(i in list){
		if(list[i].employeeid==employeeid){
			info=list[i];
		}
	}
	info.password="123456";
	var employee={
		employeeid:employeeid,
		password:"123456"
	}
	$.ajax({
		type:"POST",
		url:"../employee/updateSelfInfo.do",
		dataType:"JSON",
		data:{
			"employeeid":employeeid,
			"useraccount":null,
			"password":info.password,
			"realname":null,
			"age":null,
			"power":null,
			"idcard":null,
			"phone":null,
			"photourl":null
		},
		success:function(data){
			if(data.code==0){
				alert("修改成功");
				getStaffList();
			}
			else
				alert("修改失败")
		},
		error:function(){
			alert("修改信息出现错误");
		}
	})
}

function delEmployee(event){
	var employeeid=$(event.target).data("employeeid");
	$.ajax({
		type:"POST",
		url:"../employee/deleteEmployee.do",
		dataType:"JSON",
		data:{
			"employeeid":employeeid
		},
		success:function(data){
			if(data.code==0){
				alert("删除成功");
				if(l==1)
					pageNum=pageNum-1;
				getStaffList();
			}
			else
				alert("删除失败")
		},
		error:function(){
			alert("删除出现错误");
		}
	})

}

function addEmployee(event){
	var employee={
		useraccount:$("#inputUseraccount").val(),
		realname:$("#inputRealname").val(),
		password:$("#inputPassWord").val(),
		phone:$("#inputPhone").val(),
		power:$("#inputPower").val(),
		age:$("#inputAge").val(),
		idcard:$("#inputIdcard").val()
	}
	$.ajax({
		type:"POST",
		url:"../employee/addEmployee.do",
		dataType:"JSON",
		data:{
			"employeeid":null,
			"useraccount":employee.useraccount,
			"password":employee.password,
			"realname":employee.realname,
			"age":employee.age,
			"power":employee.power,
			"idcard":employee.idcard,
			"phone":employee.power,
			"photourl":null,
		},
		success:function(data){
			if(data.code==0){
				alert("添加成功");
				$("#inputUseraccount").val(" ");
				$("#inputRealname").val(" ");
				$("#inputPassWord").val(" ");
				$("#inputPhone").val(" ");

				$("#inputAge").val(" ");
				$("#inputIdcard").val(" ");
				$('#addEmployee').modal('toggle');
				getStaffList();
			}
			else
				alert("添加失败")
		},
		error:function(){
			alert("添加出现错误");
		}
	})

}