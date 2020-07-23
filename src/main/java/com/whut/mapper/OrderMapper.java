package com.whut.mapper;


import com.whut.bean.Order;

import java.util.List;

public interface OrderMapper {
    int deleteByPrimaryKey(Integer orderid);

    int insert(Order record);

    int insertSelective(Order record);

    Order selectByPrimaryKey(Integer orderid);

    Order selectOrderByRoomid(Integer roomid);

    List<Order> getAllOrder();

//    int getIncome(Double income);
//
//    int getOutcome(Double outcome);
    double getIncome();

    double getOutcome();

    int updateByPrimaryKeySelective(Order record);

    int updateByPrimaryKey(Order record);
}