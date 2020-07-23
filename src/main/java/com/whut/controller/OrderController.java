package com.whut.controller;

import com.whut.bean.Order;
import com.whut.service.OrderService;
import com.whut.until.GsonUtil;
import com.whut.until.State;
import com.whut.until.StateSignal;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/order")
public class OrderController {
    @Resource
    OrderService orderService;

    @RequestMapping(value="/getOrders.do",produces = "text/html;charset=UTF-8")
    public String selectOrder(@RequestParam int pageNum, @RequestParam int pageSize) {
        List<Order> orders = orderService.getAllOrder(pageNum,pageSize);
        StateSignal signal = new StateSignal();
        if(orders!=null){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
            signal.put("List",orders);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return GsonUtil.toJson(signal.getResult());
    }

    @RequestMapping(value="/checkIn.do",produces = "text/html;charset=UTF-8")
    public String checkIn(@RequestBody Order order) {
        int state = orderService.checkIn(order);
        StateSignal signal = new StateSignal();
        if(state==1){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return GsonUtil.toJson(signal.getResult());
    }

    @RequestMapping(value="/deleteOrder",produces = "text/html;charset=UTF-8")
    public String deleteOrder(@RequestParam int orderid){
        StateSignal signal = new StateSignal();
        int state = orderService.deleteByPrimaryKey(orderid);
        if(state==1){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return GsonUtil.toJson(signal.getResult());
    }

    @RequestMapping(value="/checkOut.do",produces = "text/html;charset=UTF-8")
    public String checkOut(@RequestParam int roomid) {
        StateSignal signal = new StateSignal();
        int state = orderService.checkOut(roomid);
        if(state==1){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return GsonUtil.toJson(signal.getResult());
    }

    @RequestMapping(value="/cleanRoom.do",produces = "text/html;charset=UTF-8")
    public String cleanRoom(@RequestParam int roomid, @RequestParam int employeeid) {
        StateSignal signal = new StateSignal();
        int state = orderService.cleanRoom(roomid,employeeid);
        if(state==1){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return GsonUtil.toJson(signal.getResult());
    }


    @RequestMapping(value="/getMoney.do",produces = "text/html;charset=UTF-8")
    public String getMoney() {
        StateSignal signal = new StateSignal();
        double income =0;
        income = orderService.getIncome();
        double outcome = orderService.getOutcome();
        if(income!=0){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
            signal.put("income",income);
            signal.put("outcome",outcome);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return GsonUtil.toJson(signal.getResult());
    }
}