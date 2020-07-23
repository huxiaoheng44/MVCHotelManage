package com.whut.service;


import com.whut.bean.Order;

import java.util.List;

public interface OrderService {
    int deleteByPrimaryKey(Integer orderid);

    int insert(Order record);

    int insertSelective(Order record);

    Order selectByPrimaryKey(Integer orderid);

    List<Order> getAllOrder(int pageNum, int pageSize);

    int updateByPrimaryKeySelective(Order record);

    int updateByPrimaryKey(Order record);

    double getIncome();

    double getOutcome();

    int checkIn(Order order);

    int checkOut(int roomid);

    int cleanRoom(int roomid,int employeeid);
}
