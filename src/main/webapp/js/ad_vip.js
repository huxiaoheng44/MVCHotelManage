var pageNum=1;
var pageSize=8;
var l;

$(document).ready(function(){
    getVIPList();
    $("#pre").on('click',function(){
        getPre();
    });
    $("#next").on('click',function(){
        getNext();
    });
    $("#setCustomerBtn").on('click',function(){
        setCustomer();
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
function getVIPList(){
    $.ajax({
        type:"post",
        url:"../customer/getCustomers.do",
        dataType:"JSON",
        data:{
            "pageNum":pageNum,
            "pageSize":pageSize
        },
        success:function(data){
            if(data.code=="0"){
                if(isEmptyObject(data.List)&&pageNum>0){
                    pageNum=pageNum-1;
                    getVIPList();
                }
                else{
                    var power=" ";
                    var htmlStr=" ";
                    var btnStr=" ";
                    list=data.List;
                    l=0;
                    $("#pre").css("display","block");
                    $("#next").css("display","block");
                    $("#VIPList").empty();
                    $("#VIPList").append("<tr><th>姓名</th><th>身份证</th><th>会员等级</th><th>总开销</th><th>联系方式</th><th>操作</th></tr>")
                    for(i in list){
                        // if(list[i].power=="0") {
                        //     power="管理员";
                        //     btnStr=" ";
                        // }
                        // else if(list[i].power=="1") {
                        //     power="经理";
                        //     btnStr="<input type=\"button\" id=\"setStaff\" data-userid=\""+list[i].userid+"\" class=\"btn btn-success\" value=\"设置为员工\"/> <input type=\"button\" id=\"delUser\" data-userid=\""+list[i].userid+"\" class=\"btn btn-danger\" value=\"删除\"/>"
                        // }
                        // else if(list[i].power=="2") {
                        //     power="员工";
                        //     btnStr="<input type=\"button\" id=\"setManage\" data-userid=\""+list[i].userid+"\" class=\"btn btn-success\" value=\"设置为经理\"/> <input type=\"button\" id=\"setPwd\" data-userid=\""+list[i].userid+"\" class=\"btn btn-info\" value=\"重置密码\"/> <input type=\"button\" id=\"delUser\" data-userid=\""+list[i].userid+"\" class=\"btn btn-danger\" value=\"删除\"/>"
                        // }
                        // else {
                        //     power="清洁工";
                        //     btnStr="<input type=\"button\" id=\"setPwd\" data-userid=\""+list[i].userid+"\" class=\"btn btn-info\" value=\"重置密码\"/> <input type=\"button\" id=\"delUser\" data-userid=\""+list[i].userid+"\" class=\"btn btn-danger\" value=\"删除\"/> "
                        // }
                        btnStr="<input type=\"button\"  data-toggle=\"modal\" data-target=\"#CustomerMessage\" id=\"setCustomer\"  data-idcard=\""+list[i].idcard+"\"  data-realname=\""+list[i].householdname+"\" data-phone=\""+list[i].phone+"\"  class=\"btn btn-info\" value=\"修改信息\"/> ";

                        htmlStr="<tr data-IDcard=\""+list[i].idcard+"\"><td>"+list[i].householdname+"</td><td>"+list[i].idcard+"</td><td>"+list[i].level+"</td><td>"+list[i].cost+"</td><td>"+list[i].phone+"</td><td>"+btnStr+"</td></tr>";
                        $("#VIPList").append(htmlStr);
                        l++;
                    }
                    if(pageNum=="1") $("#pre").css("display","none");
                    if(pageSize>l) $("#next").css("display","none");
                    btnOn();

                }
            }
            else{
                alert("获取会员列表失败")
            }



        },
        error:function(){
            alert("获取会员列表发生错误")
        }
    })
}

function btnOn(event){
    $("input").filter("#setCustomer").on('click',function(event){
        var idcard=$(event.target).attr("data-idcard");
        var realname = $(event.target).attr("data-realname");
        var phone = $(event.target).attr("data-phone");
        $("#inputIdcard").val(idcard);
        $("#inputRealname").val(realname);
        $("#inputPhone").val(phone);
    });
}

function setCustomer() {
    var customer ={
        idcard:$("#inputIdcard").val(),
        householdname:$("#inputRealname").val(),
        phone:$("#inputPhone").val()
    }
    $.ajax({
        type:"POST",
        url:"../customer/updateCustomer.do",
        dataType:"JSON",
        data:{
            idcard: customer.idcard,
            householdname: customer.householdname,
            phone: customer.phone
        },
        success:function(data){
            if(data.code==0){
                alert("修改成功");
                $('#CustomerMessage').modal('toggle');
                $("#inputIdcard").val(" ");
                $("#inputRealname").val(" ");
                $("#inputPhone").val(" ");
                getVIPList();
            }
            else
                alert("修改失败");
        },
        error:function(){
            alert("修改信息出现错误");
        }
    })
}

function getPre(){
    pageNum=pageNum-1;
    getVIPList();
}

function getNext(){
    pageNum=pageNum+1;
    getVIPList();

}

function setPage(){

    if($("#inputPage").val()<0 || $("#inputPage").val()==0)
        alert("请输入正确页码");
    else{
        pageNum=$("#inputPage").val();
        getVIPList();
    }

}

// function setPosition(event,alter){
//     var userid=$(event.target).data("userid");
//     var info;
//     for(i in list){
//         if(list[i].userid==userid){
//             info=list[i];
//         }
//     }
//     $.ajax({
//         type:"POST",
//         url:"../user/updateUser.do",
//         dataType:"JSON",
//         data:{
//             "userid":info.userid,
//             "power":alter
//         },
//         success:function(data){
//             if(data.code==0){
//                 alert("修改成功");
//                 getVIPList();
//             }
//             else
//                 alert("修改失败")
//         },
//         error:function(){
//             alert("修改信息出现错误");
//         }
//     })
//
// }

// function setPwd(event){
//     var userid=$(event.target).data("userid");
//     var info;
//     for(i in list){
//         if(list[i].userid==userid){
//             info=list[i];
//         }
//     }
//     info.password="111111";
//     $.ajax({
//         type:"POST",
//         url:"../user/updateUser.do",
//         dataType:"JSON",
//         data:{
//             "userid":info.userid,
//             "password":info.password
//         },
//         success:function(data){
//             if(data.code==0){
//                 alert("修改成功");
//                 getVIPList();
//             }
//             else
//                 alert("修改失败")
//         },
//         error:function(){
//             alert("修改信息出现错误");
//         }
//     })
// }
//
// function delUser(event){
//     var userid=$(event.target).data("userid");
//     $.ajax({
//         type:"POST",
//         url:"../user/delUser.do",
//         dataType:"JSON",
//         data:{
//             "userid":userid
//         },
//         success:function(data){
//             if(data.code==0){
//                 alert("删除成功");
//                 if(l==1)
//                     pageNum=pageNum-1;
//                 getVIPList();
//             }
//             else
//                 alert("删除失败")
//         },
//         error:function(){
//             alert("删除出现错误");
//         }
//     })
//
// }