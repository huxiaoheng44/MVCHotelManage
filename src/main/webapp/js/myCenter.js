(function($){
	$.getData=function(name){
		var reg=new RegExp("(^|&)"+name+"=([^&]+)(&|$)?");
		var result = window.location.search.substr(1).match(reg);
		if (result!= null) return result[2]; return null;		
	}
})(jQuery);

var power=$.getData('power');
var employeeid=$.getData('employeeid');
var realname=getParam('realname');

$(document).ready(function(){
	$("#mainFrame").attr("src","all_infor.html?employeeid="+employeeid+"&power="+power);
	$("inputNone").attr("value",employeeid);
	var h=$(window).height();
	$("#tagList").css("height",h);
	$("#mainFrame").css("height",h);
	$("#welcome").text("欢迎！ "+realname);
	setList();
})

function setList(){
	var tagList=" ";
	//管理员
	if(power=="0"){
		tagList="<a href=\"all_infor.html?employeeid="+employeeid+"&power="+power+"\"  target=\"mainFrame\" class=\"list-group-item active\"><span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span>个人信息</a>" +
			"<a href=\"ad_manage.html?power="+power+"\"  target=\"mainFrame\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-list\" aria-hidden=\"true\"></span>员工管理</a> " +
			"<a href=\"ad_order.html?power="+power+"\"  target=\"mainFrame\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-shopping-cart\" aria-hidden=\"true\"></span> 订单管理</a>" +
			"<a href=\"manage_room.html\?employeeid="+employeeid+"\"  target=\"mainFrame\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-home\" aria-hidden=\"true\"></span>房间管理</a>" +
			"<a href=\"ad_vip.html\"  target=\"mainFrame\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-star\" aria-hidden=\"true\"></span>会员管理</a> "
			// +"<a href=\"ad_salary.html\"  target=\"mainFrame\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-usd\" aria-hidden=\"true\"></span>工资管理</a>"
	}
	//经理
	else if(power=="1"){
		tagList="<a href=\"all_infor.html?employeeid="+employeeid+"&power="+power+"\" target=\"mainFrame\" class=\"list-group-item active\"><span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span>个人信息</a>" +
			"<a href=\"ad_manage.html?power="+power+"\" target=\"mainFrame\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-list\" aria-hidden=\"true\"></span>员工管理</a>" +
			"<a href=\"manage_room.html\?employeeid="+employeeid+"\"  target=\"mainFrame\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-home\" aria-hidden=\"true\"></span>房间管理</a>" +
			"<a href=\"ad_vip.html\"  target=\"mainFrame\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-star\" aria-hidden=\"true\"></span>会员管理</a>" +
			"<a href=\"ad_order.html?power="+power+"\"  target=\"mainFrame\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-shopping-cart\" aria-hidden=\"true\"></span> 订单管理</a>"
	}
	//员工
	else if(power=="2"){
		tagList="<a href=\"all_infor.html?employeeid="+employeeid+"&power="+power+"\"  target=\"mainFrame\" class=\"list-group-item active\"><span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span>个人信息</a>" +
			"<a href=\"manage_room.html?employeeid="+employeeid+"\" target=\"mainFrame\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-home\" aria-hidden=\"true\"></span>房间管理</a>" +
			"<a href=\"ad_order.html?power="+power+"\"  target=\"mainFrame\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-shopping-cart\" aria-hidden=\"true\"></span> 订单管理</a>" +
			"<a href=\"ad_vip.html\"  target=\"mainFrame\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-star\" aria-hidden=\"true\"></span>会员管理</a>"
	}
	//清洁工
	else if(power=="3"){
		tagList="<a href=\"all_infor.html?employeeid="+employeeid+"&power="+power+"\"  target=\"mainFrame\" class=\"list-group-item active\"><span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span>个人信息</a>" +
			"<a href=\"cleaner_room.html?employeeid="+employeeid+"\"  target=\"mainFrame\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-home\" aria-hidden=\"true\"></span>房间管理</a>"
	}
	$("#tagList").append(tagList);
	tagList=$("#tagList").children("a");
	tagList.on('click',function(event){
		changeColor(event)
	});
}

function changeColor(event){
	var obj=event.target;
	var objSi=$(obj).siblings();
	$(obj).attr("class","list-group-item active");
	$(objSi).attr("class","list-group-item ");
}

function getParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return decodeURI(r[2]);   //对参数进行decodeURI解码
	return null;
	}