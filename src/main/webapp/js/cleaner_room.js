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

})

//判断对象/JSON是否为空 空返回1 非空返回0
function isEmptyObject(e) {
	var t;
	for (t in e)
		return 0;
	return 1;
}


var list;
function getroomList(){
	$.ajax({
		type:"post",
		url:"../room/getRooms.do",
		dataType:"JSON",
		data:{
			//"state":"2",
			//"type":"-1",
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
				var power=" ";
				var htmlStr=" ";
				var btnStr=" ";
				var state=" ";
				var type=" ";
				l=0;
				$("#pre").css("display","block");
				$("#next").css("display","block");
				$("#roomList").empty();
				$("#roomList").append("<tr><th>位置</th><th>状态</th><th>类型</th><th>操作</th></tr>");

				for(i in list){
					//房间类型
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
					//房间状态
					if(list[i].state == -1){
						state = "停用"
						btnStr = "<input type=\"button\"  class=\"btn\" data-roomid=\""+list[i].roomid+"\"  value=\"暂无\">"
					}else if(list[i].state == 0){
						state = "空闲"
						btnStr = "<input type=\"button\"  class=\"btn\" data-roomid=\""+list[i].roomid+"\"  value=\"暂无\">"
					}else if(list[i].state == "1"){
						state = "已入住"
						btnStr = "<input type=\"button\"  class=\"btn\" data-roomid=\""+list[i].roomid+"\"  value=\"暂无\">"
					}else{
						state = "待清扫"
						btnStr="<input type=\"button\"  class=\"btn btn-success\" data-roomid=\""+list[i].roomid+"\" id=\"setRoom\" value=\"清扫完毕\">";
					}
					//btnStr="<input type=\"button\"  class=\"btn btn-success\" data-roomid=\""+list[i].roomid+"\" id=\"setRoom\" value=\"清扫完毕\">";
					htmlStr="<tr data-roomid=\""+list[i].roomid+"\"><td>"+list[i].roomname+"</td><td>"+state+"</td><td>"+type+"</td><td>"+btnStr+"</td></tr>";
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

function btnOn(){;
	$("input").filter("#setPageBtn").on('click',function( ){
		setPage( );
	});
	$("input").filter("#setRoom").on('click',function(event ){
		setRoom(event);
	});
}
var employeeid=$.getData('employeeid');
function setRoom(event){
	var roomid=$(event.target).data("roomid");
	console.log(employeeid);
	$.ajax({
		type:"POST",
		url:"../order/cleanRoom.do",
		// dataType:"JSON",
		data:{
			"roomid":roomid,
			"employeeid":employeeid
		},
		success:function(data){
			if(data.code===0){
				alert("提交成功");
				getroomList();
			}
			else{
				alert("提交失败");
				getroomList();
			}
		},
		error:function(){
			alert("提交信息出现错误");
		}
	})
}

function getPre(){
	pageNum=pageNum-1;
	getroomList();
}

function getNext(){
	pageNum=pageNum+1;
	getroomList();	
}

function setPage(){
	if($("#inputPage").val()<0 || $("#inputPage").val()==0)
		alert("请输入正确页码");
	else{
		pageNum=$("#inputPage").val();
		getroomList();
	}
	
}

