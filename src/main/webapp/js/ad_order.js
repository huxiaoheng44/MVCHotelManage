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
	getorderList();
	getConfig();
	$("#pre").on('click',function(){
		getPre();
	});
	$("#next").on('click',function(){
		getNext();
	});

})

//判断对象/JSON是否为空 空返回1 非空返回0
function isEmptyObject(e) {
	var t;
	for (t in e)
		return 0;
	return 1;
}

var list;
var power = $.getData('power')
function getorderList(){
	$.ajax({
		type:"post",
		url:"../order/getOrders.do",
		dataType:"JSON",
		data:{
			"pageNum":pageNum,
			"pageSize":pageSize		
		},
		success:function(data){
			if(isEmptyObject(data.List)&&pageNum>0){
				pageNum=pageNum-1;
				getorderList();
			}
			else{
				list=data.List;
				var htmlStr=" ";
				var btnStr=" ";
				var state=" ";
				var sdate;
				var edate;
				l=0;
				$("#pre").css("display","block");
				$("#next").css("display","block");
				$("#orderList").empty();
				$("#orderList").append("<tr><th>入住人</th><th>身份证号</th><th>房间号</th><th>开始时间</th><th>结束时间</th><th>总金额</th><th>办理人id</th><th>清洁人员id</th><th>状态</th><th>操作</th></tr>")
				
				for(i in list){
					sdate=list[i].starttime;
					edate=list[i].endtime;
					// if(list[i].state=="0"){
					// 	state="未付款";
					// 	btnStr="<input  type=\"button\"  class=\"btn btn-info\" data-roomid=\""+list[i].roomid+"\" id=\"showRoom\"  data-toggle=\"modal\" data-target=\"#showRoomT\" value=\"查看房间\">";
					// }
					// else if(list[i].state=="1"){
					// 	state="已付款";
					// 	btnStr="<input type=\"button\"  class=\"btn btn-info\" data-roomid=\""+list[i].roomid+"\" id=\"showRoom\"  data-toggle=\"modal\" data-target=\"#showRoomT\" value=\"查看房间\"> ";
					// }
					// else if(list[i].state=="2"){
					// 	state="已完成";
					// 	btnStr="<input type=\"button\"  class=\"btn btn-info\" data-roomid=\""+list[i].roomid+"\" id=\"showRoom\"  data-toggle=\"modal\" data-target=\"#showRoomT\" value=\"查看房间\"> <input type=\"button\" class=\"btn btn-success\"  data-orderid=\""+list[i].orderid+"\" id=\"delOrder\" value=\"删除\">";
					// }
					// else{
					// 	state="已取消";
					// 	btnStr="<input type=\"button\"  class=\"btn btn-info\" data-roomid=\""+list[i].roomid+"\" id=\"showRoom\"  data-toggle=\"modal\" data-target=\"#showRoomT\" value=\"查看房间\"> <input type=\"button\"  class=\"btn btn-success\"  data-orderid=\""+list[i].orderid+"\" id=\"delOrder\" value=\"删除\">";
					// }
					//如果是员工
					if(power == 2){
						if (list[i].employeeid2 == null) {
							state = "未完成";
							btnStr = "<input type=\"button\"  class=\"btn btn\"  data-orderid=\"" + list[i].orderid + "\" value=\"无权限\">";
						} else {
							state = "已完成";
							btnStr = "<input type=\"button\"  class=\"btn btn\"  data-orderid=\"" + list[i].orderid + "\" value=\"无权限\">";
						}
					}
					else {
						if (list[i].employeeid2 == null) {
							state = "未完成";
							btnStr = "<input type=\"button\"  class=\"btn btn-danger\"  data-orderid=\"" + list[i].orderid + "\" id=\"delOrder\" value=\"删除\">";
						} else {
							state = "已完成";
							btnStr = "<input type=\"button\"  class=\"btn btn-danger\"  data-orderid=\"" + list[i].orderid + "\" id=\"delOrder\" value=\"删除\">";
						}
					}
					htmlStr="<tr data-orderid=\""+list[i].orderid+"\"><td>"+list[i].customer.householdname+"</td><td>"+list[i].customer.idcard+"</td><td>"+list[i].roomid+"</td><td>"+sdate+"</td><td>"+edate+"</td><td>"+list[i].money+"</td><td>"+dropNull(list[i].employeeid1)+"</td><td>"+dropNull(list[i].employeeid2)+"</td><td>"+state+"</td><td>"+btnStr+"</td></tr>";
					$("#orderList").append(htmlStr);
					l++;
				}
				if(pageNum=="1") $("#pre").css("display","none");
				if(pageSize>l) $("#next").css("display","none");
				btnOn();
			}

		},
		error:function(){
			alert("获取订单列表发生错误")
		}
	})
}

function btnOn(){

	$("input").filter("#setPageBtn").on('click',function( ){
		setPage( );
	});
	$("input").filter("#showRoom").on('click',function(event){
		showRoom(event);
	})
	$("input").filter("#delOrder").on('click',function(event){
		delOrder(event);
	});
}

function getPre(){
	pageNum=pageNum-1;
	getorderList();
}

function getNext(){
	pageNum=pageNum+1;
	getorderList();	
}

function setPage(){
	
	if($("#inputPage").val()<0 || $("#inputPage").val()==0)
		alert("请输入正确页码");
	else{
		pageNum=$("#inputPage").val();
		getorderList();
	}
	
}

function delOrder(event){
	var orderid=$(event.target).data("orderid");
	$.ajax({
		type:"POST",
		url:"../order/deleteOrder",
		dataType:"JSON",
		data:{
			"orderid":orderid
		},
		success:function(data){
				if(data.code==0){
					alert("删除成功");
				if(l==1)
					pageNum=pageNum-1;
				getorderList();
			}
			else
				alert("删除失败")
		},
		error:function(){
			alert("删除出现错误");
		}
	})

}


function showRoom(event){
	var roomid=$(event.target).data("roomid");
	$.ajax({
		type:"POST",
		url:"../room/getRoomById.do",
		dataType:"JSON",
		data:{
			"roomid":roomid
		},
		success:function(data){
			var room=data.room;
			if(data.code==0){
				var htmlStr=" ";
				var state=" ";
				var type=" ";
				$("#roomTable").empty();
				if(room.state=="0")
					state="停用";
				else if(room.state=="1")
					state="未预定";
				else if(room.state=="2")
					state="已预定(入住)";
				else
					state="待清扫";
				if(room.type=="0")
					type="极致单间";
				else if(room.type=="1")
					type="精品单间";
				else if(room.type=="2")
					type="标准双人间";
				else if(room.type=="3")
					type="精品双人间";
				else if(room.type=="4")
					type="总统套房";
				else if(room.type=="5")
					type="电竞房";
				else if(room.type=="6")
					type="商务房";
				else
					type="套房";
				htmlStr="<tr><th>位置</th><td>"+room.local+"</td></tr><tr><th>价格</th><td>"+room.money+"</td></tr><tr><th>类型</th><td>"+type+"</td></tr><tr><th>状态</th><td>"+state+"</td></tr>"
				$("#roomTable").append(htmlStr);
			}
			else
				alert("获取失败")
		},
		error:function(){
			alert("获取信息出现错误");
		}
	})
}

function getConfig(){
	$.ajax({
		type:"POST",
		url:"../order/getMoney.do",
		dataType:"JSON",
		data:{},
		success:function(data){
			if(data.code=="0"){
				//var config=data.config;
				$("#totalMoney").text(data.income+"元");
				$("#monthOutcome").text(data.outcome+"元");
			}
			else{
				alert("获取配置错误");
			}

		},
		error:function(){
			alert("获取配置发生错误")
		}

	});
}

function dropNull(e) {
	if(e==null){
		return "暂无"
	}else{
		return e;
	}
}