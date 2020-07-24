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
	getroomList();
	$("#pre").on('click',function(){
		getPre();
	});
	$("#next").on('click',function(){
		getNext();
	});
	$("input").filter("#setRoomBtn").on('click',function( ){
		setRoomajax( );
	});

	$("input").filter("#addRoomBtn").on('click',function(){
		addRoom();
	});

	$("input").filter("#newOrderBtn").on('click',function(){
		newOrder();
	});

	//开始时间结束时间
	$('#dateStart').datepicker({
		language: 'zh-CN',
		format: 'yyyy-mm-dd',
		autoclose: true
	}).on('changeDate',function(e){
		var startTime = e.date;
		$('#dateEnd').datepicker('setStartDate',startTime);
	});

	$('#dateEnd').datepicker({
		language: 'zh-CN',
		format: 'yyyy-mm-dd',
		autoclose: true
	}).on('changeDate',function(e){
		var endTime = e.date;
		$('#dateStart').datepicker('setEndDate',endTime);
	});


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



var list;
function getroomList(){
	$.ajax({
		type:"post",
		url:"../room/getRooms.do",
		dataType:"JSON",
		data:{
			"state":"-1",
			"type":"-1",
			"pageNum":pageNum,
			"pageSize":pageSize		
		},
		success:function(data){
			if(isEmptyObject(data.List)&&pageNum>0){
				pageNum=pageNum-1;
				getroomList();
			}
			else{
				list=data.List;

				//添加了房间类型详细内容
				var roomid=-1;
				var wifi = " ";
				var bathtub = " ";
				var breakfast = " ";

				var power=" ";
				var htmlStr=" ";
				var btnStr=" ";
				var state=" ";
				var type=" ";
				l=0;
				$("#pre").css("display","block");
				$("#next").css("display","block");
				$("#roomList").empty();
				$("#roomList").append("<tr><th style=\"width:100px\">房间号</th><th  >单价</th><th  >房间状态</th><th>类别</th><th >wifi</th><th  style=\"width:100px\">床数量</th><th>床尺寸</th><th >有无浴缸</th><th>包含早餐</th><th>房间大小</th><th>操作</th></tr>")
				for(i in list){
					//转化为文字
					wifi = boolenToText(list[i].roomtype.wifi);
					bathtub = boolenToText(list[i].roomtype.bathtub);
					breakfast = boolenToText(list[i].roomtype.breakfast);
					if(list[i].state=="-1"){
						state="停用";
						btnStr="<input type=\"button\" class=\"btn btn-info\" data-roomid=\""+list[i].roomid+"\" id=\"setStart\" value=\"开始使用\"> <input type=\"button\" class=\"btn btn-success\"  data-toggle=\"modal\" data-target=\"#alterRoom\"  data-roomid=\""+list[i].roomid+"\" id=\"setRoom\" value=\"修改信息\"> <input type=\"button\" class=\"btn btn-danger\" data-roomid=\""+list[i].roomid+"\" value=\"删除\" id=\"delRoom\">";
					}
					else if(list[i].state=="0"){
						state="空闲";
						btnStr="<input type=\"button\" class=\"btn btn-info\" data-roomid=\""+list[i].roomid+"\" value=\"订房\" id=\"toNewOrder\" data-toggle=\"modal\" data-target=\"#newOrder\"> <input type=\"button\" class=\"btn btn-primary\" data-roomid=\""+list[i].roomid+"\" id=\"setStop\" value=\"改为停用\"> <input type=\"button\" class=\"btn btn-success\"  data-toggle=\"modal\" data-target=\"#alterRoom\"  data-roomid=\""+list[i].roomid+"\" id=\"setRoom\" value=\"修改信息\"> <input type=\"button\" class=\"btn btn-danger\" data-roomid=\""+list[i].roomid+"\" value=\"删除\" id=\"delRoom\">";
					}
					else if(list[i].state=="1"){
						state="已入住";
						btnStr="<input type=\"button\" class=\"btn btn-danger\"  data-toggle=\"modal\" data-target=\"#checkOut\"  data-roomid=\""+list[i].roomid+"\" id=\"checkout\" value=\"退房\">";
					}
					else{
						state="待清扫";
						btnStr="<input type=\"button\" class=\"btn btn-primary\" data-roomid=\""+list[i].roomid+"\" id=\"setStop\" value=\"改为停用\"> <input type=\"button\" class=\"btn btn-success\"  data-toggle=\"modal\" data-target=\"#alterRoom\"  data-roomid=\""+list[i].roomid+"\" id=\"setRoom\" value=\"修改信息\"> <input type=\"button\" class=\"btn btn-danger\" data-roomid=\""+list[i].roomid+"\" value=\"删除\" id=\"delRoom\">";
					}

					if(list[i].type=="0")
						type="极简单间";
					else if(list[i].type=="1")
						type="精品单间";
					else if(list[i].type=="2")
						type="标准双人间";
					else if(list[i].type=="3")
						type="精品双人间";
					else if(list[i].type=="4")
						type="电竞房";
					else if(list[i].type=="5")
						type="商务房";
					else if(list[i].type=="6")
						type="总统套房";
					else
						type="未知套房";

					htmlStr="<tr data-roomid=\""+list[i].roomid+"\"><td>"+list[i].roomname+"</td><td>"+list[i].roomtype.money+"</td><td>"+state+"</td><td>"+type+"</td><td>"+wifi+"</td><td>"+list[i].roomtype.bednumber+"</td><td>"+list[i].roomtype.bedsize+"</td><td>"+bathtub+"</td><td>"+breakfast+"</td><td>"+list[i].roomtype.roomsize+"</td><td>"+btnStr+"</td></tr>";
					$("#roomList").append(htmlStr);
					l++;
				}
				if(pageNum=="1") $("#pre").css("display","none");
				if(pageSize>l) $("#next").css("display","none");
				btnOn();
			}

		},
		error:function(){
			alert("获取房间列表发生错误")
		}
	})
}

function btnOn(){
	$("input").filter("#delRoom").on('click',function(event){
		delRoom(event);
	});
	$("input").filter("#setPageBtn").on('click',function( ){
		setPage( );
	})
	$("input").filter("#setStop").on('click',function(event){
		setState(event,"-1");
	});
	$("input").filter("#setStart").on('click',function(event){
		setState(event,"0");
	});
	$("input").filter("#setRoom").on('click',function(event){
		setRoom(event);
	});
	$("input").filter("#toNewOrder").on('click',function(event){
		var roomid=$(event.target).data("roomid");
		$("#newOrderBtn").attr("data-roomid",roomid);
	});
	$("input").filter("#checkout").on('click',function(event){
		checkOut(event);
	});

}

function getPre(){
	pageNum=pageNum-1;
	getroomList();
}

function getNext(){
	pageNum=pageNum+1;
	getroomList();	
}

function setRoom(event){
	var roomid=$(event.target).data("roomid");
	var info;
	for(i in list){
		if(list[i].roomid==roomid){
			info=list[i];
		}
	}
	$("#reinputLocal").val(info.local);
	$("#reinputPrice").val(info.money);
	$("#reinputType").val(info.type);
	$("#reinputid").val(roomid);
}

function setRoomajax( ){
	// var room;
	// room.roomname = $("#inputLocal").val();
	// room.money = $("#inputPrice").val();
	// room.type = $("#inputType").val();
	// room.state = "0";
	var room = {
		roomname:$("#inputLocal").val(),
		type: $("#inputType").val(),
		state:"0"
	};
	room = JSON.stringify(room);
	$.ajax({
		type:"POST",
		url:"../room/updateRoom.do",
		dataType:"JSON",
		data: {
			roomname:$("#inputLocal").val(),
			type: $("#inputType").val(),
			state:"0"
		},
		success:function(data){
			if(data.code==0){
				alert("修改成功");
				$("#reinputLocal").val("");
				$("#reinputPrice").val("");
				$("#reinputType").val("");
				$("#reinputid").val("");
				$('#alterRoom').modal('toggle');
				getroomList();
			}
			else{
				alert("修改失败");
				getroomList();
			}
		},
		error:function(){
			alert("修改信息出现错误");
		}
	})
}

function setState(event,alter){
	var roomid=$(event.target).data("roomid");
	$.ajax({
		type:"POST",
		url:"../room/updateRoomState.do",
		dataType:"JSON",
		data:{
			"roomid":roomid,
			"state":alter
		},
		success:function(data){
			if(data.code==0){
				alert("修改成功");
				getroomList();
			}
			else
				alert("修改失败")
		},
		error:function(){
			alert("修改信息出现错误");
		}
	})
}

function setPage(){
	
	if($("#inputPage").val()<0 || $("#inputPage").val()==0)
		alert("请输入正确页码");
	else{
		pageNum=$("#inputPage").val();
		getroomList();
	}
	
}


function delRoom(event){
	var roomid=$(event.target).data("roomid");
	$.ajax({
		type:"POST",
		url:"../room/deleteRoom.do",
		dataType:"JSON",
		data:{
			"roomid":roomid
		},
		success:function(data){
				if(data.code==0){
					alert("删除成功");
				if(l==1)
					pageNum=pageNum-1;
				getroomList();
			}
			else
				alert("删除失败")
		},
		error:function(){
			alert("删除出现错误");
		}
	})

}

function addRoom(){
	var room = JSON.stringify({
		roomname:$("#inputLocal").val(),
		type: $("#inputType").val(),
		state:0
	});
	// room.roomname = $("#inputLocal").val();
	// room.money = $("#inputPrice").val();
	// room.type = $("#inputType").val();
	// room.state = "0";
	console.log(room)
	if(isEmptyString($("#inputLocal").val())||isEmptyString($("#inputLocal").val())||isEmptyString($("#inputType").val()))
		alert("请填写全内容");
	else{
		$.ajax({ 
			type:"POST",
			url:"../room/addRoom.do",
			dataType:"JSON",
			data: {
				roomname:$("#inputLocal").val(),
				type: $("#inputType").val(),
				state:0
			},
				// "roomname":$("#inputLocal").val(),
				// "money":$("#inputPrice").val(),
				// "state":"0",
				// "type":$("#inputType").val()
			success:function(data){
				if(data.code==0){
					alert("添加成功");
					$('#addRoom').modal('toggle');
					$("#inputLocal").val(" ");

					$("#inputType").val(" ");
					getroomList();
				}
				else{
					alert("添加失败");
					window.location.reload();
				}
			},
			error:function(){
				alert("添加出现错误");
			}
		})
	}
	
}

var employeeid=$.getData('employeeid');
//生成订单
function newOrder(event) {
	var customer = {
		idcard:$("#inputidcard").val(),
		householdname:$("#inputRealname").val(),
		phone:$("#inputPhone").val()
	}
	var order = JSON.stringify({
		roomid:$("#newOrderBtn").attr("data-roomid"),
		employeeid1:employeeid,
		idcard:$("#inputidcard").val(),
		type: $("#inputType").val(),
		starttime:$("#dateStart").val(),
		endtime:$("#dateEnd").val(),
		customer:customer
	});
	if(isEmptyString($("#inputidcard").val())||isEmptyString($("#inputRealname").val())||isEmptyString($("#inputPhone").val()))
		alert("请填写全内容");
	else{
		$.ajax({
			type:"POST",
			url:"../order/checkIn.do",
			dataType:"JSON",
			data: {
				roomid:$("#newOrderBtn").attr("data-roomid"),
				employeeid1:employeeid,
				idcard:$("#inputidcard").val(),
				type: $("#inputType").val(),
				starttime:$("#dateStart").val(),
				endtime:$("#dateEnd").val(),
				customer:customer
			},
			// "roomname":$("#inputLocal").val(),
			// "money":$("#inputPrice").val(),
			// "state":"0",
			// "type":$("#inputType").val()
			success:function(data){
				if(data.code==0){
					alert("添加成功");
					$('#newOrder').modal('toggle');
					$("#inputidcard").val(" ");
					$("#inputPhone").val(" ");
					$("#inputRealname").val(" ");
					getroomList();
				}
				else{
					alert("添加失败");
					window.location.reload();
				}
			},
			error:function(){
				alert("添加出现错误");
			}
		})
	}

}

function checkOut(event) {
	var roomid=$(event.target).data("roomid");
	$.ajax({
		type:"POST",
		url:"../order/checkOut.do",
		dataType:"JSON",
		data:{
			roomid:roomid
		},
		success:function(data){
			if(data.code==0){
				alert("退房成功");
				getroomList();
			}
			else{
				alert("退房失败");
				window.location.reload();
			}
		},
		error:function(){
			alert("退房出现错误");
		}
	})


}

function boolenToText(x){
	if(x===0)
		return "无";
	else
		return "有";
}


