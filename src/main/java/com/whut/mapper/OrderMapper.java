package com.whut.mapper;


import com.whut.bean.Order;

import java.util.List;
import java.util.zip.DeflaterOutputStream;

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
    Double getIncome();

    Double getOutcome();

    int updateByPrimaryKeySelective(Order record);

    int updateByPrimaryKey(Order record);
}