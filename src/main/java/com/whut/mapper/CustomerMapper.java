package com.whut.mapper;

import com.whut.bean.Customer;

import java.util.List;

public interface CustomerMapper {
    int deleteByPrimaryKey(String idcard);

    int insert(Customer record);

    int insertSelective(Customer record);

    Customer selectByPrimaryKey(String idcard);
    List<Customer> getAllCustomer();

    int updateByPrimaryKeySelective(Customer record);

    int updateByPrimaryKey(Customer record);
}